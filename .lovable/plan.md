# Agent 14 — Thank You Agent Prompt

Append a complete, copy-pasteable Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt for the **Thank You Agent** to `.lovable/plan.md`, matching agents 9–13.

## What the prompt will enforce

**Route & purpose**
- Single route: `/thank-you`. Post-submit reassurance page reached only after `{{SUBMIT_FN}}` succeeds on `/contact`.
- Zero form fields, zero re-submission surface, zero conversion asks. This page's job is reassurance, not a second CTA.

**Scope lock**
- Single `{{SERVICE}}` only. Read from `{{SERVICE_FOLDER}}/` (`service.md`, `voice.md`, `guarantee.md`, `process.md`, `contact.md`).
- Zero fabrication. Every timeline ("24 hours"), reply channel ("email from `{{REPLY_FROM_EMAIL}}`"), and guarantee statement must trace to a source file or become `{{TODO}}`.

**Required sections (in order)**
1. Confirmation headline — warm, calm, singular ("Your request is in.").
2. What happens next — exactly 3 steps, numbered, each ≤ 25 words, sourced from `contact.md` / `process.md`.
3. Guarantee reminder — one sentence pulled from `guarantee.md`.
4. Warm sign-off + one link back to `/` (home). Copy: `Talk soon, — The {{SERVICE}} team`.

**Hard constraints**
- `<meta name="robots" content="noindex, nofollow">` in the page's Helmet (route-scoped, NOT in `index.html`).
- Zero phone numbers, zero `tel:`, zero human imagery, zero third-party scripts, zero analytics pixels added by this agent, zero popups, zero exit-intent, zero newsletter forms, zero "share this" widgets.
- Zero `localStorage` reads/writes of submission payload.
- Zero `console.log` of user data.
- Zero `dangerouslySetInnerHTML`.
- Zero direct-access protection theater (do NOT gate the page behind a query param or referrer check — that breaks Gmail/Outlook link previews and email-client rendering; `noindex` handles crawl exclusion).
- Zero JSON-LD structured data (this is a transactional confirmation page — no `WebPage`, no `FAQPage`, no `Article`. Structured data on a noindex page is wasted crawl and can confuse AI engines).
- Zero `.section-lede` — noindexed pages should not compete for AI-answer extraction.

**Voice**
- Mirrors `voice.md` and the sign-off tone in `why-we-love.md`. Editorial, calm, Ecclesiastes 9:10-anchored where natural. No exclamation marks. No emoji. No "Woohoo!" / "You're awesome!" / "Check your inbox!!!". No forbidden phrases (same grep list as prior agents).

**Performance**
- Prerendered HTML. LCP <1.0s (this page has almost no content — anything slower is a config bug). CLS <0.05. Lighthouse ≥95 all categories.
- Zero images unless a small human-free brand mark; if included, `<img width height loading="eager" fetchpriority="high">`.

**SEO / AI SEO**
- `noindex, nofollow` — page must not appear in Google index or AI answer surfaces.
- Removed from `sitemap.xml` (verify not present; if present, remove).
- Removed from `llms.txt` (verify not present; if present, remove).
- Canonical still self-references `/thank-you` (canonical + noindex is valid; prevents parameterized-URL duplicates from getting indexed via the canonical hint).

**Return-path CTA**
- Exactly one link back to `/` styled as a ghost/quiet link, not a filled button. This is not a conversion moment.

**Fable 5 prompt engineering (per Anthropic guidance for Claude Sonnet 4.5)**
- XML-tagged sections: `<role>`, `<context>`, `<inputs>`, `<hard_constraints>`, `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`.
- `<thinking>` block before drafting the 3 "what happens next" steps to align them with `process.md`.
- Positive framing on constraints + explicit forbidden lists for negations.
- One multishot example showing warm-but-quiet tone (paraphrased, not verbatim-copyable).
- 18-point self-audit; must return ALL PASS before shipping.
- Success criteria stated up front: "reassure the sender in under 5 seconds of reading, set expectations for reply timing and channel, remove all conversion pressure."

## File change
- **Append** the full prompt block (headed `## Agent 14 — Thank You Agent`) to `.lovable/plan.md`. No other files touched.

Ready to write it on approval.