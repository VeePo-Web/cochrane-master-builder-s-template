## Plan: Embed `7._cochrane_masters_all_115_performance_audit_specs.xlsx` as the per-site Performance / Audit Spec companion

Sixth file in the Cochrane family-of-sites paired set. Same 116-row spine joined on `Master Row` to v1.0 (SEO/positioning) · v2.0 (services/pricing) · v4.0 (ICP brain) · v5.0 (color/UX) · v6.0 (UX experience). This file supplies the **per-site performance audit spec + specific optimization plan** — Core Web Vitals stance, asset/script/render strategy, trust + speed posture per site.

### Where it lives

```
src/master/knowledge/
  source-documents/brands/cochrane-master-builders/strategy/
    7.0_cochrane_masters_all_115_performance_audit_specs.xlsx        ← verbatim binary
    7.0_cochrane_masters_all_115_performance_audit_specs.source.md   ← verbatim 1:1 markdown mirror
  partner-documents/brands/cochrane-master-builders/strategy/
    7.0_cochrane_masters_all_115_performance_audit_specs.partner.md
```

(Filename normalized to `7.0_…` to match v1.0 / v2.0 / v4.0 / v5.0 / v6.0 numbering.)

### Sheet inventory (1 sheet · 116 rows × 3 cols, captured verbatim)

`Performance Specs` columns:

1. **Master Row** — join key.
2. **Recommended Domain** — same `.ca` domain (must stay in sync across all six files).
3. **Performance Audit Spec Write-Up / Specific Optimization** — per-site narrative covering posture (clean/fast/local/trustworthy), Core Web Vitals targets, asset/script/render strategy, mobile-first plan.

### Partner document — what it tells the system

- **Title:** Cochrane Masters — All-115 Performance Audit Spec Companion.
- **Category:** brands → cochrane-master-builders → strategy → per-site performance + Core Web Vitals direction (sixth file in the paired set).
- **Purpose:** Canonical per-site **performance posture + audit spec**. The "speed, weight, and Core Web Vitals" leg of the remix hexapod (v1.0 SEO · v2.0 Services/Pricing · v4.0 ICP Brain · v5.0 Color/UX · v6.0 UX Experience · **v7.0 Performance**). Must be reconciled against the cross-brand React/Vite Performance Engineer persona before being shipped as actual budgets / config / code.
- **What it influences:**
  - Per-site performance budgets (LCP / INP / CLS targets, JS/CSS/image weight ceilings).
  - Asset strategy (image formats, responsive crops, lazy-loading rules, font subsetting).
  - Render strategy (above-the-fold simplicity, hydration discipline, deferred third-party scripts).
  - Mobile-first posture (4G budget, touch latency, network-aware behavior).
  - Trust + speed pairing (no perf move that costs the trust/legitimacy posture from v4.0/v6.0).
  - Audit checklists for each spin-off (what Auditor mode must verify before launch).
- **Triggers — when to consult:** *performance, speed, Core Web Vitals, LCP, INP, CLS, TTFB, page weight, bundle size, image optimization, lazy load, font loading, hydration, third-party scripts, render blocking, perf budget, audit, lighthouse, mobile speed, 4G, network-aware, perf checklist.*
- **Adaptation rules / firewall:**
  - Brand context = **Cochrane Master Builders** only. No automotive vocabulary firewall.
  - These are **directional posture specs**, not finished perf budgets. Reconcile against the cross-brand React/Vite Performance Engineer persona and the locked memories (Hero Section Lock, Motion Philosophy, Loading Sequence, Cloth Wipe, Parallax Coverage Specs, Booking Modal Architecture).
  - **Hard rule (inherited from Performance Engineer source):** never alter design, layout, motion, copy, or hierarchy as a side-effect of performance work.
  - **Per-site only** — never blend rows. Always look up by `Master Row`.
  - **Join discipline:** any per-site work must reference the same `Master Row` across all six files. Drift in `Recommended Domain` between any two = Sync Discrepancy.
  - **Backend intelligence only.** Embedding does not change any front-end output. VeePo / Masters Detailing front-end stays untouched and no Cochrane spin-off sites currently exist in this codebase.
- **Mode-OS pairing:**
  - **Architect** — uses the row's perf spec when scaffolding the perf budget, asset strategy, and render plan for a new spin-off.
  - **Mapper** — can render per-cluster perf-posture matrices or per-site critical-render-path flows.
  - **Auditor** — pressure-tests built sites against (a) the row's perf spec and (b) the cross-brand Performance Engineer's 11-section playbook. Failing the row's stated posture = **High** bug; failing CWV thresholds = **Critical**.
- **Dependencies:**
  - **Paired set (consult together):** v1.0 · v2.0 · v4.0 · v5.0 · v6.0 · **v7.0 (this file)**.
  - Cross-brand: React 18 + Vite Performance Engineer persona, Premium Scroll Animation persona (motion budget), Mobile Wrapping persona (4G budget), Image SEO + Local Visibility persona (image format/sitemap), the 3-mode OS personas.
  - Cochrane brand-identity: `1.2.1`, `1.2.2`. Cochrane UX: `1.3.1`.
- **Guidance type:** Brand-global for Cochrane Master Builders only.
- **Practical examples:**
  - *"What's the perf budget for the Basement Suite Masters site?"* → Pull the row's posture; reconcile with Performance Engineer 11-section playbook.
  - *"Audit this spin-off's CWV."* → Compare measured LCP/INP/CLS vs. row spec; classify gaps via Auditor.
  - *"Should we lazy-load the hero image?"* → Hero Section Lock + row's render strategy decide; Performance Engineer enforces no design-side-effect rule.

### INDEX update

- Extend the family-of-sites callout to **six paired files** (v1.0 · v2.0 · v4.0 · v5.0 · v6.0 · **v7.0 perf audit specs**); all six joined on `Master Row`; drift = Sync Discrepancy.
- Add two rows for the new `.xlsx` (`source-only`) and `.source.md` + partner (`partnered`).
- Keywords: *performance, speed, Core Web Vitals, LCP, INP, CLS, TTFB, page weight, bundle size, image optimization, lazy load, font loading, hydration, third-party scripts, render blocking, perf budget, audit, lighthouse, mobile speed, 4G, network-aware, perf checklist, trust + speed.*

### Out of scope

No frontend changes. No edits to the `.xlsx`. The `.source.md` is a 1:1 cell mirror — no synthesis. No actual perf budgets, configs, or code shipped from this embed; it only powers future perf decisions.