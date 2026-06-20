/**
 * SiteSchema — site-wide Organization + WebSite JSON-LD, on every page.
 *
 * Rendered once in RootLayout via <Head> so it's baked into every prerendered
 * page's static HTML. The Organization `@id` matches the LocalBusiness `@id`
 * used by per-page schema (matrix, areas, guarantee) so Google consolidates
 * them into one entity (knowledge-graph) instead of many fragments.
 *
 * SearchAction is intentionally omitted: a valid sitelinks searchbox requires a
 * real on-site search results page. Add it here once a /search route exists.
 */

import { Head } from "vite-react-ssg";
import { MASTER_REMIX } from "@/config/template/remix-variables";

const SiteSchema = () => {
  const base = MASTER_REMIX.BRAND_URL.replace(/\/$/, "");
  const orgId = `${base}/#organization`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": orgId,
    name: MASTER_REMIX.BRAND_NAME,
    url: base,
    telephone: MASTER_REMIX.PHONE,
    image: `${base}${MASTER_REMIX.OG_IMAGE}`,
    logo: `${base}${MASTER_REMIX.OG_IMAGE}`,
    foundingDate: String(MASTER_REMIX.FOUNDATION_YEAR),
    address: {
      "@type": "PostalAddress",
      addressLocality: MASTER_REMIX.CITY,
      addressRegion: MASTER_REMIX.PROVINCE_CODE,
      addressCountry: MASTER_REMIX.COUNTRY_CODE,
    },
    areaServed: [
      { "@type": "City", name: MASTER_REMIX.CITY },
      { "@type": "AdministrativeArea", name: MASTER_REMIX.REGION },
    ],
    sameAs: [MASTER_REMIX.PARENT_BRAND_URL, MASTER_REMIX.GOOGLE_REVIEW_URL].filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: MASTER_REMIX.BRAND_NAME,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
    </Head>
  );
};

export default SiteSchema;
