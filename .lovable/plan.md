## Plan: Embed `8._cochrane_masters_all_115_theme_layout_ux_specs.xlsx` as the per-site Theme / Layout / Bespoke-UX-Components companion

Seventh file in the Cochrane family-of-sites paired set. Same 116-row spine joined on `Master Row` to v1.0 (SEO/positioning) · v2.0 (services/pricing) · v4.0 (ICP brain) · v5.0 (color/UX direction) · v6.0 (UX experience) · v7.0 (performance audit specs). This file supplies the **per-site theme layout suggestion + bespoke UX components + performance optimization** narrative — the page architecture / component recipe leg.

### Where it lives

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    8.0_cochrane_masters_all_115_theme_layout_ux_specs.xlsx        ← verbatim binary
    8.0_cochrane_masters_all_115_theme_layout_ux_specs.source.md   ← verbatim 1:1 markdown mirror
  partner-documents/brands/cochrane-master-builders/strategy/
    8.0_cochrane_masters_all_115_theme_layout_ux_specs.partner.md
```

(Filename normalized to `8.0_…` to match prior numbering.)

### Sheet inventory (1 sheet · 116 rows × 5 cols, captured verbatim)

`Theme Layout Specs` columns:

1. **Master Row** — join key.
2. **Recommended Domain** — must stay in sync across all seven files.
3. **Website / Brand** — display name.
4. **Cluster** — service cluster (Umbrella / Authority, etc.).
5. **Theme Layout Suggestion / Bespoke UX Components / Performance Optimization** — per-site narrative covering page architecture, signature bespoke components, and perf-aware build notes.

### Partner document — what it tells the system

- **Title:** Cochrane Masters — All-115 Theme Layout / Bespoke UX Components Companion.
- **Category:** brands → cochrane-master-builders → strategy → per-site **page architecture + bespoke component recipe + perf-aware build notes** (seventh file in the paired set).
- **Purpose:** Canonical per-site **theme layout + bespoke UX component recipe**. The "page architecture and signature components" leg of the remix heptapod (v1.0 SEO · v2.0 Services/Pricing · v4.0 ICP Brain · v5.0 Color/UX · v6.0 UX Experience · v7.0 Performance · **v8.0 Theme Layout / Components**).
- **What it influences:**
  - Per-site **page architecture** (section order, hero treatment, trust modules, conversion modules).
  - **Bespoke UX components** unique to that spin-off (e.g., service ecosystem map, calculators, configurators, comparators).
  - Whitespace, typographic hierarchy, navigation posture, and CTA placement.
  - **Build-time perf notes** that pair with v7.0 (lazy zones, image-heavy sections, deferred modules).
  - Cluster-level family resemblance (Umbrella / Authority sites share scaffolding cues; service-specific spin-offs vary).
- **Triggers — when to consult:** *theme, layout, page architecture, section order, section list, sitemap of page, hero layout, trust block, conversion block, bespoke component, custom component, signature module, calculator, configurator, comparator, ecosystem map, IA, white space, hierarchy, build recipe, "what sections does this site have," "what's the layout."*
- **Adaptation rules / firewall:**
  - Brand context = **Cochrane Master Builders** only. No automotive vocabulary firewall.
  - These are **directional layout recipes**, not finished component specs. Reconcile against Cochrane brand-identity (`1.2.1`, `1.2.2`), Cochrane UX (`1.3.1`), v5.0 color/UX, v6.0 experience temperament, and v7.0 perf budget before shipping any actual component.
  - **Per-site only** — never blend rows. Always look up by `Master Row`.
  - **Cluster-aware:** rows in the same `Cluster` may share scaffolding cues; differentiate via v4.0 ICP voice and v5.0/v6.0 mood + temperament.
  - **Join discipline:** any per-site work must reference the same `Master Row` across all seven files. Drift in `Recommended Domain` between any two = Sync Discrepancy.
  - **Backend intelligence only.** Embedding does not change any front-end output. VeePo / Masters Detailing front-end stays untouched and no Cochrane spin-off site exists in this codebase yet.
- **Mode-OS pairing:**
  - **Architect** — uses the row's layout recipe when scaffolding the spin-off's page architecture and bespoke component list.
  - **Mapper** — can render per-cluster page-architecture flows or component-inventory matrices.
  - **Auditor** — verifies built sites against (a) the row's stated section list / bespoke components and (b) v7.0 perf posture and locked design memories. Missing a stated bespoke component = **High** bug; layout that violates v6.0 temperament or v7.0 budget = **Critical**.
- **Dependencies:**
  - **Paired set (consult together):** v1.0 · v2.0 · v4.0 · v5.0 · v6.0 · v7.0 · **v8.0 (this file)**.
  - Cross-brand: Brand Identity Architect persona, Master Design persona (Fantasy.co), Anti-Gravity Opening Engineer, Navigation Architect, Footer Architect, Premium Scroll Animation, React/Vite Performance Engineer, Mobile Wrapping, the 3-mode OS personas.
  - Cochrane brand-identity: `1.2.1` Family Legacy Standard, `1.2.2` Foundations. Cochrane UX: `1.3.1`.
- **Guidance type:** Brand-global for Cochrane Master Builders only.
- **Practical examples:**
  - *"What sections should the Cochrane Construction Masters homepage have?"* → Pull row's layout recipe; reconcile with Navigation/Footer architects + v6.0 pacing.
  - *"What bespoke component is unique to the Basement Suite Masters site?"* → Read row's component note; confirm it doesn't violate v7.0 budget.
  - *"How should the umbrella authority hub differ from a service-specific spin-off?"* → Compare clusters; differentiate via v4.0 / v5.0 / v6.0.

### INDEX update

- Extend the family-of-sites callout to **seven paired files** (v1.0 · v2.0 · v4.0 · v5.0 · v6.0 · v7.0 · **v8.0 theme layout / bespoke UX components**). All seven joined on `Master Row`; drift = Sync Discrepancy.
- Add two rows for the new `.xlsx` (`source-only`) and `.source.md` (`partnered`).
- Keywords: *theme, layout, page architecture, section order, hero layout, trust block, conversion block, bespoke component, custom component, signature module, calculator, configurator, comparator, ecosystem map, IA, whitespace, hierarchy, build recipe, cluster scaffolding.*

### Out of scope

No frontend changes. No edits to the `.xlsx`. The `.source.md` is a 1:1 cell mirror — no synthesis. No actual layouts or components shipped from this embed; it only powers future architecture decisions.