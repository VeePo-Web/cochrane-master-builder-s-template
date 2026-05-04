## Plan — Embed "World-Class Performance Engineer" persona

New function-scoped category: **Performance & Speed**. The source is a 7-page React 18 + Vite performance playbook (Core Web Vitals, asset optimization, critical render path, caching, React concurrency, Vite-specific tuning, third-party hygiene, monitoring). The trailing directive locks it to **performance-only changes — never touch design**.

### Files to create

1. **`src/master/knowledge/source-documents/performance/react-vite-performance-engineer-persona.source.md`**
   - Verbatim, untouched copy of the parsed DOCX (all 11 sections + Conclusion + the all-caps "DO NOT CHANGE ANY DESIGN" closing directive).
   - Frontmatter only (name, category, status: partnered, source filename).

2. **`src/master/knowledge/partner-documents/performance/react-vite-performance-engineer-persona.partner.md`**
   - Full Calem Wood Detailing interpretation layer:
     - **Binding rules**: zero design/layout/motion/copy changes; LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1; performance budgets enforced; measure before optimizing.
     - **Brand-specific guards**: hero image (`hero-vehicle.jpg`) is preload-priority but its choreography (loading sequence, Ken Burns, parallax 130%/-15%) MUST NOT be altered to chase LCP. Cinematic motion (Framer Motion, GSAP-style reveals, cloth wipe, split-curtain) is sacrosanct — optimize via `will-change`, GPU compositing, `prefers-reduced-motion` fallbacks, never by removing or shortening animations.
     - **Asset rules mapped to brand**: AVIF/WebP for all macro-detailing photography; preload hero; lazy-load below-fold; CDN-friendly hashed filenames; font-display: swap on Space Grotesk + Jost; subset to used glyphs.
     - **React rules mapped**: `React.memo` on heavy section blocks; `useTransition` for filter/booking-step transitions; never memoize at the cost of motion smoothness; virtualize long lists if any appear.
     - **Vite rules mapped**: avoid barrel files in `src/components/*`; explicit `.tsx` imports; `server.warmup` for hero + booking modal modules; visualizer audit before each release.
     - **Booking modal**: singleton in `App.tsx` rule (existing memory) is performance-aligned — partner reaffirms it; pointer-events gating during AnimatePresence exit must stay deterministic.
     - **Decision triggers** (when to consult): "the site feels slow", "improve LCP/INP/CLS", "Lighthouse audit", "bundle is too big", "lazy-load X", "image optimization", "fonts are flashing", "scroll is janky", "First load is heavy", "preload hero", "code-split routes", "third-party script audit", "hydration cost", "RUM / Core Web Vitals".
     - **Conflict rule with design memories**: if a perf optimization would violate Hero Section Lock, Motion Philosophy, Cloth Wipe, Loading Sequence, Parallax Coverage Specs, or Booking Modal Architecture → **design memories win**; find a different perf path.
     - **Related docs**: links to Animations, Navigation, SEO Image personas, governance charter.
   - Practical examples (3–4): preloading hero, code-splitting the booking modal, optimizing the loading sequence without shortening it, third-party tracker audit.

3. **`src/master/knowledge/INDEX.md`** — append a new top-level category:
   - **Performance & Speed (`performance/`)** — function-scoped React 18 + Vite performance playbook. Hard rule: optimize without altering design or motion.
   - One row pointing to the new source file.

### What will NOT change
- Front-end code (zero React/CSS/component edits).
- Existing knowledge files.
- Memory index (no new core rules; design memories already cover the guardrails this partner doc references).
- `vite.config.ts`, build config, or any tooling.

### Decision-routing behavior after embed
Any future prompt about speed, LCP/INP/CLS, bundle size, lazy loading, image format, fonts, caching, hydration, or Lighthouse → consult the new partner doc, which then routes back to the canonical motion/hero/modal memories before proposing any change.