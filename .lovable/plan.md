## Problem
The 18 prompt files exist at `prompts/agents/*.md` but the running app (Vite + React Router) doesn't serve arbitrary repo paths — only files under `public/` are reachable via URL. Clicking the links returns 404.

## Fix
Copy all 18 files into `public/prompts/agents/` so they're served as raw static markdown.

## Steps
1. `mkdir -p public/prompts/agents`
2. `cp prompts/agents/*.md public/prompts/agents/`
3. Reply in chat with clickable links using the new URLs:
   - `/prompts/agents/README.md`
   - `/prompts/agents/_shared-constraints.md`
   - `/prompts/agents/agent-01-service-folder-loader.md`
   - … through `agent-17-seo-and-ai-seo-audit.md`

## Result
- Clicking any link opens the raw markdown in the browser (browsers render `.md` as plain text — perfect for copy/paste).
- Originals at `prompts/agents/` remain untouched so Fable 5 agents can still read them from their canonical repo location.
- No app code, no routes, no build risk.