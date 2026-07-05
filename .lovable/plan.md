# Agent 17 — SEO + AI-SEO Audit Agent Prompt

Append the final agent's Fable 5 prompt to `.lovable/plan.md`, matching agents 9–16.

## Critical difference from all prior agents
Agent 17 is **read-only**. It ships a markdown report, NOT code. Any edit is a scope violation. This must be repeated in `<role>`, `<scope_boundary>`, `<hard_constraints>`, and `<final_directive>`.

## What the prompt will enforce

**Scope lock**
- Runs LAST, after agents 1–16 have completed for the target `{{SERVICE}}` sub-brand.
- Audits ONE sub-brand site at `{{DOMAIN}}`. Ignores other sub-brands.
- Reads sub-brand `{{SERVICE_FOLDER}}/` and the built site's rendered HTML/routes.
- Zero file writes. Zero code changes. Zero migrations. Zero triggers of build steps.
- Deliverable: a single markdown report the human copies into a ticket.

**Tools it uses**
1. `seo_chat--trigger_scan` on `{{DOMAIN}}` — kicks off Lovable's built-in scanner.
2. `seo_chat--list_findings` (states: failing + passing + ignored) — reads results.
3. `semrush--domain_analysis` on `{{DOMAIN}}` — organic snapshot.
4. `semrush--keyword_research` on the top primary keyword from `keywords.md` — related/questions.
5. `semrush--keyword_compare` on the top 20 `{{SERVICE}}` keywords from `keywords.md` — volume/CPC/KDI matrix.
6. `semrush--competitive_analysis` on `{{DOMAIN}}` — auto-discover competitors + keyword gaps.
7. `semrush--page_analysis` on 5 key pages: `/`, `/services`, `/pricing-process`, `/faq`, `/blog`.
8. Manual audit of the checklist below by reading route files and rendered HTML.

**Technical SEO checklist** (pass/fail each)
1. Unique `<title>` + `<meta description>` on every route (no template defaults, no duplicates).
2. Canonical + `og:url` self-reference on every route.
3. JSON-LD stacked appropriately by page type: `LocalBusiness` sitewide, `Service` on service pages, `FAQPage` on FAQ + pages with rendered Q&A, `BreadcrumbList` on nested pages, `AggregateRating` + `Review` ONLY where honest testimonials exist, `Article` on blog posts.
4. `sitemap.xml` includes every indexable route; no `/thank-you`; no admin/internal.
5. `robots.txt` correct — no accidental `Disallow: /`; sitemap directive present; sub-brand sitemap referenced from parent (verify via HEAD to parent robots.txt).
6. Image `alt` text populated on every non-decorative image; decorative images have empty `alt=""`.
7. Core Web Vitals per Performance Playbook: LCP < 1.0s, CLS < 0.05, INP < 200ms, TBT < 200ms, Lighthouse Perf/SEO/BestPractices/A11y ≥ 95.
8. Zero orphan pages; every page reachable in ≤ 3 clicks from `/`. Verify by breadth-first from home.
9. HTTPS everywhere; zero mixed content.
10. Zero `noindex` on indexable routes; `noindex` present on `/thank-you`.
11. `lang="en-CA"` on `<html>`.
12. `hreflang` handled correctly (or omitted if single-locale).
13. 404 route returns a helpful page (not a redirect to `/`).
14. Zero broken internal links (crawl all `<a href>` originating from indexable routes).
15. `<h1>` present exactly once per page.

**AI-SEO checklist** (pass/fail each)
1. FAQ block or `.section-lede` on every page (Q&A form or 40–60 word factual lede for LLM extraction).
2. What/how/why/how-much question variants covered across the site (grep for `What is`, `How does`, `Why`, `How much`).
3. Entity signals: brand name + "Cochrane" + `{{SERVICE}}` co-occur in H1 or H2 of the home, pillar, and pricing pages.
4. `HowTo` schema only where honest (real numbered process). Do NOT recommend adding it where dishonest.
5. Author bio on articles (name, role, one-sentence bio, `Person` JSON-LD).
6. `llms.txt` exists and lists every important route with one-line summaries.
7. `speakable` selector on FAQ answers where present.
8. Zero forbidden phrases from prior agents (`passionate`, `world-class`, etc.) — grep across rendered HTML.
9. Every H1 is a natural-language keyword variant, not a slogan.
10. Zero phone numbers, `tel:` links, or `type="tel"` inputs anywhere on the site.

**Missing-page gap report**
- Sub-service pages listed in `sub-services.md` but not built as routes.
- Comparison pages (`X vs Y`) — check `keywords.md` for `vs` intent; propose ones with search volume.
- Cost pages (`How much does {{SERVICE}} cost in Cochrane`) — check if `/pricing-process` covers, else propose dedicated `/cost` or `/pricing/[sub-service]`.
- Problem-led pages (`Fix [problem]`) — cross-reference `faq.md` pain points.
- Seasonal pages (`Winter {{SERVICE}}`, `Spring {{SERVICE}}`) — propose based on service seasonality signal in `service.md`.
- Top 5 neighbourhood × service pages — from `communities/`, propose the 5 highest-population Cochrane neighbourhoods that lack dedicated pages.

Each missing-page proposal includes: proposed URL slug, H1, target keyword (from Semrush), estimated volume (Semrush), and priority (high/medium/low).

**Report structure** (single markdown file, deterministic sections in this order)
1. Executive summary (5 bullets: what's strong, what's broken, top 3 quick wins, biggest risk, next 30 days).
2. Semrush snapshot table (traffic, keyword count, top 10 organic terms with position/volume).
3. Top 20 `{{SERVICE}}` keyword matrix (keyword, volume, KDI, CPC, current position, opportunity band).
4. Competitor landscape (top 5 auto-discovered competitors + keyword-gap top 20).
5. Page-analysis section (5 key pages, top keywords each).
6. Technical SEO checklist (PASS/FAIL per item with one-line evidence + file/URL reference).
7. AI-SEO checklist (same format).
8. Priority fix list (P0/P1/P2, each with: what, why it matters for AI/human ranking, exact file or route, estimated effort, which agent (1–16) owns the fix).
9. Missing-page gap report (table + proposals).
10. Scanner findings (from `seo_chat--list_findings`, grouped by severity).
11. Appendix: raw tool outputs (Semrush JSON, scanner findings dump).

**Fable 5 prompt engineering**
- XML-tagged sections: `<role>`, `<scope_boundary>`, `<context>`, `<success_criteria>`, `<read_only_directive>`, `<inputs>`, `<tools_and_calls>`, `<technical_seo_checklist>`, `<ai_seo_checklist>`, `<gap_report_spec>`, `<report_structure>`, `<report_style>`, `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`.
- `<thinking>` block for: enumerate routes, identify 5 key pages, resolve top 20 keywords from `keywords.md`, plan tool call order (batch Semrush + scanner + reads).
- Positive framing + explicit forbidden list.
- Multishot example showing one PASS/FAIL checklist row and one priority-fix-list row.
- 18-point self-audit for the REPORT itself (completeness, evidence, no fabricated numbers, priority-ordered, ownership named).
- Success criteria at top: "produce one markdown report the human can paste into a ticket, with every checklist item scored on evidence, every fix mapped to a specific route/file and owning agent, and every missing-page proposal backed by Semrush data."

## File change
- **Append** the full prompt block (headed `## Agent 17 — SEO + AI-SEO Audit Agent`) to `.lovable/plan.md`. No other files touched.

Ready to write it on approval.