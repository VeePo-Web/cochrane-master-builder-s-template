## Plan: Embed `GENERAL_BRAND_IDENTITY_PROMPT-2.docx` as Brand Identity Architect v2

This document is an expanded v2 of the Brand Identity Architect persona already embedded as v1 (`brand-identity-architect.source.md`). It deepens the same operating system — Landor & Fitch / Wolff Olins-grade methodology, "50+ years experience" decision posture, structured Discovery → Synthesis → Decision flow, Brand Spine, Positioning, Messaging, Verbal & Visual Identity systems, plus a final required deliverable format ("Brand Identity North Star — [Company]"). Same pattern as the Colours & Shapes v2 embed: verbatim source + a partner doc that adapts the cross-brand persona for VeePo / Masters with explicit firewalls.

### Files to create

1. **`src/master/knowledge/source-documents/brand-identity/brand-identity-architect.v2.source.md`**
   - Verbatim markdown of the parsed `.docx` — preserve smart quotes, soft hyphens, page breaks, duplicated tokens (e.g., "Landor  Landor & Fitch", "market  market & competitor research"), and original wording exactly as parsed.
   - Frontmatter: status `partnered (expanded persona)`, immutability flag, backend-only, pointer to v1 + v2 partner pair as the routing surface.

2. **`src/master/knowledge/partner-documents/brand-identity/brand-identity-architect.v2.partner.md`**
   - Title: "Brand Identity Architect — v2 (Partner)"
   - Category: `Brand Identity / Persona / Operating System`
   - Status: `partnered — consulted in addition to v1`
   - Purpose: extract the **transferable operating-system layer** from v2 (rigor / restraint / repeatability; Discovery→Synthesis→Decision; Brand Spine = Truth + Audience + Promise + Proof + Personality + Standards; defensible "premium" with proof mechanics; coherence across touchpoints; taboo language + visual anti-patterns; one direction not options; Brand Truth Table; required final output format).
   - **VeePo / Masters adaptation rules (firewall):**
     - Translate "company / brand / [Company Name]" → Masters Concierge (luxury automotive detailing) — ICP and brand-truth pulled from existing brand-identity-northstar / style-guide modules.
     - Strip any wedding / unrelated category references when reasoning — confine to luxury automotive context.
     - "Premium proof mechanics" must be expressed through Masters' actual proof points (process steps, materials, outcomes), never through generic luxury clichés.
     - Visual identity direction must defer to existing tokens: Asphalt/Graphite + copper, Space Grotesk / Jost, no rounded cards, no human imagery, filled copper CTAs, editorial dividers — never override.
     - "Tagline territory (10–20 directions)" is a backend ideation tool only — no front-end copy changes from this embed.
   - Trigger keywords: "brand identity north star", "brand spine", "positioning statement", "verbal identity", "tone of voice", "taboo words", "messaging hierarchy", "proof points", "customer mantra", "brand truth table", "premium proof mechanics".
   - Routing relationship: v1 partner remains primary for cross-brand authoring methodology; v2 partner is consulted **in addition** when prompts touch the deeper operating-system mechanics (Brand Spine, Brand Truth Table, North Star deliverable format, defensible-premium proof mechanics, taboo-language rules, do/don't copy examples).
   - Out of scope: no front-end changes; no edits to v1 source/partner, `brand-identity-northstar.ts`, `style-guide.ts`, `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`, or `GENERAL_INTELLIGENCE_INDEX.md`.

### Files to edit

3. **`src/master/knowledge/INDEX.md`** — add a `↳` sub-row under the existing `brand-identity-architect.source.md` entry pointing at v2 source + partner, noting it as the expanded operating-system version with the consult-in-addition routing rule.

### Verification

- v1 brand-identity-architect source/partner files remain byte-identical.
- Colours & Shapes v1/v2/v3 files untouched.
- No front-end / TypeScript / decision-router files modified.
- 3 expected references to `brand-identity-architect.v2` found (source, partner, INDEX entry).
- Partner doc explicitly enumerates the VeePo/Masters adaptation rules and firewalled overrides.

### Out of scope

No edits to any decision router, brand-identity TypeScript modules, components, pages, styles, or any other front-end or routing infrastructure. No front-end output changes triggered by this embed.
