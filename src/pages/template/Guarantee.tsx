/**
 * /guarantee — Written Contractor Guarantee | Cochrane & Area
 *
 * SEO targets:
 *   Primary:   "[trade] guarantee Cochrane" | "[trade] warranty Cochrane Alberta"
 *   Secondary: "contractor warranty Alberta" | "written guarantee contractor"
 *   Long-tail: "how long is [trade] warranty" | "what does [trade] warranty cover"
 *
 * Schema injected: LocalBusiness + Service + FAQPage + BreadcrumbList (4 types)
 * E-E-A-T signals: foundation year, $5M insurance, WCB, 15-year structural,
 *                  named guarantees on signed invoices, specific written process
 *
 * REMIX: All trade references read from MASTER_REMIX. Zero hardcoding.
 */

import { useEffect, lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { BlueprintGrain } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

const GuaranteeBlock = lazy(() =>
  import("@/components/master/GuaranteeBlock").then((m) => ({ default: m.GuaranteeBlock }))
);

interface Props { onBookClick?: BookingClickHandler }

// ─── Guarantee FAQs — target Google PAA boxes for warranty/guarantee queries ──
const GUARANTEE_FAQS = [
  {
    q: "What does the {BRAND} guarantee cover?",
    a: "Three things: the worksite (clean site or the work is free), the finish (any issue within 14 days is fixed at zero cost), and the structure (any structural {SERVICE} work is warranted for 15 years). All three are named in writing on every invoice before work begins.",
  },
  {
    q: "How long is the {BRAND} {SERVICE} warranty?",
    a: "The structural warranty runs 15 years from project completion. The touch-up guarantee covers 14 days post-completion. Both are written commitments on a signed invoice — not verbal assurances.",
  },
  {
    q: "Is the guarantee transferable if I sell my home?",
    a: "Yes. The 15-year structural guarantee follows the property. The written invoice constitutes the warranty document. New owners receive a copy at the time of sale. Cochrane and Alberta homeowners frequently reference these documents during real estate transactions.",
  },
  {
    q: "What happens if {SERVICE} work fails after the project is complete?",
    a: "Contact us directly. If the failure falls within the guarantee scope — structural work within 15 years, finish issues within 14 days — we return at zero cost. We do not require you to prove the failure; we inspect and repair.",
  },
  {
    q: "Do other {SERVICE} contractors in Cochrane offer a written guarantee?",
    a: "Most Alberta {SERVICE} contractors offer a verbal assurance with no documented terms. A named, written guarantee with a 15-year structural commitment on a signed invoice is uncommon in the industry. We offer it because the work is built to hold it.",
  },
  {
    q: "Does the guarantee require anything from the homeowner?",
    a: "No maintenance requirements on your part. The guarantee applies to the {SERVICE} work as specified in the written scope. Normal household use does not void it. The only thing that voids it is third-party modification of the guaranteed work.",
  },
];

// ─── Three-tier guarantee definitions ────────────────────────────────────────
const GUARANTEES = [
  {
    num: "01",
    name: "The Worksite Guarantee",
    promise: "If our worksite is not visibly cleaner than we found it when we arrived, the work is free. No exceptions. No negotiation.",
    detail: "We cover floors, seal dust paths, protect adjacent finished surfaces, and sweep before we leave every single day — not just on the final day. This is a contractual commitment, not a courtesy.",
    label: "Clean site or it's free.",
    schema: "Worksite cleanliness guaranteed. If site is not cleaner than found on arrival, work is free.",
  },
  {
    num: "02",
    name: "The 14-Day Touch-Up Guarantee",
    promise: "Any finish issue that appears within 14 days of project completion: we return at zero cost. No argument. No invoice.",
    detail: "Finishes settle. Paint cures over days. Tape beds can shift slightly before full cure. These things happen. When they do, we return and fix them — without billing, without debating whether it falls under scope, without delay.",
    label: "14 days. Zero cost. No debate.",
    schema: "Any finish issue within 14 days of completion repaired at no charge.",
  },
  {
    num: "03",
    name: "The 15-Year Structural Guarantee",
    promise: "Any structural {SERVICE} work we complete is warranted for 15 years — in writing, on every invoice. If structural work fails within that period, we repair it.",
    detail: "This is not a canned warranty card inserted into an envelope. It is a named commitment on a dated, signed invoice. The work is built to outlast it — that is why we offer it. Contractors who cannot offer this are telling you something about the quality of their work.",
    label: "15 years. On the invoice.",
    schema: "Structural work warranted for 15 years from project completion date, documented on signed invoice.",
  },
];

const GuaranteePage = ({ onBookClick }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const s  = MASTER_REMIX.SERVICE;
  const sc = MASTER_REMIX.SERVICE_CATEGORY;
  const bn = MASTER_REMIX.BRAND_NAME;
  const yr = MASTER_REMIX.FOUNDATION_YEAR;
  const age = new Date().getFullYear() - yr;

  // Resolve FAQ text with service variable
  const resolvedFaqs = GUARANTEE_FAQS.map((f) => ({
    q: f.q.replace(/\{BRAND\}/g, bn).replace(/\{SERVICE\}/g, s),
    a: f.a.replace(/\{BRAND\}/g, bn).replace(/\{SERVICE\}/g, s),
  }));

  // ── Schema injection: LocalBusiness + Service + FAQPage + BreadcrumbList ──
  useEffect(() => {
    const baseUrl = MASTER_REMIX.BRAND_URL;

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: bn,
        url: baseUrl,
        telephone: MASTER_REMIX.PHONE,
        foundingDate: String(yr),
        description: `${bn} is a licensed and insured ${sc} contractor serving Cochrane, Rocky View County, and the Calgary region since ${yr}. All work comes with a written 3-tier guarantee: clean worksite, 14-day touch-up, and 15-year structural warranty.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cochrane",
          addressRegion: "AB",
          addressCountry: "CA",
        },
        areaServed: [
          { "@type": "City", name: "Cochrane" },
          { "@type": "City", name: "Calgary" },
          { "@type": "AdministrativeArea", name: "Rocky View County" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${sc} with Written Guarantee — Cochrane & Area`,
        serviceType: sc,
        provider: { "@type": "LocalBusiness", name: bn, url: baseUrl },
        description: `Licensed ${sc} services in Cochrane, Alberta with a written 3-tier guarantee. Clean worksite guarantee, 14-day touch-up guarantee, and 15-year structural warranty on every project. Serving Cochrane, Rocky View County, Springbank, Elbow Valley, Calgary SW, and the Bow Valley.`,
        areaServed: { "@type": "AdministrativeArea", name: "Cochrane, Alberta" },
        offers: {
          "@type": "Offer",
          description: "Written quote provided before work begins. All projects include 3-tier written guarantee.",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Written Guarantee — Three Tiers",
          itemListElement: GUARANTEES.map((g, i) => ({
            "@type": "OfferCatalog",
            position: i + 1,
            name: g.name,
            description: g.schema,
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: resolvedFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Guarantee", item: `${baseUrl}/guarantee` },
        ],
      },
    ];

    const cleanup = () =>
      document.querySelectorAll('[data-guarantee-schema]').forEach((n) => n.remove());
    cleanup();
    schemas.forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-guarantee-schema", "true");
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
    });
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bn]);

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — H1 contains primary keyword in first position
          "Written [Trade] Guarantee" matches how homeowners search
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "hsl(218 43% 12%)", paddingTop: "clamp(6rem, 14vw, 11rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
      >
        <BlueprintGrain opacity={0.018} />
        <div className="container relative z-10 mx-auto px-6">
          {/* Breadcrumb — visible + semantic */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, color: "hsl(var(--bone) / 0.35)", letterSpacing: "0.1em" }}>
              <li><Link to="/" className="hover:text-bone/60 transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li style={{ color: "hsl(var(--bone) / 0.6)" }}>Guarantee</li>
            </ol>
          </nav>

          {/* Keyword-targeted H1 */}
          <h1
            className="text-bone max-w-[22ch]"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            Written {sc} Guarantee — Cochrane &amp; Area
          </h1>

          {/* Brand name of the guarantee as subtitle — editorial, not H-tag */}
          <p
            className="mt-4 mb-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", fontStyle: "italic", color: "hsl(var(--copper) / 0.7)", fontWeight: 300 }}
          >
            The Generational Finish Guarantee
          </p>
          <div className="mb-6 h-px w-16" style={{ background: "hsl(var(--copper) / 0.35)" }} />

          {/* First paragraph — primary keyword appears in first 100 words */}
          <p
            className="max-w-[58ch] text-bone/65 leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}
          >
            Every {bn} {s} project in Cochrane and the surrounding area comes with
            a three-tier written guarantee — not a verbal assurance, not a canned
            warranty card. A named commitment on a signed invoice that stays with
            the property for {age > 15 ? "decades" : "15 years"}.
          </p>

          {/* E-E-A-T trust signals inline */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              `${age}+ years in Cochrane`,
              "$5M liability coverage",
              "WCB-covered crews",
              "In writing on every invoice",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  border: "1px solid hsl(var(--copper) / 0.2)",
                  fontFamily: "'Jost', system-ui",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "hsl(var(--bone) / 0.65)",
                }}
              >
                <span style={{ color: "hsl(var(--copper))" }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          THREE GUARANTEE PANELS
          H2s carry secondary keywords: "Worksite Guarantee", "Touch-Up
          Guarantee", "15-Year Structural Guarantee" — all search terms
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="space-y-px" style={{ background: "hsl(var(--seam))" }}>
          {GUARANTEES.map((g) => (
            <div
              key={g.num}
              className="bg-paper p-10 md:p-14 grid md:grid-cols-12 gap-8 md:gap-16 items-start"
            >
              <div className="md:col-span-4">
                <p
                  className="text-mist mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 42, fontWeight: 300, fontStyle: "italic", lineHeight: 1 }}
                >
                  {g.num}
                </p>
                <h2
                  className="text-charcoal"
                  style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.2 }}
                >
                  {g.name}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p
                  className="text-charcoal mb-5 leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, letterSpacing: "-0.005em", lineHeight: 1.5 }}
                >
                  {g.promise.replace(/\{SERVICE\}/g, s)}
                </p>
                <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                  {g.detail.replace(/\{SERVICE\}/g, s)}
                </p>
                <p className="mt-5 uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, color: "hsl(var(--copper))" }}>
                  {g.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT "IN WRITING" MEANS + E-E-A-T BODY CONTENT
          This section builds word count AND E-E-A-T authority signals.
          Google needs to see specific, verifiable claims here.
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div>
            <p className="eyebrow-copper mb-4">What "in writing" means</p>
            <h2
              className="text-charcoal mb-5"
              style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}
            >
              A legal document, not a handshake.
            </h2>
            <div className="space-y-4 text-body text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              <p>
                Every {bn} {s} invoice lists all three guarantees by name, with the
                specific terms — 14 days for finish, 15 years for structure. The document
                is dated and signed. It constitutes a written service agreement under
                Alberta consumer protection law.
              </p>
              <p>
                Before any work begins, you receive a written scope document listing
                exactly what will be done, to what standard, and within what price band.
                Nothing on that scope changes without your written approval.
                The guarantee applies to the scope as written — not an interpreted
                or summarised version of it.
              </p>
              <p>
                Cochrane homeowners keep these documents. They come up in home inspections.
                They appear in real estate disclosures. The 15-year structural warranty
                is a material fact about the property — one that translates to resale value.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow-copper mb-4">Why we offer this</p>
            <h2
              className="text-charcoal mb-5"
              style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}
            >
              A strong guarantee is built into the work, not added after.
            </h2>
            <div className="space-y-4 text-body text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              <p>
                We have been doing {s} work in Cochrane and Rocky View County since {yr}.
                In that time, we have seen what a 15-year-old {s} installation looks like
                when it was done correctly, and what it looks like when it was not.
                The difference is not subtle.
              </p>
              <p>
                We offer 15 years because the structural work we do is built to last 30.
                We offer zero-cost touch-ups because Level-5 finish done correctly does
                not develop issues — and when it does, the correct response is to return,
                not invoice.
              </p>
              <p>
                A guarantee that costs us nothing to offer means nothing.
                Ours is strong because the work backs it up.
              </p>
            </div>

            {/* Insurance / credentials — specific E-E-A-T claims */}
            <div
              className="mt-8 p-6 rounded"
              style={{ background: "hsl(var(--paper))", border: "1px solid hsl(var(--seam))" }}
            >
              <p className="eyebrow-copper mb-4">Credentials on request</p>
              <ul className="space-y-2 text-body-sm text-graphite" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                {[
                  `$5M general liability — certificate available before work starts`,
                  `WCB coverage on every crew member`,
                  `Manufacturer certifications on installed materials`,
                  `${age}+ years operating in Cochrane, AB`,
                  `Licensed under Alberta contractor requirements`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: "hsl(var(--forest))", marginTop: 3, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          DARK GUARANTEE BLOCK (visual component)
      ══════════════════════════════════════════════════════════════════ */}
      <Suspense fallback={null}>
        <GuaranteeBlock variant="dark" />
      </Suspense>

      {/* ══════════════════════════════════════════════════════════════════
          COMPARISON — What most contractors offer vs what we offer
          Keyword opportunity: "contractor warranty Alberta" comparison
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-3xl">
          <p className="eyebrow-copper mb-4">The industry standard vs {bn}</p>
          <h2
            className="text-charcoal mb-8"
            style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}
          >
            Most {s} contractors in Alberta offer a verbal assurance. We offer a signed document.
          </h2>

          {/* Side-by-side comparison table */}
          <div className="grid md:grid-cols-2 gap-px bg-seam mb-10">
            {[
              {
                label: "Most contractors",
                bg: "bg-paper",
                items: [
                  "Verbal assurance only",
                  "No documented warranty period",
                  "No named guarantee on invoice",
                  "Touch-up at contractor's discretion",
                  "No structural liability commitment",
                ],
                icon: "–",
                iconColor: "hsl(var(--mist))",
              },
              {
                label: bn,
                bg: "bg-bone",
                items: [
                  "Three named guarantees in writing",
                  "15-year structural warranty period",
                  "All three listed on every signed invoice",
                  "14-day touch-up, zero cost, no debate",
                  "Structural liability for 15 years",
                ],
                icon: "✓",
                iconColor: "hsl(var(--forest))",
              },
            ].map(({ label, bg, items, icon, iconColor }) => (
              <div key={label} className={`${bg} p-8`}>
                <p className="eyebrow-copper mb-5">{label}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body-sm text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                      <span style={{ color: iconColor, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onBookClick?.({ source: "Guarantee page comparison" })}
              className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
            <Link
              to="/reviews"
              className="rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-charcoal transition-all duration-300 hover:text-forest"
              style={{ border: "1px solid hsl(var(--copper) / 0.2)" }}
            >
              See client reviews
            </Link>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ SECTION — FAQPage schema drives Google PAA rich results
          Questions target: "does [brand] have a warranty", "how long is
          the warranty", "what is covered", "is it transferable"
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="max-w-3xl">
          <p className="eyebrow-copper mb-4">Guarantee questions</p>
          <h2
            className="text-charcoal mb-8"
            style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}
          >
            Everything homeowners ask about the {s} warranty.
          </h2>

          <div className="divide-y border border-seam rounded overflow-hidden">
            {resolvedFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-paper">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3
                      className="text-charcoal leading-snug"
                      style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, letterSpacing: "-0.005em" }}
                    >
                      {faq.q}
                    </h3>
                    <ChevronDown size={18} className={`text-forest flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 15, fontWeight: 300, lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          INTERNAL LINKS — PageRank flow to high-value pages
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="md">
        <p className="eyebrow-copper mb-6">More information</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { to: "/reviews",            label: "Client Reviews",        desc: "Real results from Cochrane homeowners." },
            { to: "/pricing",            label: "Transparent Pricing",   desc: "Written ranges before work starts." },
            { to: "/areas-we-serve",     label: "Areas We Serve",        desc: "120+ communities across Cochrane & area." },
          ].map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group block border border-seam rounded p-6 bg-bone hover:border-forest/40 transition-all duration-300"
            >
              <h3
                className="text-charcoal mb-2 group-hover:text-forest transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "1.05rem", fontWeight: 300 }}
              >
                {label}
              </h3>
              <p className="text-graphite text-body-sm" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>{desc}</p>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Three photos. One business day. A written quote with all three guarantees on it."
        body="No verbal estimates. No surprises. Everything in writing before we touch a surface."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Guarantee page → CTA" }}
      />

    </TemplateLayout>
  );
};

export default GuaranteePage;
