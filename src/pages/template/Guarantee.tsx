/**
 * /guarantee — The Generational Finish Guarantee
 *
 * Dedicated page for the 3-tier risk reversal system.
 * SEO target: "[trade] guarantee Cochrane", "drywall warranty Alberta", etc.
 * Conversion role: removes the last objection before booking.
 *
 * REMIX: All copy reads from MASTER_REMIX. Zero trade-specific hardcoding.
 */

import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import CTABand from "@/components/drywall/CTABand";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { BlueprintGrain } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

const GuaranteeBlock = lazy(() =>
  import("@/components/master/GuaranteeBlock").then((m) => ({
    default: m.GuaranteeBlock,
  }))
);

interface Props {
  onBookClick?: BookingClickHandler;
}

// ─── The three guarantees — reads SERVICE from MASTER_REMIX ──────────────────
const guarantees = [
  {
    num: "01",
    name: "The Worksite Guarantee",
    icon: "◈",
    promise:
      "If our worksite is not visibly cleaner than we found it when we arrived, the work is free. No exceptions. No negotiation.",
    detail:
      "We cover floors, seal dust paths, protect finished surfaces, and sweep before we leave every single day. Cleanliness is not a courtesy — it is part of the deliverable.",
    label: "Clean site, always.",
  },
  {
    num: "02",
    name: "The 14-Day Touch-Up Guarantee",
    icon: "◈",
    promise:
      "Any finish issue that appears within 14 days of project completion: we return at zero cost. No argument. No invoice.",
    detail:
      "Paint that hasn't cured, a taped seam that moved, a grout joint that settled — these things happen. Our answer is not to debate them. Our answer is to return and fix them.",
    label: "14 days. Zero cost.",
  },
  {
    num: "03",
    name: "The 15-Year Structural Guarantee",
    icon: "◈",
    promise:
      "Any structural work we complete is warranted for 15 years — in writing, on every invoice. If structural work fails within that period, we repair it.",
    detail:
      "This is not a canned warranty card. It is a named commitment on a signed document. We stand behind the work because the work is built to stand.",
    label: "15 years. In writing.",
  },
];

const GuaranteePage = ({ onBookClick }: Props) => {
  const s = MASTER_REMIX.SERVICE;
  const sc = MASTER_REMIX.SERVICE_CATEGORY;
  const bn = MASTER_REMIX.BRAND_NAME;

  return (
    <TemplateLayout onBookClick={onBookClick}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "hsl(218 43% 12%)", paddingTop: "clamp(6rem, 14vw, 11rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
      >
        <BlueprintGrain opacity={0.018} />
        <div className="container relative z-10 mx-auto px-6">
          <p
            className="mb-6 uppercase tracking-[0.28em]"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 11, color: "hsl(var(--copper) / 0.7)" }}
          >
            {sc} · {bn}
          </p>
          <h1
            className="text-bone max-w-[20ch]"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
            }}
          >
            The Generational<br />Finish Guarantee.
          </h1>
          <div className="mt-6 h-px w-16" style={{ background: "hsl(var(--copper) / 0.4)" }} />
          <p
            className="mt-6 max-w-[52ch] text-bone/65 leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 16, fontWeight: 300 }}
          >
            Three guarantees. Every project. In writing on every invoice.
            Not add-ons. Not options. The standard.
          </p>

          {/* Compact guarantee chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {guarantees.map((g) => (
              <span
                key={g.num}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  border: "1px solid hsl(var(--copper) / 0.2)",
                  fontFamily: "'Jost', system-ui",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "hsl(var(--bone) / 0.7)",
                }}
              >
                <span style={{ color: "hsl(var(--copper))" }}>✓</span>
                {g.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three guarantee panels ── */}
      <SectionFrame tone="paper" size="lg">
        <div className="space-y-px bg-seam">
          {guarantees.map((g) => (
            <div key={g.num} className="bg-paper p-10 md:p-14 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
              {/* Number + name */}
              <div className="md:col-span-4">
                <p
                  className="text-mist mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 42, fontWeight: 300, fontStyle: "italic", lineHeight: 1 }}
                >
                  {g.num}
                </p>
                <h2
                  className="text-charcoal"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui",
                    fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {g.name}
                </h2>
              </div>

              {/* Promise + detail */}
              <div className="md:col-span-8">
                <p
                  className="text-charcoal mb-5 leading-relaxed"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.005em",
                    lineHeight: 1.5,
                  }}
                >
                  {g.promise}
                </p>
                <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
                  {g.detail}
                </p>
                <p
                  className="mt-5 uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Jost', system-ui", fontSize: 11, fontWeight: 600, color: "hsl(var(--copper))" }}
                >
                  {g.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* ── In writing — what this means ── */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow-copper mb-4">What "in writing" means</p>
            <h2
              className="text-charcoal mb-5"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.015em",
                lineHeight: 1.1,
              }}
            >
              Every invoice is a legal document.
            </h2>
            <p className="text-graphite text-body leading-relaxed mb-4" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              The Worksite Guarantee, the Touch-Up Guarantee, and the 15-Year Structural Guarantee
              appear by name on every {bn} invoice. They are not verbal assurances.
              They are written commitments in a document you keep.
            </p>
            <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              Before any work begins, you receive a written scope and a written price range.
              Nothing changes without your approval. The guarantee applies to the scope
              as written — not a verbal summary of it.
            </p>
          </div>

          <div>
            <p className="eyebrow-copper mb-4">Why we offer this</p>
            <h2
              className="text-charcoal mb-5"
              style={{
                fontFamily: "'Space Grotesk', system-ui",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.015em",
                lineHeight: 1.1,
              }}
            >
              The guarantee should scare us a little.
            </h2>
            <p className="text-graphite text-body leading-relaxed mb-4" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              A guarantee that is easy to offer is a guarantee that means nothing.
              Ours is strong because the work is built to hold it.
              We offer 15 years because we know the {s} will outlast 15 years.
              We offer zero-cost touch-ups because we know the finish will not need them.
            </p>
            <p className="text-graphite text-body leading-relaxed" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
              If we were not confident, we would not put it in writing.
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* ── Guarantee block component ── */}
      <Suspense fallback={null}>
        <GuaranteeBlock variant="dark" />
      </Suspense>

      {/* ── Compare guarantee ── */}
      <SectionFrame tone="paper" size="lg">
        <div className="max-w-2xl">
          <p className="eyebrow-copper mb-4">What most contractors offer</p>
          <h2
            className="text-charcoal mb-6"
            style={{
              fontFamily: "'Space Grotesk', system-ui",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 300,
              letterSpacing: "-0.015em",
            }}
          >
            "We stand behind our work" — and nothing in writing.
          </h2>
          <div className="space-y-4 text-body" style={{ fontFamily: "'Jost', system-ui", fontWeight: 300 }}>
            <p className="text-graphite leading-relaxed">
              Most {s} contractors offer a verbal assurance and a call-back window that expires
              when they leave the driveway. No written terms, no named guarantee,
              no structural warranty period.
            </p>
            <p className="text-graphite leading-relaxed">
              The difference matters when something goes wrong two years later.
              A verbal promise from a contractor who is now on a different job
              is not a guarantee. A named, dated, written commitment on a signed invoice is.
            </p>
            <p className="text-charcoal leading-relaxed font-medium">
              That is why we put ours in writing. Every time.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onBookClick?.({ source: "Guarantee page" })}
              className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
            <Link
              to="/pricing"
              className="rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-charcoal transition-all duration-300 hover:text-forest"
              style={{ border: "1px solid hsl(var(--copper) / 0.2)" }}
            >
              See pricing
            </Link>
          </div>
        </div>
      </SectionFrame>

      {/* ── Final CTA ── */}
      <CTABand
        eyebrow="Begin"
        headline="Three photos. One business day. A written quote with all three guarantees."
        body="No verbal estimates. No surprises. Everything in writing before we touch a surface."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Guarantee page → CTA" }}
      />

    </TemplateLayout>
  );
};

export default GuaranteePage;
