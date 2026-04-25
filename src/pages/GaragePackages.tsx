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
import heroGarage from "@/assets/drywall/hero-garage.jpg";
import editorialFinishedTrim from "@/assets/drywall/editorial-finished-trim.jpg";
import editorialCornerBead from "@/assets/drywall/editorial-corner-bead.jpg";
import editorialMudBucket from "@/assets/drywall/editorial-mud-bucket.jpg";
import bgBlurGarageFloor from "@/assets/drywall/bg-blur-garage-floor.jpg";

interface PageProps {
  onBookClick?: BookingClickHandler;
}

const GARAGE_TIERS = [
  {
    name: "Insulation only",
    what: ["Batt insulation in walls", "Vapour barrier", "Tidy site cleanup"],
    best: "Best when the drywall is already up and the garage just runs cold.",
    feature: false,
    prefill: {
      source: "Garage Packages → Insulation only",
      description:
        "Garage — Insulation-only package. The drywall is already up; the garage just runs cold. ",
    },
  },
  {
    name: "Board + finish",
    what: ["Drywall installation", "Tape, mud, sand", "Paint-ready handoff"],
    best: "Best when insulation is done and you want clean, finished walls fast.",
    feature: false,
    prefill: {
      source: "Garage Packages → Board + finish",
      description:
        "Garage — Board + finish package. Insulation is done; I want clean, finished, paint-ready walls. ",
    },
  },
  {
    name: "Full starter",
    what: ["Insulation", "Drywall installation", "Tape + mud + sand", "Single-tone paint"],
    best: "Most popular. Rough framing to finished, single-tone garage in one visit window.",
    feature: true,
    prefill: {
      source: "Garage Packages → Full starter",
      description:
        "Garage — Full starter package (insulation + drywall + tape/mud + single-tone paint). Going from rough framing to finished. ",
    },
  },
] as const;

const GaragePackages = ({ onBookClick }: PageProps) => {
  const pkg = BUSINESS.packages.garage;
  return (
    <>
      <SEOHead
        title="Garage Drywall & Insulation Packages — Cochrane, AB"
        description="Practical garage packages: insulation, drywall installation, taping, and painting. Stage-one upgrades in Cochrane without a full renovation."
        path="/garage-packages"
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
          eyebrow="Garage Packages"
          title="A practical garage upgrade — not a full renovation."
          lede="Insulation, drywall, and paint bundled for residential garages. Pick the stage that matters most — or take the full starter scope and go from rough framing to a single-tone finished space in one visit window."
          backgroundImage={heroGarage}
          backgroundAlt="Clean residential double garage interior, freshly drywalled and bright"
        />

        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Why bother" headline="Unfinished garages stay unfinished." />
            <p className="mt-6 max-w-3xl text-body-lg text-graphite">
              {FEAR_DISPEL.garagePackages[3].sentences.slice(0, 3).join(" ")}
            </p>
          </div>
        </section>

        {/* Mosaic — garage scope in context */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="What 'finished' looks like" headline="A single-tone, finished working space." />
            <div className="mt-12">
              <ImageMosaic
                layout="4-up"
                items={[
                  {
                    src: heroGarage,
                    alt: "Clean residential double garage interior, freshly drywalled and bright",
                    caption: "Bright, single-tone, ready for whatever you actually use the room for.",
                  },
                  {
                    src: editorialFinishedTrim,
                    alt: "Baseboard meeting freshly painted bone wall in a clean line",
                    caption: "Trim line sharp where wall meets floor.",
                  },
                  {
                    src: editorialCornerBead,
                    alt: "A clean 90-degree corner bead set true",
                    caption: "A 90° bead set true — every shadow falls clean.",
                  },
                  {
                    src: editorialMudBucket,
                    alt: "Mud pan and taping knife resting between coats",
                    caption: "Between coats, the rhythm of a tidy worksite.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Atmospheric divider with headline */}
        <ParallaxBackdrop
          image={bgBlurGarageFloor}
          alt=""
          height="48vh"
          eyebrow="One window"
          headline="One visit. One finished room."
        />

        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Package options" headline="Pick a stage. Add to it later." />
            <div className="mt-12 grid gap-px bg-seam md:grid-cols-3 max-md:gap-0 max-md:divide-y max-md:divide-seam max-md:bg-paper md:max-lg:grid-cols-1">
              {GARAGE_TIERS.map((opt) => (
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
                        src={editorialCornerBead}
                        alt="Crisp 90 degree corner bead set true"
                        caption="A 90° bead set true — every shadow falls clean."
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
            <SectionTitle eyebrow="Process" headline="One visit window. No project spiral." />
            <div className="mt-12">
              <ProcessSteps
                steps={[
                  { title: "Site walk", description: "We measure and confirm scope on-site or from photos." },
                  { title: "Insulate", description: "Batt + vapour barrier installed before boarding." },
                  { title: "Board + finish", description: "Drywall hung, taped, mudded, sanded smooth." },
                  { title: "Paint + handoff", description: "Single-tone garage paint and a clean walkthrough." },
                ]}
              />
            </div>
          </div>
        </section>

        <FearDispelSection groups={FEAR_DISPEL.garagePackages} />

        <CTABand
          headline="Garage handled. One package."
          body="Send a couple of photos of the garage and a sentence about what's bothering you most. We'll come back with a clear package recommendation and a starter range within one business day."
          onPrimaryClick={onBookClick}
          prefill={{
            source: "Garage Packages page",
            description: "I'm interested in a garage package — ",
          }}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default GaragePackages;
