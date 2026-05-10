import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Shield, Users, Wrench } from "lucide-react";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import CTABand from "@/components/drywall/CTABand";
import CommunityCard from "@/components/areas/CommunityCard";
import { REGIONS, COMMUNITIES, getRegionCommunities, getCommunity } from "@/data/communities";
import { setPageMeta } from "@/lib/seo";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface AreasHubProps {
  onBookClick?: BookingClickHandler;
}

const FEATURED_SLUGS = [
  "heritage-hills",
  "riversong",
  "gleneagles",
  "bearspaw-watermark",
  "elbow-valley",
  "springbank-hill",
];

const TRUST_STATS = [
  { icon: MapPin, label: "120+ Communities Served" },
  { icon: Users, label: "Cochrane-Based, Family Owned" },
  { icon: Wrench, label: "Drywall, Insulation & Finishing" },
  { icon: Shield, label: "Licensed & Insured" },
];

const AreasHub = ({ onBookClick }: AreasHubProps) => {
  useEffect(() => {
    setPageMeta({
      title: "Drywall Contractor — Areas We Serve | Cochrane Master Builders",
      description:
        "Cochrane Drywall Masters serves 120+ communities across Cochrane, Calgary SW, Springbank, Elbow Valley, Rocky View County, the Bow Valley, and Canmore. Family-owned and Cochrane-based.",
      path: "/areas-we-serve",
    });

    // Hub-level schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Cochrane Drywall Masters",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cochrane",
        addressRegion: "AB",
        addressCountry: "CA",
      },
      areaServed: [
        { "@type": "City", name: "Cochrane" },
        { "@type": "City", name: "Calgary" },
        { "@type": "City", name: "Canmore" },
        { "@type": "AdministrativeArea", name: "Rocky View County" },
        { "@type": "AdministrativeArea", name: "Springbank" },
      ],
      serviceType: "Drywall Installation and Finishing",
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-hub-schema", "true");
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => { document.querySelectorAll('[data-hub-schema="true"]').forEach((n) => n.remove()); };
  }, []);

  const featured = FEATURED_SLUGS.map((s) => getCommunity(s)).filter(Boolean) as NonNullable<ReturnType<typeof getCommunity>>[];

  return (
    <>
      <Navigation onBookClick={onBookClick} />
      <main id="main-content">

        {/* Hero */}
        <section className="pt-36 pb-20 bg-forest text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" aria-hidden style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />
          <div className="container mx-auto px-6 max-w-4xl relative">
            <p className="font-body text-eyebrow text-primary-foreground/60 mb-4 uppercase tracking-[0.22em]">Where We Work</p>
            <h1 className="font-display text-display-xl text-primary-foreground mb-6 leading-tight">
              Drywall Across Cochrane,<br className="hidden sm:block" /> Calgary & the Bow Valley
            </h1>
            <p className="font-body text-body-lg text-primary-foreground/70 max-w-[52ch] mb-10">
              From the foothills of Cochrane to the estate communities of Springbank and the mountain hamlets of the Bow Valley — Cochrane Drywall Masters brings master-craft finishing to over 120 communities across Alberta.
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

        {/* Trust Strip */}
        <section className="py-10 bg-paper border-b border-seam">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRUST_STATS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={18} className="text-forest flex-shrink-0" />
                  <span className="font-body text-body-sm text-graphite">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Region Grid */}
        <section className="section-y bg-bone">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <p className="font-body text-eyebrow text-forest mb-3">Regions</p>
              <h2 className="font-display text-display-lg text-charcoal mb-4">
                Every Region We Build In
              </h2>
              <p className="font-body text-body-lg text-graphite max-w-[50ch]">
                Select a region to browse every community we serve — each with its own dedicated page, Google Map, and local SEO content.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {REGIONS.map((region) => {
                const count = getRegionCommunities(region.slug).length;
                return (
                  <Link
                    key={region.slug}
                    to={`/areas-we-serve/${region.slug}`}
                    className="group block border border-seam rounded p-6 bg-paper hover:border-forest/40 hover:shadow-editorial transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="font-body text-caption text-mist uppercase tracking-[0.1em]">
                        {count} {count === 1 ? "community" : "communities"}
                      </span>
                      <ArrowRight size={16} className="text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-0.5" />
                    </div>
                    <h3 className="font-display text-display-sm text-charcoal mb-2 group-hover:text-forest transition-colors duration-300">
                      {region.name}
                    </h3>
                    <p className="font-body text-body-sm text-graphite line-clamp-2">
                      {region.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Communities */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <p className="font-body text-eyebrow text-forest mb-3">Featured Communities</p>
              <h2 className="font-display text-display-lg text-charcoal mb-4">
                Our Highest-Priority Service Areas
              </h2>
              <p className="font-body text-body-lg text-graphite max-w-[50ch]">
                These communities represent the highest concentration of our work — premium estate homes, custom builds, and renovation projects that demand master-craft finishing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((c) => (
                <CommunityCard key={c.slug} community={c} showRegion />
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="font-body text-body text-graphite mb-4">
                Don't see your community? Browse all {COMMUNITIES.length} communities above, or just text us.
              </p>
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest text-forest font-body text-label uppercase tracking-[0.15em] hover:bg-forest hover:text-white transition-all duration-300"
              >
                Ask About Your Area
              </button>
            </div>
          </div>
        </section>

        {/* SEO Editorial Block */}
        <section className="section-y bg-bone">
          <div className="container mx-auto px-6 max-w-3xl">
            <p className="font-body text-eyebrow text-forest mb-4">Our Coverage</p>
            <h2 className="font-display text-display-md text-charcoal mb-6">
              Local Drywall You Can Actually Call on Monday Morning
            </h2>
            <div className="space-y-5 font-body text-body text-graphite">
              <p>
                Cochrane Drywall Masters is a Cochrane-based drywall and interior finishing contractor serving over 120 communities from the Bow Valley to southeast Calgary. We work in <strong>Cochrane's</strong> established neighbourhoods — Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland, and Fireside — and across <strong>Rocky View County</strong> in Bearspaw, Watermark, and Heritage Pointe.
              </p>
              <p>
                West of Calgary, we're one of the most active finishing contractors in <strong>Springbank</strong> — Aventerra Estates, Devonian Ridge, Pinnacle Ridge, Swift Creek, Mackenas Country Estates, Morgan's Rise, and more than 35 additional acreage communities. The <strong>Elbow Valley</strong> corridor — Stonepine, Lott Creek Estates, Pinebrook Estates, Swift Creek Villas, and the broader Elbow Valley community — is a regular part of our schedule.
              </p>
              <p>
                In <strong>Calgary's southwest</strong>, we serve Aspen Woods, Springbank Hill, Discovery Ridge, Signal Hill, West Springs, Cougar Ridge, Crestmont, and the inner-city estate communities of Britannia, Bel-Aire, Eagle Ridge, and Upper Mount Royal. <strong>Calgary NW</strong> includes Arbour Lake, Crestmont View, and Rockland Park. <strong>Calgary SE</strong> includes Auburn Bay, Mahogany, Cranston, and Seton.
              </p>
              <p>
                Along the <strong>Bow Valley corridor</strong>, we serve CottageClub at Ghost Lake, Ghost Lake Village, Waiparous Village, Exshaw, Lac des Arcs, Dead Man's Flats, and Harvie Heights. In <strong>Canmore</strong>, we work in Silvertip Resort, Three Sisters Mountain Village, Spring Creek Mountain Village, Benchlands, Eagle Terrace, Quarry Pines, Cougar Creek, Rundleview, Larch, and Peaks of Grassi.
              </p>
              <p>
                Every community gets its own page, a Google Map showing exactly where we work, and content that proves we know the neighbourhood — the streets, the landmarks, the property types, and what finishing quality the homeowners here expect. That's not a directory. That's a contractor who actually shows up.
              </p>
            </div>
          </div>
        </section>

        <CTABand
          headline="Don't see your community listed?"
          body="If you're in Cochrane, Calgary, Rocky View County, the Bow Valley, or Canmore — we build there. Text us your address and we'll confirm within a few hours."
          primaryLabel="Get a Free Estimate"
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default AreasHub;
