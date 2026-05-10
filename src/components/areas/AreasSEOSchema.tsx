import { useEffect } from "react";
import type { Community } from "@/data/communities";

const BASE_URL = "https://cochranedrywall.ca";
const BRAND_NAME = "Cochrane Drywall Masters";
const PHONE = "+1-403-XXX-XXXX";
const ADDRESS_LOCALITY = "Cochrane";
const ADDRESS_REGION = "AB";

interface AreasSEOSchemaProps {
  community: Community;
  regionName: string;
}

const AreasSEOSchema = ({ community, regionName }: AreasSEOSchemaProps) => {
  useEffect(() => {
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: BRAND_NAME,
        telephone: PHONE,
        address: {
          "@type": "PostalAddress",
          addressLocality: ADDRESS_LOCALITY,
          addressRegion: ADDRESS_REGION,
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "Place",
          name: community.name,
          geo: {
            "@type": "GeoCoordinates",
            latitude: community.coordinates.lat,
            longitude: community.coordinates.lng,
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Drywall Services in ${community.name}`,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${BASE_URL}/areas-we-serve` },
          { "@type": "ListItem", position: 3, name: regionName, item: `${BASE_URL}/areas-we-serve/${community.region}` },
          { "@type": "ListItem", position: 4, name: community.name, item: `${BASE_URL}/areas-we-serve/${community.region}/${community.slug}` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: community.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Drywall Services in ${community.name}`,
        provider: {
          "@type": "LocalBusiness",
          name: BRAND_NAME,
        },
        areaServed: {
          "@type": "Place",
          name: community.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: community.city,
            addressRegion: ADDRESS_REGION,
            addressCountry: "CA",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: community.coordinates.lat,
            longitude: community.coordinates.lng,
          },
        },
        serviceType: "Drywall Installation and Finishing",
      },
    ];

    const removeExisting = () => {
      document.querySelectorAll('script[data-areas-schema="true"]').forEach((el) => el.remove());
    };

    removeExisting();

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-areas-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return removeExisting;
  }, [community, regionName]);

  return null;
};

export default AreasSEOSchema;
