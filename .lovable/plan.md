# Master Template Frontend — Build Plan

Build the **Cochrane Master Builders Universal Template** as a living, remix-ready React frontend governed by files 11–15 of the v2 brand identity stack and the master style guide. Every page, every section, every molecule. No service-specific (drywall/tiling/etc.) language anywhere — only `{SERVICE}` slot tokens with neutral master copy that telegraphs how to remix.

Scope cut: **Areas We Serve page is deferred** (you'll add after). All other pages ship.

---

## 1. 40,000-ft Vision

A single, sacred template that:

1. Reads as a **legacy master-builder atelier**, not a contractor lead-gen page (per North Star 1.5).
2. Inherits the **Asphalt/Graphite + Copper** dark editorial system already in `index.css` / `tailwind.config.ts` — no new palette.
3. Uses **Space Grotesk display + Jost body**, light weights, massive negative space, no rounded cards, no human imagery.
4. Mounts a **singleton BookingModal** in `App.tsx` with deterministic `prefill` (already wired — we reuse it).
5. Treats every section as a **named slot** so 150 future remixes only swap `{SERVICE}`, `{HERO_IMAGE}`, `{PROOF}`, `{COMMUNITIES}`, `{PRICE_BANDS}`, `{FAQS}`, `{TRUST_NUMBERS}` — never structure.
6. Passes **File 14 CWV budgets** (LCP < 2.0s, CLS < 0.02, INP < 150ms) by default — lazy routes, AVIF heroes, no heavy libs added.

---

## 2. Page Set (build order)

| # | Route | Purpose | Sections |
|---|---|---|---|
| 1 | `/` Home | First impression + full funnel | 12 |
| 2 | `/brand-story` Brand Story | Legacy / family / craft origin | 8 |
| 3 | `/why-we-love` Why We Love {SERVICE} | Trade manifesto + obsession | 7 |
| 4 | `/services` Services hub | All trades grid | 5 |
| 5 | `/services/{slug}` Service detail | Per-trade deep dive | 11 |
| 6 | `/pricing` Pricing & Process | Transparent bands + steps | 7 |
| 7 | `/gallery` Gallery | Before/after editorial grid | 4 |
| 8 | `/reviews` Reviews | Proof engine | 5 |
| 9 | `/about` About | Founder + team + values | 7 |
| 10 | `/contact` Contact | Hours, map placeholder, CTA | 5 |
| 11 | `/privacy`, `/terms` Legal | Standard | 3 each |
| — | Booking modal | Singleton, opens from any CTA | — |
| — | 404 | On-brand miss page | 3 |

**Deferred:** `/areas`, `/areas/{community}` — left untouched.

---

## 3. Section Spines (all neutral copy with `{SERVICE}` slots)

**Home (12):** AmbientBackdrop hero → TrustBar (numbers) → BrandPromise editorial pair → ServicesGrid (5 cards) → BeforeAfterPair → TradeManifesto excerpt → ProcessSteps (4) → SocialProofEngine → GuaranteeBlock → PricingPreview → FAQAccordion (top 6) → CTABand.

**Brand Story (8):** InnerHero → FoundingChapter → FamilyLegacyTimeline → CraftPhilosophy editorial → ValuesGrid (4 pillars) → MasterBuilderSeal → FounderQuote → CTABand.

**Why We Love {SERVICE} (7):** InnerHero → ObsessionOpener → MaterialAndMethod (3-col) → DetailMacroPair → MasterCraftQuote → BeforeAfterPair → CTABand.

**Services hub (5):** InnerHero → ServicesGrid (all trades) → CapacitySignal → CrossTradeGuarantee → CTABand.

**Service detail (11):** InnerHero (per-service) → WhatYouGet → MaterialAndMethod → ProcessSteps → BeforeAfterPair → PricingTable → GuaranteeBlock → FAQAccordion → ObjectionSection → RelatedServices → CTABand.

**Pricing (7):** InnerHero → PricingPhilosophy → PriceBandsTable → ValueLadder → ProcessSteps → ObjectionSection → CTABand.

**Gallery (4):** InnerHero → ImageMosaic (editorial) → BeforeAfterStrip → CTABand.

**Reviews (5):** InnerHero → SocialProofEngine (full) → EditorialQuote rotation → TrustBar → CTABand.

**About (7):** InnerHero → FounderFinaleSection (reused) → TeamGrid → ValuesGrid → MasterBuilderSeal → CommunityRoots → CTABand.

**Contact (5):** InnerHero → ContactGrid (hours/phone/email/area) → BookingPromptBlock → MapPlaceholder → CTABand.

---

## 4. Component Strategy

**Reuse aggressively** from `src/components/drywall/*`, `src/components/detailing/*`, `src/components/master/*`. They already match the design system. Ninety percent of slots map 1:1.

**New shared template components** (in `src/components/template/`):
- `<TemplateLayout>` — wraps Navigation + Footer + page transition
- `<SectionFrame>` — vertical rhythm wrapper (py-32 / py-48 variants)
- `<ServicesGrid>` — pulls from `src/master/trades.ts`
- `<PriceBandsTable>` — variable-driven from `{PRICE_BANDS[]}`
- `<TrustNumbers>` — `{TRUST_NUMBERS}` consumer
- `<RemixSlot>` — dev-only outline showing which `{VARIABLE}` fills the slot when `?remix-debug=1`

**New pages** added to `src/pages/template/`:
`Home.tsx`, `BrandStory.tsx`, `WhyWeLoveService.tsx`, `Services.tsx`, `ServiceDetail.tsx`, `Pricing.tsx`, `Gallery.tsx`, `Reviews.tsx`, `About.tsx`, `Contact.tsx`, `Privacy.tsx`, `Terms.tsx`, `NotFound.tsx`.

Routes mounted under a new top-level prefix `/template/*` so the existing drywall site keeps working unchanged. Nav + footer in template scope point at `/template/...`. Once you approve, we can flip `/template` → `/` in a one-line swap.

---

## 5. Copy Rules (governs every section)

- All headlines neutral master voice: "Built for the families who'll inherit it." Never names a trade.
- Service-specific slots written as `{SERVICE_VERB}` placeholders inline visible in the rendered text (e.g. "Every {SERVICE_PLURAL} surface we touch…") so remix authors see exactly what to swap.
- Filtered through: 1.5 North Star (legacy luxury), 1.5.6 StoryBrand (hero=client, guide=us), 1.5.7 Trade Manifesto (obsession voice), 1.5.8 Hormozi/Brunson (offer stack on Pricing + CTABand), 1.4 ICP (mothers/grandfathers tone), file 12 persona, file 13 operating manual.
- No exclamation marks, no "Call now," no urgency-stunt copy.

---

## 6. Design-System Discipline

- **Zero** new color hex anywhere. Only existing tokens (asphalt, graphite, porcelain, copper, copper-glow, bone, paper).
- **Zero** rounded `card` components. Use borderless blocks + hairline copper/seam dividers.
- All section padding via existing `py-32 md:py-48` rhythm.
- Motion: reuse `ScrollReveal`, `RevealText`, `RevealImage`, `PageTransition`, `SectionDivider`. No new animation primitives.
- Typography hierarchy locked to `text-display-xl/lg/md`, `text-label`, `font-display`, `font-body` already in tailwind config.

---

## 7. Performance Discipline (per File 14)

- Every page is `lazy()` imported in `App.tsx`.
- Hero images: AVIF, ≤140KB, explicit width/height, `fetchPriority="high"` on first hero only.
- No new npm dependencies.
- Booking modal stays singleton — no per-page modal duplication.

---

## 8. What Ships

**New files (~15 pages + ~6 shared components):**
```
src/pages/template/{Home,BrandStory,WhyWeLoveService,Services,ServiceDetail,Pricing,Gallery,Reviews,About,Contact,Privacy,Terms,NotFound}.tsx
src/components/template/{TemplateLayout,SectionFrame,ServicesGrid,PriceBandsTable,TrustNumbers,RemixSlot}.tsx
src/config/template/{remix-variables.ts,template-copy.ts,template-routes.ts}
```

**Edited:**
- `src/App.tsx` — add lazy routes under `/template/*`
- `src/master/knowledge/INDEX.md` — register the live template scaffold
- `.lovable/plan.md` — log this build

**Untouched:** existing drywall pages, components, tokens, brand identity docs, areas/community routes.

---

## 9. Out of Scope (this loop)

- `/areas` and `/areas/{community}` pages (per your instruction).
- New images — we reuse existing assets and mark `{HERO_IMAGE}` slots in code comments where a remix author drops a new AVIF.
- Backend / CMS wiring — copy lives in `template-copy.ts` as a typed constants file (easy to swap to a CMS later).
- Flipping `/template` → `/` as the default site (one-line change after you sign off).

---

## 10. Acceptance

- Every route renders at `/template/*` with full section spine, neutral copy, and visible `{VARIABLE}` slot tokens where remix authors will substitute.
- Booking modal opens from every CTA on every page with correct `prefill.source`.
- Lighthouse on `/template/` mobile ≥ 95 perf, ≥ 100 a11y, ≥ 100 best-practices, LCP < 2.0s.
- `rg "drywall"` finds **zero** matches inside `src/pages/template/` and `src/components/template/`.
- `rg "{SERVICE}"` finds matches in every page (proves variable scaffolding is intact).

Approve and I'll build it end-to-end in one pass.
