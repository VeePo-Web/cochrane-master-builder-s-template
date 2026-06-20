/**
 * generate-discovery.ts — post-build discovery layer for the matrix network.
 *
 * Run after `vite-react-ssg build` (npm postbuild). Emits, into dist/:
 *   • sitemap.xml — every prerendered page (scanned from dist/*.html) + the
 *     area pages, as absolute URLs on the remix's own domain. The matrix that
 *     was actually built (gate-eligible cells) is exactly what's in the sitemap.
 *   • llms.txt    — the AI-readable site summary (brand, services, areas, pages).
 *   • robots.txt  — AI-crawler allows + a domain-correct Sitemap directive.
 *
 * Pure Node + the two pure data modules (no @ alias, no app graph).
 */

import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { MASTER_REMIX } from "../src/config/template/remix-variables";
import { COMMUNITIES, REGIONS } from "../src/data/communities";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const BASE = MASTER_REMIX.BRAND_URL.replace(/\/$/, "");

if (!existsSync(DIST)) {
  console.error("[discovery] dist/ not found — run the build first.");
  process.exit(1);
}

// ── 1. Collect prerendered routes by scanning dist for .html ─────────────────
function walkHtml(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const prerendered = walkHtml(DIST).map((f) => {
  let rel = relative(DIST, f).split(sep).join("/").replace(/\.html$/, "");
  rel = rel.replace(/(^|\/)index$/, "");      // index → directory root
  return "/" + rel.replace(/^\/+/, "");        // ensure single leading slash
});

// ── 2. Area pages (SPA routes — JS-rendered, still indexable) ────────────────
const areaPaths = [
  ...REGIONS.map((r) => `/areas-we-serve/${r.slug}`),
  ...COMMUNITIES.map((c) => `/areas-we-serve/${c.region}/${c.slug}`),
];

// ── 3. Normalise + filter (drop noindex / legacy / 404) ──────────────────────
const EXCLUDE = (p: string) =>
  p === "/404" || p === "/thank-you" || p === "/services/detail" || p.includes("/404");

const paths = Array.from(new Set([...prerendered, ...areaPaths]))
  .map((p) => (p === "/" ? "/" : p.replace(/\/$/, "")))
  .filter((p) => p && !EXCLUDE(p))
  .sort();

// ── 4. sitemap.xml ───────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const loc = (p: string) => `${BASE}${p === "/" ? "/" : p}`;
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  paths
    .map(
      (p) =>
        `  <url><loc>${loc(p)}</loc><lastmod>${today}</lastmod>` +
        `<priority>${p === "/" ? "1.0" : p.split("/").length <= 2 ? "0.8" : "0.6"}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

// ── 5. llms.txt ──────────────────────────────────────────────────────────────
const services = MASTER_REMIX.SUB_SERVICES.map((s) => `- ${s.title}: ${BASE}/services/${s.slug}`).join("\n");
const topAreas = COMMUNITIES.slice(0, 20).map((c) => c.name).join(", ");
const llms =
  `# ${MASTER_REMIX.BRAND_NAME}\n\n` +
  `${MASTER_REMIX.BRAND_NAME} provides ${MASTER_REMIX.SERVICE_CATEGORY} (${MASTER_REMIX.SERVICE}) ` +
  `in ${MASTER_REMIX.CITY}, ${MASTER_REMIX.PROVINCE} and the surrounding ${MASTER_REMIX.REGION}. ` +
  `Operating since ${MASTER_REMIX.FOUNDATION_YEAR}. Every project carries a written guarantee.\n\n` +
  `## Key Pages\n` +
  `- Home: ${BASE}/\n` +
  `- Services: ${BASE}/services\n` +
  `- Pricing: ${BASE}/pricing\n` +
  `- Guarantee: ${BASE}/guarantee\n` +
  `- Reviews: ${BASE}/reviews\n` +
  `- Areas We Serve: ${BASE}/areas-we-serve\n` +
  `- Contact: ${BASE}/contact\n\n` +
  `## Services\n${services}\n\n` +
  `## Service Area\n${MASTER_REMIX.CITY}, ${MASTER_REMIX.REGION}, ${MASTER_REMIX.PROVINCE} — including ${topAreas}.\n` +
  `Each service is available in every community we serve: ${BASE}/services/{service}/{community}\n\n` +
  `## Key Facts\n` +
  `- Founded: ${MASTER_REMIX.FOUNDATION_YEAR}\n` +
  `- Location: ${MASTER_REMIX.CITY}, ${MASTER_REMIX.PROVINCE}\n` +
  `- Phone: ${MASTER_REMIX.PHONE}\n` +
  `- Specialization: ${MASTER_REMIX.SERVICE_CATEGORY}\n`;
writeFileSync(join(DIST, "llms.txt"), llms);

// ── 6. robots.txt (domain-correct Sitemap line) ──────────────────────────────
const agents = [
  "Googlebot", "Bingbot", "Twitterbot", "facebookexternalhit",
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web",
  "PerplexityBot", "Google-Extended", "Amazonbot", "Applebot-Extended", "cohere-ai",
];
const robots =
  agents.map((a) => `User-agent: ${a}\nAllow: /\n`).join("\n") +
  `\nUser-agent: *\nAllow: /\n\n` +
  `Sitemap: ${BASE}/sitemap.xml\n`;
writeFileSync(join(DIST, "robots.txt"), robots);

console.log(
  `[discovery] wrote dist/sitemap.xml (${paths.length} urls), dist/llms.txt, dist/robots.txt for ${BASE}`,
);
