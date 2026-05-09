## Plan: Embed `5._cochrane_masters_all_115_color_ux_suggestions.xlsx` as the per-site Color + UX Direction companion

Fourth file in the Cochrane family-of-sites paired set. Same 116-row spine, joined on `Master Row` to v1.0 (SEO/positioning), v2.0 (services/pricing), and v4.0 (ICP brain). This file supplies the **per-site color palette + UX rationale** — the visual mood for each spin-off site.

### Where it lives

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    5.0_cochrane_masters_all_115_color_ux_suggestions.xlsx        ← verbatim binary
    5.0_cochrane_masters_all_115_color_ux_suggestions.source.md   ← verbatim 1:1 markdown mirror
  partner-documents/brands/cochrane-master-builders/strategy/
    5.0_cochrane_masters_all_115_color_ux_suggestions.partner.md
```

(Filename normalized to `5.0_…` to match the v1.0 / v2.0 / v4.0 numbering convention.)

### Sheet inventory (1 sheet · 116 rows × 3 cols, captured verbatim)

`Color UX Suggestions` columns:

1. **Master Row** — join key to v1.0 / v2.0 / v4.0.
2. **Recommended Domain** — same `.ca` domain (must stay in sync across all four files).
3. **Color Description Suggestions & UX Rationale** — long-form per-site theme, color grouping, mood, and UX reasoning.

### Partner document — what it tells the system

- **Title:** Cochrane Masters — All-115 Color + UX Direction Companion.
- **Category:** brands → cochrane-master-builders → strategy → per-site visual direction (fourth file in the paired set).
- **Purpose:** Canonical per-site **palette + visual mood + UX rationale** for the Cochrane family of sites. The "color + feel" leg of the remix tetrapod (v1.0 SEO · v2.0 Services/Pricing · v4.0 ICP Brain · v5.0 Color/UX).
- **What it influences:**
  - Per-site color tokens (primary / secondary / surface / accent / text) on every spin-off.
  - Hero mood, section backgrounds, divider treatments.
  - Image art-direction: tonal grading, scene mood, material focus.
  - Button + CTA accent color choice (still bound by Cochrane-wide CTA rules).
  - Background imagery selection (heritage forest vs. concrete-gray vs. warm bone, etc.).
  - Section-divider gradients and texture choices.
- **Triggers (when AI should consult this):** any prompt about *color, palette, hex, tokens, theme, mood, vibe, accent, primary color, background, surface, dark/light treatment, art direction, tonal, gradient, texture, material feel, "what should this site look like", per-site styling.*
- **Adaptation rules / firewall:**
  - Brand context = **Cochrane Master Builders** only. **No** automotive vocabulary firewall (this is the construction brand, not VeePo / Masters).
  - These are **directional palette suggestions**, not finalized tokens. They must be reconciled against the cross-brand Cochrane brand-identity docs (`1.2.1` Family Legacy Standard, `1.2.2` Foundations) before being shipped as `tailwind.config.ts` / CSS variables.
  - Use the row's narrative as the **mood + grouping source**, not as ship-ready hex codes. Final tokens still pass through the Brand Identity Architect persona and the master design persona for QA.
  - **Per-site only** — never blend rows. Always look up by `Master Row`.
  - **Join discipline:** any per-site visual work must reference the same `Master Row` across v1.0 + v2.0 + v4.0 + v5.0. Drift in `Recommended Domain` = Sync Discrepancy.
  - This document is **backend intelligence only**. Embedding it must not change any front-end output on its own (no Cochrane spin-off sites currently exist in this codebase — VeePo / Masters Detailing front-end is untouched).
- **Mode-OS pairing:**
  - **Architect** uses the row's palette + mood when scaffolding tokens / theme variables for a new spin-off.
  - **Mapper** can render per-cluster palette affinity diagrams or palette-vs-archetype matrices.
  - **Auditor** pressure-tests generated visuals against (a) the row's color rationale (does the mood match?) and (b) the join across all four files. Mood/palette mismatch with the row's UX rationale = **Medium**–**High** bug.
- **Dependencies:**
  - v1.0 Master Plan, v2.0 Services & Pricing, v4.0 ICP Brain (paired set).
  - Cochrane brand-identity: `1.2.1` Family Legacy Standard, `1.2.2` Foundations report.
  - Cochrane UX: `1.3.1` Bespoke / Traditional UX Design Phase Report.
  - Cross-brand: Brand Identity Architect (v1 + v2), master design persona (Fantasy.co v1/v2), Colours & Shapes experience philosophy (v1, plus v2 firewalled craft layer), Image SEO / visual hierarchy persona, the 3-mode OS (Architect / Mapper / Auditor).
- **Guidance type:** Brand-global for Cochrane Master Builders only.
- **Practical examples:**
  - *"Generate the Tailwind palette for the Basement Suite Masters site."* → Pull that row's color grouping + UX rationale, reconcile against Cochrane brand-identity tokens, then propose final HSL tokens.
  - *"Pick a hero background mood for this site."* → Use the row's theme + mood; pair with v4.0 ICP narrative for emotional alignment.
  - *"Audit this site's color choices."* → Compare current tokens vs. the row's UX rationale; surface mismatches as Auditor findings.

### INDEX update

Update the existing **Strategy** table for Cochrane and the family-of-sites callout:

- Extend the callout to name **four paired files** joined on `Master Row` (v1.0 = SEO/positioning, v2.0 = services/pricing/compliance, v4.0 = ICP brain, **v5.0 = color + UX direction**). All four must be consulted together for any new spin-off site.
- Add two rows for the new `.xlsx` (`source-only`) and `.source.md` + partner (`partnered`), with keywords: *color, palette, hex, tokens, theme, mood, vibe, accent, primary color, background, surface, art direction, tonal, gradient, texture, material feel, per-site styling, visual direction.*

### Out of scope

No frontend changes. No edits to the `.xlsx`. The `.source.md` is a 1:1 cell mirror — no synthesis, no re-interpretation. No tokens are written or applied; this only powers future visual-direction decisions.