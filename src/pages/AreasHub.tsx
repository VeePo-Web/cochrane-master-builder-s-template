/**
 * AREAS WE SERVE — Hub Page  (Tier 1 of 3)
 * Route: /areas-we-serve
 *
 * REMIX GUIDE ─────────────────────────────────────────────────────────────────
 * This page reads every service-specific token from MASTER_REMIX.
 * When remixing for a new trade (e.g. Cochrane Tile Masters):
 *   1. Update MASTER_REMIX.BRAND_NAME  → "Cochrane Tile Masters"
 *   2. Update MASTER_REMIX.SERVICE     → "tile"
 *   3. Update MASTER_REMIX.SERVICE_PLURAL → "tile work"
 *   Nothing on this page needs manual editing — it reflects the remix config.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { ArrowRight, MapPin, Shield, Users, Wrench, Star } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CommunityCard from "@/components/areas/CommunityCard";
import { REGIONS, COMMUNITIES, getRegionCommunities, getCommunity } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface AreasHubProps {
  onBookClick?: BookingClickHandler;
}

// ── REMIX: swap these slugs for the communities most relevant to your trade ──
const FEATURED_SLUGS = [
  "heritage-hills",
  "riversong",
  "gleneagles",
  "bearspaw-watermark",
  "elbow-valley",
  "springbank-hill",
];

const TRUST_STATS = [
  { icon: MapPin,   label: `${COMMUNITIES.length}+ Communities Served` },
  { icon: Users,    label: "Locally Based, Family Owned" },
  { icon: Wrench,   label: `${MASTER_REMIX.SERVICE_CATEGORY} Specialists` },
  { icon: Shield,   label: "Licensed & Insured" },
  { icon: Star,     label: "Written Guarantee, Every Project" },
];

const AreasHub = ({ onBookClick }: AreasHubProps) => {
  const s    = MASTER_REMIX.SERVICE;          // "{SERVICE}" in template preview
  const sp   = MASTER_REMIX.SERVICE_PLURAL;   // "{SERVICE_PLURAL}"
  const bn   = MASTER_REMIX.BRAND_NAME;       // "Cochrane Master Builders"
  const sc   = MASTER_REMIX.SERVICE_CATEGORY; // "{SERVICE_CATEGORY}"
  const city = MASTER_REMIX.CITY;
  const region = MASTER_REMIX.REGION;

  const featured = FEATURED_SLUGS.map((sl) => getCommunity(sl)).filter(Boolean) as NonNullable<ReturnType<typeof getCommunity>>[];

  // ── SEO meta + schema (render-time → baked into static HTML) ──
  const base = MASTER_REMIX.BRAND_URL.replace(/\/$/, "");
  const metaTitle = `${sc} Contractor — Areas We Serve | ${bn}`;
  const metaDescription = (
    `${bn} provides professional ${s} services to ${COMMUNITIES.length}+ communities across ` +
    `${MASTER_REMIX.CITY}, ${MASTER_REMIX.REGION}, and ${MASTER_REMIX.PROVINCE}. ${MASTER_REMIX.CITY}-based.`
  ).slice(0, 160);
  const canonical = `${base}/areas-we-serve`;
  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#organization`,
    name: bn,
    url: base,
    address: { "@type": "PostalAddress", addressLocality: MASTER_REMIX.CITY, addressRegion: MASTER_REMIX.PROVINCE_CODE, addressCountry: MASTER_REMIX.COUNTRY_CODE },
    areaServed: [
      { "@type": "City", name: MASTER_REMIX.CITY },
      ...REGIONS.map((r) => ({ "@type": "AdministrativeArea", name: r.name })),
    ],
    serviceType: sc,
  };

  return (
    <TemplateLayout onBookClick={onBookClick}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(hubSchema)}</script>
      </Head>

      {/* ── Hero ── */}
      <SectionFrame tone="forest" size="xl" grain>
        <p className="font-eyebrow text-primary-foreground/60 mb-4">Where We Work</p>
        <h1 className="font-display text-display-xl text-primary-foreground mb-6 max-w-[18ch]">
          {sp} Across {city}<br className="hidden sm:block" /> &amp; the Surrounding Region
        </h1>
        <p className="text-body-lg text-primary-foreground/75 max-w-[52ch] mb-10">
          From {city} to the communities of {region} and beyond — {bn} brings
          master-craft {s} to {COMMUNITIES.length}+ communities across the area.
        </p>
        <button
          onClick={onBookClick}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-clay text-white
                     font-body text-label uppercase tracking-[0.15em]
                     hover:bg-clay/90 transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          {TEMPLATE_COPY.cta.primary}
          <ArrowRight size={16} />
        </button>
      </SectionFrame>

      {/* ── Trust Strip ── */}
      <SectionFrame tone="paper" size="sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {TRUST_STATS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-forest flex-shrink-0" />
              <span className="text-body-sm text-graphite">{label.replace("{SERVICE_CATEGORY}", sc)}</span>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ── Region Grid ── */}
      <SectionFrame tone="bone" size="lg">
        <div className="mb-12">
          <p className="font-eyebrow text-forest mb-3">Regions</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">
            Every Region We Work In
          </h2>
          <p className="text-body-lg text-graphite max-w-[50ch]">
            Select a region to browse every community we serve — each with its own page,
            Google Map, local landmarks, and {s}-specific pricing context.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REGIONS.map((region) => {
            const count = getRegionCommunities(region.slug).length;
            return (
              <Link
                key={region.slug}
                to={`/areas-we-serve/${region.slug}`}
                className="group block border border-seam rounded p-6 bg-paper
                           hover:border-forest/40 hover:shadow-editorial transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-caption text-mist uppercase tracking-[0.1em]">
                    {count} {count === 1 ? "community" : "communities"}
                  </span>
                  <ArrowRight size={16}
                    className="text-forest/40 group-hover:text-forest group-hover:translate-x-1
                               transition-all duration-300 flex-shrink-0 mt-0.5" />
                </div>
                <h3 className="font-display text-display-sm text-charcoal mb-2
                               group-hover:text-forest transition-colors duration-300">
                  {region.name}
                </h3>
                <p className="text-body-sm text-graphite line-clamp-2">{region.description}</p>
              </Link>
            );
          })}
        </div>
      </SectionFrame>

      {/* ── Featured Communities ── */}
      <SectionFrame tone="paper" size="lg">
        <div className="mb-12">
          <p className="font-eyebrow text-forest mb-3">Featured Communities</p>
          <h2 className="font-display text-display-lg text-charcoal mb-4">
            Our Highest-Priority {sc} Areas
          </h2>
          <p className="text-body-lg text-graphite max-w-[50ch]">
            These communities represent our heaviest concentration of work — premium estate
            homes, custom builds, and renovation projects that demand master-craft {s}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((c) => (
            <CommunityCard key={c.slug} community={c} showRegion />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-body text-graphite mb-5">
            Don't see your community? Browse all {COMMUNITIES.length} communities above, or just ask.
          </p>
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest
                       text-forest text-label uppercase tracking-[0.15em]
                       hover:bg-forest hover:text-white transition-all duration-300"
          >
            Ask About Your Area
          </button>
        </div>
      </SectionFrame>

      {/* ── SEO Editorial Block ── */}
      <SectionFrame tone="bone" size="lg">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-forest mb-4">Our Coverage</p>
          <h2 className="font-display text-display-md text-charcoal mb-6">
            A Local {sc} Contractor You Can Actually Call on Monday Morning
          </h2>
          {/* Data-driven coverage — auto-populates from REGIONS + communities.ts,
              so every remix gets accurate, local SEO copy for its real area. */}
          <div className="space-y-5 text-body text-graphite">
            <p>
              {bn} is a {city}-based {s} contractor serving {COMMUNITIES.length} communities
              across {REGIONS.length} regions. We work throughout {city} and the surrounding area —
              from established neighbourhoods to newer developments and acreage communities.
            </p>
            {REGIONS.map((r) => {
              const all = getRegionCommunities(r.slug);
              const names = all.slice(0, 8).map((c) => c.name);
              const extra = all.length - names.length;
              if (names.length === 0) return null;
              return (
                <p key={r.slug}>
                  In <strong>{r.name}</strong>, we serve {names.join(", ")}
                  {extra > 0 ? `, and ${extra} more` : ""}.
                </p>
              );
            })}
            <p>
              Every community page includes a Google Map, specific street references, local landmarks, and
              frequently asked questions — because knowing the neighbourhood is what separates a genuine
              local contractor from a directory listing.
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* ── CTA ── */}
      <SectionFrame tone="forest" size="lg" grain>
        <div className="max-w-2xl">
          <p className="font-eyebrow text-primary-foreground/60 mb-4">Begin</p>
          <h2 className="font-display text-display-lg text-primary-foreground mb-5">
            Don't see your community?
          </h2>
          <p className="text-body-lg text-primary-foreground/75 mb-8">
            If you're in {city} or anywhere in {region} and the surrounding area — we
            work there. Send your address and project scope. We'll confirm within hours.
          </p>
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-clay text-white
                       font-body text-label uppercase tracking-[0.15em]
                       hover:bg-clay/90 transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            {TEMPLATE_COPY.cta.primary}
            <ArrowRight size={16} />
          </button>
        </div>
      </SectionFrame>

    </TemplateLayout>
  );
};

export default AreasHub;
