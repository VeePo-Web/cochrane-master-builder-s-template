/**
 * SEO BAKE — build-time static SEO layer for every route.
 *
 * Benchmark: cochranemasterpainters.com — the shipped HTML of every route
 * must be scrapable WITHOUT JavaScript:
 *
 *   1. Per-route <title>, meta description, canonical, and OG tags
 *   2. Static JSON-LD in the initial HTML (Organization + WebSite on "/",
 *      WebPage + BreadcrumbList everywhere, Service+Offer catalog, FAQPage
 *      on /faq) — never runtime-injected only
 *   3. A <noscript> seo-static-content block: breadcrumb, <h1>, lede,
 *      services nav, areas nav — real crawlable content per route
 *   4. dist/sitemap.xml — every template route + the full Areas-We-Serve
 *      tree (read-only consumption of communities.ts)
 *   5. dist/llms.txt — the AI-crawler brand summary
 *
 * Everything derives from config (META_CONFIG, MASTER_REMIX, communities),
 * so a remix regenerates painters-grade output automatically — no manual
 * SEO work per remix.
 *
 * Registered in vite.config.ts; runs on `vite build` via closeBundle.
 */

import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

import { META_CONFIG } from "../src/config/template/meta-config";
import { MASTER_REMIX } from "../src/config/template/remix-variables";
import { EMAIL } from "../src/config/template/contact";
import { REGIONS, COMMUNITIES } from "../src/data/communities";

// ─── Derived constants ───────────────────────────────────────────────────────

const ORIGIN = (META_CONFIG["/"].canonical ?? "https://cochrane-master-builders.com/").replace(/\/$/, "");
const BRAND = MASTER_REMIX.BRAND_NAME;
const SLOGAN = MASTER_REMIX.BRAND_SLOGAN;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Human page label for breadcrumbs: "/brand-story" → "Brand Story"
const routeLabel = (route: string) =>
  route === "/"
    ? "Home"
    : route
        .replace(/^\//, "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

// ─── JSON-LD builders ────────────────────────────────────────────────────────

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${ORIGIN}/#organization`,
    name: BRAND,
    slogan: SLOGAN,
    url: `${ORIGIN}/`,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cochrane",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: 51.1894, longitude: -114.4669 },
    areaServed: MASTER_REMIX.COMMUNITIES.map((name) => ({ "@type": "City", name })),
    makesOffer: MASTER_REMIX.SUB_SERVICES.map((s) => ({
      "@type": "Offer",
      priceRange: s.range,
      itemOffered: { "@type": "Service", name: s.title, description: s.summary },
    })),
  };
}

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    name: BRAND,
    url: `${ORIGIN}/`,
    publisher: { "@id": `${ORIGIN}/#organization` },
  };
}

function webPageSchema(route: string, title: string, description: string) {
  const crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` }];
  if (route !== "/") {
    crumbs.push({
      "@type": "ListItem",
      position: 2,
      name: routeLabel(route),
      item: `${ORIGIN}${route}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${ORIGIN}${route === "/" ? "/" : route}`,
    isPartOf: { "@id": `${ORIGIN}/#website` },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: crumbs },
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MASTER_REMIX.FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

const ld = (obj: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

// ─── <noscript> static content block ─────────────────────────────────────────

function noscriptBlock(route: string, h1: string, lede: string) {
  const services = MASTER_REMIX.SUB_SERVICES.map(
    (s) => `<li><a href="/services">${esc(s.title)}</a> — ${esc(s.summary)}</li>`,
  ).join("");
  const areas = REGIONS.map(
    (r) => `<li><a href="/areas-we-serve/${r.slug}">${esc(r.name)}</a></li>`,
  ).join("");
  const pages = Object.keys(META_CONFIG)
    .filter((p) => p !== route)
    .map((p) => `<li><a href="${p}">${esc(routeLabel(p))}</a></li>`)
    .join("");
  const crumb =
    route === "/"
      ? `<ol><li><a href="/">Home</a></li></ol>`
      : `<ol><li><a href="/">Home</a></li><li>${esc(routeLabel(route))}</li></ol>`;
  return (
    `<noscript><div class="seo-static-content">` +
    `<nav aria-label="Breadcrumb">${crumb}</nav>` +
    `<h1>${esc(h1)}</h1>` +
    `<p>${esc(lede)}</p>` +
    `<nav aria-label="Services"><ul>${services}</ul></nav>` +
    `<nav aria-label="Areas we serve"><ul>${areas}</ul></nav>` +
    `<nav aria-label="Pages"><ul>${pages}</ul></nav>` +
    `</div></noscript>`
  );
}

// ─── Head rewriting ──────────────────────────────────────────────────────────

interface BakeOpts {
  route: string;
  title: string;
  description: string;
  ogTitle?: string;
  ldBlocks: string[];
  noscriptHtml: string;
}

/** Generic per-route head/body rewrite used by template AND area routes. */
function bakePage(shell: string, opts: BakeOpts): string {
  const { route, title, description, ldBlocks, noscriptHtml } = opts;
  const canonical = `${ORIGIN}${route === "/" ? "/" : route}`;
  const ogTitle = opts.ogTitle ?? title;

  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${esc(description)}"`,
    )
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(ogTitle)}"`)
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${esc(description)}"`,
    )
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(ogTitle)}"`)
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${esc(description)}"`,
    );

  html = html.replace("</head>", `${ldBlocks.join("")}</head>`);
  html = html.replace("</body>", `${noscriptHtml}</body>`);
  return html;
}

function rewriteHead(shell: string, route: string): string {
  const meta = META_CONFIG[route];
  const blocks: string[] = [];
  if (route === "/") blocks.push(ld(orgSchema()), ld(webSiteSchema()));
  blocks.push(ld(webPageSchema(route, meta.title, meta.description)));
  if (route === "/faq") blocks.push(ld(faqSchema()));

  return bakePage(shell, {
    route,
    title: meta.title,
    description: meta.ogDescription ? meta.description : meta.description,
    ogTitle: meta.ogTitle,
    ldBlocks: blocks,
    noscriptHtml: noscriptBlock(route, meta.ogTitle ?? meta.title, meta.description),
  });
}

// ─── Areas-We-Serve baking (READ-ONLY consumption of communities.ts) ─────────
// Titles/descriptions replicate the runtime formulas in AreasHub.tsx,
// RegionPage.tsx, and CommunityPage.tsx exactly, so the baked head matches
// what the SPA sets after hydration. The frozen pages are never modified.

const SC = MASTER_REMIX.SERVICE_CATEGORY;
const S = MASTER_REMIX.SERVICE;

function areaCrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${ORIGIN}${it.path}`,
      })),
    ],
  };
}

function areaWebPage(route: string, title: string, description: string, crumbs: object) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${ORIGIN}${route}`,
    isPartOf: { "@id": `${ORIGIN}/#website` },
    breadcrumb: crumbs,
  };
}

function areaLocalBusiness(placeName: string, geo?: { lat: number; lng: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cochrane",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "Place",
      name: placeName,
      ...(geo
        ? { geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } }
        : {}),
    },
    hasOfferCatalog: { "@type": "OfferCatalog", name: `${SC} in ${placeName}` },
  };
}

function areaNoscript(crumbHtml: string, h1: string, lede: string, links: { href: string; label: string }[]) {
  const nav = links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("");
  return (
    `<noscript><div class="seo-static-content">` +
    `<nav aria-label="Breadcrumb"><ol>${crumbHtml}</ol></nav>` +
    `<h1>${esc(h1)}</h1><p>${esc(lede)}</p>` +
    `<nav aria-label="Nearby areas"><ul>${nav}</ul></nav>` +
    `</div></noscript>`
  );
}

function bakeAreaRoutes(shell: string, distDir: string): number {
  const bySlug = new Map(COMMUNITIES.map((c) => [c.slug, c]));
  const write = (route: string, html: string) => {
    const dir = path.join(distDir, route.replace(/^\//, ""));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  };
  let n = 0;

  // Hub — /areas-we-serve  (formula from AreasHub.tsx)
  {
    const route = "/areas-we-serve";
    const title = `${SC} Contractor — Areas We Serve | ${BRAND}`;
    const description = `${BRAND} provides professional ${S} services to 120+ communities across Cochrane, Calgary SW, Springbank, Elbow Valley, Rocky View County, the Bow Valley, and Canmore. Family-owned and Cochrane-based.`;
    const crumbs = areaCrumbs([{ name: "Areas We Serve", path: route }]);
    write(
      route,
      bakePage(shell, {
        route,
        title,
        description,
        ldBlocks: [ld(areaLocalBusiness("Cochrane and area")), ld(areaWebPage(route, title, description, crumbs))],
        noscriptHtml: areaNoscript(
          `<li><a href="/">Home</a></li><li>Areas We Serve</li>`,
          title,
          description,
          REGIONS.map((r) => ({ href: `/areas-we-serve/${r.slug}`, label: r.name })),
        ),
      }),
    );
    n++;
  }

  // Regions — /areas-we-serve/:region  (formula from RegionPage.tsx)
  for (const r of REGIONS) {
    const route = `/areas-we-serve/${r.slug}`;
    const communities = COMMUNITIES.filter((c) => c.region === r.slug);
    const title = `${SC} — ${r.name} Alberta | ${BRAND}`;
    const description =
      `${BRAND} serves ${communities.length} communities in ${r.name}, Alberta. ` +
      `Master-craft ${S} — Cochrane-based. ` +
      communities.slice(0, 4).map((c) => c.name).join(", ") +
      " and more.";
    const crumbs = areaCrumbs([
      { name: "Areas We Serve", path: "/areas-we-serve" },
      { name: r.name, path: route },
    ]);
    write(
      route,
      bakePage(shell, {
        route,
        title,
        description,
        ldBlocks: [ld(areaLocalBusiness(`${r.name}, Alberta`)), ld(areaWebPage(route, title, description, crumbs))],
        noscriptHtml: areaNoscript(
          `<li><a href="/">Home</a></li><li><a href="/areas-we-serve">Areas We Serve</a></li><li>${esc(r.name)}</li>`,
          title,
          description,
          communities.map((c) => ({ href: `/areas-we-serve/${r.slug}/${c.slug}`, label: c.name })),
        ),
      }),
    );
    n++;
  }

  // Communities — /areas-we-serve/:region/:community  (formula from CommunityPage.tsx)
  for (const c of COMMUNITIES) {
    const route = `/areas-we-serve/${c.region}/${c.slug}`;
    const nearest = c.nearestCommunities
      .slice(0, 2)
      .map((sl) => bySlug.get(sl)?.name)
      .filter(Boolean) as string[];
    const title = `${SC} Contractor ${c.name} ${c.city} | ${BRAND} | Alberta`;
    const description =
      `Looking for ${S} in ${c.name}? ${BRAND} serves ${c.name}` +
      (nearest.length ? ` and nearby ${nearest.join(", ")}` : "") +
      `. Family-owned, Cochrane-based. Licensed & insured. Written estimate within 24 hours.`;
    const regionName = REGIONS.find((r) => r.slug === c.region)?.name ?? c.region;
    const crumbs = areaCrumbs([
      { name: "Areas We Serve", path: "/areas-we-serve" },
      { name: regionName, path: `/areas-we-serve/${c.region}` },
      { name: c.name, path: route },
    ]);
    write(
      route,
      bakePage(shell, {
        route,
        title,
        description,
        ldBlocks: [
          ld(areaLocalBusiness(c.name, c.coordinates)),
          ld(areaWebPage(route, title, description, crumbs)),
        ],
        noscriptHtml: areaNoscript(
          `<li><a href="/">Home</a></li><li><a href="/areas-we-serve">Areas We Serve</a></li><li><a href="/areas-we-serve/${c.region}">${esc(regionName)}</a></li><li>${esc(c.name)}</li>`,
          title,
          c.shortDescription,
          c.nearestCommunities
            .map((sl) => bySlug.get(sl))
            .filter((x): x is NonNullable<typeof x> => Boolean(x))
            .map((nc) => ({ href: `/areas-we-serve/${nc.region}/${nc.slug}`, label: nc.name })),
        ),
      }),
    );
    n++;
  }

  return n;
}

// ─── Sitemap + llms.txt ──────────────────────────────────────────────────────

function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: { loc: string; priority: string }[] = [];

  for (const route of Object.keys(META_CONFIG)) {
    urls.push({ loc: `${ORIGIN}${route === "/" ? "/" : route}`, priority: route === "/" ? "1.0" : "0.8" });
  }
  urls.push({ loc: `${ORIGIN}/areas-we-serve`, priority: "0.8" });
  for (const r of REGIONS) {
    urls.push({ loc: `${ORIGIN}/areas-we-serve/${r.slug}`, priority: "0.7" });
  }
  for (const c of COMMUNITIES) {
    urls.push({ loc: `${ORIGIN}/areas-we-serve/${c.region}/${c.slug}`, priority: "0.6" });
  }

  const body = urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function buildLlmsTxt(): string {
  const services = MASTER_REMIX.SUB_SERVICES.map((s) => `- ${s.title} — /services — ${s.summary}`).join("\n");
  const regions = REGIONS.map((r) => `- ${r.name} — /areas-we-serve/${r.slug}`).join("\n");
  const pages = Object.keys(META_CONFIG)
    .map((p) => `- ${routeLabel(p)}: ${ORIGIN}${p === "/" ? "/" : p} — ${META_CONFIG[p].description}`)
    .join("\n");
  return `# ${BRAND}
> ${SLOGAN}. {SERVICE} in Cochrane, Alberta — written scope, published-standard work, and a 15-year structural guarantee on every invoice.

## About
${BRAND} serves Cochrane, Alberta and the surrounding communities. Every project is quoted in writing from 2–3 photos, built to the trade's published standard, and backed by the written Generational Finish Guarantee (clean worksite or the work is free, 14-day zero-cost touch-up window, 15-year structural warranty). Part of the Cochrane Master Builders family of local trade brands.

## Services
${services}

## Areas Served
Primary service area is Cochrane and region:
${regions}
Full community list: ${ORIGIN}/areas-we-serve

## Key Pages
${pages}

## Contact
- Email: ${EMAIL}
- Quotes: send 2–3 photos via ${ORIGIN}/contact — written range within one business day.
`;
}

// ─── The plugin ──────────────────────────────────────────────────────────────

export function seoBake(): Plugin {
  return {
    name: "seo-bake",
    // No `apply` filter: closeBundle only fires on build, and
    // configurePreviewServer only on preview — dev is untouched.
    // Serve baked per-route HTML in `vite preview` too (production hosts —
    // Vercel/Netlify/CF — already check the filesystem before the SPA
    // fallback; this makes local preview behave the same way).
    configurePreviewServer(server) {
      const distDir = path.resolve(__dirname, "../dist");
      server.middlewares.use((req, _res, next) => {
        const url = (req.url ?? "/").split("?")[0];
        if (url !== "/" && !url.includes(".")) {
          const baked = path.join(distDir, url.replace(/^\//, ""), "index.html");
          if (fs.existsSync(baked)) req.url = `${url.replace(/\/$/, "")}/index.html`;
        }
        next();
      });
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, "../dist");
      const shellPath = path.join(distDir, "index.html");
      if (!fs.existsSync(shellPath)) return;
      const shell = fs.readFileSync(shellPath, "utf8");

      let baked = 0;
      for (const route of Object.keys(META_CONFIG)) {
        const html = rewriteHead(shell, route);
        if (route === "/") {
          fs.writeFileSync(shellPath, html);
        } else {
          const dir = path.join(distDir, route.replace(/^\//, ""));
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "index.html"), html);
        }
        baked++;
      }

      const areaBaked = bakeAreaRoutes(shell, distDir);

      fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemap());
      fs.writeFileSync(path.join(distDir, "llms.txt"), buildLlmsTxt());

      // eslint-disable-next-line no-console
      console.log(
        `\x1b[32m✓\x1b[0m seo-bake: ${baked} template + ${areaBaked} area routes baked · sitemap.xml (${
          baked + areaBaked
        } urls) · llms.txt`,
      );
    },
  };
}
