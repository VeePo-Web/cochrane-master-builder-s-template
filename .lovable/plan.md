# Deep Cochrane Master Builders Rebrand Audit

## Scope (from full-repo grep)

- **0 files** still contain the literal word "Calem" — name replacement is complete.
- **33 files** still contain "detailing".
- **47 files** still contain car / vehicle / driver / drivers as standalone words.
- **21 components** live under `src/components/detailing/` (folder name is auto-themed).
- **~7 image assets + 6 videos** have detailing-themed filenames referenced across the codebase.
- **78 knowledge docs** under `src/master/knowledge/` and `src/knowledge/` need an interpretation pass.

The contamination is no longer about the brand *name* — it is about the **business meaning** (auto detailing vs. luxury custom home building). This pass rewrites that meaning everywhere it still leaks.

## What gets changed

### 1. Config layer (highest priority — this drives every other persona)
Rewrite the auto-detailing semantics in:
- `src/config/business-overview.ts` — service offer ($100 detail, gas+travel) → custom build / renovation packages, project consultations
- `src/config/brand-identity-northstar.ts` — paint/coating language → finishing, millwork, stewardship
- `src/config/style-guide.ts` — FAQ entries, hero copy ("Get Your Car Back", "your car is next"), stat icons (`lucide Car`), example before/after captions
- `src/config/design-plan.ts` — H1s for About / Book / FAQ, "Calgary Mobile Detailing" page titles, "spinning car GIFs" prohibitions, "Daily driver / Work truck" framing
- `src/config/discovery-questionnaire.ts`, `src/config/questionnaire-answers.ts`, `src/config/open-questions-checklist.md`
- All remaining personas under `src/config/personas/` (brand-identity-architect, discovery-framework, footer-architect, frontend-engineer, ideal-customer, master-visual, nav-architect, scroll-motion, seo-expert, seo-faq, ui-visual)

### 2. Knowledge base (interpretation overlays)
Rewrite the partner/source documents that still describe detailing work:
- `src/master/knowledge/partner-documents/animations/premium-scroll-animation-persona.partner.md`
- `src/master/knowledge/partner-documents/messaging/round-two-copywrite-storytelling-persona.partner.md`
- `src/master/knowledge/partner-documents/seo/image-seo-local-visibility-persona.partner.md`
- `src/master/knowledge/source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md`
- `src/knowledge/source-documents/strategy/1.0-cochrane-master-builders-strategic-business-seo-ux-report.md` (and audit all 78 knowledge files with a single grep pass — flag any remaining detailing/car language for rewrite).

### 3. User-facing pages (will change visible copy)
- `src/pages/FAQ.tsx`, `src/pages/Results.tsx`, `src/pages/ServiceArea.tsx`, `src/pages/Services.tsx`, `src/pages/Unsubscribe.tsx` — page titles, SEO meta, body copy.
- 21 components under `src/components/detailing/` — copy-only; **no layout/motion/hero-image changes** (Hero Section Lock is preserved per memory).

### 4. Asset filenames + alt text
Auto-themed asset names that bleed into bundle paths and code reads:
- `src/assets/hero-vehicle.jpg` → keep file (hero is locked) but update alt text + variable names where they reference "vehicle"
- `before-/after-dashboard|exterior|interior` → keep files; update referencing alt text and variable names to renovation framing (kitchen / living room / exterior elevation before/after)
- `divider-coating.jpg`, `divider-microfiber.jpg`, `divider-mitt.jpg`, `services-equipment-flatlay.jpg`, `vendor-detail.jpg` → keep files; rewrite alt text and surrounding copy
- Video scrubs in `public/` (`founder-finale-scrub.mp4`, etc.) — names remain (binary), but captions/labels rewritten

I will **not** rename or regenerate image/video binaries in this pass — only metadata, alt text, and copy. Renaming binaries is a separate, riskier change that breaks bundler paths and would require a follow-up. I will list every asset whose *name* still implies detailing so you can decide.

### 5. Folder structure note
`src/components/detailing/` is a folder name imported across the app. Renaming it touches every import. **Recommend leaving the folder name as-is** (internal-only, never visible to users) and rewriting only the contents. If you want it renamed too, say so and I'll do it as a separate pass.

## What is explicitly preserved
- Hero arrival choreography + `hero-vehicle.jpg` swap (Hero Section Lock memory).
- All motion, layout, dark-editorial design tokens, copper accents, fonts.
- Booking modal architecture and lifecycle.
- The "CW" monogram is already used as Cochrane's mark — no logo change unless you ask.

## Verification after the pass
- `grep -ri "detailing\|paint correction\|ceramic coating\|swirl\|car wash\|\bBMW\b" src/ supabase/ public/` returns zero matches in copy/config/knowledge (folder name `src/components/detailing/` is the only allowed exception, called out above).
- `grep -riw "car\|cars\|vehicle\|vehicles\|driver\|drivers" src/` returns zero matches in user-visible copy. Allowed exceptions: design-token comments referencing existing assets, and lucide icon names (`Car`) only if explicitly retained — otherwise replaced with `Home`, `Hammer`, `LayoutGrid`, etc.
- Run `vitest` to confirm no test regressions beyond the two pre-existing legacy failures.

## Risk + size
This is a large semantic rewrite touching ~50 files and ~1500–2500 lines of copy. It will take one long execution pass. No new dependencies, no schema changes, no migrations.

## Approve to proceed
Approving this plan switches me into build mode and I will execute the full rewrite in one pass, then run the verification grep + tests and report a clean diff summary.