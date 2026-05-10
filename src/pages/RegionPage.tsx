import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import CTABand from "@/components/drywall/CTABand";
import CommunityCard from "@/components/areas/CommunityCard";
import { getRegion, getRegionCommunities, REGIONS } from "@/data/communities";
import { setPageMeta } from "@/lib/seo";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface RegionPageProps {
  onBookClick?: BookingClickHandler;
}

const BASE_URL = "https://cochranedrywall.ca";

const RegionPage = ({ onBookClick }: RegionPageProps) => {
  const { region: regionSlug = "" } = useParams<{ region: string }>();
  const region = getRegion(regionSlug);
  const communities = getRegionCommunities(regionSlug);

  useEffect(() => {
    if (!region) return;
    setPageMeta({
      title: `Drywall ${region.name} Alberta | Cochrane Master Builders`,
      description: `Cochrane Drywall Masters serves ${communities.length} communities in ${region.name}, Alberta. Family-owned drywall, insulation, and finishing — Cochrane-based. ${communities.slice(0, 4).map((c) => c.name).join(", ")} and more.`,
      path: `/areas-we-serve/${regionSlug}`,
    });

    // Region-level schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${BASE_URL}/areas-we-serve` },
          { "@type": "ListItem", position: 3, name: region.name, item: `${BASE_URL}/areas-we-serve/${regionSlug}` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Drywall Services in ${region.name}`,
        provider: { "@type": "LocalBusiness", name: "Cochrane Drywall Masters" },
        areaServed: {
          "@type": "AdministrativeArea",
          name: region.name,
          containsPlace: communities.slice(0, 10).map((c) => ({ "@type": "Place", name: c.name })),
        },
      },
    ];

    const existing = document.querySelectorAll('[data-region-schema="true"]');
    existing.forEach((el) => el.remove());

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-region-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => { document.querySelectorAll('[data-region-schema="true"]').forEach((el) => el.remove()); };
  }, [region, regionSlug, communities]);

  if (!region) {
    return (
      <>
        <Navigation onBookClick={onBookClick} />
        <main className="section-y container mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg text-charcoal mb-4">Region Not Found</h1>
          <p className="font-body text-body text-graphite mb-8">We couldn't find that region. Browse all our service areas below.</p>
          <Link to="/areas-we-serve" className="inline-flex items-center gap-2 text-forest font-body text-body">
            <ArrowLeft size={16} /> View All Areas
          </Link>
        </main>
        <Footer onBookClick={onBookClick} />
      </>
    );
  }

  const adjacentRegions = REGIONS.filter((r) => region.adjacentRegions.includes(r.slug));
  const tier1 = communities.filter((c) => c.tier === 1);
  const tier2 = communities.filter((c) => c.tier === 2);
  const tier3 = communities.filter((c) => c.tier === 3);

  return (
    <>
      <Navigation onBookClick={onBookClick} />
      <main id="main-content">

        {/* Hero */}
        <section className="pt-36 pb-16 bg-forest text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" aria-hidden style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />
          <div className="container mx-auto px-6 max-w-4xl relative">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-body text-caption text-primary-foreground/50">
                <li><Link to="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link to="/areas-we-serve" className="hover:text-primary-foreground/80 transition-colors">Areas We Serve</Link></li>
                <li aria-hidden>/</li>
                <li className="text-primary-foreground/80">{region.name}</li>
              </ol>
            </nav>

            <p className="font-body text-eyebrow text-primary-foreground/60 mb-4 uppercase tracking-[0.22em]">
              {communities.length} Communities
            </p>
            <h1 className="font-display text-display-xl text-primary-foreground mb-5">
              Drywall in {region.name}, Alberta
            </h1>
            <p className="font-body text-body-lg text-primary-foreground/70 max-w-[52ch] mb-8">
              {region.description} We bring master-craft drywall, insulation, and finishing to every community in this region — with a team based in Cochrane, minutes away.
            </p>
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-clay text-white font-body text-label uppercase tracking-[0.15em] hover:bg-clay/90 transition-colors duration-300"
            >
              Get a Free Estimate
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Region Intro Prose */}
        <section className="section-y-tight bg-paper">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="font-body text-body text-graphite space-y-4">
              <p>
                Cochrane Drywall Masters serves <strong>{communities.length} communities</strong> across {region.name} — from Tier 1 high-priority areas that we visit regularly, to smaller hamlets and micro-communities where we provide the same quality of drywall and finishing work at every scale.
              </p>
              {tier1.length > 0 && (
                <p>
                  Our primary {region.name} communities include {tier1.slice(0, 5).map((c, i) => (
                    <span key={c.slug}>
                      {i > 0 && i < tier1.slice(0, 5).length - 1 ? ", " : i === tier1.slice(0, 5).length - 1 && i > 0 ? ", and " : ""}
                      <Link to={`/areas-we-serve/${c.region}/${c.slug}`} className="text-forest hover:underline">{c.name}</Link>
                    </span>
                  ))}
                  {tier1.length > 5 && ` and ${tier1.length - 5} more`}. These are areas where we maintain consistent project volume and deep knowledge of local build standards and property types.
                </p>
              )}
              <p>
                Every community page in this region includes a Google Map, specific street references, local landmarks, and 4 frequently asked questions — because knowing the neighbourhood is what separates a genuine local contractor from a general directory listing.
              </p>
            </div>
          </div>
        </section>

        {/* Community Directory */}
        <section className="section-y bg-bone">
          <div className="container mx-auto px-6">

            {tier1.length > 0 && (
              <div className="mb-16">
                <p className="font-body text-eyebrow text-forest mb-3">Primary Communities</p>
                <h2 className="font-display text-display-md text-charcoal mb-8">
                  Our Highest-Priority {region.shortName} Communities
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tier1.map((c) => <CommunityCard key={c.slug} community={c} />)}
                </div>
              </div>
            )}

            {tier2.length > 0 && (
              <div className="mb-16">
                <p className="font-body text-eyebrow text-forest mb-3">Regional Communities</p>
                <h2 className="font-display text-display-md text-charcoal mb-8">
                  All {region.shortName} Communities We Serve
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {tier2.map((c) => <CommunityCard key={c.slug} community={c} />)}
                </div>
              </div>
            )}

            {tier3.length > 0 && (
              <div>
                <p className="font-body text-eyebrow text-forest mb-3">Local Communities</p>
                <h2 className="font-display text-display-md text-charcoal mb-8">
                  Smaller {region.shortName} Communities & Hamlets
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {tier3.map((c) => <CommunityCard key={c.slug} community={c} />)}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why Us in This Region */}
        <section className="section-y-tight bg-paper">
          <div className="container mx-auto px-6 max-w-3xl">
            <p className="font-body text-eyebrow text-forest mb-4">Why Us</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              Why {region.shortName} Homeowners Choose Cochrane Drywall Masters
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <p className="font-display text-display-sm text-charcoal mb-2">We Know the Build Standard</p>
                <p className="font-body text-body-sm text-graphite">Every region has specific property types, ceiling heights, and finish expectations. We know {region.shortName}'s standard and work to it.</p>
              </div>
              <div>
                <p className="font-display text-display-sm text-charcoal mb-2">Cochrane-Based, Close By</p>
                <p className="font-body text-body-sm text-graphite">We're based in Cochrane — no long travel fees, no delayed start times. We're genuinely local to the communities we serve.</p>
              </div>
              <div>
                <p className="font-display text-display-sm text-charcoal mb-2">Written Estimates, Every Time</p>
                <p className="font-body text-body-sm text-graphite">Every project gets a written scope before we start. No surprises, no scope creep, no verbal-only promises.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Adjacent Regions */}
        {adjacentRegions.length > 0 && (
          <section className="section-y-tight bg-bone border-t border-seam">
            <div className="container mx-auto px-6">
              <p className="font-body text-eyebrow text-forest mb-6">Also Serving</p>
              <div className="flex flex-wrap gap-4">
                {adjacentRegions.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/areas-we-serve/${r.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-seam rounded-full font-body text-body-sm text-graphite hover:border-forest/40 hover:text-forest transition-all duration-300"
                  >
                    {r.name}
                    <ArrowRight size={14} />
                  </Link>
                ))}
                <Link
                  to="/areas-we-serve"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-seam rounded-full font-body text-body-sm text-graphite hover:border-forest/40 hover:text-forest transition-all duration-300"
                >
                  All Regions
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <CTABand
          headline={`Ready to Start Your Project in ${region.shortName}?`}
          body="We're Cochrane-based and serve every community in this region. Send us your address and project scope — we'll get back to you within hours."
          primaryLabel={`Get a Free ${region.shortName} Estimate`}
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default RegionPage;
