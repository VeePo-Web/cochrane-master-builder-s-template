import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import PricingTable from "@/components/drywall/PricingTable";
import FAQAccordion from "@/components/drywall/FAQAccordion";
import FearDispelSection from "@/components/drywall/FearDispelSection";
import CTABand from "@/components/drywall/CTABand";
import SEOHead from "@/components/drywall/SEOHead";
import JsonLd from "@/components/drywall/JsonLd";
import EditorialImage from "@/components/drywall/EditorialImage";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import { BUSINESS, FEAR_DISPEL } from "@/config";
import heroPricing from "@/assets/drywall/hero-pricing.jpg";
import editorialMudBucket from "@/assets/drywall/editorial-mud-bucket.jpg";
import editorialSandingDust from "@/assets/drywall/editorial-sanding-dust.jpg";
import editorialPaintSwatch from "@/assets/drywall/editorial-paint-swatch.jpg";
import editorialFinishedTrim from "@/assets/drywall/editorial-finished-trim.jpg";
import bgBlurSeamDetail from "@/assets/drywall/bg-blur-seam-detail.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const faqs = [
  {
    question: "How does a photo quote actually work?",
    answer: "You send 2–4 pictures of the damage or space, plus one or two sentences describing what's bothering you. Within one business day, you get back a realistic range, what's likely included, and what the next step looks like — no sales call required.",
  },
  {
    question: "What's actually included in a quote?",
    answer: "Materials, labour, dust containment, daily cleanup, and a written list of exactly what is and isn't part of the scope. If something changes mid-job, we pause and confirm in writing before continuing — no surprise add-ons on the final invoice.",
  },
  {
    question: "Do you charge for estimates?",
    answer: "No. Photo quotes are always free. On-site walkthroughs are free for projects within our service area — we'll only flag a fee up front if a job sits well outside it.",
  },
  {
    question: "What if the scope changes mid-job?",
    answer: "We stop, walk you through what we're seeing, and confirm the change in writing before any extra work happens. You decide whether to proceed, defer, or scope it out — never the other way around.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Send photos",
    description: "2–4 pictures and one or two sentences about the space. That's it to start.",
    image: editorialMudBucket,
    alt: "A mud pan and taping knife waiting on a quiet job site",
    caption: "What the visit will use, day one.",
  },
  {
    title: "Get a clear range",
    description: "We reply within one business day — realistic ballpark, not a sales pitch.",
    image: editorialSandingDust,
    alt: "Drywall dust suspended in a beam of low afternoon light",
    caption: "Honest scope. No vague maybes.",
  },
  {
    title: "Confirm scope",
    description: "Written scope, written range, and a list of what's included before any work begins.",
    image: editorialPaintSwatch,
    alt: "Hand-painted paint swatches dry-tested on raw drywall",
    caption: "Decisions made before the room commits.",
  },
  {
    title: "Tidy execution",
    description: "Contained worksite, predictable arrival window, walkthrough at the end of every visit.",
    image: editorialFinishedTrim,
    alt: "Baseboard meeting freshly painted wall in one clean line",
    caption: "Where the work ends — and the room begins.",
  },
];

const PricingProcess = ({ onBookClick }: PageProps) => {
  return (
    <>
      <SEOHead
        title="Pricing & Process — Cochrane Drywall & Insulation"
        description="Realistic starter ranges, free photo quotes, and a written scope before any work starts. The full pricing and process for drywall, paint, and insulation in Cochrane, AB."
        path="/pricing-process"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Pricing & Process"
          title="Clear scope, clear pricing, no project spiral."
          lede="Before any work starts, you should know what kind of job this is, what's included, and what the next step looks like. No mystery line items. No vague maybes. No 'we'll figure it out as we go.'"
          backgroundImage={heroPricing}
          backgroundAlt="Clean spec sheet on a wood workbench beside a tape measure and pencil"
        />

        {/* Starter pricing */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Starter ranges" headline="Realistic ballpark, not a vague guess." />
            <div className="mt-12 grid gap-8 md:grid-cols-2 max-md:gap-6">
              {Object.values(BUSINESS.services).map((s) => (
                <PricingTable key={s.slug} title={s.shortLabel} tiers={s.planningRanges} />
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-caption text-mist">
              These are planning starters — the conversation, not the contract. Final price depends on access, finish level, paint matching, and the condition of the existing surfaces. Every job is confirmed in writing before any tools come out.
            </p>
          </div>
        </section>

        {/* What affects price */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="What affects price" headline="The honest list." />
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {[
                "Number of patches and areas to repair",
                "Paint matching versus a full repaint",
                "Access (basement stairs, tight rooms, ceilings)",
                "Whether insulation is in scope",
                "Existing surface condition (water damage, mold, etc.)",
                "Level of finish (utility versus living-space-grade)",
              ].map((p) => (
                <li key={p} className="border-l-2 border-forest pl-5 text-body-lg text-graphite">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Atmospheric divider between pricing and process */}
        <ParallaxBackdrop image={bgBlurSeamDetail} alt="" height="48vh" />

        {/* Process — each step gets its own editorial plate */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Process" headline="Four steps from photo to finished." />
            <div className="mt-14 space-y-20 max-md:space-y-14">
              {PROCESS_STEPS.map((step, i) => {
                const reversed = i % 2 === 1;
                return (
                  <div
                    key={step.title}
                    className="grid gap-10 md:grid-cols-12 md:items-center max-md:gap-6"
                  >
                    <div className={`md:col-span-7 ${reversed ? "md:order-2" : ""}`}>
                      <p className="font-eyebrow text-forest tabular-nums">
                        Step {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 font-display text-display-md text-charcoal">{step.title}</h3>
                      <p className="mt-4 text-body-lg text-graphite">{step.description}</p>
                    </div>
                    <div className={`md:col-span-5 ${reversed ? "md:order-1" : ""}`}>
                      <EditorialImage
                        src={step.image}
                        alt={step.alt}
                        caption={step.caption}
                        aspect="aspect-[4/3]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What to expect on-site */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="On-site" headline="What the visit actually feels like." />
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {[
                "Floors, furniture, and adjacent surfaces covered before any cutting or sanding starts",
                "Dust containment built around the work area, not the whole house",
                "Power tools used in short, predictable windows — not running all day",
                "Daily cleanup before we leave the site — your home stays a home, not a job site",
                "Walkthrough at the end of every visit so you sign off on what's done",
                "Touch-ups within 14 days if anything settles, cracks, or doesn't sit right",
              ].map((p) => (
                <li key={p} className="border-l-2 border-forest pl-5 text-body-lg text-graphite">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FearDispelSection groups={FEAR_DISPEL.pricingProcess} />

        {/* FAQ — with ambient backdrop for visual close */}
        <section className="section-y bg-paper relative overflow-hidden">
          <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.08} />
          <div className="container relative z-10 mx-auto px-6">
            <SectionTitle eyebrow="FAQ" headline="Questions about pricing & process." />
            <div className="mt-10 max-w-3xl">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>

        <CTABand
          headline="Start with a clear quote."
          body="No vague contractor language. No mystery line items. Just a realistic range and a clear next step within one business day."
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default PricingProcess;
