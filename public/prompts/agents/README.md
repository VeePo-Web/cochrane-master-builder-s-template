# Fable 5 Sub-Brand Agent Prompts

17 copy-pasteable Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompts. Each builds **one specific `{{SERVICE}}` sub-brand** by reading only from that service's folder. Run in order.

## Variables (fill before pasting)

| Var | Example |
|---|---|
| `{{SERVICE}}` | `Concrete` |
| `{{SLUG}}` | `concrete` |
| `{{SERVICE_FOLDER}}` | `knowledge/services/concrete/` |
| `{{DOMAIN}}` | `concrete.cochranemasterbuilders.com` |
| `{{BRAND}}` | `Cochrane Concrete` |
| `{{PARENT}}` | `cochranemasterbuilders.com` |

## The 17 agents

| # | Prompt | Role |
|---|---|---|
| 01 | [Service Folder Loader](./agent-01-service-folder-loader.md) | Read + validate `{{SERVICE_FOLDER}}/` inputs |
| 02 | [Brand Token Forger](./agent-02-brand-token-forger.md) | Design tokens, fonts, palette |
| 03 | [Route Scaffolder](./agent-03-route-scaffolder.md) | React Router routes + shells |
| 04 | [Hero & Arrival](./agent-04-hero-and-arrival.md) | `/` homepage hero + cinematic entry |
| 05 | [Service Pillar Page](./agent-05-service-pillar-page.md) | `/services/{{SLUG}}` canonical pillar |
| 06 | [Sub-Services Generator](./agent-06-sub-services-generator.md) | `/services/{{SLUG}}/[sub]` cluster |
| 07 | [Comparison & Cost Pages](./agent-07-comparison-and-cost-pages.md) | `X vs Y` + cost pages |
| 08 | [Why We Love {{SERVICE}}](./agent-08-why-we-love-service.md) | ⭐ One-of-one long-form editorial |
| 09 | [Areas We Serve](./agent-09-areas-we-serve.md) | `/areas-we-serve/[community]` |
| 10 | [FAQ & AI Answers](./agent-10-faq-and-ai-answers.md) | FAQ blocks + `speakable` + `llms.txt` |
| 11 | [Stories & Social Proof](./agent-11-stories-and-social-proof.md) | Anonymized case studies + reviews |
| 12 | [Pricing & Process](./agent-12-pricing-and-process.md) | `/pricing-process` |
| 13 | [Contact & Booking](./agent-13-contact-and-booking.md) | `/contact` + booking modal |
| 14 | [Structured Data & Schema](./agent-14-structured-data-and-schema.md) | Stacked JSON-LD everywhere |
| 15 | [Performance & Core Web Vitals](./agent-15-performance-and-core-web-vitals.md) | LCP/CLS/INP budget |
| 16 | [Parent-Site Integration](./agent-16-parent-site-integration.md) | Wire sub-brand back into `{{PARENT}}` |
| 17 | [SEO + AI-SEO Audit](./agent-17-seo-and-ai-seo-audit.md) | Read-only final auditor |

## How to use

1. Open a prompt file
2. Find/replace `{{SERVICE}}`, `{{SLUG}}`, `{{SERVICE_FOLDER}}`, `{{DOMAIN}}`, `{{BRAND}}`, `{{PARENT}}`
3. Copy the entire XML block
4. Paste into Claude / Lovable / Fable
