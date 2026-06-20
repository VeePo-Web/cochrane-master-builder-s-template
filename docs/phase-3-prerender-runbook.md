# Phase 3 Runbook — Prerendering with vite-react-ssg

> Decision: **vite-react-ssg** (native Vite SSG, no Chromium). Confirmed installed.
> This is a coupled re-architecture — execute one sub-step at a time, `vite-react-ssg
> build` after each, commit only green. The goal: every route (incl. all eligible
> matrix cells) ships **static HTML + JSON-LD** so AI crawlers (GPTBot/PerplexityBot/
> ClaudeBot) and Google see content without running JS.

## Confirmed API (from node_modules)
- `import { ViteReactSSG } from 'vite-react-ssg'` — entry wrapper around a `routes` array.
- `import { Head, ClientOnly } from 'vite-react-ssg'` — `<Head>` wraps React Helmet for
  render-time `<head>` (SSR-collected); `<ClientOnly>{() => <X/>}</ClientOnly>` defers
  client-only trees.
- `RouteRecord` = react-router `RouteObject` + `{ entry?, getStaticPaths? }`.
- `ViteReactSSGOptions.includedRoutes(paths, routes) => string[]` — **global** hook to
  enumerate every concrete path to prerender (use this for the matrix + areas).

## Why the refactor is required
- App **prop-drills `onBookClick`** from `App` state into ~20 pages. The routes-array
  model renders route elements without App props → introduce a **booking context**.
- Schema is injected in **`useEffect` (8 files)** and meta via **`setPageMeta` (6 files)**.
  `useEffect` and `document.*` do **not** run during `renderToString` → migrate both to
  render-time `<Head>`.
- `Lenis` (SmoothScrollProvider) + framer-motion only touch `window` inside `useEffect`
  (SSR-tolerant), but wrap SmoothScroll in `<ClientOnly>` to be safe.

## Steps (each: implement → `vite-react-ssg build` → fix SSR errors → green → commit)

### 1. Booking context (removes prop-drilling)
- `src/booking/BookingProvider.tsx`: state + `<BookingModal>`, exposes `useBooking()`.
- `src/booking/BookedPage.tsx`: `({ Component }) => <Component onBookClick={useBooking()} />`.

### 2. Root layout + routes array
- `src/routes.tsx`: a `RootLayout` route (`HelmetProvider` is NOT needed — ViteReactSSG
  provides head context) wrapping `ScrollToTop`, `<ClientOnly>`→SmoothScroll, `BookingProvider`,
  `<Outlet/>`, `BackToTop`, `StickyCTA`. Children = every current route as
  `{ path, element: <BookedPage Component={Lazy} /> }`.

### 3. Entry
- Rewrite `src/main.tsx`:
  ```ts
  import { ViteReactSSG } from 'vite-react-ssg'
  import { routes } from './routes'
  export const createRoot = ViteReactSSG(
    { routes },
    undefined,
    { includedRoutes: () => allMatrixAndAreaPaths() },
  )
  ```
- `allMatrixAndAreaPaths()`: static routes + `matrixEligibilityReport(SUB_SERVICES, COMMUNITIES)`
  → `/services/{slug}/{community}` for **eligible** cells only + `getAllCommunitySlugs()` area
  paths + `/services/{slug}` per sub-service. The gate decides which matrix URLs exist.

### 4. Head migration (the real work — render-time, SSR-collected)
- Replace `MetaTags` (react-helmet-async) usage with `<Head>` from vite-react-ssg.
- Convert the **6 setPageMeta callers** (AreasHub, RegionPage, CommunityPage, ServiceLocation,
  + SEOHead) to render `<Head><title/><meta/><link rel=canonical/><meta robots/></Head>`.
- Convert the **8 useEffect JSON-LD injectors** (MatrixSEOSchema, AreasSEOSchema, Guarantee,
  FAQ, AggregateRatingSchema, AreasHub, RegionPage, JsonLd) to render
  `<Head><script type="application/ld+json">{JSON.stringify(schema)}</script></Head>`.
- Keep all values tokenized via MASTER_REMIX.

### 5. SSR safety sweep
- Wrap SmoothScroll in `<ClientOnly>`. Audit the 42 window/document-touching files for
  **module-level / render-time** access (not in useEffect/handlers) and guard with
  `typeof window !== 'undefined'` or move into effects.

### 6. Build script
- `package.json`: `"build": "vite-react-ssg build"`, keep `"build:spa": "vite build"` as fallback.
- `prebuild` (preflight) still runs.

### 7. Discovery layer (now trivial — paths already enumerated)
- Emit `public/sitemap.xml` from the same `allMatrixAndAreaPaths()` list (+ `<lastmod>`),
  reference it in `robots.txt`.
- `public/llms.txt` (tokenized at build): business summary + key pages + services + areas.
- `robots.txt`: add `Allow` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended,
  Amazonbot, cohere-ai.

### 8. Verify (ship gate)
- `vite-react-ssg build` green.
- `dist/services/<slug>/<community>/index.html` exists; **grep** it for the H1 text +
  `application/ld+json` — confirm present **without running JS**.
- Doorway self-audit on ≥3 sample pages.

## Rollback
All Phase 3 work is isolated on `geomatrix/phase-3-prerender`. If the SSG migration can't
reach green, abandon the branch — Phases 1–2 (matrix engine + page) remain intact on
`geomatrix/phase-1-foundations`, and the SPA build is unaffected.
