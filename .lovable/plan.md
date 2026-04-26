# Decision Index — searchable "what rules apply" lookup

A single typed registry powers two surfaces (CLI + internal UI) so both stay in sync. Results are **lean**: matched partner docs, source paths, decision triggers hit, guard rails touched, and a one-line "why matched". No rule text dumped in results — you click through to the partner doc to read rules.

---

## 1. The registry (single source of truth)

**New file:** `src/master/knowledge/decision-index.ts`

Pure typed data, zero runtime side effects. One `DecisionRoute` per partner doc, mechanically derivable from the §3 (Decision triggers) and §12 (Guard Rail Linkage) sections of each partner doc you just deepened.

```ts
export type DecisionCategory =
  | "seo"
  | "brand-style"
  | "voice-copy"
  | "persona-icp"
  | "conversion"
  | "ux-layout"
  | "performance"
  | "trust-legal"
  | "strategy-positioning"
  | "architecture-backend";

export interface DecisionRoute {
  id: string;                       // e.g. "cmb-strategy-1.2"
  brand: "cochrane-master-builders";
  partnerDoc: string;               // path under src/master/knowledge
  sourceDoc: string;                // path under src/master/knowledge
  title: string;                    // short label for results
  oneLine: string;                  // what this doc governs
  categories: DecisionCategory[];
  triggers: string[];               // verbatim phrases from §3
  guardRails: GuardRailId[];        // from §12
  precedence?: string;              // from §6, e.g. "1.2 > 1.0 on positioning"
}

export const DECISION_INDEX: DecisionRoute[];
export const CATEGORY_LABELS: Record<DecisionCategory, string>;
```

Initial seed: 10 routes (one per existing partner doc). Each maps to the right categories, e.g.:
- `cmb-seo-1.1` → `["seo"]`
- `cmb-brand-1.2.1` / `cmb-brand-1.2.2` → `["brand-style","voice-copy"]`
- `cmb-persona-1.4.2` (mothers) → `["persona-icp","conversion","voice-copy"]`
- `cmb-ux-1.3.1` → `["ux-layout","conversion","trust-legal"]`
- `cmb-strategy-1.3` → `["strategy-positioning","architecture-backend","seo"]`
- etc.

---

## 2. Matching engine (deterministic, hybrid-ready)

**New file:** `src/master/knowledge/decision-search.ts`

Pure function, no I/O, used by both CLI and UI.

```ts
export interface MatchResult {
  route: DecisionRoute;
  score: number;            // 0..1
  matchedTriggers: string[];
  matchedCategories: DecisionCategory[];
  reason: string;           // one-line "why matched"
}

export function searchDecisions(
  query: string,
  opts?: { category?: DecisionCategory; limit?: number; minScore?: number }
): MatchResult[];
```

**Scoring (deterministic pass):**
- Tokenize query (lowercase, strip punctuation, drop stopwords).
- For each route: count trigger-phrase substring hits + token overlaps + explicit category mentions ("seo", "voice", "mother", "subcontractor", etc.).
- Apply precedence boosts so the right partner doc rises (e.g. positioning queries prefer 1.2 over 1.0).
- Return top N sorted by score; expose `minScore` so UI knows when to offer the AI fallback.

No external deps — plain TS.

---

## 3. AI fallback (only when keyword score is weak)

**New edge function:** `supabase/functions/decision-search-ai/index.ts`

- Takes `{ query, registry }` (registry is sent compact: id + title + oneLine + triggers + categories).
- Calls Lovable AI Gateway, model `google/gemini-3-flash-preview`, with structured tool-calling so it returns `{ matches: [{ id, score, reason }] }`.
- System prompt forbids inventing routes outside the registry.
- Handles 429 / 402 with the standard pass-through errors.
- Stays lean: never returns rule text, only route ids + reasons.

Frontend invokes it via `supabase.functions.invoke("decision-search-ai", { body })` only when keyword `topScore < 0.35` OR the user clicks "Ask AI" in the UI.

---

## 4. CLI surface

**New file:** `scripts/decisions.ts`

Run with `bun scripts/decisions.ts "<query>" [--category seo] [--ai]`.

- Loads `decision-index.ts` directly (no Supabase needed for keyword mode).
- Prints a lean table to stdout:

```text
score  id              partner doc                                          why
0.82   cmb-seo-1.1     .../seo-research/1.1_..._.partner.md                  triggers: "areas we serve", "meta title"
0.41   cmb-strategy-1.3 .../strategy/1.3_..._.partner.md                    categories: seo, architecture-backend
```

- `--ai` flag: also calls the edge function (using `LOVABLE_API_KEY` directly via the gateway, bypassing Supabase invoke for offline use). Reuses the same compact registry payload.

---

## 5. Internal UI surface

**New route:** `/knowledge` (not added to nav; reachable by URL only).

**New files:**
- `src/pages/Knowledge.tsx`
- `src/components/knowledge/DecisionSearch.tsx`

UX (shadcn primitives, no new deps):
- Search input (debounced 200ms) + category `Select` filter + "Ask AI" button.
- Results list: each row shows route title, category chips, matched triggers, guard-rail chips, two links — "Open partner doc" and "Open source doc". Both links open the file paths in a new tab (raw `<a>` to the file path under the dev server's source tree — for read-only inspection during planning).
- When `topScore < 0.35`, the "Ask AI" button glows with a hint: "Keyword match weak — try AI."
- AI results render in the same row format with a small "AI" badge and the model's `reason`.

No auth required — page is intentionally undocumented; not linked from the marketing site.

---

## 6. Documentation

**Updated files (append-only, do not rewrite existing sections):**
- `src/master/knowledge/README.md` — add a "Searchable Index" section explaining the registry, CLI usage, and `/knowledge` route.
- `src/master/knowledge/DECISION_ROUTER.md` — add a single line at the top: "Programmatic equivalent: `decision-index.ts` + `/knowledge` route."

No partner docs are touched. No source docs are touched.

---

## 7. Out of scope

- No DB tables, no auth, no nav entry.
- No semantic embeddings or vector store — keyword-first by design; AI fallback is a single chat call.
- No rule-text rendering in results (lean routes only, per your choice).
- No multi-brand expansion yet — registry is structured to accept other brands later by adding new `DecisionRoute` entries.

---

## 8. Files to create / change

Create:
- `src/master/knowledge/decision-index.ts`
- `src/master/knowledge/decision-search.ts`
- `scripts/decisions.ts`
- `supabase/functions/decision-search-ai/index.ts`
- `src/pages/Knowledge.tsx`
- `src/components/knowledge/DecisionSearch.tsx`

Edit (small, additive):
- `src/App.tsx` — register the `/knowledge` route.
- `src/master/knowledge/README.md` — add "Searchable Index" section.
- `src/master/knowledge/DECISION_ROUTER.md` — one-line pointer at top.

---

## 9. Verification after build

- `bun scripts/decisions.ts "hero copy for mothers"` returns `cmb-persona-1.4.2` and `cmb-brand-1.2.2` in top 2.
- `bun scripts/decisions.ts "areas we serve schema"` returns `cmb-seo-1.1` first.
- `/knowledge` renders, search responds <100ms on keyword pass, AI fallback works and surfaces 429/402 toasts cleanly.
- All 10 partner docs and all 10 source docs remain byte-identical (verified by directory listing — no writes touch them).