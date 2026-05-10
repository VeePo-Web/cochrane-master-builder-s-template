## Goal

Embed the **Universal Website Copywriting Template Plan** PDF as a foundational backend doc (matching how the wireframe was treated last turn), author a sibling Mode-OS persona — the **Master Copywriter** — and then *begin writing* the actual universal base copy manuscript that every Cochrane spin-off site remixes from.

Backend-only. No edits to the live VeePo / Masters Detailing front end.

---

## Files to create

### 1. Source (binary, verbatim)
`src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/universal_website_copywriting_template_plan.pdf`
- Direct copy of the upload. Immutable.

### 2. Source (markdown mirror)
`src/master/knowledge/source-documents/brands/cochrane-master-builders/strategy/universal_website_copywriting_template_plan.source.md`
- 1:1 verbatim text via `pdftotext -layout`. Page markers preserved.

### 3. Partner doc — foundational (copy axis)
`src/master/knowledge/partner-documents/brands/cochrane-master-builders/strategy/universal_website_copywriting_template_plan.partner.md`

Promotes this plan to **foundational status as the COPY axis** of the system, sitting on top of the wireframe (structural axis) the way v1.0–v10.0 sit on the content/style axis.

Contents:
- **Role**: canonical copy framework — message structure, section purpose, emotional goal, customer psychology, voice/tone, microcopy, SEO meta patterns, word counts. Sits *on top of* the wireframe — wireframe defines section *positions*, this defines section *words*.
- **Triggers**: "write the hero", "headline", "subhead", "CTA", "microcopy", "tone of voice", "FAQ copy", "pricing intro", "process step copy", "legacy block", "areas-we-serve copy", "title tag", "meta description", "service-category copy angle" (Roofing/Tile/Decks/Concrete/Renovations etc.), "what should this page say".
- **Joins**: pairs 1:1 with the wireframe partner doc (every wireframe section has a copy-template counterpart here); reads voice/fears from v4.0 ICP brain; respects v10.0 style guide; respects brand-identity 1.2.1/1.2.2 anchor ("Strong Foundations For Those Who Come After Us").
- **Adaptation rules**: Cochrane Master Builders only; automotive firewall; never use banned words ("cheap", "lowest price", "world-class" overused, "guaranteed" unless legally true, vague "quality/excellence/solutions" without proof); always lean on the master-narrative arc (Problem → Empathy → Insight → Transformation → Proof); always answer the one customer question — *"Can I trust this company with something my family, property, money, or future depends on?"*
- **Universal copy variables** registered: `[Brand Name]`, `[Service]`, `[Service Category]`, `[Primary Customer]`, `[Main Outcome]`, `[Pain Point]`, `[Community]`, `[Price Range]`, `[CTA]`.
- **Section index** with line refs back into `source.md` (Trust Bar → Hero → Trust Strip → Services → Pricing → Process → Legacy → Proof → Areas → FAQ → Final CTA → Footer + Services / Pricing / Process / Areas / About / Contact / FAQ / Projects / Blog page templates + Service Category Copy Angles + Microcopy System + SEO Meta Patterns + Word Count Targets).
- **Mode-OS pairing**: Master Copywriter (Architect mode of copy), Mapper (renders cluster × section copy matrix), Auditor (verifies against banned words, voice attributes, master message presence, word counts).

### 4. Persona brief — Master Copywriter
`src/master/knowledge/partner-documents/experience-prompts/master-copywriter-persona.partner.md`

A new Mode-OS persona, sibling to Template Architect / Fantasy Design / SEO Virtuoso / Anti-Gravity / Systems Architect / Mapper / Auditor.

Contents:
- **Identity**: 50+ years in conversion-grade local-service copy; fantasy.co studio lineage; owns the universal copy template.
- **Mandate**: produce per-site *copy specs* on top of the per-site *structural specs* the Template Architect emits.
- **Inputs it consults**: copy template partner doc (this), wireframe partner doc, v1.0/v2.0/v4.0/v5.0/v6.0/v9.0/v10.0, communities registry, brand-identity 1.2.1/1.2.2, UX 1.3.1, sibling personas.
- **Output contract** (per page): Headline option set (3) → Subhead → Body slots → CTA primary + secondary → trust microcopy → meta title + description → word-count check → banned-word check → master-message echo confirmation.
- **Service-category overlays**: Custom Homes / Renovations / Roofing / Concrete / HVAC / Repairs / Tile / Decks / Landscaping / Basement Suites — each with the unique fear, outcome, and copy angle pulled verbatim from §"Service Category Copy Angles" in source.
- **Guardrails**: hard NOs (cheap, lowest price, generic SEO contractor language, hard sell, hyped guarantees, unsupported superlatives, automotive editorial voice).
- **Mode-OS pairing**: works in Architect-of-Copy mode → hand off to Mapper (matrix renders) and Auditor (banned-word + voice + master-message audit).

### 5. **Start writing** — Universal Base Copy Manuscript
`src/master/knowledge/partner-documents/brands/cochrane-master-builders/copy/universal_base_copy_manuscript.partner.md`

This is the **remix base** the user asked for. A complete, generic-with-variables manuscript covering the homepage end-to-end + the 9 sub-page templates (Services / Pricing / Process / Areas / About / Contact / FAQ / Projects / Blog), written in the master voice, slotted with `[Variables]` so any of the 115 spin-offs can be produced by find-and-replace + per-site polish.

Structure:
- Homepage manuscript: Trust Bar → Hero (3 headline options + subhead + 2 CTAs + trust microcopy) → Trust Signal Strip (4 cards) → Services (intro + 6 sample cards) → Pricing Transparency (intro + 3 tier cards) → Process (5 steps) → Legacy Block (3 headline options + body) → Project Proof (intro + card template) → Areas We Serve (intro + cluster lists) → FAQ (intro + 8 starter Q&A) → Final CTA (3 options + body + dual CTA) → Footer (brand line + 4 columns + slogan).
- Sub-page manuscripts: each gets hero options + intro + section-by-section copy slots per the source template.
- Microcopy system: button library, form labels, helper text, error messages, success states.
- SEO meta library: Title tag patterns, meta descriptions, OpenGraph patterns.
- Word-count compliance notes per section (35–70 / 15–30 / 100–180 etc.).
- Master message echo distributed across at least 4 sections per the rule.

Length budget: aim for ~600–900 lines of copy markdown. No code, no React, no styling decisions.

### 6. INDEX updates
`src/master/knowledge/INDEX.md`
- Strategy: extend the existing Foundational callout to acknowledge a **two-axis foundation** (wireframe = structural; copy template = copy). Add 2 rows for the new pdf + source.md.
- Add a new **### Copy** subsection under Cochrane Master Builders pointing at the manuscript file.
- Cross-brand experience-prompts table: add the Master Copywriter persona row.

### 7. Plan log
`.lovable/plan.md` — append note.

---

## Out of scope

- No edits to `src/`, React, Tailwind, index.css, or any front-end code.
- No edits to v1.0–v10.0, communities registry, wireframe doc, or any prior file.
- No per-site (per-Master-Row) drafts yet — just the **universal remix base manuscript**. Per-site drafts are a future invocation of the Master Copywriter persona.
- No new routes; no scaffolding.

---

## Acceptance

- New PDF + source.md mirror present and verbatim.
- Foundational copy partner doc references the wireframe and the v1.0–v10.0 stack.
- Master Copywriter persona present in experience-prompts.
- Universal base copy manuscript present and ready to remix (variables in `[brackets]`, master message echoed, banned words absent).
- INDEX.md lists all four new files.
- Live preview byte-identical to before.

## Universal Website Copywriting Template Plan — embedded as FOUNDATIONAL COPY axis (build mode)
- Copied PDF verbatim → `source-documents/.../strategy/universal_website_copywriting_template_plan.pdf`
- Wrote 1:1 markdown mirror → `.../universal_website_copywriting_template_plan.source.md`
- Authored foundational COPY-axis partner brief → `partner-documents/.../strategy/universal_website_copywriting_template_plan.partner.md` (One Customer Question, master narrative arc, voice, banned words, variables, joins, section index)
- Authored Master Copywriter Mode-OS persona → `partner-documents/experience-prompts/master-copywriter-persona.partner.md` (per-page output contract, service-category overlays, hard NOs, activation phrases, Mode-OS handoffs)
- BEGAN WRITING the universal base copy manuscript → `partner-documents/brands/cochrane-master-builders/copy/universal_base_copy_manuscript.partner.md` (full homepage + 9 sub-pages + service-category overlays + microcopy + SEO meta + word counts + master-message echo + audit checklist; variables in [brackets] for find-and-replace remix)
- INDEX.md: extended Strategy Foundational callout to "two-axis spine" (structural + copy), added 2 strategy rows, added new ### Copy subsection with manuscript row, added Master Copywriter persona row in cross-brand experience-prompts table
- No frontend changes; VeePo / Masters Detailing live preview unchanged
