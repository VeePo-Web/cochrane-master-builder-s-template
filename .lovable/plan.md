## Plan: Embed Cochrane Masters Upgraded SEO Master Plan (.xlsm) as the master service-ecosystem source

This is a brand-specific (not cross-brand) source — the master spreadsheet for the Cochrane Master Builders family of sites: hub + every planned service-specific site, with domains, clusters, SEO map, domain rules, and launch roadmap. It will become the **canonical base** that every service-specific site is remixed from.

### Where it lives

Brand-scoped under the existing Cochrane Master Builders shelf:

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    1.0_cochrane_masters_UPGRADED_SEO_Master_Plan_family_legacy_column.xlsm    ← verbatim binary
    1.0_cochrane_masters_UPGRADED_SEO_Master_Plan_family_legacy_column.source.md ← verbatim markdown export of all 6 sheets (so AI tools can read it without xlsx tooling)
  partner-documents/brands/cochrane-master-builders/strategy/
    1.0_cochrane_masters_UPGRADED_SEO_Master_Plan_family_legacy_column.partner.md
```

The `.xlsm` is preserved byte-for-byte (the immutable source). The `.source.md` is a faithful, lossless markdown rendering of every sheet (no edits, no summaries, no opinions inserted) — purely a textual mirror so non-Excel tools can consult it. Both are flagged `immutable` in frontmatter; the partner doc is the only place interpretation lives.

### Sheet inventory captured (all 6 sheets, verbatim, in `.source.md`)

1. **00 Audit Summary** — purpose, limitations, contact, brand promise.
2. **01 Master Tracker** — 116 rows × 24 cols. Every planned site: brand name, recommended `.ca` domain, canonical hub URL slug, primary + secondary keywords, buyer intent, offer type, revenue potential, lead urgency, launch priority (P0–Pn), cluster, status, etc.
3. **02 Service Clusters** — 21 service clusters with priority role, best first-wave services, SEO notes.
4. **03 Hub SEO Map** — internal-link / anchor-text architecture between hub and every specialist site.
5. **04 Domain Rules** — naming pattern (`Cochrane + Service + Masters + .ca`), spelling rules, anti-patterns.
6. **05 Launch Roadmap** — Phase 0 foundation → Phase N rollout, with goals + launch criteria per phase.

### Partner document — what it tells the system

- **Title:** Cochrane Masters Upgraded SEO Master Plan — Family-of-Sites Source of Truth.
- **Category:** brands/cochrane-master-builders → strategy.
- **Purpose:** Single canonical reference for the entire Cochrane Master Builders ecosystem — hub site + every service-specific spin-off. Defines brand naming, domain pattern, cluster structure, hub↔spoke SEO map, launch sequence, and per-site SEO targets.
- **Primary use as a "remix base":** When a new service-specific site is being planned or built, this doc dictates: which row of the Master Tracker that site corresponds to, which cluster it belongs to, which domain pattern to use, which canonical hub URL slug links into the hub, which primary/secondary keywords to target, which buyer-intent and offer-type framing to apply, which launch phase it belongs to, and which trust/anchor-text relationship it must have with `CochraneMasterBuilders.ca`.
- **What it influences:**
  - Domain selection (must follow rule sheet — `Cochrane + Service + Masters + .ca`).
  - Brand/site naming for every spin-off.
  - SEO targeting (primary keyword, secondary keywords, buyer intent, urgency).
  - Internal linking between hub and specialist sites (anchor text + purpose from sheet 03).
  - Launch order (use sheet 05 phases — never skip Phase 0 foundation work).
  - Cluster groupings for content cross-linking and IA decisions.
  - Trust signals on every specialist site ("Part of Cochrane Master Builders" anchor + footer attribution).
- **Triggers (when AI should consult this):** any prompt mentioning *new service site, sister site, spin-off, domain choice, hub/spoke, internal link strategy, launch phase, which keyword, cluster, family of sites, naming, "next site to build," remix base, multi-site SEO, anchor text between Cochrane sites, P0/P1/P2 priority*.
- **Adaptation rules (firewall):**
  - Brand context is **Cochrane Master Builders**, not Masters Concierge / VeePo. Do not apply the Masters/VeePo automotive vocabulary firewall to this doc — it operates exclusively under the Cochrane brand identity layer (`brands/cochrane-master-builders/brand-identity/...`).
  - Treat the `.xlsm` as ground truth; if a future Cochrane brand-identity or strategy doc conflicts, surface a memory-conflict flag rather than silently overriding.
  - Live `.ca` domain availability was NOT verified in the sheet — this caveat must be repeated whenever the system recommends a domain from the tracker.
  - The sheet is the **structural plan**, not visual or motion direction. Visual/motion direction still routes through the brand identity, design persona, and motion personas.
- **Mode-OS pairing:**
  - **Architect** uses this as the object-model + state inputs for the family-of-sites system.
  - **Mapper** uses it to render hub↔spoke diagrams and per-cluster ER/journey diagrams on demand.
  - **Auditor** pressure-tests proposed new sites against the Domain Rules + Hub SEO Map + Launch Roadmap before any build is approved.
- **Dependencies:** Cochrane Master Builders strategy reports v1.0 / 1.2 / 1.3, Family Legacy Standard, "Foundations For Generations After Us," brand-identity layer; cross-brand SEO Virtuoso, FAQ-SEO, Image-SEO, Navigation Architect, Footer Architect, Knowledge System Charter.
- **Guidance type:** **Brand-global** for Cochrane Master Builders (every spin-off site inherits from it); **not applicable** to other brands (Masters Concierge / VeePo / etc.).
- **Practical examples:** picking the next site to launch (read Phase column on sheet 05 + Launch Priority on sheet 01); naming a new spin-off (apply sheet 04 rules); writing the homepage anchor block for a specialist site that links back to the hub (use sheet 03 anchor-text guidance); deciding cluster cross-linking on a service page (use sheet 02 cluster groupings).

### INDEX update

Update `src/master/knowledge/INDEX.md` Cochrane Master Builders → **Strategy** table with two rows:

- the verbatim `.xlsm` (status: `source-only` for the binary)
- the `.source.md` mirror + partner doc (status: `partnered`)

Plus a one-line callout at the top of that brand's Strategy section noting this `.xlsm` is the **canonical family-of-sites master plan** and is the first reference any new Cochrane spin-off site must consult.

### Out of scope

No frontend changes. No new routes, components, tokens, motion, or SEO meta edits. No domain purchases or DNS changes. No edits to the `.xlsm`. The `.source.md` is a 1:1 textual mirror of cell contents only — no synthesis, no opinions, no reordering.