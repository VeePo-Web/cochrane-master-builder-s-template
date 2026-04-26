# Build-time guard-rails checklist (linked to the decision index)

A non-negotiable preflight that runs on every build, prints a pass/fail report, and — for any failure — names the exact partner doc(s) and decision-index route(s) to consult. Blocking by default in production builds; warn-only in dev.

---

## 1. Wire each guard rail to its decision routes

**New file:** `src/master/knowledge/guardrail-routes.ts`

A pure typed map from `GuardRailId` → `DecisionRoute[]`. Built by inverting the registry: for each route in `decision-index.ts`, every `guardRails[]` entry adds the route to the map. Result: when `gr-real-business-signals` fails, you instantly get the 8 partner docs that govern it.

```ts
export const GUARDRAIL_TO_ROUTES: Record<GuardRailId, DecisionRoute[]>;
export function getRoutesForGuardRail(id: GuardRailId): DecisionRoute[];
export function getUnroutedGuardRails(): GuardRailId[]; // coverage check
```

No new content — fully derived from existing `GUARD_RAILS` (18 rails) and `DECISION_INDEX` (10 routes).

---

## 2. Define the build-time check runner

**New file:** `src/master/knowledge/preflight.ts`

Pure logic (no I/O). For each of the 18 `GUARD_RAILS`, run a typed check function and return a `PreflightResult`.

```ts
export type RailStatus = "pass" | "fail" | "skipped";

export interface RailReport {
  id: GuardRailId;
  title: string;
  category: GuardRailCategory;
  status: RailStatus;
  law: string;
  evidence: string[];          // what the check actually inspected
  failures: string[];          // human-readable failure reasons
  routes: DecisionRoute[];     // from guardrail-routes.ts
  partnerDocPaths: string[];   // copy-pasteable file paths
  remediation: string;         // one-line "do this next"
}

export interface PreflightReport {
  ok: boolean;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  rails: RailReport[];
}

export function runPreflight(opts?: {
  only?: GuardRailId[];
  skip?: GuardRailId[];
}): Promise<PreflightReport>;
```

Each rail gets a small async checker registered in a `RAIL_CHECKERS: Record<GuardRailId, Checker>` table inside `preflight.ts`. Checkers are deterministic and read-only (filesystem scans, JSON-LD parse, route enumeration). Rails without a feasible programmatic check return `skipped` with an `evidence[]` note ("manual proof required: see proofRequired").

**Initial checker coverage** (programmatic where realistic; `skipped` otherwise — never silently `pass`):

| Guard rail                        | Check |
|---|---|
| `gr-zero-sister-fingerprints`     | `rg` scan against sibling slugs from `src/master/trades.ts`; fail on any hit. |
| `gr-master-logo-slot-map`         | `rg` for `<img[^>]*src="[^"]*(cmb-\|master/assets/logo)`; fail on any. |
| `gr-bespoke-style-guide-live`     | Verify `/style-guide` route registered in `src/App.tsx`. |
| `gr-page-meta-jsonld-unique`      | Walk `src/pages/*.tsx`, collect `document.title` strings, fail on dup. |
| `gr-crawl-hygiene`                | Check `public/robots.txt` exists and isn't `Disallow: /`; check `public/sitemap.xml` exists. |
| `gr-areas-we-serve-excellence`    | Skipped (requires running app); emit `proofRequired` reminder. |
| `gr-modern-image-pipeline`        | Scan `src/` for `.png`/`.jpg` `<img src=` without companion `.webp`/`.avif`; warn. |
| `gr-performance-budget-mobile`    | Skipped — runtime measurement; remind to run Lighthouse. |
| `gr-wcag-aa`                      | Skipped — runtime; remind to run axe. |
| `gr-booking-one-tap`              | Verify `BookingModal` import in `src/App.tsx` (already required). |
| `gr-real-business-signals`        | Scan footer/contact pages for a phone-number regex + address keyword. |
| `gr-legal-pages-bespoke`          | Verify `/privacy` and `/terms` routes exist + files are >1KB. |
| `gr-motion-system-pinned`         | Verify `framer-motion` import + presence of a motion config file. |
| `gr-anti-paraphrase-readability`  | Skipped — needs sister-site corpus; remind. |
| `gr-bespoke-brand-derivation`     | Verify `src/config/brand-identity.ts` exists. |
| `gr-local-trust-schema`           | `rg` for `"@type":\s*"LocalBusiness"` in `src/`. |
| `gr-plan-first-deep-items`        | Verify `.lovable/plan.md` exists and is non-empty. |
| `gr-prelaunch-walk-postlaunch-monitor` | Skipped — operational; remind. |

Every checker returns evidence and (on failure) a one-line remediation that ends with: `→ consult <partnerDoc1>, <partnerDoc2>`.

---

## 3. CLI runner

**New file:** `scripts/preflight.ts`

```bash
bun scripts/preflight.ts                      # run all rails
bun scripts/preflight.ts --only gr-crawl-hygiene
bun scripts/preflight.ts --json               # machine output
bun scripts/preflight.ts --strict             # exit 1 on any fail OR skip
```

Default exit code: `0` if no failures, `1` if any rail fails. Pretty output groups by `GuardRailCategory`, shows `✓ / ✗ / ◌`, prints failures with their linked partner-doc paths.

Example output:
```text
✗ gr-zero-sister-fingerprints   Brand & Identity
  3 failures:
    - src/components/Hero.tsx:42 references "drywall-pro"
    - src/pages/About.tsx:11 references "calem-wood"
  remediation: remove sibling slug references; rerun.
  → consult: cmb-strategy-1.3, cmb-brand-1.2.1, cmb-strategy-1.0
  partner docs:
    src/master/knowledge/partner-documents/.../strategy/1.3_..._.partner.md
    src/master/knowledge/partner-documents/.../brand-identity/1.2.1_..._.partner.md
```

---

## 4. Wire into every website build

**Edit `package.json` scripts:**

```json
"scripts": {
  "preflight": "bun scripts/preflight.ts",
  "prebuild": "bun scripts/preflight.ts --strict",
  "build": "vite build",
  "build:dev": "vite build --mode development"
}
```

`prebuild` runs automatically before `build`. In `--strict` mode, any failure halts the build. Dev (`bun dev`) is unaffected so iteration stays fast.

**Vite plugin (lightweight, dev-time warning):** `vite.config.ts` gets a small custom plugin that runs `runPreflight()` once on dev-server start and prints a one-line "⚠ N guard rails failing — run `bun preflight` for details." No build halt in dev.

---

## 5. UI surface (reuses existing `/knowledge` infrastructure)

**New route:** `/knowledge/preflight` (internal, `noindex`).

**New files:**
- `src/pages/Preflight.tsx`
- `src/components/knowledge/PreflightDashboard.tsx`

UX:
- "Run preflight" button calls a new edge function `preflight` that re-runs the same `runPreflight()` logic (logic is shared via the import; the edge function just wraps it for HTTP access from the client).
- Renders the `PreflightReport` grouped by category, each rail showing status icon, law, evidence, failures, remediation, and clickable links to partner docs (reusing `DECISION_INDEX` lookups so we get categories + guard-rail chips for free).
- Failed rails are pinned to the top.

**Edge function:** `supabase/functions/preflight/index.ts` — calls `runPreflight()` server-side (so the client never has to do filesystem scans), returns the typed report. CORS + 429/402 standard error pass-through (no AI calls here).

> Note: file-system checkers in the edge function will scan the deployed function bundle, not the live repo. For accurate results in CI/local, the CLI is the source of truth; the UI is for at-a-glance during development.

---

## 6. Coverage assertions

Add to `preflight.ts`:

- `assertEveryRailHasChecker()` — fails build if a new `GuardRailId` is added without a checker entry. Forces future rails to be wired in.
- `assertEveryRailHasRoutes()` — wraps `getUnroutedGuardRails()`; fails if any rail has zero linked routes (currently every rail has at least one).

These run as the first thing inside `runPreflight()`. Misses are reported as a special `gr-meta-coverage` failure.

---

## 7. Documentation (additive only)

**Edit `src/master/playbooks/GUARD_RAILS.md`** — append a "Build-time Enforcement" section pointing at `scripts/preflight.ts`, the `prebuild` hook, and `/knowledge/preflight`.

**Edit `src/master/knowledge/README.md`** — add a "Preflight" subsection under "Searchable Index".

**Edit `src/master/knowledge/DECISION_ROUTER.md`** — add a one-liner: "Programmatic enforcement: `bun preflight` runs every guard rail and links failures back to these partner docs."

No source docs touched. No partner docs touched. No changes to existing `guardrails.ts` or `checklist.ts` (the rail set and checklist items remain the contract).

---

## 8. Files to create / change

Create:
- `src/master/knowledge/guardrail-routes.ts`
- `src/master/knowledge/preflight.ts`
- `scripts/preflight.ts`
- `src/pages/Preflight.tsx`
- `src/components/knowledge/PreflightDashboard.tsx`
- `supabase/functions/preflight/index.ts`

Edit (additive):
- `package.json` — add `preflight` and `prebuild` scripts.
- `vite.config.ts` — add a tiny dev-only warning plugin.
- `src/App.tsx` — register `/knowledge/preflight`.
- `src/master/playbooks/GUARD_RAILS.md` — append enforcement section.
- `src/master/knowledge/README.md` — append preflight subsection.
- `src/master/knowledge/DECISION_ROUTER.md` — one-line pointer.

---

## 9. Verification after build

- `bun preflight` runs in <2s on the current repo and prints a categorized report.
- `bun run build` halts when any rail fails (because of `prebuild --strict`); succeeds otherwise.
- `/knowledge/preflight` renders the same report with clickable partner-doc links.
- `assertEveryRailHasChecker()` and `assertEveryRailHasRoutes()` both green.
- Source docs (`source-documents/**`) remain byte-identical. Partner docs untouched. `guardrails.ts` and `checklist.ts` untouched.