# Performance-Only Decision Routing — CMB

## Goal

Make Core Web Vitals enforceable for Cochrane Master Builders via a dedicated partner authority that routes every performance-impacting decision (assets, scripts, fonts, images, third parties) through a strict, design-neutral checklist. Design tokens, archetypes, and visual rules from files 12 & 13 are untouched.

## Deliverables

### 1. Re-embed source under CMB scope (byte-for-byte)

Use `node scripts/source-docs/capture-source.mjs` to copy:

- From: `src/master/knowledge/source-documents/performance/react-vite-performance-engineer-persona.source.md`
- To:   `src/master/knowledge/source-documents/brands/cochrane-master-builders/performance/react-vite-performance-engineer-persona.source.md`

This produces a sibling `.sha256` and updates `.integrity/manifest.json`. Validates via `node scripts/source-docs/validate-source-docs.mjs`. No edits to the original.

### 2. New CMB partner authority — file 14

Path: `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/v2/14_performance_decision_routing.partner.md`

Sits next to `11_performance_accessibility_governance.partner.md` but plays a different role: 11 = governance posture; 14 = decision router with hard numeric budgets and a routing tree that every PR must pass.

Structure (~700–900 lines):

1. **Authority header** — upstream source SHA, scope (CMB only), non-goals (explicitly: "this document does NOT change design — see files 12 & 13 for visual rules; if a perf fix would change design, it is rejected and the request is escalated").
2. **Tighter premium CWV budgets** (hard floors, not targets):
   - LCP < 2.0s (mobile 4G), CLS < 0.02, INP < 150ms, TBT < 150ms, TTFB < 600ms.
   - JS shipped per route < 170 KB gz, CSS < 60 KB gz, hero image ≤ 140 KB AVIF, total route weight ≤ 900 KB.
   - Font payload ≤ 80 KB total (subset, woff2, two families max — Space Grotesk + Jost).
3. **Decision routing tree** — flowchart in ```text``` ASCII: New asset / new script / new third party / new font weight / new animation → routed to allow / conditional / deny with the exact owner.
4. **Allow / Conditional / Deny matrices** for: images, video, fonts, JS libs, CSS, animations, third-party tags, analytics.
5. **Design-neutrality clause** — any optimisation must preserve files 12 & 13 outputs pixel-equivalent at 390/768/1280/1920. Lists forbidden "optimisations" (removing a section, swapping the hero, killing motion, downgrading typography).
6. **Per-route budget table** — homepage, service detail, community detail, contact. Each row: LCP target, JS gz cap, image cap, font cap.
7. **Build-time gates** — Lighthouse CI thresholds, bundle-size check (size-limit), `vite build` chunk analysis rules, image audit (any `>140KB` hero blocks merge).
8. **Runtime gates** — RUM thresholds, alerting rules.
9. **Pass/Fail audit checklist** (~25 items, mirror file 13's format).
10. **Auditor ripgrep bundle** (~10 patterns) — e.g. unsubsetted fonts, unoptimised `<img>` without `loading="lazy"` outside hero, `import` of known-heavy libs (moment, lodash full), inline `<script>`, third-party domains not on allowlist.
11. **Escalation chain** — when a perf fix would violate design: route to design owner, never auto-apply.
12. **Sign-off chain** — performance lead → design lead (neutrality check) → brand lead.

### 3. Index + governance updates

- Append entry 14 to `00_master_style_guide_v2_overview.partner.md` with one-line scope and "design-neutral" tag.
- Register source + partner in `src/master/knowledge/INDEX.md`.
- Append to `.lovable/plan.md`.

### 4. Validation

Run `node scripts/source-docs/validate-source-docs.mjs` and confirm green before finishing.

## Out of scope

- No code changes to components, tokens, or build config. File 14 only declares the budgets and routing; wiring Lighthouse CI / size-limit is a separate follow-up.
- No edits to files 11, 12, 13, or the original persona source.
