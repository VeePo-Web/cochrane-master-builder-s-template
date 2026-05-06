## Goal
Remove every lingering Calem Wood / auto-detailing interpretation and re-author the affected internal documents so they reflect the real Cochrane Master Builders brand: family-legacy, custom-home / residential-building context, and the existing Cochrane brand materials already embedded in the project.

## What I found
There are two conflicting brand layers in the codebase:

1. Correct Cochrane canonical brand files already exist, for example:
- `src/config/brand.ts`
- `src/config/brand-identity.ts`
- `src/config/business.ts`
- `src/master/knowledge/partner-documents/brands/cochrane-master-builders/...`

2. A large set of generated/internal documents were renamed to “Cochrane Master Builders” but still carry the wrong business meaning:
- auto detailing
- vehicle owners
- ceramic coating / paint correction / clear coat metaphors
- booking a detail
- Calgary mobile detailing context

So the real problem is not just the word “Calem” anymore. It is a wrong interpretation layer that still describes the wrong business.

## Plan
### 1) Re-anchor all generated docs to the true Cochrane brand source of truth
Use the existing Cochrane canonical files as the authority:
- `src/config/brand.ts`
- `src/config/brand-identity.ts`
- `src/config/business.ts`
- Cochrane brand knowledge docs under `src/master/knowledge/partner-documents/brands/cochrane-master-builders/...`

Then rewrite every mistaken generated document so it maps to:
- practical residential finishing / custom home builder context where appropriate
- family legacy / generational stewardship language
- homeowners, families, subcontractors, communities, and build trust
- construction proof signals instead of car-detailing proof signals

### 2) Rewrite the internal config docs that still contain the wrong brand semantics
Re-author the affected internal reference/config files so they stop describing a mobile detailing business and instead match Cochrane Master Builders.

Priority files include:
- `src/config/brand-identity-northstar.ts`
- `src/config/business-overview.ts`
- `src/config/design-plan.ts`
- `src/config/discovery-questionnaire.ts`
- `src/config/questionnaire-answers.ts`
- `src/config/style-guide.ts`
- `src/config/open-questions-checklist.md`

And the persona layer:
- `src/config/personas/brand-identity-architect.ts`
- `src/config/personas/discovery-framework.ts`
- `src/config/personas/footer-architect.ts`
- `src/config/personas/frontend-engineer.ts`
- `src/config/personas/ideal-customer.ts`
- `src/config/personas/image-seo.ts`
- `src/config/personas/market-research.ts`
- `src/config/personas/master-visual.ts`
- `src/config/personas/narrative-copywriter.ts`
- `src/config/personas/nav-architect.ts`
- `src/config/personas/performance-engineer.ts`
- `src/config/personas/responsive-mobile.ts`
- `src/config/personas/scroll-motion.ts`
- `src/config/personas/seo-expert.ts`
- `src/config/personas/seo-faq.ts`
- `src/config/personas/strategic-narrative.ts`
- `src/config/personas/ui-footer.ts`
- `src/config/personas/ui-navigation.ts`
- `src/config/personas/ui-visual.ts`

### 3) Rewrite the partner knowledge docs that were interpreted through the wrong brand lens
Several partner docs correctly preserve methodology but apply the wrong active-brand content. I will keep the methodology and rewrite the Cochrane-specific overlays.

Priority files:
- `src/master/knowledge/partner-documents/mobile/mobile-wrapping-responsive-persona.partner.md`
- `src/master/knowledge/partner-documents/performance/react-vite-performance-engineer-persona.partner.md`
- `src/master/knowledge/partner-documents/navigation/navigation-architect-persona.partner.md`
- `src/master/knowledge/partner-documents/seo/image-seo-local-visibility-persona.partner.md`
- `src/master/knowledge/partner-documents/messaging/round-two-copywrite-storytelling-persona.partner.md`
- plus any other partner docs still using automotive/detailing metaphors

These will be rewritten so the active-brand overlays reference:
- homes, builds, finishes, trades, sites, materials, communities
- Cochrane / Calgary / Rocky View truthfully
- family legacy and “Foundations For Generations After Us” positioning
- real construction trust signals instead of automotive ones

### 4) Remove literal leftover old-brand references
Run a cleanup pass for direct leftover strings such as:
- `Calem`
- `Calem Wood`
- `calemwood`
- obvious old-detailing leftovers tied to the mistaken interpretation

This is a second pass after the semantic rewrites so I do not miss cases where the name was changed but the meaning stayed wrong.

### 5) Verify that the rewritten documents now agree with the real Cochrane brand
After rewriting, I will do a consistency audit to confirm:
- no Calem references remain
- no auto-detailing language remains in Cochrane internal docs unless intentionally preserved in immutable historical/source material
- internal personas and partner docs agree with the canonical Cochrane brand files
- the active knowledge layer no longer routes decisions through automotive/detailing assumptions

## Technical details
- I will preserve document structure, methodology, and role of each file.
- I will change the brand-specific interpretation only.
- I will not edit immutable source uploads unless they were mistakenly generated by us rather than provided as source truth.
- Where there is a conflict, these files will win:
  - `src/config/brand.ts`
  - `src/config/brand-identity.ts`
  - `src/config/business.ts`
  - `src/master/knowledge/partner-documents/brands/cochrane-master-builders/...`

## Expected result
The backend/internal knowledge system will stop thinking in “Calem Wood / auto detailing dressed up as Cochrane” terms and will instead consistently think in true Cochrane Master Builders brand terms.

If you approve, I’ll execute the rewrite pass across the affected docs and then run a final contamination audit.