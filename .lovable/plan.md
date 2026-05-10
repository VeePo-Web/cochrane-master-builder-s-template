## Goal

Embed the **Colours & Shapes Experience Philosophy v3** persona as the official **Landing Page Style Guide** for Cochrane Master Builders, then write a deep operating-manual partner doc that uses it to govern typography, spacing, and section-layout decisions for every future page.

## What gets created

All paths under `src/master/knowledge/...`.

### 1. Embed source (byte-for-byte copy via integrity gate)

- **From:** `source-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.source.md` (522 lines, already integrity-tracked)
- **To:** `source-documents/brands/cochrane-master-builders/brand-identity/landing-page-style-guide-persona.source.md`

Captured with `node scripts/source-docs/capture-source.mjs <target> <source>` so a fresh `.sha256` sidecar lands in `.integrity/manifest.json`. No edits, no rewrites — passes `verify:sources`.

### 2. Mirror as a CMB partner authority

- `partner-documents/brands/cochrane-master-builders/brand-identity/v2/12_landing_page_style_guide_persona.partner.md`

Frontmatter declares it as the v2.0 landing-page persona, lists upstream source (with hash), states scope (homepage + every service/process landing page), and defers to the higher-priority north star + voice docs on conflict.

### 3. Operating manual — the partner doc you asked for

- `partner-documents/brands/cochrane-master-builders/brand-identity/v2/13_landing_page_operating_manual.partner.md`

Deep, prescriptive (~600–900 lines). Sections:

1. **Purpose & priority** — where this sits in the v2 hierarchy (below 01 north star, above component-level decisions); conflict-resolution order.
2. **Typography authority extension** — full modular scale (clamp() values) per role: eyebrow, H1–H6, lede, body, caption, micro. Per-archetype line-height, tracking, max-measure (ch), weight rules. Decision table: "if section is X, headline uses Y." Bans (no all-caps body, no italics for emphasis, etc.).
3. **Spacing grid & rhythm** — 8pt base, section padding tokens (py-24/32/48/64), inter-block gaps, container max-widths per archetype, breakpoint behavior at 390 / 768 / 1024 / 1440 / 1920. Tables mapping persona "breath" cues → spacing tokens.
4. **Section layout playbook** — locked archetype catalog (Hero, Manifesto, Proof Strip, Grid-of-Three, Long-Read, Editorial Image Slab, Process Steps, Pricing, Testimonial Quiet-Block, FAQ, Closing CTA). Each: structure diagram (ASCII), required tokens, do/don't, copy slot contract, mobile collapse rule.
5. **Decision rules** — "If you must choose between density and breath, choose breath." 12–15 rules with worked examples drawn from the persona's color/shape vocabulary.
6. **Per-cluster overrides** — short hooks pointing at Roofing/Concrete/etc. cluster overlays from `03_color_authority`, so future cluster pages know where to deviate.
7. **Worked examples** — 3 fully-specified landing pages (a generic service hub, a process page, a service-area page) showing chosen tokens for every section.
8. **Pass/Fail audit checklist** — 25-item grep + visual checklist (e.g. "no font-size below 13px", "no section padding < py-24 desktop", "every H1 has eyebrow", "max-measure ≤ 72ch").
9. **Auditor grep bundle** — ripgrep snippets that catch violations in JSX/CSS.
10. **Sign-off chain** — extends the existing 8-step chain from `11_performance_accessibility_governance`.

### 4. Index updates

- `partner-documents/brands/cochrane-master-builders/brand-identity/v2/00_master_style_guide_v2_overview.partner.md` — add entries 12 + 13.
- `src/master/knowledge/INDEX.md` — register the new source + 2 partner docs under the CMB v2.0 authority set.
- `.lovable/plan.md` — append a short note recording this addition.

## What does NOT change

- No frontend/runtime code.
- No edits to the source persona text (integrity gate enforces this).
- No changes to existing v2 authority docs 01–11 beyond the overview index.
- No memory updates (this is documentation, not a new core rule).

## Verification

After file writes, run `node scripts/source-docs/validate-source-docs.mjs` and confirm zero hash mismatches, zero missing sidecars, zero orphans.

---

## 2026-05-10 — Landing Page Style Guide persona embedded

- Captured `colours-and-shapes-experience-philosophy.v3` as `brands/cochrane-master-builders/brand-identity/landing-page-style-guide-persona.source.md` (byte-for-byte, sha=eca6f5cae359, 45175 bytes, 522 lines).
- Added `12_landing_page_style_guide_persona.partner.md` (CMB authority wrapper).
- Added `13_landing_page_operating_manual.partner.md` (deep operating manual: clamp type scale, 8pt spacing tables, 11-archetype playbook, 15 decision rules, 25-item audit, 10-item grep bundle, L1–L3 sign-off gates).
- Updated `00_master_style_guide_v2_overview.partner.md` and `INDEX.md`.
- `node scripts/source-docs/validate-source-docs.mjs` → clean.
