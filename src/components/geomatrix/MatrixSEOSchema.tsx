/**
 * MatrixSEOSchema — JSON-LD for a Service × Location matrix page.
 *
 * Emits 5 schema types scoped to {sub-service} × {community}:
 *   Service · LocalBusiness(areaServed=community) · FAQPage · BreadcrumbList · WebPage
 *
 * Fully tokenized via MASTER_REMIX (CITY / PROVINCE_CODE / COUNTRY_CODE / BRAND_*).
 * Injected into <head> (cleanup on unmount). Phase 3 (prerender) lifts this into
 * the static HTML so non-JS AI crawlers see it.
 */

import { useEffect } from "react";
import type { Community } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";

export interface MatrixFaq {
  question: string;
  answer: string;
}

interface MatrixSEOSchemaProps {
  community: Community;
  serviceSlug: string;
  serviceTitle: string;
  serviceCategory: string;
  faqs: MatrixFaq[];
}

const MatrixSEOSchema = ({
  community,
  serviceSlug,
  serviceTitle,
  serviceCategory,
  faqs,
}: MatrixSEOSchemaProps) => {
  useEffect(() => {
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

    const faqPage = faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

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
    };

    const schemas = [localBusiness, service, breadcrumb, webPage, ...(faqPage ? [faqPage] : [])];

    const cleanup = () =>
      document.querySelectorAll("[data-matrix-schema]").forEach((n) => n.remove());
    cleanup();
    schemas.forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-matrix-schema", "true");
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
    });
    return cleanup;
  }, [community, serviceSlug, serviceTitle, serviceCategory, faqs]);

  return null;
};

export default MatrixSEOSchema;
