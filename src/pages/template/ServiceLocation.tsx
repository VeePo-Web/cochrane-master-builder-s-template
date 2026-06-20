/**
 * Service × Location Matrix Page — Route: /services/:slug/:community
 *
 * The high-intent intersection page: "{sub-service} in {community}". Targets
 * near-transactional local queries that neither the trade-level CommunityPage
 * nor the brand-wide ServiceDetail can win.
 *
 * SEO/AEO per page:
 *   • H1: "{Sub-service} in {Community}, {City}"  (one H1, semantic landmarks)
 *   • Meta + self-canonical via setPageMeta; gate-aware noindex for thin cells
 *   • Schema: Service · LocalBusiness(areaServed) · FAQPage · BreadcrumbList · WebPage
 *   • Scaled-uniqueness: deterministic local intro + local FAQ (no index churn)
 *   • Internal-linking pyramid: up (community + service hub) + sideways
 *     (sibling sub-services in-town, this service in nearest towns)
 *
 * All copy/location via MASTER_REMIX tokens; brand palette tokens only.
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import GoogleMapEmbed from "@/components/areas/GoogleMapEmbed";
import MatrixSEOSchema from "@/components/geomatrix/MatrixSEOSchema";
import { getCommunity, getRegion, getNearestCommunities } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { setPageMeta } from "@/lib/seo";
import { getLocalSignals, evaluateCell, buildLocalContext, buildLocalFaq, type MatrixCell } from "@/lib/geomatrix";
import type { BookingClickHandler, BookingPrefill } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const ServiceLocation = ({ onBookClick }: Props) => {
  const { slug = "", community: communitySlug = "" } = useParams<{ slug: string; community: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const sub = MASTER_REMIX.SUB_SERVICES.find((x) => x.slug === slug);
  const community = getCommunity(communitySlug);
  const sc = MASTER_REMIX.SERVICE_CATEGORY;
  const bn = MASTER_REMIX.BRAND_NAME;

  const cell: MatrixCell | null =
    sub && community ? { serviceSlug: sub.slug, serviceTitle: sub.title, community } : null;

  const signals = cell ? getLocalSignals(cell) : null;
  const eligible = cell ? evaluateCell(cell).eligible : false;
  const intro = cell && signals ? buildLocalContext(cell, signals) : "";
  const faqs = cell && signals ? buildLocalFaq(cell, signals) : [];

  useEffect(() => {
    if (!sub || !community) return;
    const desc =
      `${sub.title} in ${community.name}, ${community.city}. Written quote within one ` +
      `business day, tied to your scope and backed by our guarantee. Call ${MASTER_REMIX.PHONE}.`;
    setPageMeta({
      title: `${sub.title} in ${community.name} | ${bn}`,
      description: desc.slice(0, 160),
      path: `/services/${slug}/${communitySlug}`,
      noindex: !eligible, // thin cells stay out of the index
    });
  }, [sub, community, slug, communitySlug, bn, eligible]);

  // ── 404 — unknown service or community ──
  if (!sub || !community) {
    return (
      <TemplateLayout onBookClick={onBookClick}>
        <SectionFrame tone="bone" size="lg">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="font-display text-display-lg text-charcoal mb-4">Page Not Found</h1>
            <p className="text-body text-graphite mb-8">
              We couldn't match that service and location. Browse our services or service areas.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/services" className="inline-flex items-center gap-2 text-forest text-body">
                <ArrowLeft size={16} /> All Services
              </Link>
              <Link to="/areas-we-serve" className="inline-flex items-center gap-2 text-forest text-body">
                Areas We Serve <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </SectionFrame>
      </TemplateLayout>
    );
  }

  const region = getRegion(community.region);
  const siblings = MASTER_REMIX.SUB_SERVICES.filter((x) => x.slug !== sub.slug);
  const nearby = getNearestCommunities(community.slug, 5);

  const prefill: BookingPrefill = {
    description: `${sub.title} in ${community.name}, ${community.city}`,
    source: `matrix/${sub.slug}/${community.slug}`,
  };

  return (
    <TemplateLayout onBookClick={onBookClick}>
      <MatrixSEOSchema
        community={community}
        serviceSlug={sub.slug}
        serviceTitle={sub.title}
        serviceCategory={sc}
        faqs={faqs}
      />

      {/* ── HERO — breadcrumb + H1 + deterministic local intro ── */}
      <SectionFrame tone="bone" size="lg" grain>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-mist">
            <li><Link to="/" className="hover:text-charcoal transition-colors">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/services" className="hover:text-charcoal transition-colors">Services</Link></li>
            <li aria-hidden>/</li>
            <li><Link to={`/services/${sub.slug}`} className="hover:text-charcoal transition-colors">{sub.title}</Link></li>
            <li aria-hidden>/</li>
            <li className="text-charcoal">{community.name}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-2 mb-4">
          <MapPin size={14} className="text-copper" />
          <p className="font-eyebrow text-mist">
            {community.name} · {community.city}, {MASTER_REMIX.PROVINCE}
          </p>
        </div>

        <h1 className="font-display text-display-xl text-charcoal max-w-[20ch]">
          {sub.title} in {community.name}, {community.city}
        </h1>

        <p className="mt-6 max-w-[60ch] text-body-lg text-graphite leading-relaxed">{intro}</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => onBookClick?.(prefill)}
            className="w-full sm:w-auto rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
          >
            {TEMPLATE_COPY.cta.primary}
          </button>
          <Link
            to={`/services/${sub.slug}`}
            className="w-full sm:w-auto rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-charcoal text-center transition-all duration-300 hover:text-forest"
            style={{ border: "1px solid hsl(var(--copper) / 0.20)" }}
          >
            About {sub.title}
          </Link>
        </div>
      </SectionFrame>

      {/* ── LOCAL CONTEXT + SCOPE ── */}
      <SectionFrame tone="paper" size="lg">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <p className="font-eyebrow text-forest mb-4">What we do in {community.name}</p>
            <h2 className="font-display text-display-md text-charcoal mb-6">
              {sub.title}, to one written standard.
            </h2>
            <p className="text-body text-graphite mb-5 leading-relaxed">{sub.summary}</p>
            {community.streets.length > 0 && (
              <p className="text-body text-graphite mb-5 leading-relaxed">
                We complete {sub.title.toLowerCase()} projects throughout {community.name}, including
                around {community.streets.slice(0, 3).join(", ")}. If you live anywhere in {community.name},
                we serve your street.
              </p>
            )}
            {community.landmarks.length > 0 && (
              <p className="text-body text-graphite leading-relaxed">
                Homeowners near {community.landmarks.slice(0, 2).join(" and ")} know the build standard
                {community.name} expects — and so do we.
              </p>
            )}
            <Link
              to={`/services/${sub.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-forest text-body hover:underline"
            >
              See the full {sub.title} scope <ArrowRight size={16} />
            </Link>
          </div>

          {/* Local proof + quick facts */}
          <aside className="md:col-span-5">
            {signals?.testimonial && (
              <figure className="border border-seam bg-bone p-7 rounded mb-6">
                <blockquote className="font-display text-charcoal italic leading-relaxed" style={{ fontSize: "1.1rem" }}>
                  "{signals.testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4 font-eyebrow text-mist">
                  {signals.testimonial.name} — {signals.testimonial.community}
                </figcaption>
              </figure>
            )}
            <div className="border border-seam bg-bone p-6 rounded">
              <p className="font-eyebrow text-forest mb-4">{community.name} — quick facts</p>
              <dl className="space-y-3 text-body-sm">
                <div><dt className="text-caption text-mist uppercase tracking-[0.1em]">Region</dt><dd className="text-charcoal">{region?.name ?? community.region}</dd></div>
                <div><dt className="text-caption text-mist uppercase tracking-[0.1em]">City</dt><dd className="text-charcoal">{community.city}, {community.province}</dd></div>
                {community.landmarks.length > 0 && (
                  <div><dt className="text-caption text-mist uppercase tracking-[0.1em]">Landmarks</dt><dd className="text-charcoal">{community.landmarks.slice(0, 3).join(" · ")}</dd></div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </SectionFrame>

      {/* ── MAP ── */}
      <SectionFrame tone="bone" size="sm">
        <div className="max-w-4xl">
          <p className="font-eyebrow text-forest mb-3">Location</p>
          <h2 className="font-display text-display-sm text-charcoal mb-5">
            {sub.title} across {community.name}
          </h2>
          <GoogleMapEmbed
            lat={community.coordinates.lat}
            lng={community.coordinates.lng}
            title={community.name}
            zoom={community.tier === 1 ? 14 : 13}
          />
        </div>
      </SectionFrame>

      {/* ── LOCAL FAQ (feeds FAQPage schema) ── */}
      {faqs.length > 0 && (
        <SectionFrame tone="paper" size="lg">
          <div className="max-w-3xl">
            <p className="font-eyebrow text-forest mb-4">Common questions</p>
            <h2 className="font-display text-display-md text-charcoal mb-8">
              {sub.title} in {community.name} — FAQ
            </h2>
            <div className="divide-y divide-seam border border-seam rounded overflow-hidden">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-bone">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <h3 className="font-display text-display-sm text-charcoal leading-snug transition-colors hover:text-forest data-[open=true]:text-forest" data-open={openFaq === i}>
                      {faq.question}
                    </h3>
                    <ChevronDown size={18} className={`text-forest flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-body text-graphite leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionFrame>
      )}

      {/* ── INTERNAL LINKING PYRAMID ── */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid gap-12 md:gap-16 md:grid-cols-2">
          {/* Sideways: sibling sub-services in THIS community */}
          <div>
            <p className="font-eyebrow text-forest mb-4">More in {community.name}</p>
            <ul className="divide-y divide-seam border border-seam rounded overflow-hidden bg-paper">
              {siblings.map((sib) => (
                <li key={sib.slug}>
                  <Link
                    to={`/services/${sib.slug}/${community.slug}`}
                    className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-bone"
                  >
                    <span className="text-body text-charcoal group-hover:text-forest transition-colors">
                      {sib.title} in {community.name}
                    </span>
                    <ArrowRight size={16} className="text-forest flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to={`/areas-we-serve/${community.region}/${community.slug}`} className="mt-4 inline-flex items-center gap-2 text-forest text-body-sm hover:underline">
              Everything we do in {community.name} <ArrowRight size={14} />
            </Link>
          </div>

          {/* Sideways: THIS sub-service in nearest communities */}
          {nearby.length > 0 && (
            <div>
              <p className="font-eyebrow text-forest mb-4">{sub.title} nearby</p>
              <ul className="divide-y divide-seam border border-seam rounded overflow-hidden bg-paper">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      to={`/services/${sub.slug}/${n.slug}`}
                      className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-bone"
                    >
                      <span className="text-body text-charcoal group-hover:text-forest transition-colors">
                        {sub.title} in {n.name}
                      </span>
                      <ArrowRight size={16} className="text-forest flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SectionFrame>

      {/* ── CTA ── */}
      <CTABand
        eyebrow="Begin"
        headline={`Start your ${sub.title.toLowerCase()} project in ${community.name}.`}
        body="Tell us the scope. A written quote lands within one business day — no sales call."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={prefill}
        reassurance="Free quote · No obligation · 24-hour reply"
      />
    </TemplateLayout>
  );
};

export default ServiceLocation;
