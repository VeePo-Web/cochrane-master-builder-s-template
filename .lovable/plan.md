# Plan — Decision-Routing Partner Documents

## Goal

For every source document already embedded under `src/master/knowledge/source-documents/brands/cochrane-master-builders/`, create a matching **partner document** that does NOT contain or rewrite the source content. Each partner doc is a **decision-routing map**: a checklist of decision-types (triggers) that, when recognized, point the AI to that specific source document as the filter.

Plus a top-level `DECISION_ROUTER.md` so when the AI faces ANY decision it can scan one file, find the trigger that matches, and be routed to the right source doc(s).

**Hard constraints (per user):**
- Do NOT alter, summarize, or rewrite any file under `source-documents/`.
- Do NOT create supporting/derivative documents beyond the routing layer.
- Backend-only — no front-end changes.

## Folder layout (new)

Mirrors the existing source tree exactly, as already promised in `knowledge/README.md`:

```text
src/master/knowledge/
├── DECISION_ROUTER.md                       ← new master router
└── partner-documents/                       ← new tree
    └── brands/cochrane-master-builders/
        ├── strategy/
        │   ├── 1.0_..._Strategic_Business_SEO_UX_Report.partner.md
        │   ├── 1.2_..._Strategic_Business_SEO_UX_Report_1.partner.md
        │   └── 1.3_..._Backend_Strategy_Design_SEO_Legacy_Report_1.partner.md
        ├── seo-research/
        │   └── 1.1_..._Market_Competitor_AI_SEO_Research_Report_1.partner.md
        ├── brand-identity/
        │   ├── 1.2.1_..._Family_Legacy_Standard_1.partner.md
        │   └── 1.2.2_..._Foundations_For_Generations_After_Us_Report.partner.md
        ├── ux-design/
        │   └── 1.3.1_..._Bespoke_Traditional_UX_Design_Phase_Report.partner.md
        └── personas-icp/
            ├── 1.4.1_..._Subcontractor_ICP_UX_Report.partner.md
            ├── 1.4.2_..._Mothers_ICP_UX_Report.partner.md
            └── 1.4.3_..._Grandfathers_ICP_UX_Report.partner.md
```

Filename rule: `<exact-source-stem>.partner.md`. The `.partner.md` suffix makes the relationship unambiguous and grep-friendly.

## Partner document template

Every partner doc follows the same 7-section template so the AI can parse them uniformly:

1. **Source pointer** — relative path to the source doc, brand, category, format, version.
2. **What this document is** — one-paragraph orientation (no source content reproduced; only what kind of intelligence the source holds).
3. **Decision triggers — when to consult this doc** — bulleted list of recognizable decision shapes. Each trigger is a phrase the AI can match against a request, e.g. "deciding hero copy for a service page", "choosing color contrast for headlines on photography", "writing meta titles for an Areas-We-Serve page", "designing the subcontractor onboarding form".
4. **Decision types this doc DOES NOT govern** — explicit out-of-scope list so the AI doesn't over-route.
5. **How to read it** — which section/page to jump to first for the most common triggers (e.g. "for tone questions, start at the voice section"). For binary files (PDF/DOCX), include the instruction to use `document--parse_document` first.
6. **Routing precedence** — when this doc conflicts with another, which wins. Default rules: brand-identity wins on voice/visual; strategy wins on positioning; SEO research wins on keywords/areas; persona docs win on audience empathy; UX design wins on layout/flow.
7. **Cross-links** — sibling partner docs to consult alongside this one for the same decision.

## DECISION_ROUTER.md (master index)

A single top-level routing table. Two sections:

- **By decision type** — alphabetized list of decision shapes (e.g. "Areas-We-Serve page structure", "Brand voice on a hero", "Color palette derivation", "Form copy for trade-vendor onboarding", "Mother-persona empathy in copy", "Trust signals on legal pages") → list of partner docs to consult, in order.
- **By source doc** — link to every `.partner.md` with its one-line label (mirrors the existing `INDEX.md` rows).

The router does NOT replace `INDEX.md`; `INDEX.md` stays the registry of *what's embedded*, the router governs *what to consult when*.

## Per-document trigger drafts (so the user can sanity-check coverage now)

| Source doc | Primary decision triggers it owns |
|---|---|
| `1.0` Strategic Business SEO UX (top-level) | overall positioning, what business CMB is in, North Star, big-picture site purpose |
| `1.2` Strategic Business SEO UX (v1.2) | iterated positioning + revised SEO/UX direction; use when 1.0 and 1.2 disagree → 1.2 wins |
| `1.3` Backend Strategy / Design / SEO / Legacy | backend taxonomy, multi-trade architecture decisions, legacy framing, sister-site strategy |
| `1.1` Market + Competitor + AI SEO Research | keyword choices, competitor framing, AI-search visibility, Areas-We-Serve seed list, SERP intent |
| `1.2.1` Family Legacy Standard | brand voice on legacy/heritage, family-language guardrails, generational tone words |
| `1.2.2` Foundations For Generations After Us | tagline derivations, mission-statement copy, "promise to the next generation" framing |
| `1.3.1` Bespoke Traditional UX Design Phase | layout density, traditional/editorial UX pattern selection, when to choose restraint over flash |
| `1.4.1` Subcontractor ICP + UX | trade-vendor onboarding flows, B2B copy, partner-portal decisions, subcontractor empathy |
| `1.4.2` Mothers ICP + UX | family-buyer empathy, safety language, scheduling sensitivity, home-as-sanctuary copy |
| `1.4.3` Grandfathers ICP + UX | legacy-buyer empathy, plainspoken copy, trust signals weighted toward longevity, large-tap targets |

## Files to create (count: 11)

- `src/master/knowledge/DECISION_ROUTER.md`
- 9 × `*.partner.md` files mirroring each source doc above
- A short note appended to `src/master/knowledge/README.md` pointing to `DECISION_ROUTER.md` and explaining the partner-doc convention (the README already promised `partner-documents/` would mirror the source tree — this satisfies that promise).

## Files NOT touched

- Anything under `source-documents/` — untouched, byte-identical.
- `INDEX.md` — left as the embedding registry (no schema change needed for this round).
- All app code, configs, components, personas, playbooks, guard rails, checklist.

## Verification after build

- `find src/master/knowledge/partner-documents -name "*.partner.md" | wc -l` → expect `9`.
- Each partner doc references its exact source path (grep test).
- `DECISION_ROUTER.md` links every partner doc at least once.
- No diff inside `source-documents/`.

## Open question (will ask after approval if needed)

If the user later wants the trigger keywords machine-readable (so a future tool could auto-route), we can add a YAML frontmatter block per partner doc in a follow-up pass. Not in scope for this round to keep the docs human-readable and uncluttered.
