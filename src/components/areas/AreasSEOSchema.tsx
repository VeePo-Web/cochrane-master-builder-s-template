/**
 * buildAreasSchemas — JSON-LD for an "Areas We Serve" community page.
 *
 * Pure builder (no JSX). Returns 4 schema objects scoped to the community:
 *   LocalBusiness(areaServed) · BreadcrumbList · FAQPage · Service
 *
 * The page renders these inside its single <Head> (one Head per page →
 * reliable SSR collection) so they're baked into static HTML for AI crawlers.
 * Fully tokenized via MASTER_REMIX (CITY / PROVINCE_CODE / COUNTRY_CODE).
 */

import type { Community } from "@/data/communities";
import type { FAQ } from "@/config/template/remix-variables";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface BuildAreasSchemasArgs {
  community: Community;
  regionName: string;
  brandName: string;
  serviceCategory: string;
  faqs: FAQ[];
}

export function buildAreasSchemas({
  community,
  regionName,
  brandName,
  serviceCategory,
  faqs,
}: BuildAreasSchemasArgs): Record<string, unknown>[] {
  const base = MASTER_REMIX.BRAND_URL.replace(/\/$/, "");
  const orgId = `${base}/#organization`;
  const region = MASTER_REMIX.PROVINCE_CODE;
  const country = MASTER_REMIX.COUNTRY_CODE;
  const geo = {
    "@type": "GeoCoordinates",
    latitude: community.coordinates.lat,
    longitude: community.coordinates.lng,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": orgId,
    name: brandName,
    url: base,
    telephone: MASTER_REMIX.PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: MASTER_REMIX.CITY,
      addressRegion: region,
      addressCountry: country,
    },
    areaServed: { "@type": "Place", name: community.name, geo },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceCategory} in ${community.name}`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${base}/areas-we-serve` },
      { "@type": "ListItem", position: 3, name: regionName, item: `${base}/areas-we-serve/${community.region}` },
      { "@type": "ListItem", position: 4, name: community.name, item: `${base}/areas-we-serve/${community.region}/${community.slug}` },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceCategory} in ${community.name}`,
    serviceType: serviceCategory,
    provider: { "@type": "LocalBusiness", "@id": orgId },
    areaServed: {
      "@type": "Place",
      name: community.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: community.city,
        addressRegion: region,
        addressCountry: country,
      },
      geo,
    },
  };

  return faqs.length ? [localBusiness, breadcrumb, faqPage, service] : [localBusiness, breadcrumb, service];
}
