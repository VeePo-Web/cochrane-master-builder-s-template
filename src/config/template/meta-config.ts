/**
 * meta-config.ts — Per-route <head> metadata for the master template.
 *
 * MASTER DEFAULTS — neutral master-builder voice with visible {SERVICE}
 * tokens, so a remix author can see exactly what to regenerate per trade.
 * Regenerate via the Per-Trade SEO Copy System when remixing; do not ship
 * a remix with visible tokens.
 *
 * Area pages (/areas-we-serve/*) manage their own meta dynamically via
 * communities.ts — never from this file.
 *
 * Title rule: ≤ 60 chars. Primary keyword + city first. Brand name last.
 * Desc rule:  140–155 chars. Keyword + city + outcome + trust signal.
 *             No price mentions. Ends with "Send photos for a quote."
 */

export interface PageMeta {
  /** ≤ 60 chars. Rendered in <title> and as fallback for ogTitle. */
  title: string;
  /** 140–155 chars. No exclamation marks. No banned words. */
  description: string;
  /** ≤ 70 chars. Can be more editorial than SEO title. Falls back to title. */
  ogTitle?: string;
  /** Falls back to description. */
  ogDescription?: string;
  /**
   * Absolute canonical URL. Replace CANONICAL_ORIGIN at deploy time.
   * e.g. https://cochrane-{trade}.ca
   */
  canonical?: string;
}

// ─── Origin placeholder — replace at build time or in env ────────────────────
const ORIGIN = "https://cochrane-master-builders.com";

// ─── Static route map ─────────────────────────────────────────────────────────
export const META_CONFIG: Record<string, PageMeta> = {

  "/": {
    title: "{SERVICE} Cochrane | Cochrane Master Builders",
    description:
      "{SERVICE} in Cochrane — scoped in writing before work begins. Written scope, 15-year structural guarantee on every invoice. Send photos for a quote.",
    ogTitle: "Cochrane Master Builders — The Work Stays.",
    canonical: `${ORIGIN}/`,
  },

  "/brand-story": {
    title: "Our Story | Cochrane Master Builders",
    description:
      "The craft behind Cochrane Master Builders. Why we scope every project in writing, check every surface twice, and have built in Cochrane for generations.",
    ogTitle: "Why We Put It in Writing — The Cochrane Master Builders Story",
    canonical: `${ORIGIN}/brand-story`,
  },

  "/why-we-love": {
    title: "Why We Love {SERVICE} | Cochrane Master Builders",
    description:
      "An honest account of what {SERVICE} actually demands — the preparation, the tolerances, the checks. Written by people who practise the craft off the clock.",
    ogTitle: "Why We Love {SERVICE}. An Honest Confession.",
    canonical: `${ORIGIN}/why-we-love`,
  },

  "/services": {
    title: "{SERVICE} Services Cochrane | Cochrane Master Builders",
    description:
      "Every {SERVICE} offering in Cochrane under one crew — repairs to full projects. Built to the trade's published standard. 15-year guarantee. Send photos.",
    ogTitle: "Every {SERVICE} Service Cochrane Needs — One Crew.",
    canonical: `${ORIGIN}/services`,
  },

  "/pricing": {
    title: "{SERVICE} Pricing | Cochrane Master Builders",
    description:
      "{SERVICE} pricing in Cochrane: written ranges by scope and material — before work starts, not after. No surprise invoices. Send photos for a quote.",
    ogTitle: "{SERVICE} Pricing in Cochrane — Written Before Work Starts.",
    canonical: `${ORIGIN}/pricing`,
  },

  "/gallery": {
    title: "{SERVICE} Gallery Cochrane | Cochrane Master Builders",
    description:
      "Completed {SERVICE} work in Cochrane and Rocky View County. Before-and-after photography from real projects, each carrying the 15-year guarantee.",
    ogTitle: "{SERVICE} Work in Cochrane — Before and After.",
    canonical: `${ORIGIN}/gallery`,
  },

  "/reviews": {
    title: "{SERVICE} Reviews | Cochrane Master Builders",
    description:
      "What Cochrane homeowners say after their {SERVICE} projects. Specific outcomes, timelines, and written guarantee references — never vague praise.",
    ogTitle: "What Cochrane Homeowners Say — In Their Words.",
    canonical: `${ORIGIN}/reviews`,
  },

  "/about": {
    title: "About Cochrane Master Builders",
    description:
      "Cochrane Master Builders builds as the seventh generation in a town shaped by builders since 1881. Published standards, $5M coverage, 15-year guarantee.",
    ogTitle: "About Cochrane Master Builders — The Seventh Generation.",
    canonical: `${ORIGIN}/about`,
  },

  "/contact": {
    title: "Contact Cochrane Master Builders",
    description:
      "Send 2–3 photos of the space and one sentence about the project. Written range back within one business day. No call required to start. Cochrane and area.",
    ogTitle: "Start With Two Photos — Cochrane Master Builders.",
    canonical: `${ORIGIN}/contact`,
  },

  "/thank-you": {
    title: "Request Received | Cochrane Master Builders",
    description:
      "Your project photos are in. We review every submission and reply with a written range within one business day. No call required unless you prefer it.",
    ogTitle: "Request Received — Cochrane Master Builders",
    canonical: `${ORIGIN}/thank-you`,
  },

  "/guarantee": {
    title: "{SERVICE} Guarantee | Cochrane Master Builders",
    description:
      "The Generational Finish Guarantee: clean worksite or work is free, 14-day zero-cost touch-up, 15-year structural warranty. In writing on every invoice. Send photos for a quote.",
    ogTitle: "Three Guarantees. Every Project. In Writing.",
    canonical: `${ORIGIN}/guarantee`,
  },

  "/faq": {
    title: "{SERVICE} FAQ | Cochrane Master Builders",
    description:
      "Answers to the most common {SERVICE} questions — pricing, process, timeline, guarantees, and service areas. Written quotes within 24 hours. Send photos for a quote.",
    ogTitle: "{SERVICE} FAQ — Cochrane Master Builders.",
    canonical: `${ORIGIN}/faq`,
  },

  "/privacy": {
    title: "Privacy Policy | Cochrane Master Builders",
    description:
      "How Cochrane Master Builders collects, uses, and protects the information you share when requesting a project quote or using this website.",
    canonical: `${ORIGIN}/privacy`,
  },

  "/terms": {
    title: "Terms of Service | Cochrane Master Builders",
    description:
      "Terms governing use of the Cochrane Master Builders website, project quote requests, and service agreements for {SERVICE} work in Cochrane, AB.",
    canonical: `${ORIGIN}/terms`,
  },
};

// ─── Dynamic service detail meta ─────────────────────────────────────────────
/**
 * Generates PageMeta for /services/:slug routes.
 * MASTER DEFAULT: derives neutral metadata from the slug itself. A remix
 * regenerates this map with per-sub-service keyword + outcome copy via the
 * SEO Copy System (slug e.g. "{sub-service-slug}").
 */
export const META_SERVICE_DETAIL = (slug: string): PageMeta => {
  // Humanize the slug for a readable default title: "floor-repair" → "Floor Repair"
  const humanized = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${humanized} Cochrane | Cochrane Master Builders`.slice(0, 60),
    description:
      `${humanized} in Cochrane, AB — written scope, the trade's published standard, 15-year structural guarantee on every invoice. Send photos for a quote.`.slice(0, 155),
    canonical: `${ORIGIN}/services/${slug}`,
  };
};
