import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import PricingTable from "@/components/drywall/PricingTable";
import FearDispelSection from "@/components/drywall/FearDispelSection";
import CTABand from "@/components/drywall/CTABand";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import SEOHead from "@/components/drywall/SEOHead";
import JsonLd from "@/components/drywall/JsonLd";
import EditorialImage from "@/components/drywall/EditorialImage";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import { BUSINESS, FEAR_DISPEL } from "@/config";
import heroPainting from "@/assets/drywall/hero-painting.jpg";
import ba2Before from "@/assets/drywall/ba-2-before.jpg";
import ba2After from "@/assets/drywall/ba-2-after.jpg";
import ba4Before from "@/assets/drywall/ba-4-before.jpg";
import ba4After from "@/assets/drywall/ba-4-after.jpg";
import editorialPaintSwatch from "@/assets/drywall/editorial-paint-swatch.jpg";
import bgBlurPaintRoller from "@/assets/drywall/bg-blur-paint-roller.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const Painting = ({ onBookClick }: PageProps) => {
  const service = BUSINESS.services.interiorPainting;
  return (
    <>
      <SEOHead
        title="Interior Painting in Cochrane — Refreshed Rooms After Drywall"
        description="Interior painting that pairs with drywall repair and install — single rooms, ceilings, refreshes, and patch-ready finishes in Cochrane, AB."
        path="/painting"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.label,
          description: service.summary,
          areaServed: "Cochrane, AB",
          provider: { "@type": "LocalBusiness", name: "Cochrane Drywall & Insulation" },
        }}
      />

      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Interior Painting"
          title="The finish that makes the repair disappear."
          lede="Single-room repaints, ceilings after a leak, touch-ups after patching, and trim that needs to look intentional again. Painting that pairs naturally with drywall — or stands alone when the room just needs to feel right."
          backgroundImage={heroPainting}
          backgroundAlt="Smooth eggshell-finish wall corner with a clean roller resting nearby"
        />

        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Painting jobs" headline="Practical refreshes — not full repaints unless you want one." />
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {[
                "Single-room repaints after drywall work",
                "Ceiling repaint after a leak repair",
                "Touch-ups after patching",
                "Trim and door repaints",
                "Move-out and rental turnover refreshes",
                "Basement and garage paint",
              ].map((p) => (
                <li key={p} className="border-l-2 border-forest pl-5 text-body-lg text-graphite">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Patch + paint section with editorial swatch */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Patch + prime + paint" headline="One scope, one finish." />
            <div className="mt-8 grid gap-12 md:grid-cols-12 md:items-start">
              <p className="text-body-lg text-graphite md:col-span-7">
                {FEAR_DISPEL.painting[0].sentences.slice(0, 3).join(" ")}
              </p>
              <div className="md:col-span-5">
                <EditorialImage
                  src={editorialPaintSwatch}
                  alt="Hand-painted bone and forest green paint swatches dry-tested on a raw drywall panel"
                  caption="Bone & forest, dry-tested on raw board before the room commits."
                  aspect="aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Atmospheric divider — paint roller */}
        <ParallaxBackdrop image={bgBlurPaintRoller} alt="" height="50vh" />

        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Recent paint work" headline="Walls that feel intentional again." />
            <div className="mt-12">
              <BeforeAfterPair
                pairs={[
                  { before: ba2Before, after: ba2After, caption: "Walls repainted after install — the room reads as one finished surface." },
                  { before: ba4Before, after: ba4After, caption: "A water-stained ceiling, primed and repainted — the eye stops finding it." },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="section-y bg-paper relative overflow-hidden">
          <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.08} />
          <div className="container relative z-10 mx-auto px-6">
            <SectionTitle eyebrow="Starter pricing" headline="Repaint ranges by room size." />
            <div className="mt-10 max-w-3xl">
              <PricingTable title="Interior paint planning ranges" tiers={service.planningRanges} note="Includes prep, two coats, and basic trim. Custom colour matching, specialty finishes, and high-end products quoted separately after a site walk." />
            </div>
          </div>
        </section>

        <FearDispelSection groups={FEAR_DISPEL.painting} />

        <CTABand
          headline="Make the room feel right again."
          body="Send a couple of photos of the room. We'll quote the patch and the paint as one clear scope — no surprise add-ons, no second invoice for the touch-ups."
          onPrimaryClick={onBookClick}
          prefill={{
            source: "Painting page",
            description: "I'd like a quote for interior painting — ",
          }}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default Painting;
