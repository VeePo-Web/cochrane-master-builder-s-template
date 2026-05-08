## Plan: Embed `General_CHRISTIAN_Colours_and_shapes_PROMPT-3.docx` as v3 audit snapshot

This document is substantively the same Christian-centered UI/UX & visual design playbook already embedded as v1 and v2 of the Colours & Shapes experience philosophy. v3 will be embedded as a **provenance-only snapshot** — identical pattern to the Master Design Persona v3 snapshot already in the system. v1 + v2 partner pair remain canonical; v3 adds no new routing.

### Files to create

1. **`src/master/knowledge/source-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.source.md`**
   - Verbatim markdown of the parsed `.docx` — preserve all smart quotes, soft hyphens, page breaks, duplicated "Colours" tokens, and original wording exactly as parsed.
   - Frontmatter notes: status `provenance/audit-snapshot`, "substantially identical to v2", hard backend-only flag, immutability, pointer to v1 + v2 partner pair as canonical routing target.

2. **`src/master/knowledge/partner-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.partner.md`**
   - Title: "Colours & Shapes Experience Philosophy — v3 Audit Snapshot (Partner)"
   - Category: `Audit/Provenance`
   - Status: `provenance-only`
   - Explicitly states: v1 partner is primary, v2 partner is consulted in addition, v3 adds **no** new guidance and MUST NOT be routed to for decisions.
   - Re-asserts the v2 firewall rules (Christian/liturgical content stays backend-only; never reaches front-end output).
   - Trigger keywords scoped to audit only: "audit trail", "provenance", "v3 snapshot", "diff between v2 and v3".
   - Out of scope: no front-end changes; no edits to v1/v2 source/partner, `brand-identity-northstar.ts`, `style-guide.ts`, `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`, `GENERAL_INTELLIGENCE_INDEX.md`.

### Files to edit

3. **`src/master/knowledge/INDEX.md`** — add a `↳` sub-row under the v2 entry pointing at v3 source + partner, marked as provenance/audit-only and substantively identical to v2.

### Verification

- v1 and v2 source/partner files remain byte-identical.
- No front-end files modified.
- 3 expected references to `colours-and-shapes-experience-philosophy.v3` found (source, partner, INDEX entry).
- Partner doc explicitly enumerates the firewall (no Christian/liturgical tokens in front-end output).

### Out of scope

No edits to any decision router, brand-identity TypeScript modules, components, pages, styles, or any other front-end or routing infrastructure.
