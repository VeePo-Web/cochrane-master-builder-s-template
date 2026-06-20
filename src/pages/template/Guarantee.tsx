/**
 * /guarantee — Written Service Guarantee
 *
 * ── Victorious SEO upgrades applied ─────────────────────────────────────────
 * Schema (6 types): LocalBusiness (sameAs network entity) + Service +
 *   FAQPage + BreadcrumbList + HowTo + WebPage (speakable)
 * Content: HowTo "claim the guarantee" section, legal-framework citation,
 *   definition blocks (AI extraction format), guarantee-backed review pull
 *   quotes (AI corroboration), comparison table
 * Internal links: /faq, /reviews, /pricing, /services, /areas-we-serve, /about
 *
 * REMIX: All trade, location, and legal copy reads from MASTER_REMIX tokens
 * (SERVICE, BRAND, CITY, REGION, PROVINCE, PROVINCE_CODE, COUNTRY_CODE,
 * LEGAL_FRAMEWORK). The default Cochrane site keeps full SEO depth; a remix
 * swaps city/region/province/legal cleanly. Guarantee names are canonical
 * (Workmanship / Follow-Up / Invoice) — identical to GuaranteeBlock + FAQ.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { REVIEWS } from "@/config/reviews";
import { BlueprintGrain } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

// ─── Three guarantee tiers — canonical names, identical to GuaranteeBlock ──────
const TIERS = [
  {
    num: "01",
    name: "The Workmanship Guarantee",
    keyword: "Workmanship guarantee",
    promise: "If our {SERVICE} work does not meet the standard we quoted, we make it right — at zero cost to you. No exceptions. No negotiation.",
    detail: "We do not debate whether a problem 'counts.' If the finished work falls short of the standard we put in writing, we return and correct it. The standard is simple: the result matches the scope you approved — every time.",
    label: "Meets the standard, or we make it right.",
    schema: "Work guaranteed to meet the quoted standard. If it does not, it is corrected at no charge.",
  },
  {
    num: "02",
    name: "The Follow-Up Guarantee",
    keyword: "14-day follow-up guarantee",
    promise: "Any issue that appears within 14 days of project completion: we return at zero cost. No argument. No invoice.",
    detail: "Materials settle and cure in the first two weeks. Things move. Our answer is not to debate whether it falls under scope — it is to return and fix it. Every time. No invoice.",
    label: "14 days. Zero cost. No debate.",
    schema: "Any issue appearing within 14 days of project completion repaired at no charge, without debate.",
  },
  {
    num: "03",
    name: "The Invoice Guarantee",
    keyword: "written price guarantee",
    promise: "The price on the quote is the price on the invoice. Nothing is added without your explicit written approval — agreed before we start.",
    detail: "Not a number that drifts once work begins. A named price on a dated, signed invoice — a legal document under {LEGAL_SHORT}. The scope is written, the price is written, and both are fixed before any work starts. A quote you can read is a different thing from a quote you're told.",
    label: "Quote equals invoice. In writing.",
    schema: "Final invoice equals the approved written quote. No unilateral price changes; additions require written client approval.",
  },
];

// ─── HowTo steps — "How to claim the guarantee" ───────────────────────────────
const CLAIM_STEPS = [
  { name: "Contact us directly", text: "Call or email using the contact details on your invoice. Reference your project date and the original written scope number." },
  { name: "Describe the issue", text: "Tell us what you are seeing — a sentence is enough. We do not require photos or formal documentation. Your description is sufficient to schedule the visit." },
  { name: "We schedule the return visit", text: "Return visits for follow-up issues are typically booked within 3–5 business days. Workmanship claims are assessed within 48 hours of contact." },
  { name: "We inspect and confirm scope", text: "A team member reviews the issue against your written scope. If it falls under the guarantee, we proceed immediately. No approval required from you." },
  { name: "We repair at zero cost", text: "The work is done. No charge, no invoice, no deductible. You receive a revised invoice confirming the work was completed under guarantee." },
];

// ─── Comparison rows — for AI extraction + featured table snippet ─────────────
const COMPARISON_ROWS = [
  { feature: "Guarantee documentation", industry: "Verbal assurance only",              brand: "Named, written, on every invoice" },
  { feature: "Workmanship guarantee",   industry: "None stated",                        brand: "Corrected at no cost if below the quoted standard" },
  { feature: "Follow-up window",        industry: "At contractor's discretion",          brand: "14 days, zero cost, no debate" },
  { feature: "Worksite cleanliness",    industry: "Expectation only",                    brand: "Left cleaner than we found it" },
  { feature: "Scope changes",           industry: "Verbal change orders common",          brand: "Written approval required — no exceptions" },
  { feature: "Price after quoting",     industry: "Can increase without written notice",  brand: "Fixed to written scope — cannot change unilaterally" },
  { feature: "Team consistency",        industry: "Subcontractors common",                brand: "Same team, start to finish" },
  { feature: "Permit guidance",         industry: "Homeowner's responsibility",           brand: "Identified and flagged in the written scope" },
  { feature: "Material certification",  industry: "Not disclosed",                        brand: "Manufacturer-certified on all installed materials" },
  { feature: "Guarantee transferability", industry: "Expires with ownership",             brand: "Transfers with the property — follows the home" },
];

// ─── Guarantee FAQ — PAA-optimised (≤65 words per answer for extraction) ──────
const GUARANTEE_FAQS = [
  {
    q: "What does the {SERVICE} guarantee cover?",
    a: "Three things: the workmanship (meets the standard quoted or corrected free), the follow-up (any issue within 14 days fixed at zero cost), and the invoice (the price you approve is the price you pay). All three appear by name on every signed invoice before work begins.",
  },
  {
    q: "How long is the {BRAND} {SERVICE} guarantee?",
    a: "The follow-up guarantee runs 14 days from completion; the workmanship guarantee stands behind the job itself. Both are stated on the signed invoice — not in a separate document — and are enforceable under {LEGAL_SHORT} as a written service agreement.",
  },
  {
    q: "Is the {SERVICE} guarantee legally binding in {PROVINCE}?",
    a: "Yes. A named guarantee on a signed invoice constitutes a written service agreement enforceable under {LEGAL_FRAMEWORK}. Verbal contractor assurances do not carry the same legal enforceability.",
  },
  {
    q: "Is the {SERVICE} guarantee transferable to a new owner?",
    a: "Yes. The guarantee follows the property, not the owner. The signed invoice is the document. At point of sale, a copy transfers to the new owners. This is a documentable material fact in a {PROVINCE} real estate transaction.",
  },
  {
    q: "What happens if {SERVICE} work has an issue after the project is done?",
    a: "Contact us directly. If it falls within the guarantee — workmanship below the quoted standard, or any issue within 14 days — we return at zero cost. No proof burden on you. We inspect, confirm, and repair.",
  },
  {
    q: "Is the {SERVICE} guarantee free, or does it cost extra?",
    a: "All three guarantees are included in the standard project cost. They are not add-ons or premium options. Every {BRAND} project includes the workmanship, follow-up, and invoice guarantee at no extra charge.",
  },
];

// ─── Pull quotes — reviews that corroborate the guarantee claim ───────────────
const CORROBORATING_REVIEWS = REVIEWS.filter((r) =>
  r.approved &&
  (r.quote.toLowerCase().includes("clean") ||
   r.quote.toLowerCase().includes("quote") ||
   r.quote.toLowerCase().includes("charged") ||
   r.quote.toLowerCase().includes("wrote") ||
   r.quote.toLowerCase().includes("scope") ||
   r.quote.toLowerCase().includes("exactly") ||
   r.quote.toLowerCase().includes("held"))
).slice(0, 3);

// ─── Key definitions — AI extraction format: "[Term]: [Definition]" ───────────
const DEFINITIONS = [
  {
    term: "Workmanship guarantee",
    definition: "A written commitment that {SERVICE} work will meet the standard quoted — corrected at no cost if it does not — documented on a signed invoice and enforceable as a service agreement under {LEGAL_SHORT}.",
  },
  {
    term: "Follow-up guarantee",
    definition: "A commitment to repair any issue appearing within 14 days of project completion at zero cost to the homeowner — without requiring the issue to be formally proven or debated.",
  },
  {
    term: "Written scope",
    definition: "A pre-work document listing exactly what will be done, to what standard, within what price band. No work begins before you sign it. No change is made to it without your written approval.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const GuaranteePage = ({ onBookClick }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const s    = MASTER_REMIX.SERVICE;
  const sc   = MASTER_REMIX.SERVICE_CATEGORY;
  const bn   = MASTER_REMIX.BRAND_NAME;
  const yr   = MASTER_REMIX.FOUNDATION_YEAR;
  const age  = new Date().getFullYear() - yr;
  const city = MASTER_REMIX.CITY;
  const region = MASTER_REMIX.REGION;
  const province = MASTER_REMIX.PROVINCE;
  const provinceCode = MASTER_REMIX.PROVINCE_CODE;
  const countryCode = MASTER_REMIX.COUNTRY_CODE;
  const legal = MASTER_REMIX.LEGAL_FRAMEWORK;
  const legalShort = MASTER_REMIX.LEGAL_FRAMEWORK_SHORT;

  const resolve = (t: string) =>
    t.replace(/\{SERVICE\}/g, s)
     .replace(/\{BRAND\}/g, bn)
     .replace(/\{CITY\}/g, city)
     .replace(/\{REGION\}/g, region)
     .replace(/\{PROVINCE\}/g, province)
     .replace(/\{LEGAL_FRAMEWORK\}/g, legal)
     .replace(/\{LEGAL_SHORT\}/g, legalShort);

  const resolvedFaqs  = GUARANTEE_FAQS.map((f) => ({ q: resolve(f.q), a: resolve(f.a) }));
  const resolvedDefs  = DEFINITIONS.map((d) => ({ term: d.term, definition: resolve(d.definition) }));
  const resolvedTiers = TIERS.map((t) => ({ ...t, promise: resolve(t.promise), detail: resolve(t.detail) }));

  // ── 6-type schema injection ───────────────────────────────────────────────
  useEffect(() => {
    const baseUrl    = MASTER_REMIX.BRAND_URL;
    const parentUrl  = MASTER_REMIX.PARENT_BRAND_URL;
    const pageUrl    = `${baseUrl}/guarantee`;

    const schemas = [
      // 1. LocalBusiness — sameAs parent brand for network entity linking
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: bn,
        url: baseUrl,
        telephone: MASTER_REMIX.PHONE,
        foundingDate: String(yr),
        sameAs: [parentUrl, MASTER_REMIX.GOOGLE_REVIEW_URL].filter(Boolean),
        description: `${bn} is a licensed ${sc} provider in ${city}, ${provinceCode}, operating since ${yr}. Every project includes a 3-tier written guarantee: workmanship, 14-day follow-up, and a written-price invoice guarantee.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: provinceCode,
          addressCountry: countryCode,
        },
        areaServed: [
          { "@type": "City", name: city },
          { "@type": "AdministrativeArea", name: region },
        ],
      },

      // 2. Service — guarantee terms as structured OfferCatalog
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${sc} with Written Guarantee — ${city} & Area`,
        serviceType: sc,
        provider: { "@type": "LocalBusiness", "@id": `${baseUrl}/#organization` },
        description: `Licensed ${sc} in ${city} with a 3-tier written guarantee: workmanship, 14-day follow-up, and written-price invoice. Serving ${city}, ${region}, and surrounding communities.`,
        areaServed: { "@type": "AdministrativeArea", name: `${city}, ${province}` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "3-Tier Written Guarantee",
          itemListElement: resolvedTiers.map((t, i) => ({
            "@type": "OfferCatalog",
            position: i + 1,
            name: t.name,
            description: resolve(t.schema),
          })),
        },
      },

      // 3. FAQPage — guarantee-specific questions, PAA-optimised answers
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: resolvedFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },

      // 4. HowTo — "How to claim the guarantee"
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to claim the ${bn} ${s} guarantee`,
        description: `Step-by-step process for claiming the ${bn} workmanship, follow-up, or invoice ${s} guarantee in ${city}, ${province}.`,
        totalTime: "PT5M",
        step: CLAIM_STEPS.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      },

      // 5. BreadcrumbList
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Guarantee", item: pageUrl },
        ],
      },

      // 6. WebPage with speakable — voice search eligibility
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: `Written ${sc} Guarantee — ${city} & Area | ${bn}`,
        description: `3-tier written ${s} guarantee: workmanship, 14-day follow-up, and written-price invoice. In writing on every invoice. ${bn}, ${city} ${provinceCode}.`,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#guarantee-summary", "#guarantee-faqs", "#how-to-claim"],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Guarantee", item: pageUrl },
          ],
        },
      },
    ];

    const cleanup = () =>
      document.querySelectorAll("[data-guarantee-schema]").forEach((n) => n.remove());
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
          HERO — Speakable ID: #guarantee-summary
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="guarantee-summary"
        className="relative overflow-hidden bg-ink-blueprint"
        style={{ paddingTop: "clamp(6rem, 14vw, 11rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
      >
        <BlueprintGrain opacity={0.018} />
        <div className="container relative z-10 mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, color: "hsl(var(--bone) / 0.35)", letterSpacing: "0.1em" }}>
              <li><Link to="/" className="hover:text-bone/60 transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li style={{ color: "hsl(var(--bone) / 0.6)" }}>Guarantee</li>
            </ol>
          </nav>

          <h1
            className="text-bone max-w-[22ch]"
            style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            Written {sc} Guarantee — {city} &amp; Area
          </h1>

          <p className="mt-4 mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", fontStyle: "italic", color: "hsl(var(--copper) / 0.7)", fontWeight: 300 }}>
            {MASTER_REMIX.BRAND_SLOGAN}
          </p>
          <div className="mb-6 h-px w-16" style={{ background: "hsl(var(--copper) / 0.35)" }} />

          <p className="max-w-[58ch] text-bone/65 leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}>
            Every {bn} {s} project in {city} comes with a written three-tier guarantee —
            not a verbal assurance, not a canned warranty card. A named commitment on a
            signed invoice, enforceable under {legalShort}, that follows the property.
          </p>

          {/* E-E-A-T trust chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[`${age}+ years in ${city}`, "Fully insured", "Covered crews", `Legally binding — ${legalShort}`, "Transferable with property"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ border: "1px solid hsl(var(--copper) / 0.2)", fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "hsl(var(--bone) / 0.65)" }}>
                <span style={{ color: "hsl(var(--copper))" }}>✓</span>{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DEFINITION BLOCKS — AI extraction format: "[Term]: [Definition]"
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="md">
        <p className="eyebrow-copper mb-6">Key terms defined</p>
        <div className="grid md:grid-cols-3 gap-px bg-seam">
          {resolvedDefs.map((def) => (
            <div key={def.term} className="bg-paper p-6">
              <p className="text-charcoal mb-2 font-medium" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.95rem", letterSpacing: "-0.005em" }}>
                {def.term}
              </p>
              <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
                {def.definition}
              </p>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          THREE GUARANTEE TIERS
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="space-y-px" style={{ background: "hsl(var(--seam))" }}>
          {resolvedTiers.map((g) => (
            <div key={g.num} className="bg-paper p-10 md:p-14 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="md:col-span-4">
                <p className="text-mist mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 42, fontWeight: 300, fontStyle: "italic", lineHeight: 1 }}>
                  {g.num}
                </p>
                <h2 className="text-charcoal" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  {g.name}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-charcoal mb-5 leading-relaxed" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 300, letterSpacing: "-0.005em", lineHeight: 1.5 }}>
                  {g.promise}
                </p>
                <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                  {g.detail}
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
          HOW TO CLAIM — HowTo schema → featured snippet target
          ID: #how-to-claim (speakable)
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="grid md:grid-cols-12 gap-12 items-start" id="how-to-claim">
          <div className="md:col-span-4">
            <p className="eyebrow-copper mb-4">Claiming the guarantee</p>
            <h2 className="text-charcoal mb-5" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              How to claim the {s} guarantee — five steps.
            </h2>
            <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              No formal claim process. No proof burden on you. One contact
              is all it takes. We handle the rest.
            </p>
          </div>

          <div className="md:col-span-8">
            <ol className="space-y-0 divide-y border border-seam rounded overflow-hidden">
              {CLAIM_STEPS.map((step, i) => (
                <li key={i} className="flex gap-6 p-6 bg-paper">
                  <span className="flex-shrink-0 w-8 text-right" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "hsl(var(--copper) / 0.5)", lineHeight: 1.2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-charcoal mb-1" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.975rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
                      {step.name}
                    </p>
                    <p className="text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.65 }}>
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT "IN WRITING" MEANS + LEGAL FRAMEWORK + E-E-A-T
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow-copper mb-4">What "in writing" means</p>
            <h2 className="text-charcoal mb-5" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              A legal document under {province} law — not a handshake.
            </h2>
            <div className="space-y-4 text-body text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              <p>
                Every {bn} invoice lists all three guarantees by name, with specific terms —
                14 days for the follow-up, the quoted standard for the workmanship. The document
                is dated and signed. Under <strong className="text-charcoal">{legal}</strong>, it
                constitutes a written service agreement — enforceable in the same way as any signed contract.
              </p>
              <p>
                Verbal assurances do not carry this enforceability. When something goes wrong two years
                later, a verbal promise from a provider who is now on a different job is not a guarantee.
                A named, dated, signed invoice is.
              </p>
              <p>
                Before any work begins, you receive a written scope listing exactly what will be done,
                to what standard, and within what price band. Nothing changes without your written approval.
                The guarantee applies to the scope as written.
              </p>
              <p>
                {city} homeowners keep these invoices. They appear in home inspections, property
                disclosures, and real estate transactions — a documentable, transferable material fact
                about the property.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow-copper mb-4">Why we offer this</p>
            <h2 className="text-charcoal mb-5" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              A strong guarantee is built into the work — not added after.
            </h2>
            <div className="space-y-4 text-body text-graphite leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              <p>
                We have been doing {s} work in {city} and {region} since {yr}.
                We know what a {age}-year-old {s} project looks like when it was done correctly —
                and what it looks like when it was not. The difference is not subtle.
              </p>
              <p>
                We stand behind the work because it is built to last. We offer zero-cost follow-ups
                because work done correctly does not develop issues — and when it does, the correct
                response is to return, not to invoice.
              </p>
              <p>A guarantee that is easy to offer means nothing. Ours is strong because the work backs it.</p>
            </div>

            {/* Credentials — specific E-E-A-T claims */}
            <div className="mt-8 p-6 rounded" style={{ background: "hsl(var(--paper))", border: "1px solid hsl(var(--seam))" }}>
              <p className="eyebrow-copper mb-4">Credentials on request</p>
              <ul className="space-y-2 text-body-sm text-graphite" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                {[
                  "Full liability coverage — certificate before work starts",
                  "Insured, covered crews on every project",
                  "Manufacturer certifications on installed materials",
                  `${age}+ years operating in ${city}, ${provinceCode}`,
                  `Licensed under ${province} requirements`,
                  `Guarantees enforceable under ${legalShort}`,
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
          REVIEW PULL QUOTES — AI corroboration strategy
      ══════════════════════════════════════════════════════════════════ */}
      {CORROBORATING_REVIEWS.length > 0 && (
        <SectionFrame tone="paper" size="lg">
          <p className="eyebrow-copper mb-4">What {city} homeowners say</p>
          <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            The guarantee — in their words.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {CORROBORATING_REVIEWS.map((r) => (
              <figure key={r.name} className="bg-bone p-7 border border-seam rounded flex flex-col">
                <blockquote className="flex-1 text-charcoal leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.55 }}>
                  "{r.quote}"
                </blockquote>
                <figcaption className="text-mist" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {r.name} — {r.community} · {r.date}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-forest text-body-sm hover:underline underline-offset-2" style={{ fontFamily: "'Jost', system-ui" }}>
              All {s} reviews from {city} homeowners →
            </Link>
          </div>
        </SectionFrame>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          COMPARISON TABLE — featured table snippet target
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="lg">
        <div className="max-w-4xl">
          <p className="eyebrow-copper mb-4">Industry standard vs {bn}</p>
          <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2.25rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            What most {s} providers in {province} offer vs what we put in writing.
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label={`${s} guarantee comparison`}>
              <thead>
                <tr style={{ borderBottom: "2px solid hsl(var(--seam))" }}>
                  <th className="py-3 pr-6 text-mist" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Feature</th>
                  <th className="py-3 pr-6 text-mist" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>Most providers</th>
                  <th className="py-3 text-forest" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>{bn}</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "hsl(var(--seam))" }}>
                {COMPARISON_ROWS.map(({ feature, industry, brand }) => (
                  <tr key={feature}>
                    <td className="py-3.5 pr-6 text-charcoal text-body-sm font-medium" style={{ fontFamily: "'Jost', system-ui" }}>{feature}</td>
                    <td className="py-3.5 pr-6 text-mist text-body-sm" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                      <span className="mr-2 text-mist/50">–</span>{industry}
                    </td>
                    <td className="py-3.5 text-charcoal text-body-sm" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                      <span className="mr-2" style={{ color: "hsl(var(--forest))" }}>✓</span>{brand}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => onBookClick?.({ source: "Guarantee page comparison" })}
              className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep">
              {TEMPLATE_COPY.cta.primary}
            </button>
            <Link to="/reviews" className="rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-charcoal transition-all duration-300 hover:text-forest" style={{ border: "1px solid hsl(var(--copper) / 0.2)" }}>
              See client reviews
            </Link>
          </div>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ — PAA-optimised. ID: #guarantee-faqs (speakable)
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-3xl" id="guarantee-faqs">
          <p className="eyebrow-copper mb-4">Guarantee questions</p>
          <h2 className="text-charcoal mb-8" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 300, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            Everything {city} homeowners ask about the {s} guarantee.
          </h2>
          <div className="divide-y border border-seam rounded overflow-hidden">
            {resolvedFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-bone">
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}>
                    <h3 className="text-charcoal leading-snug" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 300, letterSpacing: "-0.005em" }}>
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
          <p className="mt-6 text-body-sm text-graphite" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
            More questions?{" "}
            <Link to="/faq" className="text-forest underline underline-offset-2">See the full {s} FAQ</Link>
            {" "}or{" "}
            <Link to="/contact" className="text-forest underline underline-offset-2">contact us directly</Link>.
          </p>
        </div>
      </SectionFrame>

      {/* ══════════════════════════════════════════════════════════════════
          INTERNAL LINKS — PageRank flow to 6 key pages
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="bone" size="md">
        <p className="eyebrow-copper mb-6">More from {bn}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: "/reviews",        label: "Client Reviews",      desc: `Real ${s} results from ${city} homeowners.` },
            { to: "/pricing",        label: "Transparent Pricing", desc: "Written ranges before any work begins." },
            { to: "/faq",            label: "Full FAQ",            desc: `Every ${s} question answered in full.` },
            { to: "/services",       label: `${sc} Services`,      desc: `All ${s} services we guarantee.` },
            { to: "/areas-we-serve", label: "Areas We Serve",      desc: `Communities across ${city} & area.` },
            { to: "/about",          label: "About Our Team",      desc: `${age}+ years. Same family. Same standard.` },
          ].map(({ to, label, desc }) => (
            <Link key={to} to={to}
              className="group block border border-seam rounded p-5 bg-paper hover:border-forest/40 transition-all duration-300">
              <h3 className="text-charcoal mb-1.5 group-hover:text-forest transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.975rem", fontWeight: 300 }}>
                {label}
              </h3>
              <p className="text-mist text-caption" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>{desc}</p>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Tell us the scope. One business day. A written quote with all three guarantees on it."
        body="No verbal estimates. No surprises. Everything in writing before we start."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Guarantee page → CTA" }}
        reassurance="Free quote · No obligation · 24-hour reply"
      />

    </TemplateLayout>
  );
};

export default GuaranteePage;
