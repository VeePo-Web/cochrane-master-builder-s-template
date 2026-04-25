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
import heroRepair from "@/assets/drywall/hero-repair.jpg";
import ba1Before from "@/assets/drywall/ba-1-before.jpg";
import ba1After from "@/assets/drywall/ba-1-after.jpg";
import ba3Before from "@/assets/drywall/ba-3-before.jpg";
import ba3After from "@/assets/drywall/ba-3-after.jpg";
import editorialMudBucket from "@/assets/drywall/editorial-mud-bucket.jpg";
import editorialSandingDust from "@/assets/drywall/editorial-sanding-dust.jpg";
import bgBlurSeamDetail from "@/assets/drywall/bg-blur-seam-detail.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const DrywallRepair = ({ onBookClick }: PageProps) => {
  const service = BUSINESS.services.drywallPatching;
  return (
    <>
      <SEOHead
        title="Drywall Repair in Cochrane, AB — Patches, Cracks, Cutouts"
        description="Professional drywall patching for holes, cracks, dents, and cutouts. Small jobs welcome. Clean, paint-ready repairs across Cochrane, Alberta."
        path="/drywall-repair"
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
          eyebrow="Drywall Repair"
          title="Clean repairs that stop catching your eye."
          lede="Door knob holes. Stress cracks. Trade cutouts that were never closed up. We patch the damage you've been walking past for months — cleanly, paint-ready, often in a single visit."
          backgroundImage={heroRepair}
          backgroundAlt="Macro detail of a feathered drywall patch primed and nearly invisible"
        />

        {/* Common problems */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Common problems" headline="The damage we see every week." />
            <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-start">
              <ul className="grid gap-3 md:col-span-7 md:grid-cols-1">
                {[
                  "Door knob holes from doors that swing too far",
                  "Hairline and stress cracks along ceilings and corners",
                  "Dents and gouges from furniture or moving day",
                  "Drywall cut open after plumbing or electrical work",
                  "Water-damaged sections that need to come out and go back in",
                  "Trade cutouts left open by someone else's job",
                ].map((p) => (
                  <li key={p} className="border-l-2 border-forest pl-5 text-body-lg text-graphite">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="md:col-span-5">
                <EditorialImage
                  src={editorialMudBucket}
                  alt="Mud pan and taping knife resting between coats on a quiet job site"
                  caption="Between coats, a mud pan resting on the drop cloth — the rhythm of a clean repair."
                  aspect="aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Atmospheric divider — seam macro */}
        <ParallaxBackdrop
          image={bgBlurSeamDetail}
          alt="Macro of a taped drywall seam, defocused"
          height="45vh"
        />

        {/* Small jobs welcome */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Small jobs welcome" headline="One patch is worth doing properly." />
            <div className="mt-8 grid gap-12 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5 md:order-2">
                <EditorialImage
                  src={editorialSandingDust}
                  alt="Suspended drywall dust catching low directional light after a sanding pass"
                  caption="Dust hanging in raking light, just after the final sanding pass."
                  aspect="aspect-[4/5]"
                />
              </div>
              <div className="space-y-3 md:col-span-7 md:order-1">
                {FEAR_DISPEL.smallJobsWelcome.slice(0, 4).map((s, i) => (
                  <p key={i} className="text-body-lg text-graphite">
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Recent repairs" headline="A repair should feel handled, not highlighted." />
            <div className="mt-12">
              <BeforeAfterPair
                pairs={[
                  { before: ba1Before, after: ba1After, caption: "Knob hole and stress crack — patched, primed, painted in under two hours." },
                  { before: ba3Before, after: ba3After, caption: "Water-damaged ceiling section replaced and repainted — the wall reads as one surface again." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Starter pricing" headline="Realistic ranges before you commit." />
            <div className="mt-10 max-w-3xl">
              <PricingTable
                title="Drywall repair planning ranges"
                tiers={service.planningRanges}
                note="Final price depends on access, paint match, and how many areas need patching. We confirm the full scope in writing before any work starts — no surprise add-ons."
              />
            </div>
          </div>
        </section>

        {/* Patch + paint upsell */}
        <section className="section-y">
          <div className="container mx-auto px-6 max-w-3xl">
            <SectionTitle eyebrow="Patch + paint" headline="Want the wall to actually disappear?" />
            <p className="mt-5 text-body-lg text-graphite">
              {FEAR_DISPEL.painting[0].sentences.slice(0, 2).join(" ")}
            </p>
            <a href="/painting" className="story-link mt-5 inline-flex text-sm font-medium text-forest">
              See how patch + paint works →
            </a>
          </div>
        </section>

        {/* FAQ section wrapped with ambient backdrop */}
        <div className="relative overflow-hidden">
          <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.07} />
          <div className="relative z-10">
            <FearDispelSection groups={FEAR_DISPEL.drywallRepair} />
          </div>
        </div>

        <CTABand
          headline="Show us the damage."
          body="Two or three photos and a sentence is enough. We reply within one business day with a realistic range and a clear next step — no sales call, no pressure."
          onPrimaryClick={onBookClick}
          prefill={{
            source: "Drywall Repair page",
            description: "I'd like a quote for drywall repair — ",
          }}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default DrywallRepair;
