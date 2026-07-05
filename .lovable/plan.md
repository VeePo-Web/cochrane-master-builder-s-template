# Agent 8 — "Why We Love {{SERVICE}}" Agent Prompt

Append a copy-pasteable Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt for the **Why We Love Agent** to `.lovable/plan.md`, matching the structure of agents 9–17.

## What makes this agent different

This is the ONE-OF-ONE editorial page. Unlike other agents that fill a templated skeleton, this one writes ~1500 words of long-form founder-voice prose from scratch every time. The prompt must aggressively discourage template thinking and forbid stock phrases.

## What the prompt will enforce

**Route**
- `/why-we-love-{{SLUG}}` — single prerendered indexable route.

**Scope lock**
- One `{{SERVICE}}` sub-brand only. Read only from `{{SERVICE_FOLDER}}/`.
- Zero fabrication. Every "real Cochrane story" detail must trace to a source doc (`stories.md`, `why-we-love.md`, `service.md`); if the source is thin, write in the abstract ("one family in Cochrane's west end") rather than invent names, addresses, or specifics.

**Six required sections (in order, no reordering)**
1. **Opening scene** — one specific moment from a real `{{SERVICE}}` job in Cochrane. ~180–220 words. Present tense. Sensory (sound, texture, light, temperature). Zero brand mention until end.
2. **The craft** — what mastery looks like in this trade. ~250–300 words. Concrete, measurable, technical.
3. **What most people get wrong** — the shortcut every non-master takes. ~200–250 words. Names the shortcut, names the cost, does not name competitors.
4. **Our specific standard** — the measurable thing we do differently. ~250–300 words. Numbers, tolerances, time budgets from `service.md`/`process.md`.
5. **A real Cochrane story** — one family, one project, no names. ~250–300 words. Anonymized. Written from `stories.md` only; if missing, emit `{{TODO: stories.md missing}}` and write a composite labeled as such.
6. **The invitation** — send 3 photos. ~120–160 words. Warm, direct, one primary CTA to sub-brand `/contact`, one ghost CTA to `/pricing-process`.

Total: ~1500 words (1400–1650 acceptable). Word count enforced in self-audit.

**Voice rules (encoded as hard constraints)**
- Anchor: Ecclesiastes 9:10 — "Whatever your hand finds to do, do it with all your might." Quote it once, naturally, in section 2 or 4 — not as an epigraph, not as a slogan.
- Slow, intentional, editorial. Long sentences allowed. Reads like a set of architectural plans: precise, spatial, unhurried.
- First-person plural ("we") sparingly; first-person singular ("I", from the founder) allowed in sections 1, 4, and 5.
- Zero exclamation marks. Zero emoji. Zero rhetorical questions ending sections.
- Zero "here at [brand]", "at {{SERVICE}}, we", "welcome to", "our team", "our mission", "our passion".
- Zero listicle formatting inside prose sections (bullets banned except in the invitation CTA area).

**Forbidden phrases (case-insensitive grep must return zero matches)**
Standard list from prior agents PLUS editorial-specific: `passionate`, `dedicated`, `world-class`, `game-changer`, `unlock`, `dive in`, `look no further`, `nestled`, `elevate your`, `revolutionize`, `synergy`, `leverage`, `best-in-class`, `robust`, `seamless`, `cutting-edge`, `journey`, `here at`, `welcome to`, `our team of`, `our mission is`, `our passion is`, `craftsmanship you can trust`, `attention to detail`, `unparalleled`, `unmatched`, `state-of-the-art`, `tailored to your needs`, `at the end of the day`, `heart and soul`.

**Macro photography prompts (3–5)**
- Zero human imagery (per project constraint memory).
- Extreme macro: paint pore, leather grain, tool edge, water bead, dust mote in raked light.
- Each prompt written as a complete generation-ready sentence with lighting, lens, mood, subject material.
- Included as an HTML comment block at the top of the route file for downstream image agents; DO NOT render placeholder images inline.

**Structured data**
- `Article` JSON-LD: `headline`, `author = { "@type": "Organization", "name": "Cochrane Master Builders" }`, `publisher` same, `datePublished`, `dateModified`, `mainEntityOfPage`, `wordCount`, `articleSection = "Craft"`, `timeRequired = "PT6M"`.
- `BreadcrumbList`: Home → Why We Love {{SERVICE}}.
- No `HowTo`, no `FAQPage`, no `Review`.

**Design & UX**
- Reuse sub-brand design tokens exactly (per memory: dark editorial, Space Grotesk display, Jost body, generous line-height 1.7, min 15px body).
- Reading-optimized layout: single column, max-width ~65ch, `font-size: clamp(16px, 1.1vw, 19px)`, drop cap on section 1's first letter allowed if sub-brand uses it elsewhere.
- One `.section-lede` (40–60 words) directly under the H1 for AI-answer extraction, distinct from section 1's opening scene.
- Estimated reading time badge visible near H1: "6 min read" (calculated from word count / 250 wpm).
- Zero human imagery. Zero third-party scripts.

**SEO / AI SEO**
- Helmet: title ≤ 60 (`Why We Love {{SERVICE}} — {{SUB_BRAND}}`), description ≤ 160 (first-person plural, factual), canonical self-referencing, og:url, og:title, og:description, og:type=`article`, twitter:card=`summary_large_image` if sub-brand convention.
- Indexable. Added to `sitemap.xml` at priority 0.6, changefreq `yearly`, lastmod today.
- Added to `llms.txt` under `## Editorial` section with one-line summary.
- H1 = natural-language keyword variant containing `{{SERVICE}}` + `Cochrane` (e.g. `Why We Love Interior Detailing in Cochrane`).

**Hard constraints (carried from prior agents)**
- Zero phone numbers, `tel:` links, `type="tel"` inputs.
- Zero human imagery. Zero third-party scripts. Zero popups.
- Zero `localStorage`, zero `console.log` of user data, zero `dangerouslySetInnerHTML`, zero runtime markdown fetch.
- Prerendered HTML. LCP < 1.0s, CLS < 0.05, Lighthouse ≥ 95.

**Fable 5 prompt engineering**
- XML-tagged sections: `<role>`, `<scope_boundary>`, `<context>`, `<success_criteria>`, `<inputs>`, `<voice_rules>`, `<hard_constraints>`, `<forbidden_phrases>`, `<six_section_spec>` (with per-section word budgets and content rules), `<photography_prompts_spec>`, `<seo_and_ai_seo>`, `<jsonld_spec>`, `<design_and_ux>`, `<thinking>`, `<multishot_example>` (showing correct vs incorrect opening scene), `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`.
- `<thinking>` block: read all inputs, extract 3 concrete craft details, extract 1 usable story, draft anchoring quote placement, plan photography prompts.
- Positive framing + explicit forbidden list.
- Multishot: one PARAGRAPH-LEVEL good example (a 4-sentence opening in the target voice) and one BAD example (the same idea in stock marketing voice) so the model has an unmistakable contrast.
- 24-point self-audit including per-section word counts, quote placement, forbidden-phrase grep, structured-data validity, photography-prompt count and human-free check.
- Success criteria at top: "produce one 1500-word editorial page in the Master Builders founder voice that reads like plans, quotes Ecclesiastes 9:10 once naturally, contains one anonymized Cochrane story, and passes every forbidden-phrase and structural check."

## File change
- **Append** the full prompt block (headed `## Agent 8 — Why We Love {{SERVICE}} Agent`) to `.lovable/plan.md`. No other files touched.

Ready to write it on approval.