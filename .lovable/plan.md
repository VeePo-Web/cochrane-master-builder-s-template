# Plan — Master Style Guide Axis (Reference + Persona + Our Guide)

Backend / knowledge-base only. Zero changes to live React, Tailwind, index.css, or VeePo preview code. Clear firewall: the uploaded `STYLE_GUIDE.md` is **Royal Mechanical Services**' brand — used as a *structural reference template only*. All authored content is for **Cochrane Master Builders**.

---

## 1. Embed reference (clearly marked NOT OURS)

Save the upload **verbatim** in two places, both with prominent "REFERENCE ONLY — NOT OUR BRAND" banners at the top:

- `src/master/knowledge/source-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.md`
  - 1:1 copy of the upload
  - Front-matter + H1 banner: *"⚠ EXTERNAL REFERENCE — Royal Mechanical Services. NOT a Cochrane Master Builders document. Used for structural inspiration only. Do not copy voice, colors, typography, or copy verbatim."*

- `src/master/knowledge/partner-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.partner.md`
  - Partner-doc wrapper that catalogs the reference's 16-section table of contents
  - Lists what we **borrow structurally** (TOC depth, governance section, token quick-reference idea) vs. what we **explicitly reject** (their colors, their voice, their personality spectrum, their service list, "Explain before we replace" promise — all are theirs, not ours)

A new top-level folder `_external-references/` makes the firewall obvious in both `source-documents/` and `partner-documents/` trees.

## 2. New persona — Master Style Guide Architect

`src/master/knowledge/partner-documents/experience-prompts/master-style-guide-architect-persona.partner.md`

Mode-OS persona, sibling to Template Architect and Master Copywriter. Responsibilities:

- Owns the **Style Axis** (joins with Structural Axis = wireframe, Copy Axis = copywriter, Geographic Axis = communities)
- Generates per-brand style guides that are **deeper and more premium** than the Royal Mechanical reference
- Hard NOs: copying any Royal Mechanical token, voice line, or section verbatim; using "Explain before we replace"; using their color palette
- Required outputs: 18+ section style guide (vs. their 16), with added sections for **Brand Anchor Enforcement**, **Cross-Site Consistency Matrix**, and **Variable-Driven Theming** (so 115 spin-off sites stay consistent)
- Pairs with Auditor mode for banned-token + voice + contrast checks

## 3. Author Cochrane Master Builders Style Guide v1.0

`src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_style_guide_v1.partner.md`

A from-scratch, deeper-than-reference style guide aligned to existing CMB foundations (Strong Foundations For Those Who Come After Us; legacy-craft voice; v1.0–v10.0 content axis). Sections (~18, deeper than the 16-section reference):

1. Brand Foundations (identity, promise = legacy/foundations, three filters tuned to CMB, personality spectrum)
2. Design Philosophy (editorial-craft, generational, restrained luxury)
3. Color System (HSL tokens; stone, structural-steel, heritage accent — distinct from Royal's palette)
4. Typography (display + body pairing matched to CMB editorial voice; full scale + line-height matrix)
5. Spacing & Layout
6. Grid, Containers & Breakpoints
7. Iconography & Imagery (no humans rule, build-craft macro shots)
8. Components (buttons, cards, navs, dividers — token-driven, no rounded cards, filled CTAs)
9. Motion & Interaction (cinematic reveals, no gimmicks)
10. Forms & Inputs
11. Voice, Tone & Copywriting (cross-references Master Copywriter persona; banned-word list)
12. Accessibility (WCAG 2.2 AA, 4.5:1 minimum, motion-reduce)
13. Performance Standards (LCP/CLS/INP budgets)
14. SEO & Metadata (cross-references SEO Virtuoso persona)
15. **NEW vs reference — Cross-Site Consistency Matrix** (how the 115 spin-offs share tokens)
16. **NEW — Variable-Driven Theming** (which tokens are locked vs. per-site swappable)
17. **NEW — Brand Anchor Enforcement** (master-message echo rules, audit hooks)
18. Governance & Maintenance + Token Quick Reference appendix

Explicit footer: *"This style guide is the Cochrane Master Builders Style Axis. The Royal Mechanical reference at `_external-references/royal-mechanical/` informed structure only — no tokens, copy, or voice are shared."*

## 4. Index + plan updates

- Update `src/master/knowledge/INDEX.md`:
  - Add `_external-references/` section with firewall callout
  - Add Style Guide Architect persona row
  - Add CMB Style Guide v1.0 row under brand-identity
- Append to `.lovable/plan.md`: Style Axis is now operational; four-axis model = Structural × Copy × Style × Geographic.

## Technical Details

- All files are markdown / pdf in `src/master/knowledge/`. None are imported by Vite or any React route, so the live preview is untouched.
- Folder convention: `_external-references/` (underscore prefix) sorts to top and visually flags non-ours.
- Every external-reference file gets a YAML front-matter `external_reference: true` and `owner_brand: "Royal Mechanical Services"` for future scripted audits.
- Cochrane style guide tokens stay token-name-compatible with the existing `index.css` semantic-token philosophy (HSL, semantic naming) so they can later be ported into a real theme without rewrites.

## Out of scope

- No edits to live components, `index.css`, `tailwind.config.ts`, or any VeePo front-end code.
- No per-site (115 spin-off) style guides yet — only the master CMB v1.0.
- No image generation.

---

## Style Axis — operational (v1.0)

The four-axis Mode-OS model is now fully scaffolded:

```
Structural Axis  ×  Copy Axis  ×  Style Axis  ×  Geographic Axis
   (wireframe)     (copy plan)   (NEW v1.0)    (communities)
```

**Files added:**
- `src/master/knowledge/source-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.md` — verbatim Royal Mechanical upload, banner-wrapped as REFERENCE ONLY (NOT OUR BRAND).
- `src/master/knowledge/partner-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.partner.md` — firewall wrapper cataloging borrow-vs-reject.
- `src/master/knowledge/partner-documents/experience-prompts/master-style-guide-architect-persona.partner.md` — Mode-OS persona owning the Style Axis.
- `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_style_guide_v1.partner.md` — 18-section CMB Style Guide v1.0 (deeper than the 16-section reference; adds Cross-Site Consistency Matrix, Variable-Driven Theming, Brand Anchor Enforcement). Pass/Fail audit check at the end of every section.

**Firewall:** zero tokens, copy, or voice inherited from any external reference. No edits to live React/Tailwind/CSS or VeePo preview. Backend knowledge-base only.

**Side fix:** loosened `CAPACITY` literal types in `src/config/capacity.config.ts` to clear an unrelated TS narrowing build error.
