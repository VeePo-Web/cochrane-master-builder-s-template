# Plan — Supersede v8.0 with v9.0 Theme Layout / Bespoke UX Components

The new upload is byte-identical to v8.0 (`d91cbed1...`). Per your decision, v9.0 will replace v8.0 in the Cochrane family-of-sites lineage. The companion family grows from seven to eight paired files, but the *content* leg covered (theme layout / bespoke UX components / perf optimization) stays the same — only the numbering moves forward.

## Files to delete

- `src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/8.0_cochrane_masters_all_115_theme_layout_ux_specs.xlsx`
- `src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/8.0_cochrane_masters_all_115_theme_layout_ux_specs.source.md`
- `src/master/knowledge/partner-documents/brands/cochrane-master-builders/strategy/8.0_cochrane_masters_all_115_theme_layout_ux_specs.partner.md`

## Files to create

- **Source (binary):** `src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/9.0_cochrane_masters_all_115_theme_layout_ux_specs.xlsx` — verbatim copy of upload.
- **Source (markdown mirror):** `.../strategy/9.0_cochrane_masters_all_115_theme_layout_ux_specs.source.md` — 1:1 cell mirror via openpyxl `data_only=True` (116 rows × 5 cols: Master Row, Recommended Domain, Website / Brand, Cluster, Theme Layout Suggestion / Bespoke UX Components / Performance Optimization).
- **Partner doc:** `.../strategy/9.0_cochrane_masters_all_115_theme_layout_ux_specs.partner.md` — same content scope as the prior v8.0 partner (page architecture / signature components / IA scaffolding leg of the remix family) with all internal references renumbered to v9.0 and the family count updated to **eight** paired files (v1.0, v2.0, v4.0, v5.0, v6.0, v7.0, v9.0). Includes a "Supersedes" line noting v8.0 was replaced by this file (identical payload, new lineage number) so future audits don't flag a missing v8.0.

## Files to edit

- `src/master/knowledge/INDEX.md` — remove v8.0 rows from the source-documents and partner-documents tables, add v9.0 rows in their place, update the family-of-sites callout from "seven" to "eight" companions and renumber the v8.0 reference to v9.0. Keyword set (theme, layout, page architecture, hero layout, trust block, conversion block, bespoke component, signature module, calculator, configurator, comparator, ecosystem map, IA, whitespace, hierarchy, build recipe, cluster scaffolding) carries over unchanged.
- `.lovable/plan.md` — append a short note recording the v8.0 → v9.0 supersession.

## Out of scope

- No frontend changes.
- No edits to any other paired companion (v1.0, v2.0, v4.0, v5.0, v6.0, v7.0 stay as-is).
- No content edits to the spreadsheet — stored verbatim.

## Join discipline (unchanged)

All eight paired files join on `Master Row`. Any drift in `Recommended Domain` between v9.0 and any other companion = **Sync Discrepancy** and must be resolved before downstream use.
