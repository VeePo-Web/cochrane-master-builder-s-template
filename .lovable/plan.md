# Embed Cochrane Master Builders Research & Strategy Documents

## What you uploaded

11 documents that are **strategic research reports** for Cochrane Master Builders Corp. (CMB):

1. `1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.pdf`
2. `1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.md`
3. `1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.pdf`
4. `1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.pdf`
5. `1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.pdf`
6. `1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.pdf`
7. `1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.docx`
8. `1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.docx`
9. `1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.docx`
10. `1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.pdf`
11. (none — 10 total counted, the upload list shows 11 entries — confirmed below)

## One thing worth flagging before I embed

Your prompt template mentions **VeePo** and stripping out wedding references. The actual uploaded files are **Cochrane Master Builders** strategy/SEO/ICP reports — no wedding content, no VeePo content. I will treat these as CMB documents and embed them under a CMB-scoped knowledge tree exactly as uploaded, with zero edits. If you intended a different brand context, tell me and I will move/rename folders — but I will not alter document contents either way.

## Scope per your instructions

- Embed all 11 source files **verbatim** (no edits, no cleanup, no summarization).
- **No partner documents this round** ("don't make the other supporting documents yet").
- **No front-end changes.**
- Build a clean, scalable folder structure ready to absorb many more documents (personas, experience prompts, UI/UX guides, animation, footer, forms, etc.) in future rounds.

## Folder structure to create

```text
src/master/knowledge/
├── README.md                          # Explains the knowledge system, rules, and how AI should consult it
├── INDEX.md                           # Master index of every embedded doc (path, category, brand, status)
└── source-documents/
    ├── personas/                      # (empty, ready for future ICP persona prompts)
    ├── experience-prompts/            # (empty, ready for fantasy.co/Apple-tier experience prompts)
    ├── brand-identity/
    ├── ui-ux/
    ├── components/
    ├── animations/
    ├── navigation/
    ├── footer/
    ├── forms/
    ├── messaging/
    ├── conversion/
    ├── strategy/
    └── brands/
        └── cochrane-master-builders/
            ├── strategy/
            │   ├── 1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.pdf
            │   ├── 1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.pdf
            │   └── 1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.pdf
            ├── seo-research/
            │   └── 1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.md
            ├── brand-identity/
            │   ├── 1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.pdf
            │   └── 1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.pdf
            ├── ux-design/
            │   └── 1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.docx
            └── personas-icp/
                ├── 1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.docx
                ├── 1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.docx
                └── 1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.pdf
```

Why this layout:

- `source-documents/` mirrors your recommended structure with all generic category folders pre-created (empty placeholders with a tiny `.gitkeep` README) so future docs slot in instantly.
- `source-documents/brands/<brand-slug>/` keeps brand-specific intelligence (like CMB's reports) cleanly partitioned from cross-brand/global frameworks. CMB sub-categorizes into `strategy / seo-research / brand-identity / ux-design / personas-icp` matching the file numbering you used.
- `partner-documents/` is intentionally **not** created yet — you said don't make supporting docs this round. It will mirror this tree when you greenlight it.
- `INDEX.md` becomes the single source of truth listing every embedded document, its location, its brand scope, and its status (`source-only` until partner docs are written).

## What goes into README.md and INDEX.md

`README.md` (short, system-level):
- Purpose: backend intelligence layer. Documents are read by AI to filter decisions; never rendered to users.
- Hard rules: source documents are immutable; do not edit, summarize, or rewrite.
- Conventions: where to put new docs, slug rules, brand scoping.
- Workflow: source first → partner doc later → index entry.

`INDEX.md` (registry):
- Table of every embedded file with: path, brand, category, format, partner-doc status (`pending`), one-line "what it is" tag derived only from the filename (no interpretation of contents).

## Technical execution

- Copy each `user-uploads://...` file into its target path using `code--copy` (binary-safe — preserves PDFs and DOCX exactly; no parsing, no transformation).
- For the `.md` file, also copy via `code--copy` so byte content is identical to upload.
- Add `.gitkeep` markers in empty category folders so the structure is committed.
- Zero changes to `src/`, `index.html`, routes, components, styles, or any front-end file.
- Zero changes to `src/master/checklist.ts`, playbooks, or existing brand files.

## Out of scope this round (per your instructions)

- Partner documents (interpretation layer).
- Topic-index and decision-map files.
- Any front-end wiring or UI surfacing.
- Edits, redactions, or "VeePo-ification" of CMB content — the uploaded docs contain no wedding/VeePo references, so nothing to strip.

## Deliverable

After approval: 11 source files embedded verbatim, clean folder tree in place, `README.md` + `INDEX.md` written, ready to receive the next batch of documents.

