## Situation

Right now `.lovable/plan.md` only holds the meta-plan for Agent 8 — the actual 17 Fable 5 prompts we've iterated on across this thread were never written out as standalone files. So there is nothing to link to yet.

## Plan

Create one standalone `.md` file per agent under `prompts/agents/` so each is copy-pasteable and linkable on its own.

### Files to create

```
prompts/agents/agent-01-service-folder-loader.md
prompts/agents/agent-02-brand-token-forger.md
prompts/agents/agent-03-route-scaffolder.md
prompts/agents/agent-04-hero-and-arrival.md
prompts/agents/agent-05-service-pillar-page.md
prompts/agents/agent-06-sub-services-generator.md
prompts/agents/agent-07-comparison-and-cost-pages.md
prompts/agents/agent-08-why-we-love-service.md
prompts/agents/agent-09-areas-we-serve.md
prompts/agents/agent-10-faq-and-ai-answers.md
prompts/agents/agent-11-stories-and-social-proof.md
prompts/agents/agent-12-pricing-and-process.md
prompts/agents/agent-13-contact-and-booking.md
prompts/agents/agent-14-structured-data-and-schema.md
prompts/agents/agent-15-performance-and-core-web-vitals.md
prompts/agents/agent-16-parent-site-integration.md
prompts/agents/agent-17-seo-and-ai-seo-audit.md
prompts/agents/README.md   ← index with all 17 links
```

### Contents

- Each file = the full Fable 5 (Claude Sonnet 4.5, Anthropic-XML) prompt for that single agent, exactly as we've been designing them — `<role>`, `<scope_boundary>`, `<context>`, `<inputs>`, `<success_criteria>`, `<hard_constraints>`, `<forbidden_phrases>`, `<workflow>`, `<deliverables>`, `<output_format>`, `<self_audit>`, `<final_directive>`, plus per-agent spec blocks.
- Agent 8 uses the finalized long-form-editorial spec already agreed on.
- Agents 1–7 and 9–17 use the specs we've iterated on for parent-site integration, SEO/AI-SEO audit, etc.
- README.md = flat markdown list of clickable links to all 17 files.

### Chat reply after build

The chat message will be **only** the 17 clickable markdown links (plus the README link), nothing else — matching the request.

### Not touched

- No app source files (`src/**`), no routes, no config, no Supabase, no design tokens. Docs-only.

## One confirmation before I build

Do you want me to:

- **(A)** generate all 17 prompt files fully fleshed out now (long — each prompt is ~200–400 lines), **or**
- **(B)** generate the file scaffolding + Agent 8 fully written (already designed) and stub the other 16 with their `<role>` / `<scope>` / spec outline so you can approve tone before I expand each?

Reply "A" or "B" and I'll switch to build mode and ship the files + the link list.