# Embed `General_CHRISTIAN_Colours_and_shapes_PROMPT-2.docx` as v2 of Colours & Shapes

This is a deeply different document from the existing v1 (`colours-and-shapes-experience-philosophy.source.md`). The v2 upload is a 27-page Christian-centered UI/UX & visual design playbook drawn from Colours & Shapes' church/ministry case studies (The Pastorate, Centre Church, Practicing the Way, Smith Creative, Wagenmaker & Oberly), liturgical color theory, mobile/accessibility/performance guidance, and an 8-phase delivery process.

Per the user's immutability rule, the source is embedded **verbatim**. Per the conflict rule, all church/liturgical/Gospel-specific references stay in the source and are translated by the partner document into brand-agnostic craft principles for the active project (Cochrane Master Builders / luxury automotive editorial). **None of the Christian-specific subject matter is permitted in front-end output.**

## Files to create

1. **`src/master/knowledge/source-documents/brand-identity/colours-and-shapes-experience-philosophy.v2.source.md`**
   - Verbatim markdown of the parsed `.docx`. No edits, no cleanup, no summarization. Smart quotes / soft hyphens / page break markers / duplicated "Colours" tokens preserved exactly.
   - Frontmatter: source filename, immutability note, status, hard backend-only flag, pointer to partner for adaptation.

2. **`src/master/knowledge/partner-documents/brand-identity/colours-and-shapes-experience-philosophy.v2.partner.md`**
   - Title, category (Brand Identity → Experience Philosophy → v2 extension).
   - Purpose: extract the *transferable craft layer* (start-with-why, manifesto-and-behaviours, story-driven experiences, recurring visual motif as theme thread, scannable hierarchy, mobile-first, motion under 300 ms with natural easing, accessibility/performance/security as trust signals, 8-phase delivery process) and explicitly **firewall** the Christian-specific subject matter (liturgical palettes, cross/dove/flame iconography, scripture quotes, prayer/donate buttons, sermon archives, church personas).
   - Routing: consult **in addition to** v1 for any decision about brand manifesto, recurring motif systems, hero narrative flow, motion timing, palette discipline, typography hierarchy, accessibility standards, and the 8-phase delivery cadence. v1 remains canonical for the cross-brand experience philosophy.
   - Brand translation table for Cochrane Master Builders (and VeePo where the user's instructions explicitly mention it):
     - "theological why" → brand-truth why (legacy, craft, family).
     - "manifesto + behaviours" → brand manifesto + behaviour set already in `brand-identity-northstar.ts`.
     - "fibre motif" → recurring copper hairline / CW monogram thread.
     - "liturgical palette" → Asphalt/Graphite + copper accent system (NEVER substitute liturgical colors).
     - "cross / dove / flame" → FORBIDDEN in front-end output.
     - "scripture quotes" → editorial pull-quotes from brand voice, NEVER scripture.
     - "church personas (seekers/members/volunteers)" → existing ICP personas (homeowner, fleet, dealership, etc.).
     - "sermon archive / prayer button / donate button" → not applicable; do not port.
   - Trigger keywords: "manifesto", "behaviours", "recurring motif", "narrative flow", "8-phase delivery", "mobile-first hierarchy", "motion timing under 300ms", "accessibility as trust", "performance budget".
   - Anti-trigger keywords (must NOT route here): "Christian", "church", "liturgical", "scripture", "prayer", "donate", "Gospel", "sermon".
   - Conflict resolution: if any prompt seems to pull Christian iconography or copy from this source into front-end output, **stop and use v1 + brand-identity-northstar instead**.
   - Dependencies: v1 source/partner, `brand-identity-northstar.ts`, `style-guide.ts`, master design persona v1 + v2 partners.

3. **Update `src/master/knowledge/INDEX.md`**
   - Add a `↳` sub-row under the existing v1 Colours & Shapes entry in the **Brand Identity** shelf:
     `↳ source-documents/brand-identity/colours-and-shapes-experience-philosophy.v2.source.md | Markdown (verbatim DOCX) | partnered (firewalled) | v2 — Christian-centered UI/UX playbook from General_CHRISTIAN_Colours_and_shapes_PROMPT-2.docx. BACKEND-ONLY. Partner doc extracts transferable craft layer (manifesto, recurring motif, narrative flow, 8-phase delivery, motion under 300 ms, accessibility/performance) and firewalls all liturgical/scripture/iconography content from front-end output.`

## Out of scope

- No edits to v1 source/partner.
- No edits to `brand-identity-northstar.ts`, `style-guide.ts`, `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`, or `GENERAL_INTELLIGENCE_INDEX.md`.
- No front-end changes anywhere in `src/components/`, `src/pages/`, `src/index.css`, or assets.

## Verification

- `rg -n "colours-and-shapes-experience-philosophy.v2"` returns the 3 expected references (source, partner, INDEX).
- v1 source/partner files unchanged (byte-identical).
- No front-end files modified.
- Partner doc explicitly enumerates the firewalled tokens (Christian, church, liturgical, scripture, prayer, donate, Gospel, sermon, cross, dove, flame).
