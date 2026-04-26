# Plan — Deepen the 10 Partner Docs Into Full Decision Rule Books

## Goal

Take each of the 10 existing `.partner.md` files (one per Cochrane source document) and expand them in place from lean route maps into **full decision rule books**. After this pass, opening any partner doc gives the AI everything it needs to recognize a decision, route to the right source, AND know the rules / anti-patterns / worked examples that govern that decision — without ever rewriting source content.

## Hard constraints (unchanged)

- Source docs under `source-documents/` stay byte-immutable. Never opened for write.
- Partner docs never reproduce source content. They route, rule, and exemplify — they do not paraphrase the source's actual material (positioning text, tagline candidates, persona quotes, keyword lists, etc.). When in doubt, the rule says "open the source and read section X" instead of restating it.
- Backend-only. No app code, no components, no configs touched.
- `DECISION_ROUTER.md` stays the master index; it does not need to change unless a new decision shape emerges from the deepening (then we append rows).

## New 12-section template (replaces current 7-section one)

Every partner doc gets restructured to:

1. **Source pointer** — (kept as-is)
2. **What this document is** — (kept as-is, tightened)
3. **Decision triggers** — expanded with concrete phrasing the AI can pattern-match against ("matches if the request contains: hero copy, headline, tagline, h1, sub-hero, promise, pitch, …")
4. **Decision types this doc DOES NOT govern** — (kept as-is, sharpened)
5. **How to read the source** — (kept) plus a "fast lookup" table mapping common triggers → which section/page of the source to read first
6. **Routing precedence** — (kept) plus a conflict-resolution example
7. **Cross-links** — (kept)
8. **Rules — non-negotiables this doc enforces** — numbered laws derived from the source's spirit, written as imperatives ("Never … Always … Prefer … Avoid …"). 6–14 per doc depending on scope. Each rule names the source section it traces back to.
9. **Anti-patterns** — concrete examples of what failure looks like for this decision domain (templated phrasing, generic stock images, density mistakes, persona mismatches). 4–8 per doc.
10. **Worked example** — one realistic decision walked end-to-end: trigger recognized → source section consulted → rules applied → output decision. Shows the AI exactly how to use this doc.
11. **AI prompts to run against the source** — 3–6 ready-made prompts the AI can use with `document--parse_document` output to extract exactly what it needs (e.g. "List every tone word and its forbidden synonym", "Extract the top 5 objections and their sanctioned answers"). Saves re-discovering the right question every time.
12. **Linkage to guard rails** — list which `GuardRailId`s from `src/master/guardrails.ts` this doc helps satisfy, and how. This stitches the partner-doc layer into the existing constitution layer.

## Per-doc scope (keeps each one focused)

| Partner doc | Rule-set focus | Approx rule count |
|---|---|---|
| `strategy/1.0` | Constitutional positioning, on-mission/off-mission test | 8 rules, 4 anti-patterns |
| `strategy/1.2` | Iterated positioning, pricing transparency posture, differentiation | 10 rules, 5 anti-patterns |
| `strategy/1.3` | Multi-trade backend, sister-site network, what inherits vs. what stays bespoke | 12 rules, 6 anti-patterns |
| `seo-research/1.1` | Keyword selection, meta structure, Areas-We-Serve depth, AI-search visibility, schema density | 14 rules, 8 anti-patterns |
| `brand-identity/1.2.1` | Voice register, family-language guardrails, palette derivation, type philosophy | 12 rules, 6 anti-patterns |
| `brand-identity/1.2.2` | Tagline cadence rules, mission phrasing, hero promise patterns | 10 rules, 6 anti-patterns |
| `ux-design/1.3.1` | Layout density, hierarchy, mobile defaults, footer arch, trust placement, form structure | 14 rules, 8 anti-patterns |
| `personas-icp/1.4.1` | Subcontractor B2B copy register, partner-portal UX, vendor-form rules | 10 rules, 5 anti-patterns |
| `personas-icp/1.4.2` | Mother-persona empathy, scheduling/safety/pricing transparency, trust selection | 12 rules, 6 anti-patterns |
| `personas-icp/1.4.3` | Grandfather-persona empathy, accessibility upshifts, motion restraint, plainspoken register | 12 rules, 6 anti-patterns |

Total new content: ~110 rules + ~60 anti-patterns + 10 worked examples + ~40 ready-made AI prompts.

## Authoring discipline (so we don't violate the no-rewrite rule)

For every rule and worked example, I will:
- Phrase rules as **imperatives the AI follows** ("Always X; never Y"), not as **content extracted from the source**.
- Cite source sections by *name/topic* ("see the voice register section"), not by quoting source prose.
- Use generic / illustrative copy in worked examples (e.g. "a hero for `/services/custom-home`"), never paste candidate taglines or persona quotes that live in the source.
- Anti-patterns describe failures in the AI's own outputs, not source content.

## What changes vs. what stays

Stays identical:
- All 10 source docs (untouched).
- `DECISION_ROUTER.md` content (router still works; new sections in partner docs only deepen the destination, not the routing).
- README.md workflow (still partner doc + router entry).
- Guard rails, checklist, playbooks, brand bible, configs — none touched.

Changes:
- All 10 `.partner.md` files rewritten in place using the 12-section template.
- README.md updated in one spot to mention the new 12-section template (so future partner docs follow it).

## Verification after build

- `find src/master/knowledge/partner-documents -name "*.partner.md" | wc -l` → still `10`.
- `grep -L "## 8. Rules" src/master/knowledge/partner-documents/**/*.partner.md` → expect empty (every doc has the new sections).
- `grep -L "## 12. Linkage to guard rails" …` → expect empty.
- Source tree byte-identical: `find src/master/knowledge/source-documents -type f -newer /tmp/marker` → expect empty after touching a marker first.
- Spot-check 2 docs end-to-end for a worked example that doesn't paraphrase source content.

## Out of scope (call out so we don't drift)

- No changes to checklists or guard rails.
- No new partner docs for the empty category folders (animations/, components/, etc.) — those wait until a source doc lands there.
- No machine-readable frontmatter yet (still keeping docs human-readable; can add YAML triggers later if you want auto-routing tooling).
- No edits to existing playbooks under `src/master/playbooks/`.
