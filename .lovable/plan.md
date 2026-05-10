# Plan — Embed Homepage + Service Page Style Guide & author Cochrane Style Guide v2.0 (Royal-Mechanical-grade depth)

Backend knowledge-base only. No edits to live VeePo / Masters Detailing front end. Operates the **Brand Identity Architect** persona (Landor & Fitch / Wolff Olins method) over the existing Style Axis.

---

## 1. Embed the upload (verbatim, ours)

This `.md` is **a Cochrane Master Builders document.** It belongs inside the CMB strategy folder, not under `_external-references/`.

- Source mirror (verbatim, normalized — strips the WYSIWYG `<table>` wrappers but preserves all heading/bullet/copy text 1:1): `src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/homepage_service_page_style_guide_template_and_how_to.source.md`
- Partner wrapper: `src/master/knowledge/partner-documents/brands/cochrane-master-builders/strategy/homepage_service_page_style_guide_template_and_how_to.partner.md`
  - Anchors this doc as the **Homepage + Service Page legs** of the Style Axis (siblings to the Process Page leg already shipped).
  - Composes with: Wireframe (Structural Axis), Universal Copywriting Plan (Copy Axis), Master Style Guide v1.0, Process Page Sub-Style-Guide v1.0, `communities_master_v3` (Geographic Axis), v2.0 services/pricing, v4.0 ICP, v5.0 color, v6.0 temperament, v7.0 perf, v9.0 layout, v10.0 style.
  - Routes work to: Brand Identity Architect (new), Master Style Guide Architect, Master Copywriter, Template Architect, SEO Virtuoso + SEO FAQ, Performance Engineer, Mobile Wrapping persona, Navigation Architect, Footer Architect, Auditor, Mermaid Mapper.
  - Encodes the doc's 9-cluster cheat sheet, the 12 homepage blocks, the 12 service-page blocks, the 10-step bespoke-domain workflow, and the 13-point Service-Page QA + 10-point Homepage QA gates.

## 2. Brand Identity Architect — new cross-brand persona

`src/master/knowledge/source-documents/experience-prompts/brand-identity-architect-landor-wolff-olins.source.md` (verbatim embed of the user's pasted prompt block, including the "Experience & Operating System" preamble, the 9-step methodology, the conflict-resolution hierarchy, and the required 12-section "Brand Identity North Star — [Company]" output format).

`src/master/knowledge/partner-documents/experience-prompts/brand-identity-architect-landor-wolff-olins.partner.md` — operationalizes it for CMB:
- Conflict order: **Customer truth + category reality → founder truth → operational constraints → visual taste.**
- Hard refusals: no invented offerings/credentials/pricing/locations; no generic positioning; no "premium" without proof mechanics; one direction (no option lists); one Brand Spine artifact per brand.
- Output contract: the 12-section North Star Report, paired with a **Brand Truth Table** (Truth | Source | Implication) and a controlling **Brand Spine** (category stance / enemy / audience / promise / proof / personality / standards).
- Hand-off: Brand Identity Architect → Master Style Guide Architect → Master Copywriter → Template Architect → SEO + Performance → Auditor.
- Firewall: strictly Cochrane Master Builders scope; never edits VeePo / Masters Detailing front end.

## 3. Cochrane Master Builders Style Guide v2.0 — Royal-Mechanical-grade depth

The user pointed at `RoyalMechanical.com` as the depth bar. That project's pattern is:

- `src/docs/personas/` — 11 authority briefs (BRAND_IDENTITY, DESIGN_PHILOSOPHY, COPYWRITING_NARRATIVE, NAVIGATION_UX, FOOTER_ARCHITECTURE, FOOTER_BESPOKE_UX, IMAGE_SEO, SEO_FAQ, SCROLL_MOTION_UX, PERFORMANCE_ENGINEERING, PERFORMANCE_TARGETS).
- Runtime token authorities (`brand-identity.ts`, `colors.ts`, `typography.ts`, `spacing.ts`, `animations.ts`) + a live `/style-guide` page rendering them.

We mirror **the depth, not the runtime**. CMB lives only in the knowledge base — no React, no `/style-guide` route, no token TS files. We author a structurally-equivalent 11-document set under `partner-documents/brands/cochrane-master-builders/brand-identity/v2/`, each one is a deep authority brief with Pass/Fail audit checks and paste-ready Auditor greps.

### Files to create (all under `partner-documents/brands/cochrane-master-builders/brand-identity/v2/`)

1. `00_master_style_guide_v2_overview.partner.md` — index + how all 11 authorities compose; Brand Spine summary; conflict-resolution order; v1.0 → v2.0 migration notes (v2 supersedes v1; Process Page Sub-Style-Guide remains a child of v2).
2. `01_brand_identity_north_star.partner.md` — full 12-section Brand Identity North Star Report (Truth Table → Brand Spine → Positioning → Differentiation/Proof → Customer Identity Mirror → Story System → Messaging Pillars → Verbal Identity → Visual Direction → Governance → What Not To Do).
3. `02_design_philosophy.partner.md` — three-value decision filter (Old-School Accountability / Modern Clarity / Family Legacy), precision rituals, anti-decoration stance, RevealItem-equivalent timing tables.
4. `03_color_authority.partner.md` — full HSL token system (Heritage Navy, Warm White, Charcoal, Stone, Muted Green, Timber, Aged Brass) with semantic token map (`--bone`, `--stone-50/100/200/300/400`, `--graphite-100..900`, `--heritage-500/600/700`, `--timber-500`, `--brass-500`), accessibility contrast matrix (AAA body, AA large), per-cluster palette overrides table.
5. `04_typography_authority.partner.md` — Space Grotesk + Jost pairing, 9-step modular scale, line-height + letter-spacing tables, Numerals system (Space Grotesk 300 for prices/steps), banned typographic patterns (no all-caps body, no decorative scripts, no italic emphasis chains).
6. `05_spacing_grid_layout.partner.md` — 4/8/16/24/32/48/64/96/128 spacing scale, 12-col desktop / 4-col mobile grid, container widths, section padding rhythm (homepage 12 sections, service page 12 sections, process page 15 sections), whitespace minimums.
7. `06_components_authority.partner.md` — every block from §10 of the upload, expanded into component contracts: Hero, Cards, Buttons, Forms (multi-step + photo upload), Pricing Cards (ranges + drivers + assumptions), Accordions (`<details>` semantic), Proof Cards, Area Chips, Trust Bar, Service Finder, Mega-Menu (cluster-grouped, never flat 115-link list).
8. `07_motion_scroll_authority.partner.md` — duration/easing/delay-sequence tables, scroll-reveal recipe (`IntersectionObserver` + `transform/opacity` only), reduced-motion mandate, banned patterns (scroll-hijack, parallax on timelines, autoplay video above fold).
9. `08_imagery_photography.partner.md` — real materials / real homes / process details / hands working / warm natural light; banned: stock family photos, generic contractor truck shots, AI faces, glossy hero composites; per-cluster visual anchor table (roofline / tile detail / formwork / deck framing / cabinet joinery / duct diagram / landscape plan).
10. `09_voice_messaging_lexicon.partner.md` — voice formula (Plainspoken + Reassuring + Specific + Local + Action-Oriented), 5 messaging pillars (each with 10 headlines + 10 subheads + 10 CTAs), claims-allowed vs claims-banned list, banned-word grep extending the sitewide ban, 5–10 "You are our people if…" + 5–10 "Not for you if…" lines from the upload's H1 directions.
11. `10_seo_schema_local.partner.md` — Title/Meta patterns for Home + Service + Process + Areas pages, FAQPage / Service / LocalBusiness / BreadcrumbList JSON-LD blueprints, internal-link bundle, geographic-axis matrix join.
12. `11_performance_accessibility_governance.partner.md` — hard budget (LCP ≤ 2.0s desktop / 2.5s mobile, CLS ≤ 0.05, INP ≤ 200ms, JS ≤ 160 kB gz first-load), 18-item anti-pattern grep list, Lighthouse ≥ 95 publish gate, axe-core 0-critical gate, 12-question decision filter, paste-ready Auditor grep bundle, sitewide governance protocol (versioning, sign-off chain, change-log).

### Cross-cutting features in every v2 file
- Each section ends with a **Pass/Fail audit check.**
- Each file states what it inherits from / locks for child page-specific guides (Process v1.0 already exists; Homepage and Service Page sub-guides are referenced as future deliverables, not built now).
- Each file states its **service-cluster overlay** rules using the upload's §9 cheat-sheet table.
- No token, copy, or voice line is borrowed from any external reference (Royal Mechanical pattern = depth/structure inspiration only).

## 4. INDEX.md updates

- Add the new source.md + partner.md rows under Cochrane Strategy.
- Add the Brand Identity Architect persona row under Experience Prompts.
- Add a new **`### Brand Identity v2.0 (deep authority set)`** subsection under Cochrane Master Builders with all 12 v2 files.
- Mark the existing Master Style Guide v1.0 row as **superseded by v2.0** (kept for provenance).

## 5. `.lovable/plan.md` append

Single delivery note summarizing files created, persona added, and the v1.0 → v2.0 supersession.

---

## Technical Details

- All files are markdown / pdf in `src/master/knowledge/`. None are imported by Vite or referenced by any React route.
- The Process Page Sub-Style-Guide v1.0 is **re-parented** under MSG v2.0 in its index entry — its content does not change.
- Royal Mechanical's runtime token files (`src/lib/colors.ts`, etc.) and `/style-guide` page are studied only for **structural depth**. Zero CSS / TS / palette / voice copied.
- Brand Identity Architect persona pasted prompt is preserved verbatim in source.md; partner doc adds CMB-specific operating rules.

## Out of scope

- No live front-end edits.
- No actual `/style-guide` React route in this project.
- No runtime `brand-identity.ts` / `colors.ts` token files (knowledge-base lives in markdown only).
- No new image generation.
- No per-site (115 spin-off) Homepage or Service page implementations yet — only the v2 master authority set + the existing Process Page child.
