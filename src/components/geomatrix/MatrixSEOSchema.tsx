/**
 * buildMatrixSchemas — JSON-LD for a Service × Location matrix page.
 *
 * Pure builder (no JSX): returns the 5 schema objects scoped to
 * {sub-service} × {community}:
 *   Service · LocalBusiness(areaServed=community) · FAQPage · BreadcrumbList · WebPage
 *
 * The page renders these inside its single <Head> (one Head per page → reliable
 * SSR collection) so they're baked into the static HTML for non-JS AI crawlers.
 * Fully tokenized via MASTER_REMIX (CITY / PROVINCE_CODE / COUNTRY_CODE / BRAND_*).
 */

import type { Community } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";

export interface MatrixFaq {
  question: string;
  answer: string;
}

interface BuildMatrixSchemasArgs {
  community: Community;
  serviceSlug: string;
  serviceTitle: string;
  serviceCategory: string;
  faqs: MatrixFaq[];
  /** ISO date (YYYY-MM-DD) for the freshness signal. */
  dateModified: string;
}

export function buildMatrixSchemas({
  community,
  serviceSlug,
  serviceTitle,
  serviceCategory,
  faqs,
  dateModified,
}: BuildMatrixSchemasArgs): Record<string, unknown>[] {
  const baseUrl = MASTER_REMIX.BRAND_URL;
  const bn = MASTER_REMIX.BRAND_NAME;
  const pageUrl = `${baseUrl}/services/${serviceSlug}/${community.slug}`;
  const orgId = `${baseUrl}/#organization`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": orgId,
    name: bn,
    url: baseUrl,
    telephone: MASTER_REMIX.PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: MASTER_REMIX.CITY,
      addressRegion: MASTER_REMIX.PROVINCE_CODE,
      addressCountry: MASTER_REMIX.COUNTRY_CODE,
    },
    areaServed: {
      "@type": "Place",
      name: `${community.name}, ${community.city}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: community.coordinates.lat,
        longitude: community.coordinates.lng,
      },
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceTitle} in ${community.name}`,
    serviceType: serviceTitle,
    category: serviceCategory,
    provider: { "@type": "LocalBusiness", "@id": orgId },
    areaServed: {
      "@type": "Place",
      name: `${community.name}, ${community.city}, ${MASTER_REMIX.PROVINCE}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: community.coordinates.lat,
        longitude: community.coordinates.lng,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: serviceTitle, item: `${baseUrl}/services/${serviceSlug}` },
      { "@type": "ListItem", position: 4, name: `${community.name}`, item: pageUrl },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${serviceTitle} in ${community.name}, ${community.city} | ${bn}`,
    isPartOf: { "@type": "WebSite", name: bn, url: baseUrl },
    about: { "@type": "Service", name: `${serviceTitle} in ${community.name}` },
    breadcrumb: { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb` },
    datePublished: dateModified,
    dateModified,
    // Voice-search eligibility: read the local intro + the local FAQ aloud.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#matrix-intro", "#matrix-faq"],
    },
  };

  const schemas: Record<string, unknown>[] = [localBusiness, service, breadcrumb, webPage];
  if (faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }
  return schemas;
}
