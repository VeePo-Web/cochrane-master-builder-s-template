## Goal

Treat the uploaded `Cochrane_Master_Builders_-_Universal_Website_Template_Wireframe_Plan.pdf` as the **foundational template spec** every Cochrane spin-off site filters through. Embed it verbatim, then write a Mode-OS persona brief — the **Template Architect** — that tells the system *how* to apply it alongside v1.0–v10.0, the communities registry, brand-identity, UX, and the existing personas (Fantasy design, SEO Virtuoso, FAQ Optimization, Anti-Gravity, Systems Architect, Mapper, Auditor).

Backend-only. No edits to the live VeePo / Masters Detailing front end.

---

## Files to create

### 1. Source (binary, verbatim)
`src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.pdf`
- Direct copy of the upload. Source of truth, immutable.

### 2. Source (markdown mirror)
`src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.source.md`
- 1:1 markdown extraction (already produced by parse_document, ~1700 lines).
- No edits, no reordering. Page markers preserved.

### 3. Partner doc — foundational
`src/master/knowledge/partner-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.partner.md`

Promotes the wireframe to **foundational status**: every Cochrane spin-off scaffolding decision must reconcile against it.

Contents:
- **Role**: canonical universal template wireframe — the structural spine the v1.0–v10.0 spreadsheets and communities registry render through.
- **Triggers**: "scaffold a site", "page architecture", "homepage sections", "navbar", "mega menu", "service page template", "areas-we-serve template", "pricing page", "contact form", "FAQ accordion", "sticky mobile CTA", "URL structure", "schema (LocalBusiness/FAQPage/BreadcrumbList)", "performance budget", any of the 115 Cochrane domains.
- **Joins**:
  - v1.0 (master 115 list) → which site is being built
  - v5.0 color, v6.0 experience, v9.0 layout, v10.0 style guide → per-site theming
  - communities_master_v3 → service-area pages and `/areas-we-serve/[community]`
  - brand-identity 1.2.1 / 1.2.2, UX 1.3.1 → tone + interaction baseline
- **Adaptation rules**: Cochrane Master Builders only; automotive firewall (no VeePo/Masters Detailing styling bleed); structure is fixed, copy/imagery adapts per service category (Roofing/Tile/Basement Suites/Landscaping/Custom Homes etc.); "Strong Foundations For Those Who Come After Us" must appear in some form on every site.
- **Section index**: bulleted map of every section in the wireframe (Trust Bar, Hero, Trust Strip, Services Grid, Pricing Preview, Process, Family Legacy, Project Proof, Areas We Serve, FAQ, Final CTA, Footer) with line refs back to source.md so the system can deep-link.
- **Mode-OS pairing**: Architect scaffolds, Mapper renders cluster matrices, Auditor verifies against this doc + brand-identity + v9.0/v10.0.
- **Out of scope**: this doc never edits the current VeePo front end.

### 4. Persona brief — Template Architect
`src/master/knowledge/partner-documents/experience-prompts/template-architect-persona.partner.md`

A new Mode-OS persona that operationalizes the wireframe. Sibling to the existing Fantasy design persona, SEO Virtuoso, FAQ Optimization, Anti-Gravity, and Systems Architect briefs.

Contents:
- **Identity**: 50+ years of UX/IA experience, fantasy.co lineage, owns the universal wireframe.
- **Mandate**: turn any one of the 115 Cochrane domains into a complete site spec by composing the wireframe with the right rows from v1.0–v10.0 and the right communities subset.
- **Inputs it consults** (explicit list with paths): wireframe partner doc, v1.0–v10.0 partner docs, communities partner doc, brand-identity 1.2.1/1.2.2, UX 1.3.1, Fantasy design persona, SEO Virtuoso, FAQ Optimization, Image SEO + Local Visibility, Navigation/Footer Architect, Mode-OS Architect/Mapper/Auditor.
- **Output contract**: per-site spec containing — chosen v1.0 row, domain, hero copy formula filled, services grid items, pricing tiers, process steps, family-legacy line tailored to the service, areas-we-serve cluster lists, FAQs, schema bundle, performance budget, mobile sticky CTA copy.
- **Service-category overlays**: Custom Homes / Renovations / Roofing / Concrete / HVAC / Repairs etc. — what shifts in emphasis (matches §"Service Category Template Variations" in the source).
- **Guardrails**: never collapse the wireframe section order; never substitute human imagery (per existing memory); never bleed automotive editorial language into Cochrane builders copy; always reconcile with the locked brand-identity memories.
- **Mode-OS pairing**: runs in Architect mode for scaffolding, hands off to Mapper for matrix renders, then Auditor for compliance pass.

### 5. Index updates
`src/master/knowledge/INDEX.md`
- Under Cochrane Master Builders → Strategy: add a **Foundational** callout for the wireframe (xlsx-set is the *content* axis, communities is the *geographic* axis, this wireframe is the *structural* axis).
- Add row for the new pdf + source.md + partner.md.
- Under experience-prompts: add a row for the Template Architect persona, with keywords (scaffold, universal template, page architecture, per-site spec).

### 6. Plan log
`.lovable/plan.md` — append a short note recording this embed + persona authoring.

---

## Out of scope

- No edits to `src/`, `index.css`, `tailwind.config.ts`, or any React component.
- No edits to v1.0–v10.0 or communities files.
- No new routes, no scaffolding of actual Cochrane pages — that's a future build phase the Template Architect persona will drive when invoked.
- No changes to the live VeePo / Masters Detailing preview.

---

## Acceptance

- `code--view` on the new partner docs returns the full briefs.
- INDEX.md lists the wireframe as Foundational and the persona under experience-prompts.
- Front-end preview is byte-identical to before.

## Universal Website Template Wireframe Plan — embedded as FOUNDATIONAL (build mode)
- Copied PDF verbatim → `source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.pdf`
- Wrote 1:1 markdown mirror via `pdftotext -layout` → `.../universal_website_template_wireframe_plan.source.md`
- Authored foundational partner brief → `partner-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.partner.md` (structural axis; joins to v1.0–v10.0 + communities; section index back to source.md; adaptation rules incl. automotive firewall)
- Authored new Mode-OS persona → `partner-documents/experience-prompts/template-architect-persona.partner.md` (Template Architect; per-site spec output contract; service-category overlays; activation phrases; pairs with Architect / Mapper / Auditor)
- INDEX.md: added Foundational callout under Cochrane Strategy + 2 new rows (pdf + source.md) + Template Architect persona row in cross-brand experience-prompts table
- No frontend changes; VeePo / Masters Detailing live preview unchanged
