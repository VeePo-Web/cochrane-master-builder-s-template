# Implementation Plan — The Service × Location Matrix

> Goal: make each remix trade site rank **#1 in Google and AI search** for every
> `"{sub-service} in {community}"` query across its whole service area.
> Executor: the `/geomatrix` skill (Programmatic Local SEO Matrix Architect).
> This plan is specific to *this* codebase (React 18 + Vite + react-helmet-async +
> the MASTER_REMIX token system).

## The opportunity (per site)
~5 `SUB_SERVICES` × ~120 `COMMUNITIES` ≈ **600 high-intent pages** per site;
×150 sites ≈ **90,000 ranking assets**. Today these URLs do not exist — only
`/services/:slug` (service-level) and `/areas-we-serve/:region/:community`
(trade-level) do. The intersection is the untapped, near-transactional surface.

## Cannibalization map (one keyword → one URL)
| Tier | URL | Primary keyword | Intent |
|---|---|---|---|
| Service | `/services/{slug}` | `{sub-service}` | what is it / do you offer it |
| Location | `/areas-we-serve/{region}/{community}` | `{trade} {community}` | the trade in my town |
| **Matrix (NEW)** | `/services/{slug}/{community}` | `{sub-service} {community}` | this exact service in my town (transactional) |

---

## Phase 0 — Confirm inputs (from this repo)
- `SubService` = `{ title, summary, range? }` in [remix-variables.ts](src/config/template/remix-variables.ts) — **no `slug`** (the addressability blocker).
- `COMMUNITIES: string[]` in MASTER_REMIX, but the areas pages already use richer community **objects** (`name, city, region, slug`) — see [CommunityPage.tsx](src/pages/CommunityPage.tsx). The matrix reuses that community dataset.
- Geo tokens now exist: `CITY, REGION, PROVINCE, PROVINCE_CODE, COUNTRY_CODE, LEGAL_FRAMEWORK*`.
- Meta via `react-helmet-async` ([MetaTags.tsx](src/components/template/MetaTags.tsx)); JSON-LD injected client-side (`useEffect`).
- **Render mode: pure client-side SPA — no prerender** (release blocker for AI crawlers).
- No `sitemap.xml`/generator, no `llms.txt`; `robots.txt` has no AI-agent rules.

---

## Phase 1 — Foundations

### 1A. Addressability (blocker)
- Add `slug: string` to `SubService`; add a `slugify()` helper in `src/lib/`.
- Backfill slugs for the 5 default sub-services; update ServiceDetail routing to resolve by slug.
- Add 301-style redirects (router-level) for any URL that changes.

### 1B. Per-community signal data + Scaled-Uniqueness Engine
- Extend the community dataset with the fields the **4-of-8 Gate** needs:
  `landmark, conditionNote, projectRef, permitNote, association, proximityNote, localReviewId, localFaqSeeds`.
- Build `src/lib/geomatrix/uniqueness.ts`: deterministic `hash(community+service)` → rotating intro template, condition note, proof selection, local FAQ, nearby-communities set. Same URL must render identically across builds.

### 1C. The 4-of-8 Gate (hard publish gate)
- `getLocalSignals({service, community}) → string[]`; `< 4` ⇒ **skip / noindex** with a logged reason.
- Emit an eligibility report: `intended N · eligible M · skipped N−M (reasons)`.

---

## Phase 2 — The matrix page

### 2A. Route
- `App.tsx`: add `<Route path="/services/:slug/:community" element={<ServiceLocation/>} />`.

### 2B. Page archetype — `src/pages/template/ServiceLocation.tsx`
Template tokens only (bone/paper/seam/charcoal/graphite/mist/forest/copper/ink-blueprint), no foreign hex, no double-padding:
- H1 `"{Sub-service} in {Community}, {City}"`; title (≤60) + meta (≤160) via Helmet; self-canonical.
- H2s: **Local context** (uniqueness engine) · **Scope / what's included** (links up to `/services/{slug}`) · **Local proof** (per-community review/project) · **Local FAQ** (2–4 Qs) · **Nearby** (sideways links) · **Local CTA** (`CTABand` + phone + reassurance strip).
- Visible "Last updated" date; one H1; semantic landmarks.

### 2C. Schema (build static in Phase 3)
`Service` + `LocalBusiness`(`areaServed` = this community via `GeoShape`/`containedInPlace`) + `FAQPage` (matches visible FAQ) + `BreadcrumbList` + `WebPage`. Fully tokenized.

### 2D. Internal linking pyramid
- Breadcrumb up → community hub + service hub.
- Sideways → 3–5 sibling sub-services in the same town; same sub-service in 3–5 nearest towns.
- Make CommunityPage + ServiceDetail link **down** into the matrix. Descriptive anchors, no orphans.

---

## Phase 3 — Infrastructure (what most teams skip)

### 3A. Prerendering / SSG (mandatory)
- Add build-time prerender so every matrix URL ships static HTML + JSON-LD.
- **Recommended:** `vite-react-ssg` (native Vite + react-router, minimal churn).
  Alternatives to weigh: `react-snap` (puppeteer crawl of the built SPA) · a custom
  `react-dom/server` prerender step in a `scripts/prerender.ts`.
- Move client `useEffect` JSON-LD into the prerendered output (matrix first, ideally all pages).
- This is the single change that converts "600 pages exist" → "600 pages rank + get cited."

### 3B. Discovery layer
- `scripts/generate-sitemap.ts` (run in `prebuild`): enumerate static routes + full matrix (eligible only) + area pages, with `<lastmod>`; reference it in `robots.txt`.
- `/llms.txt`: tokenized template (business summary, key pages, services, service areas).
- `public/robots.txt`: add explicit `Allow` for `GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, cohere-ai`.

---

## Phase 4 — Verify + Doorway Self-Audit (ship gate)
1. `npx tsc --noEmit` (0 errors) + `npx vite build` (green).
2. Fetch a built matrix URL from `dist/` → confirm H1 + body + `application/ld+json` **with JS disabled**.
3. `areaServed` resolves to the community; FAQ schema matches visible Q&A.
4. Doorway-Page Self-Audit on ≥3 samples: local-stranger · find-and-replace · intent · schema · crawl. Any fail ⇒ rework.

---

## Build order (dependency-sorted)
`slug → community signal data + uniqueness engine → 4-of-8 gate → route + page → static schema → prerender → sitemap/llms/robots → internal-link pyramid → doorway audit`

## Risks
- **Thin content** where signal data is sparse → the Gate must skip, not pad.
- **Prerender gap** → without it the matrix underperforms in AI search specifically.
- **Cannibalization** with CommunityPage/ServiceDetail → enforce the keyword→URL map.
- **Index bloat** → noindex Gate-failures; only eligible URLs enter the sitemap.

## New dependency note
Only the prerender step may justify a dependency (`vite-react-ssg` or `react-snap`).
Everything else (sitemap, llms.txt, slug, gate, uniqueness engine) is plain TS/Node — zero deps.
