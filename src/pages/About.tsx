import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import CTABand from "@/components/drywall/CTABand";
import SEOHead from "@/components/drywall/SEOHead";
import EditorialImage from "@/components/drywall/EditorialImage";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import { BUSINESS, FEAR_DISPEL } from "@/config";
import heroAbout from "@/assets/drywall/hero-about.jpg";
import editorialFinishedTrim from "@/assets/drywall/editorial-finished-trim.jpg";
import editorialMudBucket from "@/assets/drywall/editorial-mud-bucket.jpg";
import bgBlurToolsTidy from "@/assets/drywall/bg-blur-tools-tidy.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const About = ({ onBookClick }: PageProps) => {
  return (
    <>
      <SEOHead
        title="About — Cochrane Drywall & Insulation"
        description="A focused residential interior finishing company built for Cochrane homeowners. Drywall, paint, and insulation — clear scope, calm execution."
        path="/about"
      />
      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="About"
          title="A focused residential finishing business for Cochrane."
          lede="Built around the in-between jobs that don't fit a handyman or a full renovator — the drywall, paint, and insulation work most contractors quietly walk away from."
          backgroundImage={heroAbout}
          backgroundAlt="Editorial flatlay of taping knife, mud pan, sanding sponge and level on canvas"
        />

        {/* Narrative + first editorial plate */}
        <section className="section-y">
          <div className="container mx-auto px-6 grid gap-12 md:grid-cols-12 md:items-start max-md:gap-10">
            <div className="md:col-span-7 max-w-3xl">
              <p className="drop-cap text-body-lg text-graphite">{BUSINESS.narrative.paragraph1}</p>
              <p className="mt-6 text-body-lg text-graphite">{BUSINESS.narrative.paragraph2}</p>
              <p className="mt-6 text-body-lg text-graphite">{BUSINESS.narrative.paragraph3}</p>
            </div>
            <div className="md:col-span-5">
              <EditorialImage
                src={editorialFinishedTrim}
                alt="Baseboard meeting a freshly painted bone wall in a clean, sharp line"
                caption="The line where wall meets floor — finished so the room reads as one surface."
                aspect="aspect-[4/5]"
              />
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Why focused" headline="What makes this business different." />
            <ul className="mt-12 grid gap-8 md:grid-cols-2 max-md:gap-6">
              {BUSINESS.differentiators.map((d) => (
                <li key={d.label} className="border-l-2 border-forest pl-5">
                  <h3 className="font-display text-display-sm text-charcoal">{d.label}</h3>
                  <p className="mt-2 text-graphite">{d.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mission/Vision + second editorial plate */}
        <section className="section-y">
          <div className="container mx-auto px-6 grid gap-12 md:grid-cols-12 md:items-start max-md:gap-10">
            <div className="md:col-span-5 md:order-2">
              <EditorialImage
                src={editorialMudBucket}
                alt="Mud pan and taping knife resting between coats on a quiet job site"
                caption="Mud pan resting between coats — the unhurried rhythm the work asks for."
                aspect="aspect-[3/4]"
              />
            </div>
            <div className="md:col-span-7 md:order-1 grid gap-12 sm:grid-cols-2">
              <div>
                <p className="font-eyebrow mb-3">Mission</p>
                <p className="font-display text-display-md text-charcoal">{BUSINESS.mission}</p>
              </div>
              <div className="max-sm:border-t max-sm:border-seam max-sm:pt-10">
                <p className="font-eyebrow mb-3">Vision</p>
                <p className="font-display text-display-md text-charcoal">{BUSINESS.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why us — with ambient backdrop */}
        <section className="section-y bg-paper relative overflow-hidden">
          <AmbientBackdrop image={bgBlurToolsTidy} opacity={0.08} />
          <div className="container relative z-10 mx-auto px-6">
            <SectionTitle eyebrow="Why us" headline="Focused beats broad." />
            <ul className="mt-10 max-w-3xl space-y-3">
              {FEAR_DISPEL.whyChooseUs.map((line, i) => (
                <li key={i} className="text-body-lg text-graphite">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Atmospheric divider before CTA */}
        <ParallaxBackdrop image={bgBlurBoneCorner} alt="" height="45vh" />

        <CTABand
          headline="Got a wall on your list?"
          body="Send a couple of photos. We'll reply with a realistic range and a clear next step within one business day — no sales call, no pressure."
          onPrimaryClick={onBookClick}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default About;
