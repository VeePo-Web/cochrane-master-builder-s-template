# Non-Negotiable Guard Rails — "Every Site Must Pass These"

## Why this exists

The checklist already has ~200 items across 11 phases. But items can drift between P0/P1, get skipped under deadline pressure, or be marked "done" without proof. **Guard rails are different**: they are a small, named, immutable set of laws that EVERY remix must satisfy, every time, no exceptions. If a guard rail fails, the site is not allowed to ship — period. They are the constitution that sits above the checklist.

The four you already named are excellent. Below I expand to a full set of 18, grouped so it's obvious what each one protects. I've also designed how they get enforced so they actually bite instead of becoming wallpaper.

---

## The Guard Rails (proposed final set)

### A. Brand & Identity (4)

1. **Bespoke Brand Identity Derivation** — Every site MUST derive its own complete brand identity (palette, typography pair, motion signature, voice rules, tone-of-voice doc, photographic direction) from the master Cochrane Master Builders brand bible. No site ships using master tokens unmodified. The derivation is documented in a `brand/IDENTITY_DERIVATION.md` per site explaining what was inherited, what was bespoked, and why. *(Your rule #3.)*
2. **Bespoke Style Guide Live** — Every site MUST publish an internal `/style-guide` route (noindex) showing its own colors, type scale, spacing, components in every state, motion samples, and image direction. If `/style-guide` doesn't render, the site is not ready. *(Your rule #2.)*
3. **Zero Sister-Site Fingerprints** — Codebase scan MUST return zero references to any other trade's name, slug, accent, photography, or copy paragraphs. Anti-paraphrase audit (≤40% n-gram overlap with sister sites) must pass.
4. **Master Logo Slot Map Honored** — All logo surfaces use `<MasterLogo slot="..."/>` per `LOGO_SLOT_MAP.md`. Zero `<img src=".../cmb-...png">` direct references. Favicon + PWA + share pack regenerated for THIS trade.

### B. SEO Depth (4)

5. **Areas-We-Serve Excellence** — Every site MUST ship a deep, SEO-tailored Areas We Serve system: one indexable page per area from the area spreadsheet, each with bespoke 150+ word intro, area-specific proof, LocalBusiness schema with `areaServed`, breadcrumbs, and internal-link matrix back to relevant services. Templated/duplicated area pages = automatic fail. *(Your rule #1.)*
6. **Per-Page Title / Meta / JSON-LD Uniqueness** — Every indexable URL has a unique `<title>`, unique meta description, valid JSON-LD (Organization or LocalBusiness on home, Service on service pages, FAQPage where applicable, BreadcrumbList everywhere). No duplicates across the site or sister network.
7. **Crawl Hygiene** — Valid `sitemap.xml` listing every indexable URL, sane `robots.txt`, canonical URLs set, no orphan pages, internal-link matrix passes (every service ↔ every relevant area, every area ↔ home + parent service).
8. **Local Trust Schema Rendered** — NAP consistency audit green; LocalBusiness JSON-LD includes address, hours, phone, geo, areaServed; Google Business Profile claimed; Search Console verified before launch.

### C. Performance & Accessibility (3)

9. **Performance-First Budget (Mobile)** — Every site MUST hit a hard mobile budget on a mid-tier Android over 4G: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, total transferred weight ≤ 1.5MB on first paint, JS ≤ 200KB gzipped on initial route. Fail = no ship. *(Your rule #4.)*
10. **Modern Image Pipeline** — Every image is WebP/AVIF, properly sized, lazy-loaded below the fold, with explicit width/height to prevent CLS, descriptive alt text, and trade-specific filenames. No PNG/JPG hero images >250KB.
11. **WCAG 2.2 AA Across The Board** — Contrast matrix green for every token pair, focus-visible on every interactive element, keyboard-reachable booking flow, prefers-reduced-motion respected on every signature animation, semantic heading order, no color-only meaning.

### D. Conversion & Trust (3)

12. **Booking CTA Reachable In ≤1 Tap From Anywhere** — Booking modal opens from a sticky/persistent CTA on every page; tel: link present on mobile; service auto-prefills when launched from a service page; mobile time-to-book under 60s walked on a real device.
13. **Real Business Signals Rendered** — License #, insurance, WCB (where applicable), real address, real hours, founder bio, and warranty terms render site-wide (footer + dedicated pages). No placeholder copy. No fabricated certifications.
14. **Legal Pages Bespoke & Accurate** — Privacy policy, terms, cookie notice (if needed), warranty page, and accessibility statement are present, trade-specific, and reviewed. No template paragraphs from sister sites.

### E. Motion, Copy & Craft (2)

15. **Motion System Pinned + Reduced-Motion Fallback** — Easing tokens, duration ladder, and signature interactions are defined in `brand/MOTION_TOKENS.ts`; every signature animation has a measured `prefers-reduced-motion` fallback; 60fps on a mid-tier Android.
16. **Anti-Paraphrase + Readability Bands** — Site copy passes the n-gram overlap audit vs. all sister sites (≤40% overlap on any 100-word window) AND lands in the brand-prescribed Flesch readability band (60–75 unless persona dictates otherwise).

### F. Operational Safety (2)

17. **Plan-First Discipline Honored on Every `planDepth: "deep"` Item** — A written 11-section deep plan (per `PLAN_FIRST_DISCIPLINE.md`) exists for every deep-plan item before code lands. No retroactive plans.
18. **Pre-Launch Human Walkthrough + Post-Launch Monitoring Armed** — A human walks the full site on real desktop + real mobile before launch; uptime monitor, error monitor, analytics events, conversion goals, and CWV monitor are all live and verified the moment the DNS flips.

---

## Anything you missed

A few you didn't list that I'd argue are non-negotiable for this caliber of build:

- Performance budget with hard numbers (not just "fast")
- WCAG 2.2 AA accessibility (legal exposure + UX integrity)
- Anti-paraphrase audit with a numeric threshold (Google penalizes near-dup content across a sister network — this is the moat-killer if you skip it)
- Mobile time-to-book < 60s tested on a real device
- Schema/JSON-LD validity, not just presence
- Pre-launch human walkthrough on real hardware (not Lovable preview)
- Post-launch monitoring armed *before* DNS flip, not after

If any of these 18 feel optional to you, tell me and I'll move them down to "strong recommend" instead of "MUST". My position: all 18 stay as MUST.

---

## How guard rails actually get enforced (technical)

So they bite instead of becoming wallpaper:

### 1. New file: `src/master/guardrails.ts`

Defines the canonical list as a typed export:

```ts
export type GuardRailId =
  | "gr-bespoke-brand-derivation"
  | "gr-bespoke-style-guide-live"
  | "gr-zero-sister-fingerprints"
  | "gr-master-logo-slot-map"
  | "gr-areas-we-serve-excellence"
  | "gr-page-meta-jsonld-unique"
  | "gr-crawl-hygiene"
  | "gr-local-trust-schema"
  | "gr-performance-budget-mobile"
  | "gr-modern-image-pipeline"
  | "gr-wcag-aa"
  | "gr-booking-one-tap"
  | "gr-real-business-signals"
  | "gr-legal-pages-bespoke"
  | "gr-motion-system-pinned"
  | "gr-anti-paraphrase-readability"
  | "gr-plan-first-deep-items"
  | "gr-prelaunch-walk-postlaunch-monitor";

export interface GuardRail {
  id: GuardRailId;
  title: string;
  law: string;                  // one-sentence non-negotiable
  why: string;                  // what failure costs the brand
  proofRequired: string[];      // artifacts that prove it passes
  enforcedBy: CheckId[];        // which checklist items satisfy this
  blocking: true;               // always true — guard rails are blocking
  scanCommand?: string;         // optional ripgrep / script that fails CI
}

export const GUARD_RAILS: GuardRail[] = [ /* 18 entries */ ];
```

### 2. Wire to checklist

Add `guardRails?: GuardRailId[]` field to `CheckItem`. Every existing `P0` item gets tagged with the guard rail(s) it satisfies. This means: when you generate a remix report, you see *coverage* — "guard rail X is enforced by checklist items A, B, C" — and any guard rail with zero enforcing items lights up red.

### 3. New playbook: `playbooks/GUARD_RAILS.md`

Long-form law-by-law explanation, ranked above all other playbooks. AI assistants must read this BEFORE planning any remix work. `PLAN_FIRST_DISCIPLINE.md` gets one new mandatory section: "Guard Rail Compliance Statement — list every guard rail this plan touches and how it satisfies each."

### 4. New phase gate: `0.5-guardrails-armed`

Sits between Phase 0 (plan-first) and Phase 1 (intake). Two checklist items:

- `guardrails-acknowledged` — operator confirms they have read GUARD_RAILS.md for this remix.
- `guardrails-coverage-map-generated` — a per-trade `guardrails-coverage.md` is produced showing which checklist items satisfy each guard rail for THIS site.

### 5. Helper exports in `checklist.ts`

```ts
export function getGuardRailCoverage(): Record<GuardRailId, CheckId[]>;
export function getUnenforcedGuardRails(): GuardRailId[];   // should always be []
export function getBlockingFailures(items: ChecklistResult[]): GuardRail[];
```

Pure functions, no runtime side effects, ready for later UI.

### 6. Update `src/master/README.md`

Add a "Guard Rails" section at the top explaining the constitution model: guard rails sit above phases; phases sit above items; items execute the work that proves guard rails.

---

## Files this plan creates/edits

- **NEW** `src/master/guardrails.ts` — typed registry of all 18 guard rails.
- **NEW** `src/master/playbooks/GUARD_RAILS.md` — long-form, law-by-law guide; ranked above other playbooks.
- **EDIT** `src/master/checklist.ts` — add `guardRails?: GuardRailId[]` to `CheckItem`; add `0.5-guardrails-armed` to `ChecklistPhase` + `CHECKLIST_PHASE_META`; tag every relevant existing item with the guard rail(s) it satisfies; add helper functions; add the two new phase-0.5 checklist items.
- **EDIT** `src/master/playbooks/PLAN_FIRST_DISCIPLINE.md` — add mandatory "Guard Rail Compliance Statement" section to the 11-section plan template (becomes 12 sections).
- **EDIT** `src/master/README.md` — document the constitution model + how guard rails interact with phases.

## Out of scope this round

- No front-end UI for guard rails (no `/guardrails` page yet).
- No CI runner — `scanCommand` strings are stored but not auto-executed yet.
- No changes to existing playbooks beyond `PLAN_FIRST_DISCIPLINE.md` and `README.md`.

## Open question for you

Do you want guard rail #16 (anti-paraphrase + readability) to apply only to the network of sister Masters sites, or also against any other site you've ever published? The first is technically achievable today (we have the sister-site list). The second would require ingesting external corpora. Default in the plan: sister-site network only.

