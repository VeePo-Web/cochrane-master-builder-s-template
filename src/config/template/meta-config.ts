/**
 * meta-config.ts — Per-route <head> metadata, fully token-driven.
 *
 * Every title/description/canonical is built from MASTER_REMIX tokens, so the
 * master preview is generic and EVERY remix (new trade + city + brand) gets
 * correct meta automatically — nothing to regenerate by hand.
 *
 * Title rule: ≤ 60 chars. Primary keyword + city first, brand last.
 * Desc rule:  ≤ 155 chars. Keyword + city + outcome + a soft CTA.
 * Area pages (/areas-we-serve/*) + the matrix (/services/:slug/:community)
 * manage their own meta from communities.ts / the geomatrix engine.
 */

import { MASTER_REMIX } from "./remix-variables";

export interface PageMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const ORIGIN = MASTER_REMIX.BRAND_URL.replace(/\/$/, "");
const BN = MASTER_REMIX.BRAND_NAME;
const SC = MASTER_REMIX.SERVICE_CATEGORY;
const S = MASTER_REMIX.SERVICE;
const SP = MASTER_REMIX.SERVICE_PLURAL;
const CITY = MASTER_REMIX.CITY;
const REGION = MASTER_REMIX.REGION;
const PROVINCE = MASTER_REMIX.PROVINCE;
const AGE = new Date().getFullYear() - MASTER_REMIX.FOUNDATION_YEAR;

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n) : s);
const t = (s: string) => clip(s, 60);
const d = (s: string) => clip(s, 155);
const url = (p: string) => `${ORIGIN}${p}`;

// ─── Static route map ─────────────────────────────────────────────────────────
export const META_CONFIG: Record<string, PageMeta> = {
  "/": {
    title: t(`${SC} in ${CITY} | ${BN}`),
    description: d(`${SC} in ${CITY} — ${SP} done to one standard. Written scope and a written guarantee on every invoice. Get a free quote.`),
    ogTitle: t(`${BN} — ${SC} in ${CITY}`),
    canonical: url("/"),
  },
  "/brand-story": {
    title: t(`Our Story | ${BN}`),
    description: d(`The line behind ${BN} — why our ${S} work holds to the standard six generations of Cochrane builders set. ${AGE}+ years, one town.`),
    ogTitle: t(`The ${BN} Story`),
    canonical: url("/brand-story"),
  },
  "/why-we-love": {
    title: t(`Why We Love ${SC} | ${BN}`),
    description: d(`An honest account of what ${S} work actually demands — written by people who care about the details long after the job is done.`),
    canonical: url("/why-we-love"),
  },
  "/services": {
    title: t(`${SC} Services in ${CITY} | ${BN}`),
    description: d(`Our ${S} services in ${CITY} — each to one consistent standard, each with a written quote and a written guarantee. Get a free quote.`),
    ogTitle: t(`Every ${SC} Service ${CITY} Needs`),
    canonical: url("/services"),
  },
  "/pricing": {
    title: t(`${SC} Pricing in ${CITY} | ${BN}`),
    description: d(`${SC} pricing in ${CITY}: honest written ranges by scope — before work starts, not after. No surprise invoices. Get a free quote.`),
    ogTitle: t(`${SC} Pricing in ${CITY} — In Writing`),
    canonical: url("/pricing"),
  },
  "/gallery": {
    title: t(`${SC} Gallery — ${CITY} | ${BN}`),
    description: d(`Completed ${S} work across ${CITY} and ${REGION}. Before-and-after photography from real projects, each backed by our written guarantee.`),
    canonical: url("/gallery"),
  },
  "/reviews": {
    title: t(`${SC} Reviews | ${BN}`),
    description: d(`What ${CITY} homeowners say after their ${S} project — specific outcomes, timelines, and written-guarantee references.`),
    ogTitle: t(`What ${CITY} Homeowners Say`),
    canonical: url("/reviews"),
  },
  "/about": {
    title: t(`About ${BN}`),
    description: d(`${BN} — seventh-generation Cochrane builders. One ${S} standard, ${AGE}+ years in the making. Fully insured, written guarantee.`),
    canonical: url("/about"),
  },
  "/contact": {
    title: t(`Contact ${BN}`),
    description: d(`Tell us about your ${S} project in a sentence. A written range comes back within one business day — no call required to start. ${CITY} and area.`),
    ogTitle: t(`Start Your ${S} Project — ${BN}`),
    canonical: url("/contact"),
  },
  "/thank-you": {
    title: t(`Request Received | ${BN}`),
    description: d(`Your project details are in. We review every submission and reply with a written range within one business day.`),
    canonical: url("/thank-you"),
  },
  "/guarantee": {
    title: t(`${SC} Guarantee — ${CITY} | ${BN}`),
    description: d(`Our written guarantee: workmanship, a 14-day follow-up, and an honest invoice. In writing on every project. ${CITY} and area. Get a free quote.`),
    ogTitle: t(`Our Guarantee. Every Project. In Writing.`),
    canonical: url("/guarantee"),
  },
  "/faq": {
    title: t(`${SC} FAQ — ${CITY} | ${BN}`),
    description: d(`Answers to the most common ${S} questions — pricing, process, timeline, guarantees, and service areas. Written quotes within 24 hours.`),
    canonical: url("/faq"),
  },
  "/privacy": {
    title: t(`Privacy Policy | ${BN}`),
    description: d(`How ${BN} collects, uses, and protects the information you share when requesting a project quote or using this website.`),
    canonical: url("/privacy"),
  },
  "/terms": {
    title: t(`Terms of Service | ${BN}`),
    description: d(`Terms governing use of the ${BN} website, project quote requests, and service agreements for ${S} work in ${CITY}, ${PROVINCE}.`),
    canonical: url("/terms"),
  },
};

// ─── Dynamic service detail meta (/services/:slug) ───────────────────────────
export const META_SERVICE_DETAIL = (slug: string): PageMeta => {
  const sub = MASTER_REMIX.SUB_SERVICES.find((x) => x.slug === slug);
  if (!sub) {
    return {
      title: t(`${SC} Services | ${BN}`),
      description: d(`${S} work in ${CITY}, ${PROVINCE}. Written scope and a written guarantee on every project. Get a free quote.`),
      canonical: url(`/services/${slug}`),
    };
  }
  return {
    title: t(`${sub.title} in ${CITY} | ${BN}`),
    description: d(`${sub.title} in ${CITY}, ${PROVINCE}. ${sub.summary} Written quote within one business day.`),
    canonical: url(`/services/${slug}`),
  };
};
