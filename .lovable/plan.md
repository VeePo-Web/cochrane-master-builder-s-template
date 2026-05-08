# Embed `General_Design_Prompt-3.docx` as v3 Audit Snapshot

This upload appears substantively identical to `General_Design_Prompt-2.docx` (just embedded as `master-design-persona-fantasy.v2.source.md`): same 352 parsed lines, same Role/Persona, same 3-pillar Mission Filter, same Deep Beliefs, same 8-Phase Methodology, same 15-section "What Not To Do" boundaries report, same Final Directive.

Following the precedent set by `navigation-architect-persona.v3.source.md` (which was also a near-duplicate of canonical v2 and registered as **provenance-only**), this is embedded as a verbatim audit snapshot. **Routing stays on the canonical v1 partner**, with v2 consulted in addition; v3 is provenance-only.

## Files to create

1. **`src/master/knowledge/source-documents/experience-prompts/master-design-persona-fantasy.v3.source.md`**
   - Verbatim markdown of the parsed `.docx`. No edits, no cleanup, no summarization. Smart quotes / soft hyphens preserved exactly.
   - Frontmatter: source filename, immutability note, status = audit/provenance snapshot, note that v2 is the active extension and v1 is the primary routing target.

2. **`src/master/knowledge/partner-documents/experience-prompts/master-design-persona-fantasy.v3.partner.md`**
   - Title, category (Experience Prompts → Cross-Brand Master Personas — v3 audit snapshot).
   - Purpose: explicitly states v3 is provenance-only and is substantively identical to v2.
   - Routing: do **not** route here — v1 partner is primary, v2 partner is consulted in addition. v3 exists for traceability, diff/audit, and to confirm no new content was added by the user upload.
   - Cross-references v2 partner for adaptation notes, Cochrane Master Builders translation, conflict resolution, and dependencies.
   - Trigger keywords: "audit", "provenance", "v3 design persona snapshot" only.

3. **Update `src/master/knowledge/INDEX.md`**
   - Add a `↳` sub-row under the existing v2 entry in the **Experience Prompts — Cross-Brand Personas** shelf, mirroring the navigation v3 entry style:
     `↳ source-documents/experience-prompts/master-design-persona-fantasy.v3.source.md | … | provenance-only | v3 snapshot of \`General_Design_Prompt-3.docx\` — substantively identical to v2. Routing stays on v1 + v2 partners; this entry exists for audit trail only.`

## Out of scope

- No edits to v1 or v2 source/partner docs.
- No edits to `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`.
- No front-end changes.
- No edits to `GENERAL_INTELLIGENCE_INDEX.md` content rules.

## Verification

- `rg -n "master-design-persona-fantasy.v3"` returns the 3 expected references (source, partner, INDEX).
- v1 and v2 source files byte-identical.
- No file under `src/components/`, `src/pages/`, `src/config/`, or `src/index.css` modified.
