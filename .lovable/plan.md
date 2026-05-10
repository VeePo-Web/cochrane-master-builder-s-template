# Plan — Embed Cochrane Service-Area Communities Master List

This is a **new content category** — not a v-numbered companion to the 115-spin-off lineage. It is the canonical list of geographic communities served (131 communities × 2 cols: `Community`, `Details`). Will eventually power per-community SEO pages on every Cochrane spin-off site.

## New folder

`src/master/knowledge/source-documents/brands/cochrane-master-builders/service-areas/` (mirrored under `partner-documents/`).

## Files to create

- **Source (binary):** `src/master/knowledge/source-documents/brands/cochrane-master-builders/service-areas/communities_master_v3.xlsx` — verbatim copy of upload (`communities_final_3.xlsx`).
- **Source (markdown mirror):** `.../service-areas/communities_master_v3.source.md` — 1:1 cell mirror via openpyxl `data_only=True` (132 rows × 2 cols: `Community`, `Details`).
- **Partner doc:** `src/master/knowledge/partner-documents/brands/cochrane-master-builders/service-areas/communities_master_v3.partner.md` — explains this as the **canonical service-area registry** that will drive per-community programmatic SEO pages on every Cochrane spin-off site. Triggers (community, neighbourhood, area served, service area, location, geographic SEO, local landing page, "do you serve [X]," programmatic SEO, hub-and-spoke local pages, Calgary CMA, Springbank, Bearspaw, Bragg Creek, Cochrane, etc.). Adaptation rules (Cochrane Master Builders only — no automotive firewall; verbatim cell content is the source of truth; descriptions feed local-SEO copy + LocalBusiness/Place schema; **wedding/unrelated references must NOT be deleted from the source** — partner doc handles any contextual filtering). Join discipline (cross-references the 115-spin-off family by being the *geographic axis* — every spin-off site can render this list as its service-area page). Mode-OS pairing (Architect for per-community page scaffolding, Mapper for cluster-by-region matrices, Auditor for verifying SEO completeness + schema fidelity). Backend-only — no frontend changes.

## Files to edit

- `src/master/knowledge/INDEX.md` — add a new `### Service Areas` subsection under the Cochrane Master Builders brand, with two rows (xlsx + source.md) and a contextual callout that this is the **geographic axis** of the family-of-sites strategy (orthogonal to the 8-file paired set joined on `Master Row`). Keywords: community, neighbourhood, area served, service area, location, geographic SEO, local landing page, programmatic SEO, hub-and-spoke local, Calgary CMA, Cochrane region, Springbank, Bearspaw, Bragg Creek.
- `.lovable/plan.md` — append a short note recording the communities embed.

## Out of scope

- No frontend changes.
- No edits to v1.0–v10.0 paired companions.
- No content edits to the spreadsheet — stored verbatim (including any wedding/unrelated references; the firewall lives in the partner doc only).
- No new programmatic-SEO pages built yet — this only embeds the source-of-truth.


## Communities embed
Added Cochrane service-area communities registry (v3) under a new `service-areas/` axis: xlsx + source.md mirror + partner doc. INDEX.md gained a Service Areas subsection with a geographic-axis callout. Source preserved verbatim.
