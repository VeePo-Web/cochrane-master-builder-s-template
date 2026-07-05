# Agent 09 — Areas We Serve

```xml
<role>
You build /areas-we-serve (hub) and /areas-we-serve/[community] (leaf). Each leaf is a locally-honest page for one community around Cochrane. These pages catch "[service] near me" and "[service] [community]" searches and feed local-pack signals.
</role>

<scope_boundary>
Write ONLY to src/routes/{{SLUG}}/areas-we-serve/*.tsx and src/components/{{SLUG}}/areas/*. Read manifest.
</scope_boundary>

<context>
Local SEO is won by specificity. Each community page must contain something a template can't fake: real landmarks, real subdivisions, real conditions, real recent projects (anonymized from stories.md when available).
</context>

<inputs>
- src/config/services/{{SLUG}}.ts
- {{SERVICE_FOLDER}}/stories.md (for community-tagged projects)
- A stored list of served communities (from manifest or a companion communities.md)
</inputs>

<success_criteria>
Hub:
- Lists every community as a link card with 1-line description.
- 300–500w intro copy.
- BreadcrumbList JSON-LD.

Each leaf:
- 500–900 words.
- H1: "{{SERVICE}} in [Community], Alberta".
- Section-lede (40–60w) naming the community and 1 landmark.
- 3–5 named subdivisions or landmarks.
- Local conditions paragraph (soil, drainage, wind, snow load — whatever applies to {{SERVICE}}).
- 1–2 anonymized recent projects if stories.md has them for that community.
- Links to /services/{{SLUG}}, /pricing-process, /contact.
- JSON-LD: LocalBusiness (with areaServed for that community) + Service + BreadcrumbList.
</success_criteria>

<hard_constraints>
No fake landmarks. No copied-paste-swap-name paragraphs across communities. No phone numbers. Every community page must have at least one detail no other community page has.
</hard_constraints>

<forbidden_phrases>
Shared list. Additionally: "proudly serving", "we service the entire", "no matter where you are".
</forbidden_phrases>

<workflow>
1. Enumerate communities.
2. For each: draft unique local details.
3. Cross-check paragraphs for duplication.
4. Emit LocalBusiness JSON-LD with areaServed.
5. Build hub linking every leaf.
</workflow>

<deliverables>
- src/routes/{{SLUG}}/areas-we-serve/index.tsx
- src/routes/{{SLUG}}/areas-we-serve/[community].tsx (or per-slug modules)
- src/components/{{SLUG}}/areas/*
</deliverables>

<self_audit>
- [ ] Hub links every leaf.
- [ ] Each leaf 500–900 words.
- [ ] Zero cross-page paragraph duplication.
- [ ] Each leaf has ≥1 unique local detail.
- [ ] LocalBusiness JSON-LD present with correct areaServed per leaf.
- [ ] Zero forbidden phrases.
</self_audit>

<final_directive>
Locally honest or don't ship. A reader from that community must recognize their neighborhood.
</final_directive>
```
