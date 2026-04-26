# Embed the General SEO Persona & "What Not To Do" Checklist

## What this document is

A 7-page persona + checklist titled **"General SEO Prompt — use checklist from Dev.veepo.ca"**. It defines:

- A 50-year-veteran SEO persona (Victorious-SEO senior strategist), E-E-A-T obsessed
- **15 core principles** (people-first content, separation of concerns, technical excellence, crawlability, Core Web Vitals, structured data, content structure, on-page metadata, heading hierarchy, internal/external linking, GEO for AI search, link building, local/international SEO, analytics, ethics)
- A comprehensive **"what not to do" checklist** (keyword stuffing, cannibalization, plagiarism, thin content, doorway pages, hidden text, slow speed, broken links, bad canonicalization, missing HTTPS, generic anchor text, missing alt text, link spam, orphan pages, intrusive ads, etc.)
- A **5-step working process** (Audit → Plan → Implement → Measure → Communicate)
- A trailing operational instruction about the Cochrane subdomain and a "collapsible FAQ" bug — clearly leftover context from a prior `dev.veepo.ca` conversation. Per the governance charter, this stays verbatim in the source and is addressed in the partner doc.

This is **the most important SEO governance document in the corpus** — broader than the existing brand-specific `cmb-seo-1.1` (which is about CMB market/competitor/AI-SEO research). This one is the *methodology* the SEO persona uses on any brand.

## Where it goes

```text
src/master/knowledge/
├── source-documents/
│   └── experience-prompts/
│       └── seo-virtuoso-persona.source.md      ← NEW (verbatim)
└── partner-documents/
    └── experience-prompts/                      ← NEW folder
        └── seo-virtuoso-persona.partner.md      ← NEW (interpretation)
```

Filing under `experience-prompts/` rather than a new `seo/` folder because it's a **persona/experience prompt** (50-year SEO virtuoso) — same shelf as the existing `master-design-persona-fantasy.source.md` and `anti-gravity-opening-engineer.source.md`. Domain-specific SEO research already lives correctly under `brands/cochrane-master-builders/seo-research/`.

## Files to create (2)

### 1. `source-documents/experience-prompts/seo-virtuoso-persona.source.md`

- Standard immutability frontmatter matching the other source files in this folder (`status: IMMUTABLE`, `do-not-edit: true`, `verbatim: true`, `origin-file: General_SEO_Prompt_use_checklist_from_Dev.veepo.ca-2.docx`, `source-format: docx`, `embedded-on: 2026-04-26`, `layer: source`, `category: experience-prompts`).
- Standard DO-NOT-EDIT banner, plus a one-line note that conflicts/adaptation (Lovable.dev → Cochrane Master Builders, dev.veepo.ca leftover Cochrane-step instruction, the collapsible FAQ bug request) live in the partner file.
- Full verbatim text of all 7 pages, including:
  - The duplicated section-title fragments (e.g. "People-First Content First Content", "Heading  ierarchy & Content Presentation", "Local  **Local & International SEO:**", "Audit  Audit & Research") — these are upload artefacts and are preserved per the immutability rule.
  - The `<mark>...</mark>` tags around schema/attribute names.
  - The mixed bullet glyphs (`-`, `●`, `○`).
  - The trailing italicized instruction block about the Cochrane subdomain and the collapsible-FAQ bug.
  - The "mangools.com" inline citations.

### 2. `partner-documents/experience-prompts/seo-virtuoso-persona.partner.md`

Full 12-section partner template:

1. **Title** — General SEO Virtuoso Persona & "What Not To Do" Checklist
2. **Category** — `experience-prompts/` (also cross-cuts `seo`)
3. **Main purpose** — install the SEO methodology any agent should use when reasoning about technical SEO, on-page SEO, structured data, GEO/AI search, link building, or analytics — for *any* brand in the corpus.
4. **What it influences** — every backend SEO decision: meta tags, JSON-LD, robots.txt, sitemap.xml, canonicals, heading hierarchy, alt text, internal-linking maps, anchor-text choices, Core Web Vitals tuning, FAQ schema eligibility, redirect strategy, hreflang (if multilingual), AI-bot accessibility.
5. **Trigger prompts** — extensive list: "meta title for…", "should this be H1 or H2?", "add JSON-LD", "FAQ schema", "robots.txt", "sitemap", "canonical for…", "redirect chain", "Core Web Vitals", "LCP/INP/CLS", "AI Overview citation", "Perplexity visibility", "internal-linking plan", "anchor text", "alt text", "image format / WebP / AVIF", "hreflang", "local SEO", "Google Business Profile", "broken links audit", "duplicate content", "keyword cannibalization", "rich results test", "URL inspection", "page speed", "structured data validator".
6. **Scope of application** — global (cross-brand methodology). Specifically applies to every page route, every `<head>`, every JSON-LD blob, every image asset, every link, every form. Does NOT govern visible copy or visual design (the persona's own "Separation of Concerns" rule).
7. **Output-quality direction** — Victorious-SEO level technical precision; E-E-A-T obsession; AI-search-aware (GEO); zero-tolerance for the items in the "what not to do" checklist.
8. **Brand/ICP relationship** — this persona is brand-agnostic but must always be filtered through the active brand layer:
   - For Cochrane Master Builders: combine with `cmb-seo-1.1` (market/competitor/AI-SEO research), `cmb-strategy-1.0/1.2/1.3` (positioning), and the persona docs (`cmb-persona-1.4.1/1.4.2/1.4.3`) so that meta titles, FAQs, and JSON-LD ring true for mothers, grandfathers, and subcontractors in the Cochrane / Rocky View / Calgary CMA market.
   - Local SEO ≠ generic — must use real NAP, real service-area neighborhoods from `cmb-strategy-1.3`, and real warranty/license signals.
9. **Global vs specific** — global. P0 alongside the governance charter for any SEO question. Wins over `cmb-seo-1.1` on *methodology and don'ts*; loses to `cmb-seo-1.1` on Cochrane-specific keyword targets.
10. **Adaptation notes (the conflict rule applied here)** — preserved verbatim in source; addressed here:
    - **"Lovable.dev"** → substitute the active brand. For this codebase: Cochrane Master Builders Corp.
    - **"Victorious SEO"** → an external agency reference; treat as quality benchmark only, no imitation of their site or copy.
    - **Trailing Cochrane-subdomain + collapsible-FAQ instruction** — this is operational scope from a prior `dev.veepo.ca` conversation. It does **not** authorise any frontend change in this codebase. If the user later asks for a Cochrane-page SEO pass or a collapsible-FAQ fix, that's a separate, opt-in task — this embedding is knowledge-only.
    - **"Lovable.dev serves specific regions"** clause — for the active codebase, the regions are Cochrane / Bow Valley / Rocky View County / Calgary CMA adjacency (per `cmb-strategy-1.3`).
    - **Duplicated heading fragments** in the source — typos / paste artefacts; do not "fix" the source. Read past them.
    - **`mangools.com` inline citations** — the persona cites them; treat as informational sources, not endorsements.
11. **Dependencies / related documents**:
    - `governance/knowledge-system-charter` (P0 — governs how to use this)
    - `experience-prompts/master-design-persona-fantasy` (visual-quality counterpart)
    - `experience-prompts/anti-gravity-opening-engineer` (motion counterpart)
    - `brands/cochrane-master-builders/seo-research/1.1_…` (brand-specific keyword/SERP research — pair with this persona)
    - `brands/cochrane-master-builders/strategy/1.3_…` (sister-site network, NAP propagation, taxonomy)
    - `brands/cochrane-master-builders/personas-icp/1.4.1/1.4.2/1.4.3` (audience-specific phrasing for FAQs and meta descriptions)
    - The repo's typed router (`decision-index.ts`) — not edited by this embed; the persona is discoverable through `INDEX.md`.
12. **Practical examples** — three:
    - "Add an FAQ section to the Cochrane homepage" → consult this persona for FAQ-schema rules + GEO sub-query phrasing, then `cmb-seo-1.1` for actual keywords, then `cmb-persona-1.4.2` (Mothers) for tone of answer copy.
    - "Audit our meta titles" → this persona's principle 8 + checklist's metadata section govern; cross-check with `cmb-seo-1.1` for CMB-specific keyword targets.
    - "We want to rank for 'custom home builder Cochrane'" → this persona for *how* to optimize (E-E-A-T, GEO, structured data), `cmb-seo-1.1` for *what* to target, `cmb-strategy-1.3` for *where* (Areas-We-Serve taxonomy), `cmb-brand-1.2.2` for *how it sounds*.

## Index update (1 file, docs only)

### `src/master/knowledge/INDEX.md`

Add a new **Experience Prompts (cross-brand)** section between the Governance section and the Cochrane Master Builders brand section:

```text
## Experience Prompts — Cross-Brand Personas (`experience-prompts/`)

Cross-brand expertise personas applied through the brand-specific layers below.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/experience-prompts/seo-virtuoso-persona.source.md` | Markdown (verbatim DOCX) | partnered | 50-year SEO virtuoso persona + 15 principles + "what not to do" checklist + GEO/AI-search methodology |
| `source-documents/experience-prompts/master-design-persona-fantasy.source.md` | Markdown (verbatim DOCX) | source-only | Fantasy.co-level master design persona (existing) |
| `source-documents/experience-prompts/anti-gravity-opening-engineer.source.md` | Markdown (verbatim DOCX) | source-only | Anti-gravity opening / cinematic intro engineer persona (existing) |
```

(The two existing files are noted as `source-only` for honest status accounting — a separate future task can write their partner docs.)

## Deliberately NOT changing

- **No frontend touched.** The trailing instruction in the source about fixing collapsible FAQs on the Cochrane subdomain is explicitly out of scope for this embed (knowledge-only, per the charter).
- **No router schema widening.** `decision-index.ts` `brand` enum stays `"cochrane-master-builders"`. The persona is discoverable through `INDEX.md`. Wiring it into the typed router is a separate, deliberate change.
- **No edits to existing source/partner files.** The other two `experience-prompts` source files keep their `source-only` status — partner docs for them are a future task.
- **No Supabase changes, no edge functions, no UI components.**

## After this turn

Whenever you (or any agent) asks about SEO — meta tags, JSON-LD, FAQs, robots, sitemap, canonicals, AI-search visibility, Core Web Vitals, link building, etc. — the system reads this persona first (the *methodology*), then layers the brand-specific `cmb-seo-1.1` research on top, then filters output through the active ICP persona for tone. Cochrane SEO answers will inherit Victorious-SEO discipline automatically.
