## Goal

Replace the "free-text only" router input with a **strict, validated DecisionInput schema** so the router can deterministically narrow the candidate document set before scoring. Free-text remains supported (as the `goal` field) but is now joined by typed dimensions.

## The schema

A new file `src/master/knowledge/decision-input.ts` defines:

```text
DecisionInput {
  goal:        string                    // required, 3..240 chars — free-text intent
  pageSection?: PageSection              // enum (one of)
  audience?:   Audience[]                // enum (multi)
  channel?:    Channel                   // enum (one of)
  category?:   DecisionCategory          // existing enum, optional pre-filter
  constraints?: Constraint[]             // enum (multi) — hard rules to honour
  excludeIds?: string[]                  // route ids the caller already rejected
}
```

Enum values (drawn from existing partner-doc triggers + guard rails so nothing new leaks in):

- **PageSection**: `home-hero`, `home-body`, `service-page`, `service-area-page`, `about`, `legal`, `partners-vendors`, `footer`, `forms-booking`, `style-guide`, `blog-faq`, `meta-seo`
- **Audience**: `mothers`, `grandfathers`, `subcontractors`, `general-homeowner`, `b2b-vendor`, `ai-search-crawler`
- **Channel**: `web-desktop`, `web-mobile`, `email`, `print-collateral`, `voice-search`, `ai-overview`
- **Constraint**: `wcag-aa`, `motion-restraint`, `no-sister-fingerprints`, `bespoke-only`, `pricing-transparency`, `local-trust-required`, `phone-cta-priority`, `legal-bespoke`

Each enum value carries a small mapping table to existing `DecisionCategory[]` and `GuardRailId[]` so the compiler can boost or filter routes without adding new domain knowledge.

Validation uses **Zod** (already in the project). Errors surface as field-level messages.

## Router compilation

A new pure function in `src/master/knowledge/decision-search.ts`:

```text
compileQuery(input: DecisionInput): {
  text:         string                 // synthesized free-text for the existing scorer
  category?:    DecisionCategory       // hard pre-filter
  boostRails:   GuardRailId[]          // routes touching these get +score
  requiredRails: GuardRailId[]         // hard filter — route must include all
  excludeIds:   Set<string>
}
```

Then `searchDecisions` gains an overload `searchDecisionsStructured(input)` that:

1. Runs `compileQuery` to get filters.
2. Pre-filters `DECISION_INDEX` by `category`, `requiredRails`, and `excludeIds`.
3. Runs the existing keyword scorer against the synthesized `text` (goal + enum labels expanded into trigger-friendly phrases).
4. Adds a `+1` score nudge per `boostRails` hit, capped at the existing 0..1 normalization.
5. Returns the same `MatchResult[]` shape so all downstream UI/CLI code keeps working.

The existing free-text `searchDecisions(query)` stays untouched — structured search is purely additive.

## Surfaces

**UI** (`src/components/knowledge/DecisionSearch.tsx`)
- Add a collapsible "Refine" panel under the existing search box with: goal textarea, section/channel selects, audience multi-select chips, constraint multi-select chips.
- When any structured field is set, calls `searchDecisionsStructured`; otherwise falls back to the existing `searchDecisions` path.
- AI fallback button now sends the compiled query (text + filters) to the edge function so semantic results respect the same hard filters.

**CLI** (`scripts/decisions.ts`)
- Add flags: `--section`, `--audience` (repeatable), `--channel`, `--constraint` (repeatable), `--exclude`.
- When any structured flag is present, uses the structured path; otherwise unchanged.
- Prints the compiled query summary above the results table for transparency.

**Edge function** (`supabase/functions/decision-search-ai/index.ts`)
- Accepts an optional `filters` block in the request body.
- Pre-filters the `registry` it sends to the model by the same rules used client-side, so the model can never return a route that violates a hard constraint.
- System prompt updated with one extra rule: "Honour all filters; never recommend a route excluded by them."

## Documentation

Update `src/master/knowledge/DECISION_ROUTER.md` with:
- The new schema and enum tables.
- A short "When to use structured input" section.
- One worked example for each surface (UI, CLI, programmatic).

`src/master/knowledge/README.md` gets a one-line link to the new schema file.

## Files

**New**
- `src/master/knowledge/decision-input.ts` — schema, enums, Zod validator, enum→category/guardrail maps.

**Modified**
- `src/master/knowledge/decision-search.ts` — `compileQuery` + `searchDecisionsStructured`.
- `src/components/knowledge/DecisionSearch.tsx` — Refine panel + structured branch.
- `scripts/decisions.ts` — new flags + structured branch.
- `supabase/functions/decision-search-ai/index.ts` — accept + apply filters.
- `src/master/knowledge/DECISION_ROUTER.md` — schema + examples.
- `src/master/knowledge/README.md` — link.

## Out of scope

- No changes to source or partner documents.
- No changes to guard rails or preflight.
- No new routes in `App.tsx` — UI lives in the existing `/knowledge` page.
- No persistence of past queries.
