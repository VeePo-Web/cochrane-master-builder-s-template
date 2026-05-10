# Performance & Instant-Feel Plan

Goal: every navigation feels instant (≤100 ms perceived), no white flash, no layout shift, and idle CPU stays low. Hits the v2 budgets (LCP ≤2.0 s desktop / 2.5 s mobile, INP ≤200 ms, CLS ≤0.05).

## 1. Page transitions → instant

- Replace the current `framer-motion` fade in `src/components/drywall/PageTransition.tsx` with a no-op pass-through (or a 80 ms opacity-only fade respecting `prefers-reduced-motion`). Removes the perceived 400 ms delay between routes.
- Drop `AnimatePresence mode="wait"` in `src/App.tsx` — `mode="wait"` blocks the new page until the old one's exit finishes. New page mounts immediately.
- Keep `ScrollToTop` behaviour but use `behavior: "auto"` so route change snaps to top with no smooth-scroll wait.

## 2. Route-level prefetch on hover/focus

- Each `lazy(() => import(...))` chunk currently only loads when navigated to — that's why first hop to a page feels slow.
- Add a tiny `usePrefetchRoute()` helper and a `<PrefetchLink>` wrapper around `react-router`'s `Link` that fires the dynamic import on `mouseenter`/`focus`/`touchstart`. Use it in `TemplateNavigation` and `TemplateFooter`. By the time the click lands, the chunk is already in cache.
- Also kick off `requestIdleCallback`-based prefetch of the top 3 most-likely next routes (Services, Pricing, Contact) from `Home` after first paint.

## 3. Eager-load above-the-fold, lazy below

- In `Home`, the hero + first section components (`HeroImage`, `SectionTitle`, `TrustNumbers`, `ServicesGrid`) stay statically imported. They already are.
- Move heavier below-the-fold blocks (`SocialProofEngine`, `GuaranteeBlock`, `BeforeAfterPair`, `FAQAccordion`, `ProcessSteps`) behind `React.lazy` + `IntersectionObserver` mount (a `<LazyMount>` wrapper). They render `null`/skeleton until ~600 px before scroll, then hydrate.
- Same treatment for `Services`, `Pricing`, `Gallery`, `Reviews`, `BrandStory`, `WhyWeLoveService`.

## 4. Drop scroll/motion overhead

- `SmoothScrollProvider` (Lenis) adds RAF cost on every frame. Keep it, but:
  - Disable on touch devices (already heavy + native momentum is better).
  - Disable when `prefers-reduced-motion`.
- Audit `ScrollReveal` usage: ensure single shared `IntersectionObserver` (per the v2 motion spec recipe), not one per element. Refactor `src/components/drywall/ScrollReveal.tsx` if it currently creates an observer per instance.
- Remove `framer-motion` from any component that only fades on mount — replace with pure CSS `data-reveal` + 240 ms transition. Cuts `framer-motion` usage on cold pages.

## 5. Font loading

- `index.html` currently loads 3 families with many weights from Google Fonts. Trim to the weights actually used (per v2 typography: 300/400/500/600). Self-host via `@fontsource` or keep Google but with `&display=swap` already set + a `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the one display weight used in the hero H1.
- Subset to `latin` only with `&text=` for the brand wordmark if applicable (deferred — only if a single hero word remains heavy).

## 6. Image discipline

- Confirm every `EditorialImage`/`HeroImage` sets explicit `width`/`height` (or aspect-ratio) to keep CLS = 0.
- Hero image gets `fetchpriority="high"` and `loading="eager"`; everything else `loading="lazy"` + `decoding="async"`.
- Add a `<link rel="preload" as="image" href={MASTER_REMIX.HERO_IMAGE} fetchpriority="high">` injected from `Home` via `react-helmet`-style head tag (or directly mutate `document.head` in a `useEffect` keyed on the hero src).

## 7. Build-side wins

- Add a manual `rollupOptions.output.manualChunks` split in `vite.config.ts`: vendor (react/react-dom/router), `motion` (framer-motion + lenis), `ui` (radix). Keeps initial JS small and lets the browser cache vendor across deploys.
- Confirm `compilerOptions.target` is modern (`ES2020`+) so SWC doesn't ship transpile bloat. (Read-only check.)

## 8. Misc

- Remove the dev-only `preflightDevWarning` from production builds — it already gates on `apply: "serve"`, but verify no preflight cost leaks into the client bundle via accidental imports from `src/master/knowledge/preflight`.
- Ensure `BookingModal` is mounted but its heavy children (form, validation, supabase client) are inside the modal's `open` branch only, so they don't load until first open. Audit `src/components/drywall/BookingModal.tsx`.

## Files to touch

- `src/App.tsx` — drop `AnimatePresence mode="wait"`, simplify Suspense fallback.
- `src/components/drywall/PageTransition.tsx` — neutralize.
- `src/components/ScrollToTop.tsx` — `behavior: auto`.
- `src/components/template/TemplateNavigation.tsx`, `TemplateFooter.tsx` — use new `<PrefetchLink>`.
- `src/components/template/PrefetchLink.tsx` (new) + `src/components/template/LazyMount.tsx` (new).
- `src/pages/template/*` — wrap below-the-fold sections in `<LazyMount>`; lazy-import heavy blocks.
- `src/components/drywall/SmoothScrollProvider.tsx` — touch + reduced-motion guards.
- `src/components/drywall/ScrollReveal.tsx` — shared observer if not already.
- `src/components/drywall/HeroImage.tsx` — `fetchpriority`, dimensions.
- `index.html` — trim font weights, add hero font preload.
- `vite.config.ts` — `manualChunks`.
- `src/components/drywall/BookingModal.tsx` — gate heavy deps behind `open`.

## Out of scope

- No new dependencies. No design changes. No copy changes. Per-remix image swapping stays as-is.

## Verification

- After build, eyeball Network tab: hero + nav chunk only on first paint; route chunks fetched on hover.
- Lighthouse on `/` and `/services`: Perf ≥95 desktop / ≥90 mobile, CLS ≤0.05, LCP ≤2.0 s desktop.
- Click between every nav item and confirm zero white flash, no fade delay.
