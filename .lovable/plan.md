# Rebrand: Calem Wood → Cochrane Master Builders

## Goal
Remove every lingering "Calem Wood" / "Calem Wood Detailing" / mobile-detailing reference across the project and re-anchor those files to the **Cochrane Master Builders** brand identity (legacy-focused, traditional, uncompromised luxury home/drywall builder per `1.5_Brand_Identity_North_Star_Report_Partner.md` and `src/config/brand.ts`).

The active site (`drywall/*` components, pages, `src/config/brand.ts`, `src/config/design-preferences.ts`) is already Cochrane-branded — nothing visual on the live site changes. The rename targets stale legacy files left over from a prior detailing build.

## Scope (47 files identified via `rg -l -i "calem"`)

### A. Active backend / runtime references (must rewrite carefully)
1. `src/lib/booking-validation.ts`
2. `src/config/booking-requirements.ts`
3. `src/config/discovery-questionnaire.ts`
4. `src/config/brand-identity-northstar.ts`
5. `src/config/business-overview.ts`
6. `src/config/style-guide.ts`
7. `src/config/design-plan.ts`
8. `src/config/questionnaire-answers.ts`
9. `src/config/open-questions-checklist.md`
10. `src/pages/FAQ.tsx`
11. `src/pages/Unsubscribe.tsx`
12. `src/test/booking-validation.test.ts`
13. `supabase/functions/send-transactional-email/index.ts`

### B. Persona configs (`src/config/personas/*`) — 18 files
All persona files (strategic-narrative, ideal-customer, market-research, seo-expert, ui-footer, footer-architect, nav-architect, ui-navigation, ui-visual, master-visual, scroll-motion, responsive-mobile, frontend-engineer, performance-engineer, image-seo, seo-faq, narrative-copywriter, brand-identity-architect, discovery-framework, index.ts).

### C. Stale `detailing/` components (7 files)
`LoadingScreen.tsx`, `BookingModal.tsx`, `Navigation.tsx`, `FounderFinaleSection.tsx`, `Footer.tsx` — these belong to the old detailing build. Confirm whether any are still imported; if not, delete them. If imported, rewrite copy to Master Builders.

### D. Backend knowledge docs (8 partner/source markdown files under `src/master/knowledge/...`)
Replace business-context examples (mobile detailing → drywall/finishing/insulation) while preserving each persona's structural intent.

## Approach

1. **Sweep + categorize**: For each file, classify as (a) pure copy/string swap, (b) needs business-context rewrite (services, pricing, customer profile), or (c) delete if orphaned.
2. **Verify orphans**: `rg` for imports of each `detailing/*` component to confirm safe deletion.
3. **Rewrite business semantics** in category (b) files using Cochrane brand truths from `src/config/brand.ts`, `src/config/design-preferences.ts`, and `1.5_Brand_Identity_North_Star_Report_Partner.md`:
   - Service: drywall / insulation / painting / basement & garage finishing (NOT mobile auto detailing)
   - Customer: Cochrane/Calgary-area homeowners commissioning legacy-quality home finishing
   - Tone: timeless luxury, legacy, bespoke traditional — never "get your car back" / "$100 reset"
   - Service area: Cochrane, Alberta (+ surrounding)
4. **Preserve structure**: Keep each persona's section headings, decision-rule format, and exports unchanged so downstream references continue working.
5. **No visual/runtime changes** to the live drywall site. Active components under `src/components/drywall/*` and pages already on-brand are untouched.

## Out of scope
- Any change to `src/components/drywall/*`, `src/pages/Index.tsx`, hero, layout, motion, or color tokens.
- Adding new persona files (this is a rename/realignment pass only).

## Technical notes
- `src/config/personas/index.ts` re-exports — if any persona file is renamed (not just edited), update the barrel. Plan: keep filenames, only rewrite contents.
- `supabase/functions/send-transactional-email/index.ts`: swap brand strings (sender name, footer signature, support email copy). No schema or env changes.
- Tests: `src/test/booking-validation.test.ts` likely uses brand strings in assertions — update fixtures to match new copy.
- Run `bunx vitest run` after edits to confirm tests still pass.

## Deliverable
A single PR-equivalent change set: zero "Calem" matches remaining (`rg -i calem` returns empty), live site unchanged, backend knowledge/persona layer fully Cochrane Master Builders.
