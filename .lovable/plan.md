# Embed `General_FOOTER_Prompt-3.docx` into Backend Knowledge

A footer-architect source already exists at `src/master/knowledge/source-documents/footer/footer-architect.source.md` (with partner doc and INDEX entry). The new upload is a **v3 iteration** of the same persona — substantively expanded with output format, governance, QA, and final directive sections.

Mirroring the precedent set by `navigation-architect-persona.v3.source.md`, this will be embedded as a parallel v3 snapshot (verbatim, untouched) with its own partner doc, while the canonical v2 partner remains the active routing target.

## Files to create

1. **`src/master/knowledge/source-documents/footer/footer-architect.v3.source.md`**
   - Verbatim markdown of `General_FOOTER_Prompt-3.docx`, full 771-line parse, no edits, no cleanup, no summarization.
   - Brand-context references kept untouched per the immutability rule (the partner doc handles adaptation to Cochrane Master Builders).

2. **`src/master/knowledge/partner-documents/footer/footer-architect.v3.partner.md`**
   - Title, category (Footer / Cross-brand persona — v3 snapshot).
   - Purpose: explains this is a v3 iteration of the canonical Footer Architect persona, expanded with output-format scaffolding, governance rules, QA plan, and a final-directive contract.
   - Trigger keywords: footer, fat footer, sticky mini-footer, footer IA, footer SEO, footer governance, footer QA, footer output format.
   - Routing rule: canonical v2 (`footer-architect.partner.md`) remains the primary routing target; v3 is consulted when prompts ask for **structured footer output**, **governance/QA checklists**, or **bespoke brand-moment scaffolding**.
   - Adaptation notes for Cochrane Master Builders: map "brand moment" to the family-legacy/Strong-Foundations motif; NAP/local SEO cues route through Cochrane + Rocky View + Calgary CMA; never import generic template vocabulary.
   - Conflict rule: brand-specific Cochrane docs win on aesthetics/voice; this v3 wins on structural footer rigor and QA discipline.
   - Dependencies: links to `footer-architect.partner.md` (v2), `colours-and-shapes-experience-philosophy.partner.md`, brand-identity north-star partner doc.

3. **Update `src/master/knowledge/INDEX.md`**
   - Under the existing `Footer` shelf, add a sub-row for the v3 snapshot following the navigation v3 precedent (`provenance-only` style entry pointing routing back to v2, plus a note that v3 adds the structured output format / governance / QA layer).

## Out of scope

- No edits to existing v2 source or partner docs.
- No edits to `src/master/knowledge/GENERAL_INTELLIGENCE_INDEX.md` content rules — only an additive v3 line if needed for parity.
- No front-end changes. No component, page, config, or styling edits.
- No changes to `decision-index.ts`, `decision-input.ts`, or `DECISION_ROUTER.md` (matches navigation v3 precedent — registration deferred to a separate pass).

## Verification

- `rg -n "footer-architect.v3"` returns the 3 expected references (source, partner, INDEX).
- v2 source file unchanged (byte-identical).
- No file under `src/components/`, `src/pages/`, `src/config/`, or `src/index.css` modified.
