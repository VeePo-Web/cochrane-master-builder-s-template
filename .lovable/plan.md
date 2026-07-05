## Audit result

None of the 17 Fable 5 agent prompts exist as standalone files. `.lovable/plan.md` only contains meta-planning notes, not the prompts. The older `prompts/01–06` files are a different, pre-existing set and stay untouched.

## Plan — create all 17 as individual copy-pasteable files

Create `prompts/agents/` with one fully-fleshed Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt per agent, plus an index README that gives you the clickable link list you asked for.

### Files to create (17 prompts + 1 index)

```
prompts/agents/README.md                                  ← index with all 17 clickable links
prompts/agents/agent-01-service-folder-loader.md
prompts/agents/agent-02-brand-token-forger.md
prompts/agents/agent-03-route-scaffolder.md
prompts/agents/agent-04-hero-and-arrival.md
prompts/agents/agent-05-service-pillar-page.md
prompts/agents/agent-06-sub-services-generator.md
prompts/agents/agent-07-comparison-and-cost-pages.md
prompts/agents/agent-08-why-we-love-service.md            ← long-form editorial, already fully specced
prompts/agents/agent-09-areas-we-serve.md
prompts/agents/agent-10-faq-and-ai-answers.md
prompts/agents/agent-11-stories-and-social-proof.md
prompts/agents/agent-12-pricing-and-process.md
prompts/agents/agent-13-contact-and-booking.md
prompts/agents/agent-14-structured-data-and-schema.md
prompts/agents/agent-15-performance-and-core-web-vitals.md
prompts/agents/agent-16-parent-site-integration.md
prompts/agents/agent-17-seo-and-ai-seo-audit.md
```

### Every prompt uses the same Fable 5 skeleton

`<role>`, `<scope_boundary>` (one `{{SERVICE}}` only, read only from `{{SERVICE_FOLDER}}/`), `<context>`, `<inputs>`, `<success_criteria>`, `<hard_constraints>` (no phone numbers, no `tel:`, no `localStorage`, no `console.log`, no `dangerouslySetInnerHTML`, no third-party scripts, no popups, no human imagery), `<forbidden_phrases>` (shared stock-marketing blocklist), `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`, plus per-agent spec blocks (route paths, JSON-LD, design tokens, word budgets, tool call spec).

Agent 8 uses the finalized long-form-editorial spec already agreed on. Agent 16 uses the parent-site integration spec. Agent 17 uses the read-only auditor spec with `seo_chat--trigger_scan` + Semrush tools.

### Chat reply after build

The chat message will be **only** the 17 clickable markdown links (plus the README link), nothing else — matching what you asked for.

### Not touched

- No `src/**`, no routes, no config, no Supabase, no design tokens, no `prompts/01–06`. Docs-only, new folder.

### Scale

Each prompt is ~200–400 lines. This is a large one-shot doc write (~5k lines total). No app code changes, no build risk.

Approve and I'll ship the files + the link list.