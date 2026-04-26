/**
 * CLI: bun scripts/decisions.ts "<query>" [--category seo] [--limit 10]
 *
 * Prints lean route results from the deterministic keyword scorer in
 * src/master/knowledge/decision-search.ts.
 *
 * For the AI fallback, use the /knowledge UI route (which calls the
 * decision-search-ai edge function) — keeping the CLI dependency-free.
 */

import {
  searchDecisions,
  topScore,
  AI_FALLBACK_THRESHOLD,
} from "../src/master/knowledge/decision-search";
import type { DecisionCategory } from "../src/master/knowledge/decision-index";

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let query = "";
  let category: DecisionCategory | undefined;
  let limit = 10;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--category" && args[i + 1]) {
      category = args[++i] as DecisionCategory;
    } else if (a === "--limit" && args[i + 1]) {
      limit = parseInt(args[++i], 10) || 10;
    } else if (!a.startsWith("--")) {
      query = query ? `${query} ${a}` : a;
    }
  }
  return { query, category, limit };
}

function pad(s: string, n: number): string {
  if (s.length >= n) return s.slice(0, n - 1) + "…";
  return s + " ".repeat(n - s.length);
}

const { query, category, limit } = parseArgs(process.argv);

if (!query) {
  console.error("Usage: bun scripts/decisions.ts \"<query>\" [--category seo] [--limit 10]");
  process.exit(1);
}

const results = searchDecisions(query, { category, limit });

if (results.length === 0) {
  console.log(`No keyword matches for: "${query}"`);
  console.log("Try the /knowledge UI route for AI-assisted matching.");
  process.exit(0);
}

console.log(`\nQuery: "${query}"${category ? ` [category=${category}]` : ""}\n`);
console.log(
  pad("score", 7) + pad("id", 22) + pad("partner doc", 70) + "why",
);
console.log("-".repeat(140));
for (const r of results) {
  console.log(
    pad(r.score.toFixed(2), 7) +
      pad(r.route.id, 22) +
      pad(r.route.partnerDoc, 70) +
      r.reason,
  );
}

const top = topScore(results);
if (top < AI_FALLBACK_THRESHOLD) {
  console.log(
    `\n⚠  Top score ${top.toFixed(2)} below AI fallback threshold ${AI_FALLBACK_THRESHOLD}.`,
  );
  console.log("    Open /knowledge in the app and click \"Ask AI\" for a semantic match.");
}
console.log("");
