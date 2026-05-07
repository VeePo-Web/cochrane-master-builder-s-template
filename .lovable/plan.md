
# Calem / Detailing Audit + Final Cochrane Master Builders Rebrand

## Calem audit result

`rg -i "calem"` across the entire repo (src, knowledge, supabase, public, index.html, scripts, configs) returns **0 matches**. The literal "Calem" / "Calem Wood" name has been fully removed in prior passes. Nothing left to purge by name.

## What is still contaminated (auto-detailing semantics, not the name)

The remaining problem is **business meaning**: copy and config still describe mobile car detailing instead of Cochrane Master Builders' luxury residential building/renovation work. Counts below are matches per file from `rg -ci`.

### Tier A — Config & narrative drivers (rewrite first; everything else inherits from these)
| File | "detailing" | car/vehicle/driver | auto jargon |
|---|---:|---:|---:|
| src/config/brand-identity-northstar.ts | 10 | 59 | 2 |
| src/config/design-plan.ts | 7 | 22 | 4 |
| src/config/business-overview.ts | 5 | 21 | 0 |
| src/config/style-guide.ts | 2 | 21 | 1 |
| src/config/discovery-questionnaire.ts | 7 | 44 | 4 |
| src/config/questionnaire-answers.ts | 6 | 16 | 6 |
| src/config/open-questions-checklist.md | 22 | — | 6 |
| src/config/strategic-narrative.ts | 0 | 6 | 0 |
| src/config/booking-requirements.ts | 0 | 3 | 0 |
| src/config/fear-dispel.ts | 0 | 0 | 1 |
| src/config/design-preferences.ts | 0 | 0 | 2 |

### Tier B — Personas (decision-layer; rewrite to construction context)
- src/config/personas/seo-faq.ts (7)
- src/config/personas/seo-expert.ts (7, +12 vehicle)
- src/config/personas/discovery-framework.ts (6, +21 vehicle)
- src/config/personas/scroll-motion.ts (4)
- src/config/personas/master-visual.ts (4)
- src/config/personas/ideal-customer.ts (2, +22 vehicle)
- src/config/personas/frontend-engineer.ts (2)
- src/config/personas/footer-architect.ts (2)
- src/config/personas/ui-visual.ts (1)
- src/config/personas/nav-architect.ts (1, +2 jargon)
- src/config/personas/brand-identity-architect.ts (1, +2 vehicle)
- src/config/personas/market-research.ts (0, +1 jargon residual)

### Tier C — User-facing pages (visible copy)
- src/pages/Services.tsx (6 detailing + 2 jargon)
- src/pages/Results.tsx (6)
- src/pages/ServiceArea.tsx (5)
- src/pages/FAQ.tsx (5 + 2 jargon)
- src/pages/Unsubscribe.tsx (1)
- src/components/detailing/BookingModal.tsx (2 detailing + 6 vehicle + 4 jargon — vehicle-step UI still present)
- src/components/detailing/HeroSection.tsx (1)
- src/components/detailing/InnerHero.tsx (1)

### Tier D — Knowledge base (interpretation overlays)
- src/master/knowledge/partner-documents/messaging/round-two-copywrite-storytelling-persona.partner.md (2)
- src/master/knowledge/partner-documents/seo/image-seo-local-visibility-persona.partner.md (1, +3 jargon)
- src/master/knowledge/partner-documents/animations/premium-scroll-animation-persona.partner.md (1)
- src/master/knowledge/source-documents/animations/premium-scroll-animation-persona.source.md (3 jargon)
- src/master/knowledge/source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md (1 + 1)
- src/master/knowledge/source-documents/governance/knowledge-system-charter.source.md (4 jargon)
- src/master/knowledge/partner-documents/governance/knowledge-system-charter.partner.md (1)
- src/master/knowledge/partner-documents/strategy/os-systems-audit-specialist.partner.md (1)
- src/master/knowledge/source-documents/strategy/os-systems-audit-specialist.source.md (1)
- src/master/knowledge/partner-documents/experience-prompts/master-design-persona-fantasy.partner.md (1)
- src/master/knowledge/partner-documents/navigation/navigation-architect-persona.partner.md (1)
- src/master/knowledge/partner-documents/brands/cochrane-master-builders/ux-design/1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.partner.md (1)
- src/master/knowledge/partner-documents/brands/cochrane-master-builders/personas-icp/1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.partner.md (1 vehicle)
- src/master/knowledge/source-documents/brands/cochrane-master-builders/seo-research/1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.md (4 vehicle)
- src/master/knowledge/source-documents/experience-prompts/anti-gravity-opening-engineer.source.md (2)
- src/master/knowledge/source-documents/experience-prompts/master-design-persona-fantasy.source.md (1)
- src/master/knowledge/source-documents/navigation/navigation-architect-persona.source.md (1)
- src/master/knowledge/source-documents/navigation/navigation-architect-persona.v3.source.md (1)
- src/master/knowledge/source-documents/brand-identity/brand-identity-architect.source.md (1)
- src/master/knowledge/GENERAL_INTELLIGENCE_INDEX.md (1)
- src/master/checklist.ts (3 jargon)
- src/master/playbooks/MOTION_AND_CRAFT.md (1)
- src/knowledge/source-documents/strategy/1.0-cochrane-master-builders-strategic-business-seo-ux-report.md (1 + 5 vehicle)
- knowledge/partner-documents/brand-identity/1.2.1_Family_Legacy_Standard_Partner.md (2 jargon)
- knowledge/source-documents/conversion/1.5.5_Volume_6_Conversion_CRM_Proof_Governance_System.md (3 vehicle)

### Tier E — Code-level residue
- src/lib/tokens/animations.ts (1 jargon comment)
- src/lib/booking-validation.ts (4 vehicle field/messages)
- src/test/booking-validation.test.ts (3 vehicle)
- src/components/detailing/* folder name (21 components) — internal-only, never user-visible

## What I will change

### 1. Semantic rewrite (Tiers A–D)
Replace auto-detailing meaning with luxury residential building meaning across every file above. Mapping:
- "detailing" / "auto detailing" / "mobile detailing" → "custom home building" / "renovation" / "interior finishing"
- "car" / "vehicle" / "driver" / "homeowner-as-driver" → "home" / "project" / "homeowner"
- "Get your car back" → "Build it like it's ours" (already used on hero)
- "The Full Reset" (when used as detailing flagship) → "The Custom Build"
- "paint correction" / "ceramic coating" / "clay bar" / "swirl marks" / "machine polish" → "drywall + paint finish" / "premium wall finish" / "millwork detail" / "site-finish blemishes" / "hand-sanded finish"
- lucide `Car` → `Home` / `Hammer` / `LayoutGrid`
- Page titles: "Calgary Mobile Detailing" → "Cochrane & Calgary Master Builder — Custom Homes & Renovations"
- Service area: confirm Cochrane + Calgary + Rocky View County framing
- `open-questions-checklist.md`: rewritten as a Cochrane Master Builders open-questions doc (brand name resolved, contact placeholders flagged, pricing model = project quote not $349 detail tier)

### 2. Booking flow alignment (Tier C/E)
- BookingModal.tsx: vehicle-type step → project-type step (Custom build / Renovation / Addition / Basement / Kitchen / Bath). Overline "Detailing" → "Master Builders".
- src/lib/booking-validation.ts + test: rename validation messages from "vehicle" → "project" (DB column `vehicle_type` preserved per prior decision; only UI/validation copy changes).

### 3. Knowledge base overlays (Tier D)
Single-pass rewrite of the ~20 partner/source docs listed above. Source docs that are sealed historical (Cochrane Master Builders source-of-truth PDFs already named correctly) are left untouched; only persona/interpretation overlays that still mention detailing get rewritten.

### 4. Folder name `src/components/detailing/`
**Leave as-is** (recommendation from previous plan stands). It is internal-only, never visible to users, and renaming touches every import in the app. If you want it renamed too, say so and I will do it as a separate dedicated pass.

### 5. Asset filenames
**Leave binaries as-is**, rewrite alt text and surrounding copy where any auto-themed names still leak into visible text. Hero image swap is locked (Hero Section Lock memory).

## Verification after the pass
- `rg -i "calem"` → 0 (already true; will re-confirm)
- `rg -i "detailing|paint correction|ceramic coat|swirl|clay bar|machine polish"` in `src/`, `knowledge/`, `supabase/`, `public/`, `index.html` → 0 matches **outside** the allowed `src/components/detailing/` folder path
- `rg -wi "car|cars|vehicle|vehicles|driver|drivers"` in `src/`, `knowledge/`, `supabase/`, `index.html` → 0 user-visible matches (DB column `vehicle_type` allowed; lucide icon `Car` removed or replaced)
- `vitest` passes (after updating booking-validation tests to project terminology)
- TypeScript build clean

## Risk + size
~50 files, ~1500–2500 lines of copy/config. No schema changes, no new dependencies, no migrations. One large execution pass, then verification grep + tests.

## Approve to proceed
Approving this plan switches me to build mode and I will execute the full rewrite in one pass, then run the verification grep and report a clean diff summary.
