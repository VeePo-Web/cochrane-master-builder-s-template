# Embed `General_Design_Prompt-2.docx` into Backend Knowledge

This upload is a **v2 iteration** of the canonical Master Design Persona (already embedded as `master-design-persona-fantasy.source.md` + partner doc, registered in the routing layer). The new doc significantly expands the persona with: a 3-pillar mission/values filter ("Elevate the Human Experience" / "Embody Brand Truth with Excellence" / "Innovate Responsibly for Impact"), Deep Beliefs and Values, the 7-phase methodology (Discovery → Strategy → IA → Design & Prototyping → Systems → Build & QA → Launch & Optimization), and a full "What Not to Do" boundaries report (sections 1–14).

Mirroring the precedent set by `navigation-architect-persona.v3.source.md` and `footer-architect.v3.source.md`, this is embedded as a parallel v2 snapshot — verbatim, untouched — with its own partner doc. Canonical v1 partner remains the active routing target.

## Files to create

1. **`src/master/knowledge/source-documents/experience-prompts/master-design-persona-fantasy.v2.source.md`**
   - Verbatim markdown from the parsed `.docx`. No edits, no cleanup, no summarization. Exotic punctuation, soft hyphens, and stray formatting preserved.
   - Frontmatter: source filename, immutability note.

2. **`src/master/knowledge/partner-documents/experience-prompts/master-design-persona-fantasy.v2.partner.md`**
   - Title, category (Experience Prompts / Cross-brand persona — v2 snapshot).
   - Purpose: explains v2 adds the **3-pillar decision filter**, the **7-phase methodology**, and the **14-section "What Not To Do" boundaries report** on top of v1.
   - Trigger keywords: design persona, world-class design, fantasy.co, master design, design methodology, what not to do, design boundaries, design ethics, design principles, design quality bar, design QA, dark patterns, accessibility floor.
   - Routing rule: v1 (`master-design-persona-fantasy.partner.md`) remains primary; v2 is consulted **in addition** when the request needs structured methodology, ethical/anti-pattern boundaries, or filtering decisions through the 3 mission pillars.
   - Adaptation notes for Cochrane Master Builders: map "Brand Truth" to the Family Legacy / Strong Foundations North Star; "Elevate Human Experience" routes through the Mothers/Grandfathers/Subcontractor ICP docs; never import generic agency vocabulary or non-builder examples (Balenciaga, Slack, Coinbase) into front-end copy.
   - Conflict rule: brand-specific Cochrane docs win on aesthetics/voice/palette/motifs; v2 wins on methodology rigor, ethical boundaries, and the 3-pillar filter; performance/mobile partner docs win on perf budgets and breakpoints.
   - Dependencies: v1 partner, brand-identity-architect partner, colours-and-shapes partner, footer + navigation v3 partners, performance + mobile partners, and the Cochrane Master Builders Family Legacy / North Star partner docs.

3. **Update `src/master/knowledge/INDEX.md`**
   - Under the existing **Experience Prompts — Cross-Brand Personas** shelf, add a `↳` sub-row beneath the canonical `master-design-persona-fantasy.source.md` row pointing to the v2 snapshot, following the same convention used for the navigation v3 entry.

## Out of scope

- No edits to v1 source or partner docs.
- No edits to `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md` (matches v3 precedent — registration deferred).
- No front-end changes. No component, page, config, styling, or token edits.
- No edits to `GENERAL_INTELLIGENCE_INDEX.md` content rules.

## Verification

- `rg -n "master-design-persona-fantasy.v2"` returns the 3 expected references (source, partner, INDEX).
- v1 source byte-identical.
- No file under `src/components/`, `src/pages/`, `src/config/`, or `src/index.css` modified.
