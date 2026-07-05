# Agent 13 — Blog Agent Prompt

I'll append a complete, copy-pasteable Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt for the **Blog Agent** to `.lovable/plan.md`, matching the structure of agents 9–12.

## What the prompt will enforce

**Scope lock**
- Single `{{SERVICE}}` only. Read exclusively from `{{SERVICE_FOLDER}}/` (`service.md`, `sub-services.md`, `voice.md`, `faq.md`, `communities/`, `image-seo-metadata-remix-guide.md`, `why-we-love.md`).
- Zero cross-service contamination. Zero fabrication — every stat, price, and claim must trace to a source file or be omitted.

**Routes**
- `/blog` (hub) + `/blog/[slug]` × 12 prerendered static routes.

**Deliverable order (hard gate)**
1. **Editorial calendar first** — a markdown table Claude must output and self-audit BEFORE writing any post:
   `| # | Title | Target keyword | Volume (Semrush placeholder from keywords.md) | Intent (I/C/T) | Type (pillar/supporting) | Internal links (2 required) | Hero image prompt |`
2. Only after calendar passes 12-row + uniqueness audit → write posts.

**Post mix**
- 3 pillar posts, ≥2000 words, cornerstone `{{SERVICE}}` topics.
- 9 supporting posts, 800–1200 words, long-tail children of pillars (hub-and-spoke internal linking).

**Every post contract**
- H1 = target-keyword variant (not exact match — natural language).
- Meta title ≤60 chars, meta description ≤160 chars, canonical self-reference.
- `Article` JSON-LD (`headline`, `datePublished`, `dateModified`, `author.@type: Organization`, `publisher`, `mainEntityOfPage`, `image`) + `BreadcrumbList`.
- One `.section-lede` (40–60 word AI-scanner summary) directly after H1.
- 2 internal links minimum: (1) sub-brand home `/`, (2) one `/services/[sub-slug]` from `sub-services.md`.
- Hero image alt text follows `image-seo-metadata-remix-guide.md` verbatim pattern.
- Voice mirrors `why-we-love.md` — editorial, Ecclesiastes 9:10 anchored, no clickbait, no listicle headlines, no "ultimate guide", no emoji.

**Hard constraints**
- Zero phone numbers, zero `tel:`, zero human imagery, zero third-party scripts, zero `<details>`/`<summary>`, zero client-fetched markdown (all posts prerendered into HTML at build).
- Zero 8-word shingle duplicates across the 12 posts (uniqueness check).
- Forbidden phrase grep: `passionate`, `dedicated`, `world-class`, `game-changer`, `unlock`, `dive in`, `in today's fast-paced`, `look no further`.

**Performance / SEO / AI SEO**
- Prerendered HTML body, LCP <1.3s, CLS <0.05, Lighthouse ≥95 all categories.
- `/blog` hub renders 12 cards server-side (no client fetch), each linking to `/blog/[slug]`.
- `sitemap.xml` gets 13 new entries (hub 0.7, posts 0.6). `llms.txt` gets the 12 titles + one-line summaries.
- Each post carries a `SpeakableSpecification` block over the `.section-lede` for AI answer engines.

**CTA**
- Bottom of every post: single filled CTA to `/contact` invoking `{{SUBMIT_FN}}` route, secondary link to `/pricing-process`.
- No mid-post CTAs, no newsletter popups, no exit-intent modals.

**Fable 5 prompt engineering (per Anthropic guidance for Claude Sonnet 4.5)**
- XML-tagged sections: `<role>`, `<context>`, `<inputs>`, `<hard_constraints>`, `<workflow>`, `<deliverables>`, `<self_audit>`, `<output_format>`.
- Chain-of-thought scaffolded inside `<thinking>` tags before each deliverable (calendar → then posts).
- Explicit "read these files first, in this order" list before any writes.
- Positive framing on constraints ("write X" not just "don't write Y") + explicit forbidden lists where negation is unavoidable.
- Multishot examples: 1 pillar excerpt + 1 supporting excerpt showing voice, lede, and internal-link placement.
- Self-audit as a 24-point checklist that must return ALL PASS before the agent declares done; on any FAIL, agent revises and re-audits.
- Success criteria stated up front ("optimize for AI answer citations and Google top-3 on long-tail; measure by presence of `.section-lede`, JSON-LD validity, uniqueness, and word-count bands").

## File change
- **Append** the full prompt block (headed `## Agent 13 — Blog Agent`) to `.lovable/plan.md`. No other files touched.

Ready to write it on approval.