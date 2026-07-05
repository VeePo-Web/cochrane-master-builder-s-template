# Agent 16 — Parent-Site Integration Agent Prompt

Append a complete, copy-pasteable Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt for the **Parent-Site Integration Agent** to `.lovable/plan.md`, matching agents 9–15.

## Critical difference from agents 9–15
This is the ONLY agent that edits a DIFFERENT project — the parent site `cochranemasterbuilders.com` — not the sub-brand site. The prompt must make that scope crystal clear and forbid editing the sub-brand project files.

## What the prompt will enforce

**Scope lock**
- Operates on the parent project (`cochranemasterbuilders.com` codebase).
- Reads FROM the sub-brand's `{{SERVICE_FOLDER}}/` (service.md, sub-services.md, voice.md, communities/, keywords.md, faq.md) as source of truth for what to say about the new sub-brand.
- Reads FROM the parent project's existing files (routes, components, sitemap, robots, footer) to preserve conventions.
- Zero edits to the sub-brand project. Zero invention of parent-site copy that isn't grounded in either the sub-brand docs or existing parent-site patterns.

**Six required parent-site changes**
1. **Parent `/` home** — add a `{{SERVICE}}` card in the "Core services overview" grid and a proof strip mention. Match existing card component exactly.
2. **Parent `/services`** — add a `{{SERVICE}}` tile using the existing service-tile component.
3. **Parent `/services/{{SLUG}}`** — build a full pillar page (long-form, canonical for generic query `"{{SERVICE}} Cochrane"`).
4. **Every parent `/areas-we-serve/[community]`** — enumerate all community pages, add `{{SERVICE}}` to the services-offered block on each.
5. **Parent footer** — add sub-brand link under "Our Trades".
6. **Parent `sitemap.xml` + `robots.txt`** — add the new pillar route; add a `Sitemap:` cross-reference pointing to the sub-brand's sitemap (well-known URL).

**Canonical strategy (must be encoded exactly)**
- Parent `/services/{{SLUG}}` pillar → `<link rel="canonical" href="https://cochranemasterbuilders.com/services/{{SLUG}}">` (self-canonical). This page is canonical for generic queries.
- Parent pillar contains a prominent link to the sub-brand site with `rel="me"` (brand relationship) and a "Visit the {{SERVICE}} site" CTA.
- Sub-brand homepage's canonical stays self-referential (sub-brand is canonical for sub-service queries) — agent verifies but does not modify.
- Cross-link both directions: parent pillar → sub-brand home; parent pillar mentions sub-brand as "official operating brand for {{SERVICE}}".

**JSON-LD on parent pillar**
- `Service` schema with `provider` pointing to the sub-brand's `Organization` (name, url, sameAs including parent).
- `areaServed` array from parent's existing community list.
- `BreadcrumbList`: Home → Services → {{SERVICE}}.
- No `FAQPage` unless the parent pillar actually renders FAQs (mirrored from sub-brand `faq.md`, top 6 only).

**Pillar page structure** (matches existing parent pillar convention — agent must read one existing pillar first and mirror it)
- H1 = `{{SERVICE}} in Cochrane` (or exact pattern used by other pillars).
- Intro `.section-lede` (40–60 words) for AI answer engines.
- What we do / sub-services grid (from `sub-services.md`).
- Why choose us (from `voice.md` + `why-we-love.md`).
- Areas we serve (link out to each `/areas-we-serve/[community]`).
- Process (from `process.md`, summarized).
- Pricing note (from `pricing.md`, ranges only if parent convention allows; otherwise "quotes on request").
- FAQ (top 6 from sub-brand `faq.md`).
- Dual CTA: primary "Get a quote on the {{SERVICE}} site" (→ sub-brand `/contact`), ghost "Contact Cochrane Master Builders" (→ parent `/contact`).

**Community pages update**
- Enumerate every file under parent `/areas-we-serve/`.
- In each community page's "services offered" block, insert `{{SERVICE}}` as a new list item linking to the parent pillar `/services/{{SLUG}}` (NOT directly to sub-brand — keeps canonical clean).
- Preserve existing sort order (alphabetical, priority, or as-is).
- Zero other edits to community pages.

**Footer update**
- Locate the "Our Trades" section in the parent footer component.
- Add one link: `{{SERVICE}}` → parent `/services/{{SLUG}}` (canonical path). Sort into existing order.
- Do NOT link footer directly to the sub-brand domain; parent → pillar → sub-brand keeps the funnel and canonical clean.

**Sitemap / robots**
- Parent `sitemap.xml`: add `<url>` for `/services/{{SLUG}}` at priority 0.8, changefreq monthly, lastmod today.
- Parent `robots.txt`: add a second `Sitemap:` line pointing to `https://{{SUB_BRAND_DOMAIN}}/sitemap.xml`. Do not disallow anything new.
- Parent `llms.txt` (if it exists): add sub-brand under a `## Sub-brands` section with one-line summary and both URLs.

**Hard constraints (carried from prior agents + new)**
- Zero phone numbers, zero `tel:` links, zero human imagery added by this agent (parent may already have them; do not remove).
- Zero third-party scripts, zero popups, zero `dangerouslySetInnerHTML`, zero `localStorage`, zero `console.log` of user data.
- Zero fabrication — every fact about the sub-brand must trace to `{{SERVICE_FOLDER}}/`.
- Zero destructive edits: never delete existing parent copy, existing services, existing community entries, or existing sitemap entries. Only additions.
- Zero design drift: reuse parent's existing components, tokens, spacing, typography. If a matching component doesn't exist, emit `{{TODO: parent needs <component>}}` and stop that section.
- Same forbidden-phrase grep as prior agents.

**Fable 5 prompt engineering**
- XML-tagged sections: `<role>`, `<scope_boundary>`, `<context>`, `<success_criteria>`, `<inputs_subbrand>`, `<inputs_parent>`, `<hard_constraints>`, `<canonical_strategy>`, `<six_required_changes>`, `<pillar_page_spec>`, `<jsonld_spec>`, `<forbidden_phrases>`, `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`.
- `<thinking>` block for: enumerate community pages, read one existing pillar to mirror pattern, verify footer structure, check existing sitemap format.
- Positive framing + explicit forbidden list.
- Multishot example showing the exact "services offered" list insertion in a community page.
- 26-point self-audit; must return ALL PASS before shipping.
- Success criteria at top: "integrate one sub-brand into the parent site with correct canonicals, bidirectional cross-links, complete community coverage, and zero regressions to existing parent content."

## File change
- **Append** the full prompt block (headed `## Agent 16 — Parent-Site Integration Agent`) to `.lovable/plan.md`. No other files touched.

Ready to write it on approval.