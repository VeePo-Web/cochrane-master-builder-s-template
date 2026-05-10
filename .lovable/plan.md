# Plan — Process Page Style Guide (embed + author + audit)

Backend / knowledge-base only. Extends the **Style Axis** with a page-specific sub-guide for the Process page. Style Architect + Master Copywriter + Auditor work together. No edits to live React, Tailwind, index.css, or VeePo preview.

---

## 1. Embed the upload (verbatim, ours)

This PDF is **a Cochrane Master Builders document**, not an external reference. It belongs inside the CMB strategy folder, not under `_external-references/`.

- Source PDF (binary): `src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/process_page_style_guide_template_and_service_specific_how_to.pdf`
- Markdown mirror (1:1, via `pdftotext -layout` for parity with prior strategy embeds): `src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/process_page_style_guide_template_and_service_specific_how_to.source.md`
- Partner-doc wrapper: `src/master/knowledge/partner-documents/brands/cochrane-master-builders/strategy/process_page_style_guide_template_and_service_specific_how_to.partner.md`
  - Anchors the doc as the **Process Page leg** of the Style Axis
  - Joins: Wireframe (Process step-section), Copy Plan (microcopy), `communities_master_v3` (areas-served), v6.0 temperament + v9.0 layout + v10.0 style guides
  - Cross-links to the Master Style Guide v1.0, Master Copywriter persona, Style Guide Architect persona, SEO Virtuoso, SEO FAQ, Premium Scroll persona, Mermaid Mapper, Auditor

## 2. Author the deeper, more premium Process Page Sub-Style-Guide v1.0

`src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_process_page_style_guide_v1.partner.md`

A full sub-style-guide that **inherits** every locked token from the Master Style Guide v1.0 (typography, color primitives, spacing, components, motion) and adds Process-page-specific specs. Sections (each ends with a Pass/Fail audit check):

1. Purpose & Anti-Gravity Principle
2. Brand Standard ("Old-school accountability made usable through modern-day clarity")
3. Master Section Order (15 sections from the source PDF)
4. Visual Direction (palette mapping into our HSL tokens; texture rules; banned imagery)
5. Typography rules for Process pages (H1/H2/labels, "Step 01", "Price Driver", "Home Protection Note")
6. Layout System (timeline shapes, asymmetric grids, mobile stepper)
7. Motion & Interaction (anti-flashy: clarity-unfolds, no parallax in timeline, reduced-motion mandatory)
8. Voice (Plainspoken + Reassuring + Specific + Local + Action-Oriented; banned-word grep mirrors Master Copywriter)
9. Section-by-section component specs (Trust Bar → Final CTA)
10. Service-Specific overlays (Custom Homes, Roofing, Bath/Kitchen/Interior, Basement, Concrete, Landscaping, Flooring, HVAC, Repairs)
11. Service Process Config schema (`serviceName`, `serviceSteps[]`, `priceDrivers[]`, `protectionNotes[]`, `microcopy{}`, `finalCTACopy`, `seoTitle`, `metaDescription`)
12. SEO template (title `Our [Service] Process In Cochrane | [Brand Name]`, meta description, FAQPage JSON-LD)
13. Cross-Site Consistency Matrix (process-page locked vs. variable across the 115 spin-offs)
14. Variable-Driven Theming knobs for service-specific palettes (concrete vs. landscaping vs. interior)
15. Brand Anchor Enforcement on Process pages (master line echo + "begins with a clear scope" paraphrase rule)
16. **Performance Audit (mandatory)** — see §3 below
17. Accessibility audit (keyboard accordions, visible focus, alt text on diagrams, AAA body contrast)
18. Governance + Process Page Token Quick Reference + Auditor checklist greps

## 3. Performance audit baked into the guide (this is the user's explicit ask)

Every Process page spec will be evaluated against a hard performance budget. The guide itself will list the budget AND the failure modes that violate it, so the Auditor can mechanically reject bad designs *before* they get built.

### Budget (inherits Master Style Guide §13, tightened for Process pages)

| Metric | Budget | Why tighter on Process |
|---|---|---|
| LCP | ≤ 1.8s mobile (vs. 2.0s default) | Process page is high-intent; latency kills trust |
| CLS | ≤ 0.02 | Timeline shifting is fatal for trust |
| INP | ≤ 150ms | Accordion FAQs must feel instant |
| TBT | ≤ 120ms | — |
| JS (first load) | ≤ 140kb gz | No heavy timeline libraries |
| Hero image | ≤ 180kb AVIF/WebP, responsive `srcset`, `fetchpriority="high"` | — |
| Fonts | 2 families × max 2 weights = 4 face files | — |
| Images below the fold | `loading="lazy"`, `decoding="async"` | — |
| Third-party JS | 0 (no chat widget, no analytics that block paint) | — |

### Performance audit checklist (Auditor will grep + Lighthouse)

A standing checklist of **anti-patterns that fail performance** on Process pages, with the fix:

- ❌ Stacking multiple Framer Motion `<motion>` components inside a long timeline → use CSS keyframes + `IntersectionObserver` reveal
- ❌ Loading icon libraries client-side for tiny step icons → inline SVG sprites
- ❌ Animating `width`/`height`/`top`/`left` (layout thrash) → only `transform` and `opacity`
- ❌ Long-running scroll-linked animations without `will-change` cleanup → only declare `will-change` for the active animation, remove on completion
- ❌ Accordion that mounts/unmounts heavy children → use CSS `[hidden]` + `aria-expanded`, keep DOM mounted
- ❌ Hero `<video>` autoplay > 1MB → static AVIF + Ken Burns CSS
- ❌ Service-specific palette swaps that re-fetch fonts → all variants live within the existing 4 font files
- ❌ FAQs without `details/summary` semantic fallback → SEO + perf + a11y win
- ❌ Background parallax on the timeline → fails Process Page Motion rule (§7)
- ❌ Importing `lottie` or 3D libraries → forbidden on Process pages
- ❌ Image `srcset` missing `sizes` → bandwidth waste
- ❌ JSON-LD inserted via JS instead of SSR → wrong for SEO + INP
- ❌ Auto-playing carousel of proof images → CLS + INP risk; use static grid
- ❌ Web fonts loading without `font-display: swap` → fail
- ❌ Unsized images/iframes (no width/height attrs) → CLS fail
- ❌ Heavy CSS-in-JS runtime (emotion runtime, etc.) on this page → use Tailwind tokens only
- ❌ Hydrating the entire page when only the FAQ + form need interactivity → island pattern; static-render the timeline

Each item is paired with a one-line **Auditor grep / Lighthouse check** so it can be checked mechanically.

## 4. Index + plan updates

- Update `INDEX.md`:
  - Add the source PDF + source.md rows under Cochrane Strategy (alongside the wireframe and copywriting plans)
  - Add the strategy partner row
  - Add the Process Page Sub-Style-Guide v1.0 row under Cochrane Brand Identity (right after the Master Style Guide v1.0)
- Append to `.lovable/plan.md` under "Style Axis" → "Process Page Sub-Guide v1.0 + performance audit"

## Technical Details

- All four new files are markdown / pdf in `src/master/knowledge/`. None are imported by Vite or referenced by any React route.
- The Process Page guide **inherits** from the Master Style Guide and only adds page-specific deltas — it does not redefine tokens.
- Performance audit checks are written so an LLM operator (Auditor mode) or a CI script can run them: each is either a `grep` over component code or a Lighthouse metric threshold.
- Style Architect + Master Copywriter co-author the sub-guide; Auditor runs the performance + accessibility + voice audits.

## Out of scope

- No edits to live components, `index.css`, `tailwind.config.ts`, or any VeePo front-end code.
- No actual Process page React implementation yet — only the guide that governs it.
- No per-site (115 spin-off) Process pages yet — only the master sub-guide and service-category overlays.
- No image generation.

---

## Style Axis — Process Page Sub-Guide v1.0 (delivered)

- Embedded source PDF + verbatim `.source.md` mirror under Cochrane strategy folder (this is OUR brand, not an external reference).
- Authored partner wrapper (`process_page_style_guide_template_and_service_specific_how_to.partner.md`) routing the work through Style Architect, Master Copywriter, SEO Virtuoso/FAQ, Performance Engineer, Mobile Wrapping, Premium Scroll, Mermaid Mapper, and Auditor.
- Authored **Process Page Sub-Style-Guide v1.0** (`cochrane_master_builders_process_page_style_guide_v1.partner.md`) as a child of Master Style Guide v1.0:
  - 18 sections, each gated by a Pass/Fail audit check.
  - 15-section master page order locked across all 115 spin-offs.
  - 9 service-category overlays (Roofing / Bath-Kitchen / Basement / Concrete / Decks / Flooring / HVAC / Commercial / Handyman).
  - `ProcessConfig` schema for typed per-site config files.
  - Hard performance budget (LCP ≤ 1.8s mobile, CLS ≤ 0.02, INP ≤ 150ms, JS ≤ 140 kB gz, Lighthouse ≥ 95).
  - 17 anti-pattern greps (motion stacking, layout-thrash animations, autoplay video, JSON-LD via JS, parallax on timeline, etc.) with paste-ready Auditor grep bundle.
  - Banned-word list + required-phrase list for voice enforcement.
  - 15-point QA gate from source §30, audit-ready.
- INDEX.md updated with all four new rows; no front-end code touched.
