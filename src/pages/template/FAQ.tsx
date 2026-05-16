/**
 * /faq — Frequently Asked Questions
 *
 * Standalone FAQ page with FAQPage JSON-LD schema.
 * Google surfaces individual Q&A pairs as rich results in SERPs —
 * this page is the primary driver of long-tail informational traffic.
 *
 * Schema: FAQPage with all MASTER_REMIX.FAQS as Question/Answer pairs.
 * SEO: each question is an H3 — crawlable, indexable, rich-result eligible.
 *
 * REMIX: FAQs come from MASTER_REMIX.FAQS. Update trade.config.ts only.
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

interface Props {
  onBookClick?: BookingClickHandler;
}

// ─── Additional universal FAQs (always present, supplement trade FAQs) ────────
const UNIVERSAL_FAQS = [
  {
    question: "How do I get a quote?",
    answer:
      "Send 2–3 photos of the space through the booking form — the surface, the lighting, and the room context. That is the entire ask. You receive a written price range within one business day. No call required.",
  },
  {
    question: "Do you do small jobs?",
    answer:
      "Yes. The smallest job receives the same Level-5 finish standard as the largest. We do not have a minimum project size. A one-hour repair patch is held to the same standard as a whole-home installation.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "$5M general liability coverage, WCB-covered crews, and manufacturer certifications on every material we install. Certificates are available before any work begins — just ask.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We are based in Cochrane and serve 120+ communities across Cochrane, Rocky View County, Springbank, Elbow Valley, Calgary SW/NW/SE, the Bow Valley, and Canmore. See the full list on the Areas We Serve page.",
  },
  {
    question: "What is your payment process?",
    answer:
      "A written quote is provided before work starts. Payment is due on completion. We do not ask for deposits on standard residential projects. Large multi-phase projects may have a milestone structure — this is disclosed in the written scope.",
  },
  {
    question: "Do you work with homeowners directly, or only through contractors?",
    answer:
      "Primarily directly with homeowners. We also work with general contractors, interior designers, and property managers. The written quote and guarantee process is the same regardless.",
  },
];

const FAQPage = ({ onBookClick }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sc = MASTER_REMIX.SERVICE_CATEGORY;
  const bn = MASTER_REMIX.BRAND_NAME;

  // Merge trade FAQs + universal FAQs, deduplicate by question text
  const tradeQuestions = MASTER_REMIX.FAQS.map((f) => f.question.toLowerCase());
  const extraFaqs = UNIVERSAL_FAQS.filter(
    (f) => !tradeQuestions.includes(f.question.toLowerCase())
  );
  const allFaqs = [...MASTER_REMIX.FAQS, ...extraFaqs];

  // Inject FAQPage JSON-LD schema into <head>
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-faq-schema", "true");
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);

    return () => {
      document.querySelectorAll('[data-faq-schema="true"]').forEach((n) => n.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bn]);

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-bone border-b"
        style={{
          borderColor: "hsl(var(--copper) / 0.1)",
          paddingTop: "clamp(5rem, 12vw, 9rem)",
          paddingBottom: "clamp(3rem, 8vw, 5rem)",
        }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="eyebrow-copper mb-5">{sc} · {bn}</p>
          <h1
            className="text-charcoal"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Frequently asked questions.
          </h1>
          <p
            className="mt-5 max-w-[52ch] text-graphite leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}
          >
            Everything homeowners ask before they send us a photo.
            If your question is not here, the answer is one message away.
          </p>
        </div>
      </section>

      {/* ── FAQ accordion ── */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-3xl">

          {/* Trade-specific FAQs */}
          {MASTER_REMIX.FAQS.length > 0 && (
            <div className="mb-12">
              <p className="eyebrow-copper mb-6">About the work</p>
              <div className="divide-y border border-seam rounded overflow-hidden">
                {MASTER_REMIX.FAQS.map((faq, i) => (
                  <FAQItem
                    key={i}
                    index={i}
                    question={faq.question}
                    answer={faq.answer}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Universal FAQs */}
          <div>
            <p className="eyebrow-copper mb-6">Process and logistics</p>
            <div className="divide-y border border-seam rounded overflow-hidden">
              {extraFaqs.map((faq, i) => {
                const idx = MASTER_REMIX.FAQS.length + i;
                return (
                  <FAQItem
                    key={idx}
                    index={idx}
                    question={faq.question}
                    answer={faq.answer}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                );
              })}
            </div>
          </div>

          {/* Still have a question */}
          <div
            className="mt-12 p-8 border-l-2"
            style={{ borderColor: "hsl(var(--copper) / 0.35)", background: "hsl(var(--bone))" }}
          >
            <p
              className="text-charcoal mb-3"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              Still have a question?
            </p>
            <p className="text-graphite text-body mb-5" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              Send it through the booking form or{" "}
              <Link to="/contact" className="text-forest underline underline-offset-2">contact us directly</Link>.
              We respond within one business day.
            </p>
            <button
              onClick={() => onBookClick?.({ source: "FAQ page" })}
              className="rounded-none bg-forest px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
          </div>
        </div>
      </SectionFrame>

      {/* ── Links to related pages ── */}
      <SectionFrame tone="bone" size="md">
        <p className="eyebrow-copper mb-6">Read more</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { to: "/guarantee", label: "Our 3-Tier Guarantee", desc: "What 'in writing' actually means." },
            { to: "/pricing",   label: "Transparent Pricing",  desc: "Written ranges before work starts." },
            { to: "/reviews",   label: "Client Reviews",       desc: "Real outcomes from real projects." },
          ].map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group block border border-seam rounded p-6 bg-paper hover:border-forest/40 transition-all duration-300"
            >
              <h3
                className="text-charcoal mb-2 group-hover:text-forest transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "1.05rem", fontWeight: 300 }}
              >
                {label}
              </h3>
              <p className="text-graphite text-body-sm" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                {desc}
              </p>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Send three photos. Receive a written quote within 24 hours."
        body="No sales call required. No pressure. The next step is yours."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "FAQ → CTA" }}
      />

    </TemplateLayout>
  );
};

// ─── FAQ accordion item ───────────────────────────────────────────────────────
const FAQItem = ({
  index,
  question,
  answer,
  openIndex,
  setOpenIndex,
}: {
  index: number;
  question: string;
  answer: string;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) => {
  const isOpen = openIndex === index;
  return (
    <div className="bg-paper">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        {/* H3 for SEO — each question is crawlable */}
        <h3
          className="text-charcoal leading-snug"
          style={{
            fontFamily: "'Space Grotesk', system-ui",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            fontWeight: 300,
            letterSpacing: "-0.005em",
          }}
        >
          {question}
        </h3>
        <ChevronDown
          size={18}
          className={`text-forest flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p
            className="text-graphite leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 15, fontWeight: 300, lineHeight: 1.7 }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
