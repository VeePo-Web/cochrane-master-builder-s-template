## Plan: Embed `2._cochrane_masters_all_115_services_pricing_EXPANDED_AUDITED.xlsx` as the canonical services + pricing companion to the Master Plan

This is the **pricing/services companion** to the previously embedded Master Plan. Same brand (Cochrane Master Builders), same row structure (116 rows × 6 cols, one row per planned site/service), but the data is *what each site sells and what it charges* — keyed by Master Row number so it joins back to the Master Plan's `01 Master Tracker`.

### Where it lives

Brand-scoped under the Cochrane Master Builders strategy shelf, paired with the Master Plan it joins to:

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    2.0_cochrane_masters_all_115_services_pricing_EXPANDED_AUDITED.xlsx        ← verbatim binary
    2.0_cochrane_masters_all_115_services_pricing_EXPANDED_AUDITED.source.md   ← verbatim 1:1 markdown mirror of the single sheet
  partner-documents/brands/cochrane-master-builders/strategy/
    2.0_cochrane_masters_all_115_services_pricing_EXPANDED_AUDITED.partner.md
```

### Sheet inventory (1 sheet, 116 rows × 6 cols, captured verbatim)

`Services & Pricing` columns:

1. **Master Row** — join key back to `01 Master Tracker` of the v1.0 Master Plan.
2. **Recommended Domain** — same `.ca` domain as the Master Tracker (must stay in sync).
3. **Website / Brand** — site/brand name.
4. **Cluster** — same cluster taxonomy as Master Plan sheet `02 Service Clusters`.
5. **Detailed Services & Mid-High Pricing (CAD)** — bulleted list of services + CAD price ranges (the operational catalog).
6. **Pricing Notes / Compliance Guardrails** — typical job size, audit/compliance rules, what to disclose, what NOT to claim, scope boundaries.

### Partner document — what it tells the system

- **Title:** Cochrane Masters — All-115 Services & Pricing (Expanded + Audited) Companion.
- **Category:** brands/cochrane-master-builders → strategy → pricing & services catalog.
- **Purpose:** The canonical operational catalog of *what each Cochrane site sells, at what price, with what compliance guardrails*. It is the join-table partner to the v1.0 Master Plan: identical row count, joinable on `Master Row` ↔ Master Tracker row, identical Recommended Domain + Website/Brand + Cluster columns. Together they form the complete remix base.
- **Primary use as remix base:** When a new Cochrane spin-off site is being built, this doc supplies the **services-offered list, price ranges, typical job size, and compliance guardrails** for that site's row. The Master Plan supplies *positioning + SEO + linking*; this file supplies *offers + pricing + risk language*.
- **What it influences:**
  - Service-page content (the bulleted services + price ranges).
  - Pricing UI (ranges, "from $X" framing, compliance footnotes).
  - Compliance / disclaimer copy (the Pricing Notes column is the source of truth for what may and may not be claimed — e.g., scope, licensing, third-party, audit caveats).
  - Quote/inquiry form scoping (typical job size shapes which fields to ask).
  - Lead-qualification logic (price floor/ceiling sets the qualification threshold).
  - "Get a quote" CTA copy on each spin-off (must align with pricing notes).
  - Cross-sell / cluster bundling (Cluster column joins to Master Plan `02 Service Clusters`).
- **Triggers (when AI should consult this):** any prompt mentioning *price, pricing, "how much," cost, range, quote, estimate, disclaimer, compliance, scope, what does X site offer, service list, service catalog, typical job size, qualify the lead, pricing UI, tier, "from $", CAD, guardrail, what we can/can't claim, what's included.*
- **Adaptation rules (firewall):**
  - Brand context is **Cochrane Master Builders**, not Masters Concierge / VeePo. Do not apply automotive vocabulary firewalls here.
  - **Prices are mid-high CAD ranges**, not quotes. Always present as ranges or "from $X" — never as a fixed quote. Always pair with the row's Pricing Notes when surfacing a number.
  - **Compliance Guardrails column is binding.** If it says something must be disclosed, scoped, or NOT claimed, the system must respect that in any generated copy. Conflicts get a memory-conflict flag, never silent overrides.
  - **Join discipline:** any reference to a site's pricing must use the same `Master Row` it has in the v1.0 Master Plan. If a row appears here but not in the Master Plan (or vice versa), surface a Sync Discrepancy flag — both files must move together.
  - Currency is **CAD** explicitly; never display without the currency.
  - The file is the *current audited snapshot* — flag pricing as "indicative, audited [date]" wherever surfaced; never as a binding quote.
  - Live `.ca` availability still NOT verified (inherits the caveat from the Master Plan).
- **Mode-OS pairing:**
  - **Architect** uses this as the offer/pricing data model when designing pricing pages, quote forms, or service-list components.
  - **Mapper** uses it to render per-cluster pricing-tier comparison diagrams or per-site offer maps.
  - **Auditor** pressure-tests any generated pricing UI or copy against the Compliance Guardrails column and against the Master Plan join (row count, domain match, brand-name match, cluster match). Any mismatch = Critical bug.
- **Dependencies:** v1.0 Master Plan `.xlsm` (joined on Master Row), Cochrane brand identity (Family Legacy Standard, "Foundations For Generations After Us"), strategy reports v1.0/1.2/1.3, cross-brand SEO Virtuoso + FAQ-SEO + Image-SEO + Footer Architect + Knowledge System Charter, 3-mode OS personas.
- **Guidance type:** **Brand-global** for Cochrane Master Builders only.
- **Practical examples:**
  - *"Build a pricing section for the Basement Suite Masters site."* → Look up that brand's row, render the Detailed Services bullets as the catalog, the price ranges as "From $X CAD" rows, and the Pricing Notes as compliance footnotes below the table.
  - *"Write the disclaimer under the price."* → Pull verbatim language from the Pricing Notes column for that row.
  - *"What should the quote-form scope ask?"* → Use "typical job size" from the Pricing Notes to set min/max budget fields.
  - *"Recommend a bundled package."* → Group rows by Cluster and surface the highest-revenue offers in that cluster.

### INDEX update

Add two rows to Cochrane Master Builders → **Strategy** table:

- the verbatim `.xlsx` (status: `source-only`).
- the `.source.md` mirror + partner doc (status: `partnered`), with keywords: *pricing, price, cost, CAD, ranges, quote, estimate, services list, service catalog, compliance, guardrails, disclaimer, scope, typical job size, lead qualification, cluster, join key, Master Row, audited snapshot.*

Update the existing family-of-sites callout above the table to note that the v1.0 Master Plan and v2.0 Services & Pricing files are a **paired set, joined on `Master Row`**, and must always be consulted together when building a new spin-off site.

### Out of scope

No frontend changes. No price changes. No edits to the `.xlsx`. The `.source.md` is a 1:1 cell-content mirror only — no synthesis, no reordering, no opinions inside it.