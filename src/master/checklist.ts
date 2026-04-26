/**
 * REMIX CHECKLIST — typed source for the /remix dashboard.
 *
 * Each item maps to a real check the dashboard runs (or a manual confirmation).
 * Add items here and the /remix UI renders them automatically.
 */

export type CheckId =
  | "wireframe-matches"
  | "trade-config-edited"
  | "palette-swapped"
  | "logo-generated"
  | "master-logo-rendering"
  | "master-logo-colorway-set"
  | "master-logo-binaries-embedded"
  | "master-emblem-binaries-embedded"
  | "master-tiles-binaries-embedded"
  | "master-monogram-binaries-embedded"
  | "master-wordmark-binaries-embedded"
  | "master-wordmark-ground-binaries-embedded"
  | "master-favicon-pwa-pack-embedded"
  | "master-share-pack-embedded"
  | "master-brand-bible-embedded"
  | "master-brand-kit-page-live"
  | "master-source-artwork-archived"
  | "master-logo-slot-map-followed"
  | "copy-unique"
  | "story-rewritten"
  | "brand-audit-passed"
  | "ai-images-generated"
  | "no-faces-no-people"
  | "perf-budget-green"
  | "navigation-lean"
  | "service-bespoke"
  | "service-areas-rendering"
  | "sister-backlinks-present"
  | "booking-routes-to-master-email"
  | "sitemap-generated"
  | "og-image-generated"
  | "favicon-generated"
  | "schema-localbusiness-present"
  | "leftover-drywall-references-zero";

export interface CheckItem {
  id: CheckId;
  label: string;
  description: string;
  /** Can the dashboard verify this automatically? */
  automated: boolean;
  /** Which playbook explains how to do this */
  playbook?: "REMIX_PLAYBOOK" | "BRAND_AUDIT" | "AI_IMAGE_RULES" | "COPY_GUIDE" | "SEO_PLAYBOOK" | "PERFORMANCE_PLAYBOOK";
  /** Grouping for the UI */
  group: "setup" | "brand" | "content" | "seo" | "quality";
}

export const REMIX_CHECKLIST: CheckItem[] = [
  // Setup
  { id: "trade-config-edited", group: "setup", automated: true, playbook: "REMIX_PLAYBOOK", label: "trade.config.ts updated", description: "Identity, services, and palette accent reflect the new trade." },
  { id: "logo-generated", group: "setup", automated: true, playbook: "REMIX_PLAYBOOK", label: "Trade logo generated", description: "AI-generated wordmark from the master CMB logo, saved to /public/." },
  { id: "favicon-generated", group: "setup", automated: true, label: "Favicon + PWA icons generated", description: "Derived from the trade logo." },
  { id: "og-image-generated", group: "setup", automated: true, label: "OG / social image generated", description: "Master Builders OG card embedded — replaces legacy Cochrane Drywall art. Full multi-platform share pack lives in /public/share/ (see master-share-pack-embedded)." },
  { id: "master-logo-rendering", group: "setup", automated: true, label: "Master CMB logo rendering in nav + footer", description: "<MasterLogo slot='nav'> and slot='footer' resolve to a master file or per-trade override (see LOGO_USAGE.md)." },
  { id: "master-logo-colorway-set", group: "setup", automated: true, label: "Logo colorway chosen", description: "TRADE.identity.logoColorway is one of: black | navy | white. Verify contrast against nav, footer, hero, and OG surfaces." },
  { id: "master-logo-binaries-embedded", group: "setup", automated: true, label: "Master logo binaries embedded (chosen colorway)", description: "Real PNGs in /src/master/assets/logo/ for the active colorway — no aliases. Black, navy, and white full lockups are all ✅." },
  { id: "master-emblem-binaries-embedded", group: "setup", automated: true, label: "Master emblem binaries embedded", description: "Square emblem-only PNGs (100/200/400/800/1200/2400) wired through <MasterLogo slot='emblem' size={…}>. Black ✅; navy + white aliased to black until those packages land (see EMBLEM_STATUS)." },
  { id: "master-tiles-binaries-embedded", group: "setup", automated: true, label: "Master tiles binaries embedded", description: "Exploded/tiled emblem PNGs (100/200/400/800/1200/2400) wired through <MasterLogo slot='tiles' size={…}>. Black, navy, and white all ✅ (see TILES_STATUS)." },
  { id: "master-monogram-binaries-embedded", group: "setup", automated: true, label: "Master monogram binaries embedded", description: "Handwritten 'MB' signature PNGs (64/128/256/512/1024) wired through <MasterLogo slot='monogram' size={…}>. Black, navy, and white all ✅ (see MONOGRAM_STATUS)." },
  { id: "master-wordmark-binaries-embedded", group: "setup", automated: true, label: "Master wordmark binaries embedded", description: "Pure-typography wordmark PNGs (200/400/800/1200/2400) wired through <MasterLogo slot='wordmark' size={…}>. Black, navy, and white all ✅ — matrix complete (see WORDMARK_STATUS)." },
  { id: "master-wordmark-ground-binaries-embedded", group: "setup", automated: true, label: "Master wordmark Ground variant embedded", description: "Drafted plumb-line + base rule wordmark PNGs (200/400/800/1200/2400) wired through <MasterLogo slot='wordmarkGround' size={…}>. Black, navy, and white all ✅ — matrix complete (see WORDMARK_GROUND_STATUS)." },
  { id: "master-favicon-pwa-pack-embedded", group: "setup", automated: true, label: "Favicon + PWA icon pack embedded", description: "Full navy MB-diamond ladder (favicon.ico + 16/32/48/64/96/128/144/152/180/192/256/512) plus white reverse-colorway ladder (32/64/128/192/256/512) in /public/, served via prefers-color-scheme media queries for dark-mode browser chrome. Wired into index.html with theme-color #1F2F4D, msapplication tile metadata, and site.webmanifest declaring start_url/scope and 8 icon entries (any + maskable). Unlocks crisp navy chrome on light surfaces, white reverse on dark surfaces, and PWA install across iOS / Android / desktop — no service worker required." },
  { id: "master-share-pack-embedded", group: "setup", automated: true, label: "Social share + OG + profile pack embedded", description: "10-file share pack in /public/share/ — 5 platform sizes (OG 1200×630, Twitter 1200×600, LinkedIn 1584×396, Instagram 1080×1080, Profile 400×400) × 2 backgrounds (transparent + navybg). Wired into index.html for og:image / twitter:image (navy 1200×630) with width/height/alt meta. Typed registry at src/master/brand/share-pack.ts with getShareAsset() helper and recommendedShareBackground() decision rule (default navybg for external surfaces). Per-file consumer map documented in LOGO_SLOT_MAP.md → 'Social share & profile pack'." },
  { id: "master-brand-bible-embedded", group: "setup", automated: true, label: "Brand bible embedded", description: "Canonical brand contract lives at src/master/brand/BRAND_BIBLE.md — colors (#1F2F4D), size ladders, naming convention, clear-space rules, minimum-size rules, do's/don'ts, code patterns, master file → surface map. Single source of truth; if a rule is contested, the bible wins." },
  { id: "master-brand-kit-page-live", group: "setup", automated: true, label: "/brand brand-kit page live", description: "Internal brand-kit surface at /brand renders the 5 showcase boards (downloadable), 3 colorway swatches with hex/HSL copy-to-clipboard, all 6 mark families (lockup, emblem, tiles, monogram, wordmark, wordmark-ground), the share pack with platform labels + downloads, clear-space + minimum-size demonstrations, and the don'ts grid. noindex; direct URL only — never linked from public nav." },
  { id: "master-source-artwork-archived", group: "setup", automated: true, label: "Master source artwork archived", description: "Both canonical compositions archived to src/master/assets/logo/source/ — no-ground (cmb-source-lockup-no-ground.png) + with-ground (cmb-source-lockup-with-ground.png). Archive-only; never <img>'d. README in folder enforces the rule." },
  { id: "master-logo-slot-map-followed", group: "setup", automated: false, label: "New logo surfaces follow the slot map", description: "Any new component using a logo is added to LOGO_SLOT_MAP.md and rendered via <MasterLogo slot=\"...\"/> — never <img src=\".../cmb-...png\"> direct." },

  // Brand
  { id: "palette-swapped", group: "brand", automated: true, playbook: "BRAND_AUDIT", label: "Palette accent swapped", description: "One accent only. No leftover drywall accent values." },
  { id: "leftover-drywall-references-zero", group: "brand", automated: true, playbook: "BRAND_AUDIT", label: "Zero leftover 'drywall' references", description: "Codebase scan finds no stale references from the source template." },
  { id: "wireframe-matches", group: "brand", automated: false, playbook: "REMIX_PLAYBOOK", label: "Wireframe matches the master pattern", description: "Hero → trust → services → process → before/after → FAQ → CTA." },
  { id: "brand-audit-passed", group: "brand", automated: false, playbook: "BRAND_AUDIT", label: "Manual brand audit passed", description: "Walk the BRAND_AUDIT checklist; site feels like CMB." },

  // Content
  { id: "copy-unique", group: "content", automated: false, playbook: "COPY_GUIDE", label: "Copy is unique to this trade", description: "No duplicated paragraphs from sister sites — Google penalizes duplication." },
  { id: "story-rewritten", group: "content", automated: false, playbook: "COPY_GUIDE", label: "Story is bespoke", description: "Founding story / process / pain points are this trade's, not borrowed." },
  { id: "service-bespoke", group: "content", automated: false, playbook: "COPY_GUIDE", label: "Services are bespoke", description: "Service cards reflect actual offerings, ranges, and scope of this trade." },
  { id: "ai-images-generated", group: "content", automated: false, playbook: "AI_IMAGE_RULES", label: "AI images generated for every photo slot", description: "Hero, before/afters, ambient backdrops — all replaced." },
  { id: "no-faces-no-people", group: "content", automated: true, playbook: "AI_IMAGE_RULES", label: "No faces, no people in any image", description: "Filename + alt-text scan catches violations." },

  // SEO
  { id: "service-areas-rendering", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "Service-area pages render", description: "/areas/* routes return all 100+ areas with LocalBusiness schema." },
  { id: "sister-backlinks-present", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "Sister-site backlinks render", description: "Footer + area pages cross-link to deployed sister sites." },
  { id: "sitemap-generated", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "sitemap.xml + robots.txt complete", description: "Every page + every area is in the sitemap." },
  { id: "schema-localbusiness-present", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "LocalBusiness JSON-LD present", description: "On home + every service-area page." },

  // Quality
  { id: "navigation-lean", group: "quality", automated: false, label: "Navigation is lean", description: "Top nav has ≤6 items; mobile menu is fast." },
  { id: "perf-budget-green", group: "quality", automated: false, playbook: "PERFORMANCE_PLAYBOOK", label: "Performance budget green", description: "Lighthouse mobile ≥ 90; LCP < 2.5s; CLS < 0.1." },
  { id: "booking-routes-to-master-email", group: "quality", automated: true, label: "Booking routes to master email", description: "Form submissions reach the central CMB inbox with siteSlug tag." },
];

export const CHECKLIST_GROUPS = ["setup", "brand", "content", "seo", "quality"] as const;
export type ChecklistGroup = typeof CHECKLIST_GROUPS[number];
