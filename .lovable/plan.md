# Embed the World-Class SEO FAQ Optimization Persona

## What this document is

A 14-page page-by-page FAQ optimization playbook titled **"World-Class SEO FAQ Optimization Persona and Instructions."** It is the **operational companion** to the general SEO virtuoso persona embedded in the previous turn — narrower in scope (FAQs only), deeper in detail. Contents:

- A 50-year Victorious-SEO veteran persona (same archetype as the general SEO doc, scoped to FAQ work)
- **8 core principles** (people-first/data-driven, one-intent-per-question, concise complete answers, structural integrity & crawlability, schema compliance & moderation, local & voice search, performance/accessibility/UX, continuous improvement)
- **10 numbered sections** covering: strategy, discovery (with intent-bucket table), question selection, answer development, FAQ placement & site architecture, FAQPage JSON-LD schema rules, local + voice search, performance/UX/accessibility, monitoring & iteration, ethics & compliance, and a 10-step process workflow
- A 5-row HTML `<table>` of intent buckets (Informational, Transactional, Navigational, Local, Edge Cases)
- A trailing operational instruction block (Cochrane subdomain step) — same leftover from `dev.veepo.ca` as the previous SEO doc

This is **the canonical reference for any FAQ work** in the codebase: which questions to include, how to write answers, where to place them, how to schema-mark them, how to monitor them.

## Where it goes

```text
src/master/knowledge/
├── source-documents/
│   └── experience-prompts/
│       └── seo-faq-optimization-persona.source.md      ← NEW (verbatim)
└── partner-documents/
    └── experience-prompts/
        └── seo-faq-optimization-persona.partner.md     ← NEW (interpretation)
```

Filed under `experience-prompts/` next to `seo-virtuoso-persona.*` because it's the same persona archetype scoped to a specific function. Not a new `faq/` folder — that would fragment the SEO methodology.

## Files to create (2)

### 1. `seo-faq-optimization-persona.source.md`

- Standard immutability frontmatter (`status: IMMUTABLE`, `do-not-edit: true`, `verbatim: true`, `origin-file: General_SEO_FAQ_prompt_page_by_page_refer_to_checklist_on_dev.veepo.ca-2.docx`, `source-format: docx`, `embedded-on: 2026-04-26`, `layer: source`, `category: experience-prompts`, `cross-cuts: seo, faq`).
- Standard DO-NOT-EDIT banner.
- Full verbatim text of all 14 pages preserved exactly, including:
  - The intent-bucket HTML `<table>` (5 rows) — kept as-is, not converted to markdown
  - The `<mark>...</mark>` tags around schema names (`FAQPage`, `Question`, `Answer`, `LocalBusiness`, `QAPage`)
  - All duplicated heading-fragment artefacts ("Local Search Relevance levance", "Analytics Analytics", "Variables Variables", "Inclusions Inclusions", "Duplication lication", "Grouping 3 Grouping", "User Interface Interface", "Page Load 1 Page Load", "Usability Usability", "Impressions Impressions", "Categorization ategorization", "Ethical Considerations ical Considerations", "Accessibility Accessibility", "Transparency Transparency", "Structured Structured")
  - The mixed bullet glyphs (`-`, `*`, `1.`, `■`, indented sub-bullets)
  - The "Lovable.dev" brand references
  - The trailing italicized Cochrane-subdomain operational instruction
  - The non-ASCII smart quotes / em-dashes

### 2. `seo-faq-optimization-persona.partner.md`

12-section partner template tailored to FAQ work:

1. **Title** — World-Class SEO FAQ Optimization Persona & Page-by-Page Instructions
2. **Category** — `experience-prompts/`, cross-cuts `seo` + `faq` + `forms` (FAQ accordion components touch UI)
3. **Main purpose** — install the operational FAQ playbook for any agent doing FAQ work on any brand. Defines question discovery, answer framework, placement rules, JSON-LD schema, voice/local optimization, performance budgets, accessibility, monitoring.
4. **What it influences** —
   - Which questions appear on which page (page-specific vs site-wide)
   - The exact answer structure (1-2 sentence direct answer → context → factors/ranges → CTA)
   - FAQ section placement, heading hierarchy (`<h2>` for section, `<h3>`/`<h4>` for questions)
   - The accordion/disclosure UI pattern (lightweight `<details>`/`<summary>` preferred; full HTML render even when collapsed)
   - `FAQPage` JSON-LD blob construction & validation
   - Internal linking from FAQ answers to deeper pages
   - Canonical-page assignment for repeated questions
   - 15-40 question count per service page
   - Top 5-8 FAQs expanded by default, rest rendered in HTML
   - Local intent modifiers ("near me", "in Cochrane")
   - Voice-search phrasing (conversational questions)
5. **Trigger prompts** — extensive list:
   - "add an FAQ section to…", "FAQ block on the homepage"
   - "FAQPage schema", "FAQ JSON-LD", "structured data for FAQs"
   - "what questions should we include", "FAQ question list", "discovery for FAQs"
   - "rewrite this FAQ answer", "FAQ tone", "FAQ voice"
   - "FAQ accordion", "collapsible FAQ", "expand-by-default FAQs"
   - "FAQ for the Cochrane page", "FAQ for the Areas-We-Serve page"
   - "categorize FAQs", "FAQ jump links", "FAQ table of contents"
   - "voice search FAQ", "AI Overview FAQ"
   - "duplicate FAQs across pages", "FAQ canonical"
   - "monitor FAQ performance", "FAQ Search Console"
6. **Scope of application** — backend FAQ structure + content selection + JSON-LD, plus the *structural* (not stylistic) requirements of the FAQ UI (lightweight component, full HTML render, ARIA on disclosure widgets, visible top FAQs, mobile responsive, WCAG 2.1). Does NOT govern the *visual* design of FAQ accordions — that belongs to the design partner docs.
7. **Output-quality direction** — Victorious-SEO discipline; AI-citation-aware (FAQs are prime GEO real estate even though Google rich-result display has been restricted since Aug 2023); WCAG 2.1; Core Web Vitals safe; conversion-aware (every answer ends with a CTA / next step).
8. **Brand / ICP relationship** — for Cochrane Master Builders:
   - Question phrasing must reflect how Cochrane homeowners actually search (pull from `cmb-seo-1.1` keyword research)
   - Answer voice must match `cmb-brand-1.2.2` ("Strong Foundations For Those Who Come After Us" — generational, plainspoken, no jargon)
   - Audience-specific question selection: Mothers (`cmb-persona-1.4.2`) → pricing transparency, scheduling sensitivity, mess/disruption, safety; Grandfathers (`cmb-persona-1.4.3`) → warranty, longevity, plainspoken pricing, phone CTA in CTA slot; Subcontractors (`cmb-persona-1.4.1`) → onboarding, license/insurance upload, payment terms
   - Local modifiers: "in Cochrane", "Bow Valley", "Rocky View County", "Calgary CMA"
   - Geo-specific question example from the source ("How do I prepare my Calgary home for winter?") → translates naturally to Cochrane equivalents (winter readiness for Cochrane / Bow Valley climate, snow-load engineering, etc.) — **note in partner only, not source**
9. **Global vs specific** —
   - **Wins over** the general SEO virtuoso persona on FAQ-specific tactics (15-40 question count, the 4-part answer framework, FAQPage schema rules, accordion implementation, monitoring metrics specific to FAQs)
   - **Inherits from** the general SEO virtuoso persona on overarching methodology (E-E-A-T, GEO, what-not-to-do)
   - **Loses to** ICP partner docs on tone of answer copy
   - **Loses to** brand-identity partner docs on voice register
10. **Adaptation notes (conflict rule applied — verbatim source preserved)**:
    - **"Lovable.dev"** → substitute Cochrane Master Builders Corp. for this codebase
    - **"Calgary" example questions** ("How do I prepare my Calgary home for winter?") — applicable to this codebase since CMB's service area includes the Calgary CMA. For Cochrane-specific FAQs, prefer "Cochrane" as the primary modifier with Calgary as secondary.
    - **August 2023 Google rich-result restriction** — still accurate at time of embedding; the persona correctly notes that schema remains valuable for voice + AI synthesis even if rich snippets don't display. Apply as written.
    - **Trailing Cochrane-subdomain operational instruction** — leftover from a prior `dev.veepo.ca` conversation; **knowledge-only**, does not authorise a frontend FAQ pass on this codebase. If the user asks for the Cochrane FAQ pass later, that's a separate, deliberate scope.
    - **Source-side typos / duplicated heading fragments** — paste artefacts; preserved per immutability rule. Read past them.
    - **Intent-bucket HTML `<table>`** — preserved as raw HTML in markdown so the structure survives. Render as a 5-row table when consulting.
    - **References to "Calgary" in geo examples** — already on-region for Cochrane Master Builders; no substitution needed.
    - **`■` (black square)** bullet glyph in section 5.2 — kept verbatim; treat as a third-level bullet.
11. **Dependencies / related documents**:
    - `governance/knowledge-system-charter` — P0 governance (always)
    - `experience-prompts/seo-virtuoso-persona` — P0 SEO methodology this FAQ playbook operates inside of
    - `brands/cochrane-master-builders/seo-research/1.1_…` — Cochrane keyword + AI-Overview research (the *what* the questions should target)
    - `brands/cochrane-master-builders/strategy/1.3_…` — Areas-We-Serve taxonomy (which location FAQs to add)
    - `brands/cochrane-master-builders/brand-identity/1.2.2_…` — voice/tone for answer copy
    - `brands/cochrane-master-builders/personas-icp/1.4.1/1.4.2/1.4.3` — audience-specific question selection
    - `brands/cochrane-master-builders/ux-design/1.3.1_…` — confirms accordion UI pattern is on-brand
    - **Mem note:** `mem://design/booking-modal-architecture` (or wherever FAQ-component design lives) when FAQ component visual styling comes up
12. **Practical examples** — three:
    - **A.** "Add an FAQ section to the Cochrane custom-home services page" → discovery (PAA + Search Console + sales calls per source §2.1) → 15-40 questions (source §2.3 rule 4) → cluster by intent-bucket table → 4-part answer framework → top 5-8 expanded → `<details>/<summary>` for the rest → `FAQPage` JSON-LD matching visible text exactly → cross-link to /service-areas, /portfolio, /about → measure in Search Console
    - **B.** "We have a global FAQ on /faq and the same question on /custom-homes — what do we do?" → source §4.1 rule 3 + §4.2 → /faq is canonical, /custom-homes gets a shorter variant + descriptive anchor link
    - **C.** "Our FAQ accordions are slow / cause CLS" → source §4.4 + §7.1 → swap heavy library for `<details>/<summary>`, lazy-load any embedded media, ensure full HTML rendering
    - **D. (bonus)** "The user asks for FAQ rich results in Google" → source §5.4 → set expectation: since Aug 2023, Google only shows them for gov/health; schema is still valuable for voice + AI synthesis

## Index update

Add a row to the existing **Experience Prompts (cross-brand) Personas** section in `INDEX.md`:

```text
| `source-documents/experience-prompts/seo-faq-optimization-persona.source.md` | Markdown (verbatim DOCX) | partnered | World-class SEO FAQ optimization playbook (8 principles + 10-section process + intent buckets + FAQPage JSON-LD rules + voice/local + performance + monitoring) |
```

## Deliberately NOT changing

- **No frontend touched.** The trailing Cochrane-subdomain instruction is knowledge-only, just like in the previous SEO doc embed.
- **No router schema widening** (`decision-index.ts` stays brand-locked to `cochrane-master-builders`). FAQ persona is brand-agnostic; discoverable through `INDEX.md`.
- **No edits to existing source/partner files** including the SEO virtuoso persona embedded in the previous turn.
- **No Supabase, no edge functions, no UI components.**

## After this turn

When you (or any agent) asks anything about FAQs — building one, writing answers, schema, accordion implementation, what questions to include, voice search, performance — the system reads:

1. `governance/knowledge-system-charter` (how to use knowledge)
2. `experience-prompts/seo-virtuoso-persona` (overarching SEO methodology)
3. `experience-prompts/seo-faq-optimization-persona` (FAQ-specific tactics) ← **this embed**
4. `brands/cochrane-master-builders/seo-research/1.1_…` (Cochrane keywords)
5. The active ICP doc for tone

Result: every FAQ on this codebase will be page-by-page Victorious-SEO grade, AI-citation-friendly, and bespoke to Cochrane Master Builders' voice and audience.
