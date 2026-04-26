# Embed the Backend Knowledge Governance Charter

## What this document actually is

The uploaded file (`Prompt_to_put_personas_into_back_end_of_code-2.docx`) is **not** a domain persona for nav bars, footers, or any UI surface. It is the **master governance charter** that defines:

- The dual-layer rule (verbatim source + separate partner)
- The folder taxonomy (`/knowledge/source-documents/...` and matching `/partner-documents/...`)
- The 8 critical immutability rules for source files
- The required partner-document anatomy (12 fields)
- The decision-behavior rules and conflict rule
- The quality bar (fantasy.co / Apple / igloo.inc)

It governs **every other document** in the knowledge system. So it does not belong inside `experience-prompts/` or `personas/` — it sits one level above them as the constitution.

## Where it goes

Create a new top-level category dedicated to system governance, mirrored on both layers:

```text
src/master/knowledge/
├── source-documents/
│   └── governance/                          ← NEW
│       └── knowledge-system-charter.source.md   ← verbatim, immutable
└── partner-documents/
    └── governance/                          ← NEW
        └── knowledge-system-charter.partner.md  ← interpretation layer
```

Rationale for a new `governance/` folder rather than reusing `experience-prompts/`: every other document in the system is *governed by* this charter, so it must be discoverable as a top-level concern, not buried with domain personas.

## Files to create (2)

### 1. `source-documents/governance/knowledge-system-charter.source.md`

- Standard immutability frontmatter (`immutable: true`, `verbatim: true`, `do-not-edit: true`, `source-format: docx`, `source-filename: Prompt_to_put_personas_into_back_end_of_code-2.docx`)
- DO-NOT-EDIT banner identical to other source files
- Full verbatim text of all 7 pages — including the trailing `"` characters, the truncated VeePo reference, the wedding-deletion instruction, and the duplicated "Here is the document you will add now:" lines. Nothing trimmed, nothing reflowed beyond preserving paragraph breaks the parser produced.

### 2. `partner-documents/governance/knowledge-system-charter.partner.md`

The standard 12-section partner template, including:

- **Title / category / source pointer**
- **Main purpose** — defines how all source + partner documents are stored, referenced, and consulted
- **What it influences** — every future embed operation, every router entry, every partner template
- **Trigger prompts** — "embed this document", "add this to the backend", "how should I structure knowledge", "create a partner doc", any prompt that ingests new source material
- **Scope** — global (governs the entire `src/master/knowledge/` tree)
- **Quality direction** — fantasy.co / Apple / igloo.inc bar; bespoke, conversion-aware, luxury-level
- **Adaptation flag** — `adaptation-required: true`. The charter mentions VeePo and weddings as example contexts from prior conversations; the partner doc explicitly notes the active brand for this codebase is **Cochrane Master Builders** and that vocabulary translation happens in partner docs only — **never** by editing the source.
- **Conflict-rule reminder** — restates the immutability + partner-only-adaptation rule for future agents
- **Dependencies** — `DECISION_ROUTER.md`, `INDEX.md`, `decision-index.ts`, `decision-input.ts`, every existing `.partner.md` (they all inherit this charter's template)
- **Practical examples** — three worked examples of the workflow when a new persona doc arrives

## Registry & router updates (3 edits)

### `src/master/knowledge/decision-index.ts`
Add one route:
- `id: "governance/knowledge-system-charter"`
- `brand: "general"`
- `topics: ["knowledge-embedding", "source-document-rules", "partner-document-template", "folder-taxonomy", "immutability"]`
- `pageSections: []` (this is meta, not surface-bound)
- `constraints: ["immutable-source", "verbatim", "dual-layer", "governance"]`
- Points at both the source and partner paths

### `src/master/knowledge/decision-input.ts`
Extend `CONSTRAINT_HINTS` with: `governance`, `immutable-source`, `verbatim`, `dual-layer`, `embed-document`. Extend topic hints with `knowledge-embedding`, `partner-template`, `folder-taxonomy`. No removals.

### `src/master/knowledge/INDEX.md`
Add a new top-level section above the domain categories:

```text
## Governance (read first)
- governance/knowledge-system-charter — master charter for how every source + partner document is embedded
```

Plus a one-line entry in the per-folder listing for `governance/`.

### `src/master/knowledge/DECISION_ROUTER.md`
Add a short paragraph under "How routing works": "Any prompt about embedding new documents, structuring knowledge, or creating partner docs routes first to `governance/knowledge-system-charter` before hitting domain routes."

### `src/master/knowledge/README.md`
Add `governance/` to the folder map at the top so newcomers see it before the domain folders.

## What is NOT changing

- No frontend files touched.
- No edits to existing `.source.md` files.
- No edits to existing `.partner.md` files.
- No edits to `src/integrations/supabase/*`, edge functions, or UI components.
- No deletions anywhere.
- The "delete wedding references" instruction inside the charter applies to *future* persona docs that arrive with that vocabulary — it is **not** executed against the charter itself (which would violate the charter's own immutability rule). This nuance is captured in the partner doc.

## After this turn

The charter becomes the first document the router consults whenever you upload another persona. That means subsequent embeds (nav bar persona, footer persona, button persona, etc.) will automatically inherit the dual-layer rule, the 12-section partner template, and the Cochrane Master Builders adaptation flag — without you having to restate the rules each time.
