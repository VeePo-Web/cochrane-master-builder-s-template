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
  { id: "og-image-generated", group: "setup", automated: true, label: "OG / social image generated", description: "16:9 branded share image." },

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
