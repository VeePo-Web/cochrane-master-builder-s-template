import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import FearDispelSection from "@/components/drywall/FearDispelSection";
import CTABand from "@/components/drywall/CTABand";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import SEOHead from "@/components/drywall/SEOHead";
import JsonLd from "@/components/drywall/JsonLd";
import ImageMosaic from "@/components/drywall/ImageMosaic";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import EditorialImage from "@/components/drywall/EditorialImage";
import { ArrowRight, Check } from "lucide-react";
import { BUSINESS, FEAR_DISPEL } from "@/config";
import type { BookingClickHandler } from "@/config/drywall-booking";
import heroBasement from "@/assets/drywall/hero-basement.jpg";
import editorialVaporBarrier from "@/assets/drywall/editorial-vapor-barrier.jpg";
import editorialFinishedTrim from "@/assets/drywall/editorial-finished-trim.jpg";
import editorialInsulationDetail from "@/assets/drywall/editorial-insulation-detail.jpg";
import editorialSandingDust from "@/assets/drywall/editorial-sanding-dust.jpg";
import bgBlurBasementProgression from "@/assets/drywall/bg-blur-basement-progression.jpg";

interface PageProps {
  onBookClick?: BookingClickHandler;
}

const BASEMENT_TIERS = [
  {
    name: "Walls only",
    what: ["Batt insulation", "Vapour barrier", "Drywall + tape + mud", "Paint-ready"],
    best: "Quickest visible upgrade. Warmer rooms, finished walls, no ceiling commitment.",
    feature: false,
    prefill: {
      source: "Basement Packages → Walls only",
      description:
        "Basement — Walls-only package. I want warmer, finished perimeter walls without committing to the ceiling yet. ",
    },
  },
  {
    name: "Ceiling / soundproofing",
    what: ["Insulation between joists", "Drywall ceiling install", "Tape + mud + sand", "Paint-ready"],
    best: "Best when footsteps and TV noise from upstairs are the daily irritation.",
    feature: true,
    prefill: {
      source: "Basement Packages → Ceiling / soundproofing",
      description:
        "Basement — Ceiling / soundproofing package. The noise from upstairs is the main thing I'd like solved. ",
    },
  },
  {
    name: "Insulation only",
    what: ["Batt + vapour barrier", "Perimeter wall coverage", "Site cleanup"],
    best: "First step before drywall — often paired with a garage package on the same visit.",
    feature: false,
    prefill: {
      source: "Basement Packages → Insulation only",
      description:
        "Basement — Insulation-only package. Looking for batt + vapour barrier as a first step before any drywall. ",
    },
  },
] as const;

const BasementPackages = ({ onBookClick }: PageProps) => {
  const pkg = BUSINESS.packages.basement;
  return (
    <>
      <SEOHead
        title="Basement Starter Packages — Cochrane Drywall & Insulation"
        description="Stage-one basement packages: walls only, ceiling only, or starter scope. Move the basement forward without committing to a full renovation."
        path="/basement-packages"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: pkg.label,
          description: pkg.summary,
          areaServed: "Cochrane, AB",
          provider: { "@type": "LocalBusiness", name: "Cochrane Drywall & Insulation" },
        }}
      />

      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Basement Packages"
          title="Not ready for a full basement renovation?"
          lede="Walls only. Ceiling only. Insulation only. Three starter scopes that move the basement one stage forward — without committing to the full build, the full timeline, or the full bill."
          backgroundImage={heroBasement}
          backgroundAlt="A residential basement mid-transformation, framing on one side and finished wall on the other"
        />

        {/* Stage one intro */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Stage one" headline="Start with the part that bothers you most." />
            <p className="mt-6 max-w-3xl text-body-lg text-graphite">
              {FEAR_DISPEL.basementPackages[0].sentences.slice(0, 3).join(" ")}
            </p>
          </div>
        </section>

        {/* Mosaic — what the scope looks like */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="What scope looks like" headline="Inside a finished basement." />
            <div className="mt-12">
              <ImageMosaic
                layout="4-up"
                items={[
                  {
                    src: heroBasement,
                    alt: "A residential basement mid-transformation",
                    caption: "Framing one side, finished wall the other.",
                  },
                  {
                    src: editorialVaporBarrier,
                    alt: "Translucent vapor barrier catching light against insulation",
                    caption: "Vapour barrier, set true.",
                  },
                  {
                    src: editorialInsulationDetail,
                    alt: "Insulation batts cleanly cut into a stud cavity",
                    caption: "Batts cut tight, no gaps left for cold to find.",
                  },
                  {
                    src: editorialFinishedTrim,
                    alt: "Baseboard meeting freshly painted bone wall in a clean line",
                    caption: "The line where wall meets floor — finished.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Atmospheric divider with headline */}
        <ParallaxBackdrop
          image={bgBlurBasementProgression}
          alt=""
          height="48vh"
          eyebrow="Stage one"
          headline="Start with one stage."
        />

        {/* Package options */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Package options" headline="Three starter scopes." />
            <div className="mt-12 grid gap-px bg-seam md:grid-cols-3 max-md:gap-0 max-md:divide-y max-md:divide-seam max-md:bg-paper md:max-lg:grid-cols-1">
              {BASEMENT_TIERS.map((opt) => (
                <div key={opt.name} className="flex flex-col bg-paper p-8">
                  <h3 className="font-display text-display-sm text-charcoal">{opt.name}</h3>
                  <ul className="mt-5 space-y-2 text-graphite">
                    {opt.what.map((w) => (
                      <li key={w} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-forest" />
                        {w}
                      </li>
                    ))}
                  </ul>
                  {opt.feature && (
                    <div className="mt-6">
                      <EditorialImage
                        src={editorialSandingDust}
                        alt="Drywall dust suspended in a beam of light after final sanding"
                        caption="Ceiling sanded smooth — the noise upstairs softens with it."
                        aspect="aspect-[4/3]"
                      />
                    </div>
                  )}
                  <p className="mt-6 text-caption text-mist">{opt.best}</p>
                  <button
                    type="button"
                    onClick={() => onBookClick?.(opt.prefill)}
                    className="story-link mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-forest"
                  >
                    Start with this package
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Process" headline="Staged progress. No project spiral." />
            <div className="mt-12">
              <ProcessSteps
                steps={[
                  { title: "Photos + walkthrough", description: "We confirm what's there and what isn't." },
                  { title: "Pick a starter scope", description: "Walls, ceiling, or insulation — one defined first step." },
                  { title: "Insulate + board", description: "Contained dust, predictable visit window." },
                  { title: "Tape, mud, finish", description: "Paint-ready handoff. Decide later if you want more done." },
                ]}
              />
            </div>
          </div>
        </section>

        <FearDispelSection groups={FEAR_DISPEL.basementPackages} />

        <CTABand
          headline="Start with one part of the basement."
          body="Tell us what bothers you most — cold floors, loud ceilings, exposed framing, or just half-done. We'll suggest the right starter package and a clear range within one business day."
          onPrimaryClick={onBookClick}
          prefill={{
            source: "Basement Packages page",
            description: "I'm interested in a basement package — ",
          }}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default BasementPackages;
