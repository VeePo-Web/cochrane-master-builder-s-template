
# Cochrane Master Builders — Universal Template Wireframe (file 15)

Goal: lock a single, Apple-grade wireframe spine that every one of the 150 service-specific Cochrane sites will remix. Structure first, copy second, visuals third. No code changes in this pass — we only author the wireframe authority document and register it.

## What this plan delivers

A new partner authority document:

- `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/v2/15_universal_template_wireframe.partner.md`

Plus index/governance updates so it joins the v2 authority chain alongside files 12 (style guide), 13 (operating manual), and 14 (performance routing).

This is a **wireframe doc**, not code. It defines pages, sections, slots, variables, CTA map, schema map, and remix rules — so when we generate copy and then code per-service, every site is structurally identical and only the variables change.

## Page set (locked for every remix)

```text
/                    Home
/our-story           Brand story (founder + family legacy + master-builder ethos)
/why-we-love         Why we love {SERVICE}  ← remix variable
/services            Services index (catalogue of everything CMB does)
/services/{slug}     Service detail (one per offer in the spin-off)
/areas               Areas-we-serve SEO hub (index)
/areas/{community}   Per-community SEO page (one per community in communities_master_v3)
/pricing-process     Pricing transparency + how quoting works
/gallery             Proof / before-after
/reviews             Social proof
/about               Company, license, insurance, warranty, team
/contact             Contact + booking entry
/faq                 Master FAQ
/privacy /terms /warranty /accessibility   Legal/trust
/brand               Internal brand kit (noindex)
```

Booking is a **singleton modal** mounted in `App.tsx`, opened from any CTA on any page (matches current `BookingModal` architecture).

## Remix variables (the only things that change per site)

```text
{BRAND_NAME}         e.g. "Cochrane Tile Co." (sub-brand under CMB family)
{SERVICE}            e.g. "tiling", "flooring", "drywall"
{SERVICE_PLURAL}     "tile installations"
{SERVICE_VERB}       "tile", "install flooring"
{SERVICE_CATEGORY}   interior-finish | structural | exterior | mechanical | landscape
{HERO_IMAGE}         service-specific macro photograph
{COMMUNITIES[]}      pulled from communities_master_v3
{SUB_SERVICES[]}     catalogue rows for this brand
{PRICE_BANDS[]}      starter ranges per sub-service
{FAQS[]}             ≥20 service-specific
{PROOF[]}            before/after sets
{TRUST_NUMBERS}      license #, insurance #, years, warranty length
```

Every wireframe slot below is annotated with which variables fill it, so copy and code can be generated deterministically.

## Section spine per page

### Home (12 sections — locked order)
1. Hero — H1 with {SERVICE} + {AREA_PRIMARY}, sub, primary CTA (opens booking with `prefill.service={slug}`), phone, scroll cue
2. Trust bar — license, insurance, warranty, years, BBB/HomeStars
3. Problems we solve — 3–6 problem chips (remix from {SERVICE} pain map)
4. Core services overview — cards → `/services/{slug}`
5. Why we love {SERVICE} teaser → links to `/why-we-love`
6. Before/after preview (3 pairs from {PROOF})
7. Why choose us — 3–5 differentiators (Master Builder seal, family legacy, focused trade)
8. Simple process (3–6 steps)
9. Starter packages / offers — links to `/pricing-process`
10. Testimonials (3 from {REVIEWS})
11. FAQ top 5 → `/faq`
12. Final CTA band + Footer

### `/our-story` — Brand Story (8 sections)
1. Inner hero — "Built by a family of builders" (universal across all 150 sites; only the trade noun shifts)
2. Origin — founder narrative slot
3. Family legacy block — ties to Master Builders parent brand (uses Family_Legacy_Standard partner doc)
4. Why this trade — connects family story to {SERVICE}
5. Values (3) — pulled from CMB v2 voice authority
6. Team / craftsmen (optional slot, hide if empty)
7. Manifesto block (TradeManifesto component, remixed per {SERVICE})
8. CTA band + Footer

### `/why-we-love` — Why We Love {SERVICE} (7 sections)
1. Inner hero — "Why we love {SERVICE}" + editorial sub
2. The craft — what makes {SERVICE} satisfying (sensory / material / outcome)
3. Materials & tools we love — visual grid
4. Moments that matter — micro-stories (3 short)
5. What clients feel after — outcome-focused
6. Editorial quote pull
7. CTA band → booking + Footer

### `/services` (index) (5 sections)
1. Inner hero
2. Service catalogue grid (all {SUB_SERVICES})
3. "Not sure which?" decision aid
4. Trust strip
5. CTA + Footer

### `/services/{slug}` (11 sections — mirrors current drywall pages)
1. Hero with breadcrumb
2. Scope (included / not included)
3. Materials & timeline
4. Price band
5. Process for THIS service
6. Before/after for THIS service
7. FAQ × 5 (FAQPage JSON-LD)
8. Related services (2 siblings)
9. Areas served chips → `/areas/{community}`
10. Final CTA
11. Footer

### `/areas` — SEO Hub Index (6 sections)
1. Inner hero — "{SERVICE} across the Bow Valley & Calgary region"
2. Region map (static SVG, no JS) with {COMMUNITIES} pins
3. Community grid — alphabetical, grouped by region cluster
4. "How we serve outside our home base" trust note
5. LocalBusiness JSON-LD `areaServed: [all communities]`
6. CTA + Footer

### `/areas/{community}` — Per-Community Page (8 sections — UNIQUE intro is mandatory)
1. Hero — "{SERVICE} in {COMMUNITY}"
2. **80–150-word UNIQUE intro** referencing real {COMMUNITY} landmarks/neighborhoods (templated prompts in copy phase to enforce uniqueness)
3. Services we provide in {COMMUNITY} (chips)
4. Local proof — photo + testimonial if available (graceful empty state)
5. Drive-time / response-time line from base of operations
6. LocalBusiness JSON-LD with `areaServed: {COMMUNITY}`
7. Final CTA
8. Footer

### `/pricing-process`, `/gallery`, `/reviews`, `/about`, `/contact`, `/faq`
Section maps mirror existing CMB drywall pages (already locked in `SITE_STRUCTURE.pages`) — wireframe doc references them verbatim and tags each section with remix variables.

## Cross-page systems (defined once, applied everywhere)

- **Navigation** — 80px nav, ≤7 desktop items, mobile drawer with sticky CTA, sequence: Home / Services / Why We Love / Our Story / Areas / Pricing / Gallery / Reviews / About / Contact. Locked by file 13 + Navigation Architect persona.
- **Footer** — 3-tier (brand+CTA / 5-col link grid / NAP+license+VeePo credit+©). Footer ↔ scrolled nav must read as one composition.
- **Booking modal** — singleton in `App.tsx`. Every CTA passes `prefill: { service, source_page, source_section }`. Modal lifecycle rules from the Modal Lifecycle memory apply unchanged.
- **CTA entry-point map** — table with row per CTA: `page | section | button copy slot | prefill.service`. Phase 7 audits against this table.
- **Schema bundle** — Organization (sitewide), LocalBusiness (sitewide + per-area), Service (per service page), FAQPage (any page with FAQ), BreadcrumbList (level-2+).
- **Performance budget** — inherits file 14 (LCP <2.0s, CLS <0.02, JS ≤170KB gz, hero ≤140KB AVIF).
- **Accessibility budget** — WCAG 2.2 AA, 48px touch, visible focus, reduced-motion honored.

## Remix workflow (how the 150 sites get built from this)

```text
1. Pick {SERVICE} + sub-brand identity
2. Bind variables from communities_master_v3 + service catalogue
3. Generate copy section-by-section using file 15 slot prompts
4. Generate code by mapping slots → existing components
   (Hero, InnerHero, ServiceCard, BeforeAfterPair, FAQAccordion,
    PricingTable, CTABand, Footer, BookingModal, JsonLd)
5. Run preflight: nav coherence, CTA map, schema, perf, a11y
6. Family-resemblance audit — confirm visual + structural sibling match
```

## Out of scope (explicitly)

- No copy writing in this pass. Slot prompts only.
- No new React components. Wireframe maps to the existing component library.
- No edits to files 11, 12, 13, 14, or any source persona.
- No changes to `App.tsx`, routing, or `SITE_STRUCTURE` yet — those land when we begin the first remix.

## Files this plan will touch (when approved)

- **Create** `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/v2/15_universal_template_wireframe.partner.md`
- **Edit** `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/v2/00_master_style_guide_v2_overview.partner.md` — add row 15
- **Edit** `src/master/knowledge/INDEX.md` — register file 15 under brand identity v2
- **Edit** `.lovable/plan.md` — append milestone

## Open question before I write the doc

One decision affects the structure of file 15 — please confirm:

