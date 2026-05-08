## Plan: Embed `GENERAL_ANTI_GRAVITY_OPENING_PROMPT-2.docx` as Anti-Gravity Opening Engineer v2

This document is an expanded v2 of the Anti-Gravity Opening / cinematic intro engineer persona already embedded as v1 (`anti-gravity-opening-engineer.source.md`). Same embed pattern used for the prior v2 personas (master-design-persona, brand-identity-architect, colours-and-shapes): verbatim source + a partner doc that maps the expanded methodology onto Masters / VeePo with explicit firewalls and routing rules.

### Files to create

1. **`src/master/knowledge/source-documents/experience-prompts/anti-gravity-opening-engineer.v2.source.md`**
   - Full verbatim markdown of the parsed `.docx` — preserve smart quotes, soft hyphens, page breaks, duplicated tokens, and original wording exactly as parsed.
   - Frontmatter: status `partnered (expanded persona)`, immutable, backend-only, pointer to v1 + v2 partner pair as routing surface.

2. **`src/master/knowledge/partner-documents/experience-prompts/anti-gravity-opening-engineer.v2.partner.md`**
   - Title: "Anti-Gravity Opening Engineer — v2 (Partner)"
   - Category: `Experience Prompts / Persona / Cinematic Hero & First-Scroll Choreography`
   - Status: `partnered — consulted IN ADDITION to v1`
   - Purpose: extract the **transferable craft layer** from v2 (cinematic opening philosophy, weight/anti-gravity choreography, scroll-triggered reveals, perceived-performance + accessibility discipline, decision filters for hero/loading/first-scroll moments).
   - **VeePo / Masters adaptation rules (firewall):**
     - All choreography proposals must defer to the locked **Hero Section Lock**, **Loading Sequence**, **Cloth Wipe Transition**, **Motion Philosophy**, **Hero Interactive Shine**, and **Parallax Coverage Specs** memories. Never override.
     - Brand palette/typography/imagery rules from existing brand identity always win (Asphalt/Graphite + copper, Space Grotesk/Jost, no human imagery, no rounded cards, filled copper CTAs only).
     - Strip any wedding / unrelated category illustrations when reasoning — confine to luxury automotive context.
     - Honor `prefers-reduced-motion` and the project's mobile constraints (390px, 92dvh, safe-area).
     - This embed is decision-shaping only — it does NOT authorize edits to hero, loading, or transition components.
   - Trigger keywords: "hero section", "opening", "first scroll", "intro animation", "loading sequence", "cinematic reveal", "anti-gravity", "weight", "split-curtain", "ken burns", "parallax", "scroll choreography", "first impression".
   - Routing relationship: v1 partner remains primary; v2 partner is consulted **in addition** when prompts touch the deeper operating-system mechanics introduced or expanded in v2.
   - Out of scope: no front-end changes; no edits to v1 source/partner, motion/loading/hero components, or any decision-router/brand-identity TS modules.

### Files to edit

3. **`src/master/knowledge/INDEX.md`** — add a `↳` sub-row under the v1 `anti-gravity-opening-engineer.source.md` entry pointing at v2 source + partner, noting it as the expanded persona consulted in addition to v1.

### Verification

- v1 anti-gravity files remain byte-identical.
- All other v1/v2/v3 embeds untouched.
- No front-end / TypeScript / decision-router files modified.
- 3 expected references to `anti-gravity-opening-engineer.v2` (source, partner, INDEX entry).

### Out of scope

No edits to any front-end, motion, hero, loading, decision-router, or brand-identity TypeScript modules. No front-end output changes triggered by this embed.
