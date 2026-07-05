# Agent 15 — Privacy + Terms Agent Prompt

Append a complete, copy-pasteable Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt for the **Privacy + Terms Agent** to `.lovable/plan.md`, matching agents 9–14.

## What the prompt will enforce

**Routes**
- `/privacy` and `/terms` — two prerendered static routes, both indexable (they are legitimate public trust surface).

**Scope lock**
- Single `{{SERVICE}}` sub-brand of Cochrane Master Builders. Read only from `{{SERVICE_FOLDER}}/` plus the two shared template files: `{{TEMPLATES}}/privacy.md` and `{{TEMPLATES}}/terms.md`.
- Zero fabrication of legal claims. The templates are the source of truth. The agent's job is targeted substitution and one required addition — not rewriting law.

**Required substitutions (across both pages)**
- Brand name → resolved sub-brand from `service.md` (e.g. "Cochrane Interior Detailing", not "Cochrane Master Builders" and not the raw service string).
- Legal entity line → "operated by Cochrane Master Builders" (kept in both docs so contractual privity is clear).
- Contact email → `inquiry@cochranemasterbuilders.com` (every occurrence in both templates).
- Effective date → build date in ISO `YYYY-MM-DD`.
- Jurisdiction → Alberta, Canada (unless the template already specifies; do not change).

**Required additions**
- Privacy page must contain a standalone bolded sentence in the "Information we collect" section: **"We do not collect phone numbers."** Add a parallel note in the "How we use your information" section that intake is email-only. Add to the "Data minimization" or equivalent section if present.
- Both pages must include the app-owned qualifier per trust-page-generation guidance: "This page is maintained by Cochrane Master Builders to describe how the `{{SERVICE}}` sub-brand handles [privacy | terms of use]."
- Both pages must include the shared-responsibility line separating the app owner's practices from platform (hosting, form submission, email delivery) providers, without naming Lovable or backend vendors as certified.

**Forbidden claims (per trust-page-generation guardrails)**
- Zero "certified", "verified by", "SOC 2", "ISO 27001", "GDPR compliant", "HIPAA compliant", "PCI compliant", "end-to-end encrypted" claims unless the template already contains them and the user has approved them.
- Zero "no vulnerabilities", "no personal data", "breach-proof", "bank-grade security" absolute claims.
- Zero third-party badges or logos on either page.
- Zero mention of scanner results, connector sensitivity, or private project metadata.

**Design & UX**
- Match the sub-brand's existing design system (tokens, typography, spacing). No detached "legal page" theme.
- Long-form reading layout: single column, max-width ~68ch, generous line-height, semantic `<h2>`/`<h3>` sectioning, one anchored table of contents at top with in-page jumps.
- Prerendered HTML. No client-fetched markdown. No `dangerouslySetInnerHTML`.
- Zero human imagery. Zero third-party scripts.

**SEO / AI SEO**
- Both pages indexable (no `noindex`).
- Per-route Helmet with title ≤60, description ≤160, canonical + og:url self-reference.
- Meta title pattern: `Privacy Policy — {{SERVICE}}` / `Terms of Use — {{SERVICE}}`.
- One JSON-LD `WebPage` + `BreadcrumbList` per route. No `Article`, no `FAQPage`.
- Add both routes to `sitemap.xml` at priority 0.3, `changefreq: yearly`.
- Add both routes to `llms.txt` under a `## Legal` section with one-line summaries.
- No `.section-lede` (legal pages should not compete for AI-answer extraction of the sub-brand's product topics).

**Hard constraints (carried from prior agents)**
- Zero phone numbers, zero `tel:` links, zero `type="tel"` inputs.
- Zero human imagery. Zero third-party scripts. Zero popups.
- Zero `localStorage`, zero `console.log` of user data, zero `dangerouslySetInnerHTML`.
- Zero fabrication — missing template section → `{{TODO: source needed for X}}`.
- Same forbidden-phrase grep as prior agents (`passionate`, `world-class`, `unlock`, etc.).

**Cross-linking**
- Footer of both pages: quiet ghost links to `/`, `/contact`, and the other legal page (Privacy ↔ Terms).
- The sitewide footer (built by another agent) must also link to `/privacy` and `/terms` — this agent's audit verifies those links exist; if missing, emit `{{TODO: footer agent must add /privacy and /terms links}}`.

**Fable 5 prompt engineering (per Anthropic guidance for Claude Sonnet 4.5)**
- XML-tagged sections: `<role>`, `<context>`, `<inputs>`, `<hard_constraints>`, `<forbidden_legal_claims>`, `<required_substitutions>`, `<required_additions>`, `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`.
- `<thinking>` block for scanning the two templates and enumerating every occurrence of the brand string and email string before substituting (so nothing is missed).
- Positive framing on constraints + explicit forbidden lists for negations.
- One multishot example showing the exact "We do not collect phone numbers." bolded insertion in its section context.
- 22-point self-audit; must return ALL PASS before shipping.
- Success criteria stated up front: "produce two clean, indexable, on-brand legal pages that accurately reflect the sub-brand's email-only intake policy and cite Cochrane Master Builders as the operating legal entity."

## File change
- **Append** the full prompt block (headed `## Agent 15 — Privacy + Terms Agent`) to `.lovable/plan.md`. No other files touched.

Ready to write it on approval.