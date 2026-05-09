## Plan: Embed `6._cochrane_masters_all_115_ux_experience.xlsx` as the per-site UX Experience companion

Fifth file in the Cochrane family-of-sites paired set. Same 116-row spine, joined on `Master Row` to v1.0 (SEO/positioning), v2.0 (services/pricing), v4.0 (ICP brain), and v5.0 (color/UX direction). This file supplies the **per-site UX experience theme + strategy** — how each spin-off should *feel* to use, beyond just what it looks like.

### Where it lives

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    6.0_cochrane_masters_all_115_ux_experience.xlsx        ← verbatim binary
    6.0_cochrane_masters_all_115_ux_experience.source.md   ← verbatim 1:1 markdown mirror
  partner-documents/brands/cochrane-master-builders/strategy/
    6.0_cochrane_masters_all_115_ux_experience.partner.md
```

(Filename normalized to `6.0_…` to match the v1.0 / v2.0 / v4.0 / v5.0 numbering.)

### Sheet inventory (1 sheet · 116 rows × 3 cols, captured verbatim)

`UX Experience` columns:

1. **Master Row** — join key to v1.0 / v2.0 / v4.0 / v5.0.
2. **Recommended Domain** — same `.ca` domain (must stay in sync across all five files).
3. **UX Experience For Each One** — per-site UX Experience Theme + Experience Strategy narrative (mood of interaction, pacing, motion temperament, trust-building rhythm).

### Partner document — what it tells the system

- **Title:** Cochrane Masters — All-115 UX Experience Companion.
- **Category:** brands → cochrane-master-builders → strategy → per-site UX experience direction (fifth file in the paired set).
- **Purpose:** Canonical per-site **UX experience theme + strategy** for the Cochrane family. The "interaction temperament" leg of the remix pentapod (v1.0 SEO · v2.0 Services/Pricing · v4.0 ICP Brain · v5.0 Color/UX · **v6.0 UX Experience**). Distinct from v5.0: v5.0 is *what it looks like*, v6.0 is *how it behaves and feels under the cursor*.
- **What it influences:**
  - Page rhythm and pacing (how fast sections reveal, how dense or breathy the IA is).
  - Motion temperament (calm-control vs. confident-craft vs. quiet-authority, etc.).
  - Section ordering and emotional arc (where to place trust, proof, friction-reducers).
  - Hover/scroll/transition character — easing curves, durations, restraint level.
  - Density of content per fold; whether to lean into negative space or proof density.
  - Form behavior tone (gentle nudges vs. crisp directness).
  - Loading / empty / success state personality.
- **Triggers (when AI should consult this):** any prompt about *UX, experience, feel, vibe, pacing, rhythm, motion temperament, interaction style, scroll behavior, hover personality, transitions, micro-interactions, density, breathing room, section ordering, emotional arc, trust pacing, "how should this site feel."*
- **Adaptation rules / firewall:**
  - Brand context = **Cochrane Master Builders** only. **No** automotive vocabulary firewall.
  - These are **directional UX themes**, not finished motion specs. They must be reconciled against the cross-brand Cochrane brand-identity + UX docs (`1.2.1` Family Legacy Standard, `1.2.2` Foundations, `1.3.1` Bespoke / Traditional UX Design Phase Report) and the cross-brand motion / scroll-craftsperson personas before being shipped as actual easings, durations, or component behaviors.
  - **v5.0 vs. v6.0 split:** v5.0 = palette + visual mood; v6.0 = interaction temperament + experience pacing. Use both together for any new spin-off; do not let one silently override the other.
  - **Per-site only** — never blend rows. Always look up by `Master Row` and stay inside it.
  - **Join discipline:** any per-site UX work must reference the same `Master Row` across v1.0 + v2.0 + v4.0 + v5.0 + v6.0. Drift in `Recommended Domain` between any of the five = Sync Discrepancy.
  - This document is **backend intelligence only**. Embedding it must not change any front-end output on its own — VeePo / Masters Detailing front-end stays untouched and no Cochrane spin-off sites currently exist in this codebase.
- **Mode-OS pairing:**
  - **Architect** — uses the row's experience theme + strategy when scaffolding the IA, section order, and motion spec for a new spin-off.
  - **Mapper** — can render per-cluster experience-temperament matrices (e.g., calm-control vs. confident-craft) or per-site emotional-journey flows.
  - **Auditor** — pressure-tests generated UX against (a) the row's experience theme (does the page actually *feel* like this?) and (b) the join across all five files. Temperament mismatch with the row's UX strategy = **Medium**–**High** bug.
- **Dependencies:**
  - v1.0 Master Plan, v2.0 Services & Pricing, v4.0 ICP Brain, v5.0 Color + UX Direction (paired set).
  - Cochrane brand-identity: `1.2.1` Family Legacy Standard, `1.2.2` Foundations.
  - Cochrane UX: `1.3.1` Bespoke / Traditional UX Design Phase Report.
  - Cross-brand: master design persona (Fantasy.co v1/v2), Anti-Gravity Opening Engineer (v1/v2), Premium Scroll Animation persona, Brand Identity Architect (v1/v2), Colours & Shapes experience philosophy, Navigation Architect, Footer Architect, Mobile Wrapping persona, Performance Engineer, the 3-mode OS personas.
- **Guidance type:** Brand-global for Cochrane Master Builders only.
- **Practical examples:**
  - *"Design the section order + motion temperament for the Basement Suite Masters site."* → Pull row's experience theme + strategy; pair with v4.0 ICP narrative for emotional arc; route motion specifics through the scroll-animation persona.
  - *"Should this site feel dense or breathy?"* → The row's Experience Strategy answers density + pacing.
  - *"Audit this spin-off's UX feel."* → Compare current pacing/motion vs. the row's experience strategy; surface mismatches as Auditor findings.
  - *"What should the form-submit success state feel like?"* → Use the row's temperament (e.g., quiet-authority → understated confirmation, no confetti).

### INDEX update

Update the existing **Strategy** table for Cochrane and the family-of-sites callout:

- Extend the callout to name **five paired files** joined on `Master Row` (v1.0 SEO/positioning · v2.0 services/pricing/compliance · v4.0 ICP brain · v5.0 color + UX direction · **v6.0 UX experience theme + strategy**). All five must be consulted together for any new spin-off site.
- Add two rows for the new `.xlsx` (`source-only`) and `.source.md` + partner (`partnered`), with keywords: *UX, experience, feel, vibe, pacing, rhythm, motion temperament, interaction style, scroll behavior, hover personality, transitions, micro-interactions, density, breathing room, section ordering, emotional arc, trust pacing, calm control, confident craft, quiet authority, "how should this site feel".*

### Out of scope

No frontend changes. No edits to the `.xlsx`. The `.source.md` is a 1:1 cell mirror — no synthesis, no re-interpretation. No motion specs or component behaviors are shipped from this embed; it only powers future UX-direction decisions.