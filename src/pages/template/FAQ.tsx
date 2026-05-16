/**
 * /faq — [Trade] FAQ — Cochrane & Area
 *
 * SEO targets:
 *   Primary:   "how much does [trade] cost Cochrane"
 *              "[trade] contractor FAQ Cochrane"
 *   Long-tail: one target per question — each H3 is a rankable query
 *
 * Schema: FAQPage (all questions) + LocalBusiness + BreadcrumbList
 *
 * Question strategy — Victorious SEO / PAA (People Also Ask) targeting:
 *   Every question is written to mirror how homeowners actually type into
 *   Google. Generic questions ("How do I start?") are replaced with specific
 *   location-qualified queries ("How much does [trade] cost in Cochrane?").
 *   Google surfaces FAQPage answers directly in SERPs — each question on
 *   this page is a separate ranking opportunity.
 *
 * REMIX: Trade FAQs come from MASTER_REMIX.FAQS. Universal questions are
 *        always present. Update trade.config.ts for trade-specific copy.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

// ─── FAQ categories — each group targets a different search intent cluster ────
//
// Victorious SEO principle: group questions by intent, not by topic.
// Cost intent, process intent, quality intent, and trust intent are different
// mental states — structuring by intent serves both users and crawlers.

const COST_FAQS = [
  {
    q: "How much does {SERVICE} cost in Cochrane?",
    a: "Most residential {SERVICE} projects in Cochrane fall between $150 and $8,000+ depending on scope. Small repairs are typically $150–$450. A single room runs $900–$3,500. A full basement or whole-home project is $3,500–$8,000+. We publish transparent price bands on our pricing page. You receive a written range specific to your project within one business day of sending photos.",
  },
  {
    q: "Do {SERVICE} contractors in Cochrane charge by the hour or by the project?",
    a: "We quote by project scope, not by the hour. Hourly billing creates incentive to work slowly. A fixed-scope written quote means you know the cost before any work begins — and it does not change unless the scope changes, which requires your approval.",
  },
  {
    q: "Is there a minimum job size for {SERVICE} in Cochrane?",
    a: "No. We do small repairs — a single patch, a ceiling crack, a tile replacement. The minimum job is whatever needs doing. The standard is the same regardless of size.",
  },
  {
    q: "Do you require a deposit for {SERVICE} work?",
    a: "No deposit is required for standard residential projects. Payment is due on completion. Large multi-phase projects may have a milestone payment structure — this is disclosed in the written scope before work begins.",
  },
];

const PROCESS_FAQS = [
  {
    q: "How do I get a {SERVICE} quote in Cochrane?",
    a: "Send 2–3 photos through the booking form — the surface, the lighting, and the room context. That is the entire ask. You receive a written price range within one business day. No sales call, no site visit required to get a number.",
  },
  {
    q: "How long does {SERVICE} work take in Cochrane?",
    a: "Small repairs are typically completed in a single visit. A full-room project takes 2–5 days. A whole-home or basement development is quoted with a specific timeline in the written scope. We do not promise timelines we cannot keep — every project gets an honest window, not an optimistic one.",
  },
  {
    q: "Do I need to be home during the {SERVICE} work?",
    a: "Not necessarily. Many Cochrane homeowners provide access and leave for the day. We send a confirmation before arrival and a sign-off message when complete. If you prefer to be present, we work around your schedule.",
  },
  {
    q: "How far out are you currently booking {SERVICE} in Cochrane?",
    a: "Typically 2–4 weeks for standard residential projects. Availability shifts with the season. Send your project scope and we will confirm a current booking window with your written quote.",
  },
  {
    q: "What do I need to do to prepare before the {SERVICE} crew arrives?",
    a: "Clear the work area of furniture and personal items. That is all. We handle floor protection, dust containment, and worksite setup. If your project has specific prep requirements, they will be noted in the written scope.",
  },
];

const QUALITY_FAQS = [
  {
    q: "What is a Level 5 finish — and does {SERVICE} in Cochrane use it?",
    a: "Level 5 is the highest drywall finish standard under ASTM C840 and GA-214. It involves a skim coat over the entire surface — not just at joints — to eliminate any texture variation visible under raking light. We apply Level 5 on every project by default. Most contractors offer Level 4 and charge extra for Level 5. We include it in the standard scope.",
  },
  {
    q: "What is the difference between {SERVICE} contractors in Cochrane?",
    a: "Primarily: finish standard, worksite discipline, and what they put in writing. A contractor who does Level 3 or 4 work and gives verbal assurances is a different product than a contractor who delivers Level 5 finish with a written 15-year structural guarantee. The first is cheaper upfront. The second is cheaper over time.",
  },
  {
    q: "How do I know the {SERVICE} work will be done right?",
    a: "Three ways: a written scope before work begins (so you know what 'done right' means), a 14-day touch-up guarantee (so issues that appear after completion are corrected at no cost), and a 15-year structural warranty (so structural failures are covered in writing). These are on every invoice.",
  },
];

const TRUST_FAQS = [
  {
    q: "Is {BRAND} licensed and insured for {SERVICE} in Cochrane, Alberta?",
    a: "{BRAND} carries $5M general liability insurance and WCB coverage on all crew members. Manufacturer certifications are current on all materials we install. Insurance certificates and trade credentials are available on request before any work begins.",
  },
  {
    q: "Do I need a permit for {SERVICE} work in Cochrane?",
    a: "Most residential {SERVICE} finishing work in Cochrane does not require a permit. Work that involves structural modifications or changes to an existing permitted build may require one. We identify permit requirements during scoping — if a permit is needed, we tell you before the quote is signed.",
  },
  {
    q: "How long has {BRAND} been doing {SERVICE} work in Cochrane?",
    a: "{BRAND} has been operating in Cochrane and Rocky View County since {YEAR}. In that time we have completed projects across every Cochrane neighbourhood — Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland, Fireside, and the newer developments. We know the community because we have worked in it for {AGE}+ years.",
  },
  {
    q: "Does {BRAND} do {SERVICE} work in Calgary as well as Cochrane?",
    a: "Yes. We serve 120+ communities across Cochrane, Rocky View County, Springbank, Elbow Valley, Calgary SW, Calgary NW, Calgary SE, the Bow Valley, and Canmore. See the full list on the Areas We Serve page.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const FAQPage = ({ onBookClick }: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const s   = MASTER_REMIX.SERVICE;
  const sc  = MASTER_REMIX.SERVICE_CATEGORY;
  const bn  = MASTER_REMIX.BRAND_NAME;
  const yr  = MASTER_REMIX.FOUNDATION_YEAR;
  const age = new Date().getFullYear() - yr;

  // Resolve {SERVICE}, {BRAND}, {YEAR}, {AGE} placeholders in all questions
  const resolve = (text: string) =>
    text
      .replace(/\{SERVICE\}/g, s)
      .replace(/\{BRAND\}/g, bn)
      .replace(/\{YEAR\}/g, String(yr))
      .replace(/\{AGE\}/g, String(age));

  const categories = [
    { id: "cost",    label: "Cost & pricing",          icon: "$", faqs: COST_FAQS },
    { id: "process", label: "Process & timeline",      icon: "→", faqs: PROCESS_FAQS },
    { id: "quality", label: "Finish quality",          icon: "◈", faqs: QUALITY_FAQS },
    { id: "trust",   label: "Credentials & coverage",  icon: "✓", faqs: TRUST_FAQS },
  ];

  // Merge trade FAQs from MASTER_REMIX — deduplicate against universal questions
  const universalQs = [...COST_FAQS, ...PROCESS_FAQS, ...QUALITY_FAQS, ...TRUST_FAQS]
    .map((f) => resolve(f.q).toLowerCase());
  const tradeFaqs = MASTER_REMIX.FAQS.filter(
    (f) => !universalQs.includes(f.question.toLowerCase())
  );

  // All FAQs for schema — trade + universal
  const allFaqsForSchema = [
    ...tradeFaqs.map((f) => ({ q: f.question, a: f.answer })),
    ...[...COST_FAQS, ...PROCESS_FAQS, ...QUALITY_FAQS, ...TRUST_FAQS].map((f) => ({
      q: resolve(f.q),
      a: resolve(f.a),
    })),
  ];

  // ── Schema injection ──────────────────────────────────────────────────────
  useEffect(() => {
    const baseUrl = MASTER_REMIX.BRAND_URL;

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqsForSchema.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: bn,
        url: baseUrl,
        telephone: MASTER_REMIX.PHONE,
        foundingDate: String(yr),
        description: `${bn} is a licensed and insured ${sc} contractor based in Cochrane, AB, serving 120+ communities since ${yr}. Written quotes within 24 hours, 3-tier written guarantee on every project.`,
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
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",  item: baseUrl },
          { "@type": "ListItem", position: 2, name: "FAQ",   item: `${baseUrl}/faq` },
        ],
      },
    ];

    const cleanup = () =>
      document.querySelectorAll('[data-faq-schema]').forEach((n) => n.remove());
    cleanup();
    schemas.forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-faq-schema", "true");
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
    });
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bn]);

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — H1 keyword: "[trade] FAQ Cochrane"
          First paragraph contains primary keyword in first 100 words.
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-bone border-b"
        style={{
          borderColor: "hsl(var(--copper) / 0.1)",
          paddingTop: "clamp(5rem, 12vw, 9rem)",
          paddingBottom: "clamp(3rem, 8vw, 5rem)",
        }}
      >
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2" style={{ fontFamily: "'Jost', system-ui", fontSize: 11, color: "hsl(var(--mist))", letterSpacing: "0.1em" }}>
              <li><Link to="/" className="hover:text-graphite transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li>FAQ</li>
            </ol>
          </nav>

          <h1
            className="text-charcoal max-w-[24ch]"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {sc} FAQ — Cochrane &amp; Area
          </h1>

          {/* Primary keyword + brand in first 100 words */}
          <p
            className="mt-5 max-w-[58ch] text-graphite leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}
          >
            Common questions about {s} work in Cochrane — cost, process, timeline,
            quality standards, and what {bn} puts in writing on every project.
            If your question is not here, one message gets you an answer within one business day.
          </p>

          {/* Jump links to category sections */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors duration-200 hover:border-forest/50 hover:text-forest"
                style={{
                  border: "1px solid hsl(var(--seam))",
                  fontFamily: "'Jost', system-ui",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "hsl(var(--graphite))",
                }}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TRADE-SPECIFIC FAQs — from MASTER_REMIX.FAQS
          Only renders when trade.config.ts has questions not covered above
      ══════════════════════════════════════════════════════════════════ */}
      {tradeFaqs.length > 0 && (
        <SectionFrame tone="paper" size="lg">
          <div className="max-w-3xl" id="trade">
            <p className="eyebrow-copper mb-3">About the work</p>
            <h2
              className="text-charcoal mb-8"
              style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.01em" }}
            >
              {sc}-specific questions
            </h2>
            <div className="divide-y border border-seam rounded overflow-hidden">
              {tradeFaqs.map((faq, i) => (
                <FAQItem
                  key={`trade-${i}`}
                  id={`trade-${i}`}
                  question={faq.question}
                  answer={faq.answer}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              ))}
            </div>
          </div>
        </SectionFrame>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          INTENT-GROUPED FAQ CATEGORIES
          Each group targets a search intent cluster.
          H2 carries the intent keyword ("cost", "process", "quality").
      ══════════════════════════════════════════════════════════════════ */}
      {categories.map((cat, catIdx) => (
        <SectionFrame key={cat.id} tone={catIdx % 2 === 0 ? "paper" : "bone"} size="lg">
          <div className="max-w-3xl" id={cat.id}>
            <p className="eyebrow-copper mb-3">{cat.icon} {cat.label}</p>
            <h2
              className="text-charcoal mb-8"
              style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.01em" }}
            >
              {cat.label === "Cost & pricing"   && `How much does ${s} cost in Cochrane?`}
              {cat.label === "Process & timeline" && `How does the ${s} process work?`}
              {cat.label === "Finish quality"   && `What finish standard do you deliver?`}
              {cat.label === "Credentials & coverage" && `Is ${bn} licensed and insured?`}
            </h2>
            <div className="divide-y border border-seam rounded overflow-hidden">
              {cat.faqs.map((faq, i) => (
                <FAQItem
                  key={`${cat.id}-${i}`}
                  id={`${cat.id}-${i}`}
                  question={resolve(faq.q)}
                  answer={resolve(faq.a)}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              ))}
            </div>
          </div>
        </SectionFrame>
      ))}

      {/* ══════════════════════════════════════════════════════════════════
          STILL HAVE A QUESTION + INTERNAL LINKS
      ══════════════════════════════════════════════════════════════════ */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-3xl">
          <div
            className="p-8 border-l-2 mb-12"
            style={{ borderColor: "hsl(var(--copper) / 0.35)", background: "hsl(var(--bone))" }}
          >
            <p
              className="text-charcoal mb-3"
              style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 300, letterSpacing: "-0.01em" }}
            >
              Still have a question about {s} work in Cochrane?
            </p>
            <p className="text-graphite text-body mb-5" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              Send it through the booking form or{" "}
              <Link to="/contact" className="text-forest underline underline-offset-2">contact us directly</Link>.
              Every question gets a reply within one business day.
            </p>
            <button
              onClick={() => onBookClick?.({ source: "FAQ page — still have a question" })}
              className="rounded-none bg-forest px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
          </div>

          <p className="eyebrow-copper mb-6">Dig deeper</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: "/guarantee", label: "Written Guarantee",    desc: `The ${s} warranty in full detail.` },
              { to: "/pricing",   label: "Transparent Pricing",  desc: "Written ranges, no surprises." },
              { to: "/reviews",   label: "Client Reviews",       desc: "Real Cochrane homeowners." },
              { to: "/areas-we-serve", label: "Areas We Serve",  desc: "120+ communities." },
            ].map(({ to, label, desc }) => (
              <Link
                key={to}
                to={to}
                className="group block border border-seam rounded p-5 bg-bone hover:border-forest/40 transition-all duration-300"
              >
                <h3
                  className="text-charcoal mb-1.5 group-hover:text-forest transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "0.975rem", fontWeight: 300 }}
                >
                  {label}
                </h3>
                <p className="text-mist text-caption" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline={`Get a written ${s} quote in Cochrane within 24 hours.`}
        body="No call required. Send three photos. Receive a written range specific to your project."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "FAQ → CTA" }}
      />

    </TemplateLayout>
  );
};

// ─── Reusable accordion item ──────────────────────────────────────────────────
const FAQItem = ({
  id,
  question,
  answer,
  openId,
  setOpenId,
}: {
  id: string;
  question: string;
  answer: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) => {
  const isOpen = openId === id;
  return (
    <div className="bg-paper">
      <button
        onClick={() => setOpenId(isOpen ? null : id)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        {/* H3 — each question is a crawlable, indexable heading */}
        <h3
          className="text-charcoal leading-snug"
          style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(0.925rem, 1.8vw, 1.05rem)", fontWeight: 300, letterSpacing: "-0.003em" }}
        >
          {question}
        </h3>
        <ChevronDown
          size={17}
          className={`text-forest flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-1">
          <p
            className="text-graphite leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 15, fontWeight: 300, lineHeight: 1.72 }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
