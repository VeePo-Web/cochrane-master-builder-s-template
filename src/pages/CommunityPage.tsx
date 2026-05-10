import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import CTABand from "@/components/drywall/CTABand";
import GoogleMapEmbed from "@/components/areas/GoogleMapEmbed";
import NearbyAreasWidget from "@/components/areas/NearbyAreasWidget";
import AreasSEOSchema from "@/components/areas/AreasSEOSchema";
import { getCommunity, getRegion } from "@/data/communities";
import { setPageMeta } from "@/lib/seo";
import type { BookingClickHandler, BookingPrefill } from "@/config/drywall-booking";

interface CommunityPageProps {
  onBookClick?: BookingClickHandler;
}

const SERVICES = [
  { name: "Drywall Repair", path: "/drywall-repair", desc: "Patches, cracks, holes, and water-damage repairs — matched to your existing texture." },
  { name: "Drywall Installation", path: "/drywall-installation", desc: "New builds, basement development, and full-room boarding to Level 4 or Level 5 specification." },
  { name: "Painting", path: "/painting", desc: "Interior primer and paint — flat, eggshell, and semi-gloss for any room in the house." },
  { name: "Basement Packages", path: "/basement-packages", desc: "Complete basement development from framing through drywall, insulation, tape, and finish." },
];

const CommunityPage = ({ onBookClick }: CommunityPageProps) => {
  const { region: regionSlug = "", community: communitySlug = "" } = useParams<{ region: string; community: string }>();
  const community = getCommunity(communitySlug);
  const region = getRegion(regionSlug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!community || !region) return;

    const nearest = community.nearestCommunities.slice(0, 2).map((s) => getCommunity(s)?.name).filter(Boolean);

    setPageMeta({
      title: `Drywall Contractor ${community.name} ${community.city} | Cochrane Master Builders | Alberta`,
      description: `Looking for drywall in ${community.name}? Cochrane Master Builders serves ${community.name}${nearest.length > 0 ? ` and nearby ${nearest.join(", ")}` : ""}. Family-owned, Cochrane-based. Licensed & insured. Get a free estimate.`,
      path: `/areas-we-serve/${regionSlug}/${communitySlug}`,
    });
  }, [community, region, regionSlug, communitySlug]);

  if (!community || !region) {
    return (
      <>
        <Navigation onBookClick={onBookClick} />
        <main className="section-y container mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg text-charcoal mb-4">Community Not Found</h1>
          <p className="font-body text-body text-graphite mb-8">We couldn't find that community. Browse all our service areas below.</p>
          <Link to="/areas-we-serve" className="inline-flex items-center gap-2 text-forest font-body text-body">
            <ArrowLeft size={16} /> View All Areas
          </Link>
        </main>
        <Footer onBookClick={onBookClick} />
      </>
    );
  }

  const prefill: BookingPrefill = {
    description: `Drywall project in ${community.name}, ${community.city}`,
    source: `areas-we-serve/${community.region}/${community.slug}`,
  };

  return (
    <>
      <Navigation onBookClick={onBookClick} />

      {/* Inject all 4 JSON-LD schema types */}
      <AreasSEOSchema community={community} regionName={region.name} />

      <main id="main-content">

        {/* Breadcrumb + Hero */}
        <section className="pt-36 pb-16 bg-forest text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" aria-hidden style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />
          <div className="container mx-auto px-6 max-w-4xl relative">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-body text-caption text-primary-foreground/50">
                <li><Link to="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link to="/areas-we-serve" className="hover:text-primary-foreground/80 transition-colors">Areas We Serve</Link></li>
                <li aria-hidden>/</li>
                <li><Link to={`/areas-we-serve/${regionSlug}`} className="hover:text-primary-foreground/80 transition-colors">{region.name}</Link></li>
                <li aria-hidden>/</li>
                <li className="text-primary-foreground/80">{community.name}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-primary-foreground/50" />
              <p className="font-body text-eyebrow text-primary-foreground/60 uppercase tracking-[0.18em]">
                {community.name} · {region.name} · {community.city}, Alberta
              </p>
            </div>

            <h1 className="font-display text-display-xl text-primary-foreground mb-5">
              Drywall in {community.name}, {community.city}
            </h1>
            <p className="font-body text-body-lg text-primary-foreground/70 max-w-[52ch] mb-10">
              {community.shortDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onBookClick?.(prefill)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-clay text-white font-body text-label uppercase tracking-[0.15em] hover:bg-clay/90 transition-colors duration-300"
              >
                Get a Free Estimate in {community.name}
                <ArrowRight size={16} />
              </button>
              <Link
                to={`/areas-we-serve/${regionSlug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-primary-foreground/30 text-primary-foreground/70 font-body text-label uppercase tracking-[0.15em] hover:border-primary-foreground/60 hover:text-primary-foreground transition-all duration-300"
              >
                <ArrowLeft size={16} /> Back to {region.shortName}
              </Link>
            </div>
          </div>
        </section>

        {/* About This Community — THE KEY SEO SECTION */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Main Content */}
              <div className="lg:col-span-2">
                <p className="font-body text-eyebrow text-forest mb-4">About This Community</p>
                <h2 className="font-display text-display-md text-charcoal mb-6">
                  Drywall Contractor Serving {community.name}
                </h2>

                {/* Full geo description */}
                <p className="font-body text-body text-graphite mb-5 leading-relaxed">
                  {community.fullDescription}
                </p>

                {/* Streets paragraph — hyper-local SEO */}
                {community.streets.length > 0 && (
                  <p className="font-body text-body text-graphite mb-5 leading-relaxed">
                    We regularly complete drywall and finishing projects in homes throughout {community.name}, including along{" "}
                    {community.streets.slice(0, -1).join(", ")}
                    {community.streets.length > 1 && `, and ${community.streets[community.streets.length - 1]}`}
                    . If you live on any of these streets — or anywhere in {community.name} — we're your local drywall contractor.
                  </p>
                )}

                {/* Landmarks paragraph */}
                {community.landmarks.length > 0 && (
                  <p className="font-body text-body text-graphite mb-5 leading-relaxed">
                    {community.name} homeowners near{" "}
                    {community.landmarks.slice(0, 3).join(", ")} know us well.
                    We've worked across projects throughout the community and understand the property types, build standards, and finish quality that {community.name} expects.
                  </p>
                )}

                {/* Distance/access */}
                <p className="font-body text-body text-graphite leading-relaxed">
                  We're based in Cochrane — which means {community.name} is a straightforward drive for our team. No travel delay fees, no scheduling complications. Just a local contractor who shows up on time.
                </p>
              </div>

              {/* Sidebar — Keywords and Quick Facts */}
              <div>
                <div className="bg-bone rounded border border-seam p-6">
                  <p className="font-body text-eyebrow text-forest mb-4 uppercase tracking-[0.14em]">Quick Facts</p>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-body text-caption text-mist uppercase tracking-[0.1em]">Community</dt>
                      <dd className="font-body text-body-sm text-charcoal">{community.name}</dd>
                    </div>
                    <div>
                      <dt className="font-body text-caption text-mist uppercase tracking-[0.1em]">Region</dt>
                      <dd className="font-body text-body-sm text-charcoal">{region.name}</dd>
                    </div>
                    <div>
                      <dt className="font-body text-caption text-mist uppercase tracking-[0.1em]">City</dt>
                      <dd className="font-body text-body-sm text-charcoal">{community.city}, {community.province}</dd>
                    </div>
                    <div>
                      <dt className="font-body text-caption text-mist uppercase tracking-[0.1em]">Key Landmarks</dt>
                      <dd className="font-body text-body-sm text-charcoal">{community.landmarks.slice(0, 3).join(" · ")}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 pt-6 border-t border-seam">
                    <p className="font-body text-caption text-mist uppercase tracking-[0.1em] mb-3">Streets We Work In</p>
                    <ul className="space-y-1">
                      {community.streets.slice(0, 5).map((street) => (
                        <li key={street} className="font-body text-body-sm text-graphite flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-forest/40 flex-shrink-0" />
                          {street}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="bg-bone py-0">
          <div className="container mx-auto px-6 pb-12">
            <div className="max-w-4xl">
              <p className="font-body text-eyebrow text-forest mb-3">Location</p>
              <h2 className="font-display text-display-sm text-charcoal mb-6">
                Where We Work in {community.name}
              </h2>
              <GoogleMapEmbed
                lat={community.coordinates.lat}
                lng={community.coordinates.lng}
                title={community.name}
                zoom={14}
              />
              <p className="font-body text-caption text-mist mt-3">
                {community.name} · {community.city}, {community.province} · Coordinates {community.coordinates.lat.toFixed(4)}°N, {Math.abs(community.coordinates.lng).toFixed(4)}°W
              </p>
            </div>
          </div>
        </section>

        {/* Services in This Community */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <p className="font-body text-eyebrow text-forest mb-4">What We Do</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              Services in {community.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="group block border border-seam rounded p-6 bg-bone hover:border-forest/40 hover:shadow-subtle transition-all duration-300"
                >
                  <h3 className="font-display text-display-sm text-charcoal mb-3 group-hover:text-forest transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="font-body text-body-sm text-graphite mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 font-body text-caption text-forest uppercase tracking-[0.1em]">
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-y bg-bone">
          <div className="container mx-auto px-6 max-w-3xl">
            <p className="font-body text-eyebrow text-forest mb-4">Common Questions</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              Drywall in {community.name} — FAQ
            </h2>

            <div className="divide-y divide-seam border border-seam rounded overflow-hidden">
              {community.faqs.map((faq, i) => (
                <div key={i} className="bg-paper">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-display text-display-sm text-charcoal leading-snug">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-forest flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="font-body text-body text-graphite leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <NearbyAreasWidget currentSlug={community.slug} communityName={community.name} />

        {/* Community-Specific CTA */}
        <CTABand
          headline={`Ready to Start Your Drywall Project in ${community.name}?`}
          body={`We know ${community.name} — the streets, the property types, the build standards. Get a written estimate with a firm start date. No surprises.`}
          primaryLabel={`Get a Free Estimate in ${community.name}`}
          onPrimaryClick={() => onBookClick?.(prefill)}
          secondaryLabel="View All Services"
          onSecondaryClick={() => { window.location.href = "/drywall-installation"; }}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default CommunityPage;
