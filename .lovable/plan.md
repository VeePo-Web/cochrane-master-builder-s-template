## Goal

Patch four gaps in `src/master/checklist.ts` so every remix is forced to:

1. **Always pull from the brand identity docs** — no improvising voice/colors/personas
2. **Always generate in-depth plans** before executing any item
3. **Hit world-class craft**: Apple-grade UX, Fantasy.co-grade visual & editorial, FROG-level micro-interactions
4. **Cover the gaps the current list is missing** (motion, interaction craft, accessibility-of-motion, content modeling, testimonials, trust artifacts, post-launch growth)

No phases removed. New phase **0 (Plan-First Discipline)** prepended + new items inserted into existing phases. New playbooks where needed.

## Brand sources the checklist must reference

The remix already has a deep stack of brand-truth docs that the current checklist never explicitly forces the AI to read:

- `src/master/brand/BRAND_BIBLE.md`
- `src/config/brand-identity.ts` + `brand-identity-northstar.ts`
- `src/config/style-guide.ts`, `design-plan.ts`, `design-preferences.ts`
- `src/config/personas/*` (19 persona files: brand-identity-architect, master-visual, scroll-motion, narrative-copywriter, nav-architect, footer-architect, ui-footer, image-seo, seo-expert, performance-engineer, responsive-mobile, strategic-narrative, ideal-customer, market-research, fear-dispel, discovery-framework, etc.)
- `src/config/business.ts`, `business-overview.ts`, `reviews.ts`, `discovery-questionnaire.ts`

Every plan-able item gets a new **`brandSources`** field listing which of these the AI must read before drafting its plan.

## Schema additions to `CheckItem`

```ts
brandSources?: string[];      // file paths the AI MUST read before planning this item
craftBenchmarks?: string[];   // e.g. ["apple.com/airpods-pro", "fantasy.co", "linear.app", "frog.co"]
planDepth?: "deep" | "standard"; // "deep" forces the AI to produce a multi-section plan before touching code
```

Existing items get backfilled where it matters most (Phase 4 copy, Phase 5 visual, Phase 7 conversion).

## New phase 0 — Plan-First Discipline (P0, prepended)

Forces the agent to plan before doing, every time.

- `plan-read-brand-bible` — read `BRAND_BIBLE.md` end-to-end before any work
- `plan-read-brand-identity-northstar` — read `brand-identity.ts` + `brand-identity-northstar.ts`
- `plan-load-relevant-personas` — load the persona files relevant to the current phase (e.g. Phase 4 → `narrative-copywriter` + `strategic-narrative` + `seo-faq`; Phase 5 → `master-visual` + `image-seo` + `scroll-motion`)
- `plan-read-trade-config` — read `trade.config.ts` for current trade truth
- `plan-deep-plan-before-execution` — for every `planDepth: "deep"` item, produce a written plan covering: goal, brand-truth refs, craft benchmarks, IA, content, motion, accessibility, performance, success criteria, risks. **No code until the plan is written.**
- `plan-craft-benchmarks-pinned` — pin benchmark URLs (Apple, Fantasy.co, Linear, FROG, Christopher Gawryletz, Stripe) for visual + motion reference per page

## New items added to existing phases

### Phase 2 — Brand
- `brand-identity-docs-pulled-into-trade` — every `trade.config.ts` field traceable to a brand source
- `brand-northstar-tagline-aligned` — tagline candidates pulled from `brand-identity-northstar.ts`
- `brand-style-guide-tokens-respected` — colors/spacing/radius come from `src/config/style-guide.ts`, not hand-typed

### Phase 3 — IA (gaps)
- `ia-content-model-defined` — every page typed (entities, fields, relations) before copy
- `ia-empty-state-and-loading-state-map` — every async/empty surface designed, not patched later
- `ia-error-state-map` — every error surface (network, validation, 4xx/5xx) designed
- `ia-thumb-zone-audit` — primary CTAs in mobile thumb-zone (Apple HIG / FROG mobile rule)

### Phase 4 — Copy (gaps)
- `copy-testimonials-real-with-name-city` — pulled from `reviews.ts`, never invented
- `copy-fear-dispel-block-applied` — uses `fear-dispel.ts` to address top 5 objections
- `copy-discovery-framework-followed` — story arc matches `discovery-framework.ts`
- `copy-power-words-from-northstar` — power words list audited against `brand-identity-northstar.ts`

### Phase 5 — Visual (Fantasy.co / Apple-grade craft)
- `visual-editorial-rhythm-applied` — varied section heights (40–55vh dividers per memory), generous padding, varied density
- `visual-apple-grade-hero-treatment` — hero spec: macro detail, controlled lighting, single subject, premium negative space; references Apple product page benchmarks
- `visual-fantasy-co-grade-detail-pass` — visual edge refinement, gradient overlays, premium type pairings, asymmetric grids
- `visual-cinematic-image-reveals` — bottom-to-top clip-path reveals on hero/section images (per master motion memory)
- `visual-parallax-coverage-correct` — 130% height + -15% top offset (per parallax memory) on every parallax slot
- `visual-typographic-rhythm-locked` — headline scale + body leading + measure (60–75ch) per master typography
- `visual-color-temperature-consistency` — per-trade palette warm/cool stays consistent across all imagery

### Phase 5b (NEW PHASE) — Motion & Interaction Craft (FROG-level)
Inserted between Visual and SEO. Currently the checklist has zero motion items beyond a single "respected" line.

- `motion-philosophy-doc-written` — per-trade motion principles (timing curves, durations, choreography) drafted from master `scroll-motion.ts` persona
- `motion-page-transition-implemented` — cloth-wipe / signature transition per master memory
- `motion-hover-microinteractions` — every interactive surface has a considered hover (lift, shimmer, color, cursor) — no default browser hovers
- `motion-scroll-choreography` — section reveals timed and staggered (stagger 60–120ms), not all-at-once
- `motion-cursor-aware-effects` — hero "showroom spotlight" / parallax-on-hover where master spec calls for it
- `motion-loading-sequence-bespoke` — 5-phase entry sequence (per master memory: enter → hold → suspend → exit → done)
- `motion-form-submission-signature` — booking submission has the signature animation (e.g. dirt-to-clean per master memory) — not a generic spinner
- `motion-prefers-reduced-motion-fallbacks` — every motion has a static or reduced equivalent (Apple a11y standard)
- `motion-button-tactile-feedback` — buttons feel pressed (transform-on-active, optional haptic on touch)
- `motion-modal-entry-and-exit` — booking modal opens with master easing (not default Radix), focus moves, exit reverses
- `motion-frame-budget-respected` — every animation 60fps on mid-tier mobile; transforms + opacity only, no layout-thrash
- `motion-easing-curves-pinned` — one easing system used site-wide (e.g. cubic-bezier(.16,1,.3,1) for entry, cubic-bezier(.7,0,.84,0) for exit), documented

### Phase 6 — SEO (small gaps)
- `seo-image-sitemap-generated` — for galleries / before-afters
- `seo-hreflang-if-multilingual` — skip if EN-only; flag if added later
- `seo-404-monitor-set-up` — soft-404 detection on Search Console

### Phase 7 — Conversion (interaction craft gaps)
- `conv-multi-step-form-progress-indicator` — booking modal shows step N of M with dot indicator (per master booking-modal memory)
- `conv-trust-elements-near-cta` — license/insurance/years/warranty visible within 200px of every primary CTA
- `conv-sms-fallback-considered` — SMS option for mobile-first leads (P1)
- `conv-callback-promise-rendered` — concrete time promise near form ("we'll call within 4 business hours")

### Phase 8 — Legal/Trust (gaps)
- `legal-real-testimonials-with-permission` — every testimonial has documented permission to use name + city
- `legal-photo-permission-trail` — every real photo of a customer's home has signed permission

### Phase 9 — Launch (post-launch growth gaps)
- `launch-uptime-monitor-configured` — Pingdom / UptimeRobot / similar
- `launch-error-monitoring-installed` — Sentry or similar for runtime errors
- `launch-review-request-flow-armed` — automated post-job review request (email/SMS) ready to fire
- `launch-content-cadence-plan` — monthly blog / case-study cadence documented; first 3 topics drafted
- `launch-first-30-day-seo-checkin` — schedule a 30-day post-launch SEO/CWV/conversion review

## New playbooks

- `MOTION_AND_CRAFT.md` — the new Phase 5b reference. Codifies easing curves, durations, stagger timings, tactile feedback patterns, page-transition recipe, modal animation spec, prefers-reduced-motion fallback rules, frame-budget rules. References Apple HIG, Fantasy.co case studies, Linear's interaction language, FROG's interaction principles, and the master `scroll-motion.ts` persona.
- `PLAN_FIRST_DISCIPLINE.md` — the new Phase 0 reference. Codifies the deep-plan template the AI must produce before any "deep" item: Goal · Brand truth refs · Craft benchmarks · IA · Content · Motion · A11y · Performance · Success criteria · Risks · Verification. Includes a worked example.

## Craft benchmark library (pinned in `MOTION_AND_CRAFT.md`)

- **Apple** — apple.com/airpods-pro, apple.com/iphone-15-pro (hero treatment, scroll choreography, type rhythm)
- **Fantasy.co** — fantasy.co (visual edge, editorial density, asymmetric craft)
- **Linear** — linear.app (interaction language, easing, modal entry)
- **FROG** — frog.co (interaction philosophy, micro-interactions)
- **Stripe** — stripe.com/payments (form craft, trust placement)
- **Christopher Gawryletz** — christophergawryletz.com (per existing brand memory — editorial luxury benchmark)

## Files changed

1. `src/master/checklist.ts` — extend `CheckItem` schema (3 new optional fields), add `ChecklistPhase` `"0-plan-first"` and `"5b-motion"`, add ~50 new items, backfill `brandSources` + `craftBenchmarks` on the highest-leverage existing items, add `MOTION_AND_CRAFT` + `PLAN_FIRST_DISCIPLINE` to `ChecklistPlaybook` union, update `CHECKLIST_PHASES` + `CHECKLIST_PHASE_META`
2. `src/master/playbooks/MOTION_AND_CRAFT.md` — new
3. `src/master/playbooks/PLAN_FIRST_DISCIPLINE.md` — new
4. `src/master/README.md` — phases section bumped from 9 to 11

## Outcome

Every remix item now: (a) names the brand sources to read, (b) names the craft benchmarks to study, (c) demands a deep plan before code on any non-trivial item, (d) covers the motion/interaction layer that's currently invisible in the checklist, and (e) carries through post-launch growth.
