import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import PricingTable from "@/components/drywall/PricingTable";
import FearDispelSection from "@/components/drywall/FearDispelSection";
import CTABand from "@/components/drywall/CTABand";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import SEOHead from "@/components/drywall/SEOHead";
import JsonLd from "@/components/drywall/JsonLd";
import EditorialImage from "@/components/drywall/EditorialImage";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import ImageMosaic from "@/components/drywall/ImageMosaic";
import { BUSINESS, FEAR_DISPEL } from "@/config";
import heroInstallation from "@/assets/drywall/hero-installation.jpg";
import editorialCornerBead from "@/assets/drywall/editorial-corner-bead.jpg";
import editorialFinishedTrim from "@/assets/drywall/editorial-finished-trim.jpg";
import bgBlurSeamDetail from "@/assets/drywall/bg-blur-seam-detail.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const DrywallInstallation = ({ onBookClick }: PageProps) => {
  const service = BUSINESS.services.drywallInstallation;
  return (
    <>
      <SEOHead
        title="Drywall Installation in Cochrane — Basements, Garages, Ceilings"
        description="Drywall sheet installation for basements, garages, ceilings, and partial rooms in Cochrane, AB. Practical scope. No full-renovation overcommitment."
        path="/drywall-installation"
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
          eyebrow="Drywall Installation"
          title="From exposed framing to clean, complete walls."
          lede="Practical install jobs for basements, garages, ceilings, and partial rooms. We board the area, tape and mud the joints, sand it smooth, and hand it off paint-ready — without dragging the rest of the house into the project."
          backgroundImage={heroInstallation}
          backgroundAlt="Newly hung drywall sheet with taped joints catching raking light"
        />

        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="What we install" headline="The install jobs we actually take on." />
            <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-start">
              <ul className="grid gap-3 md:col-span-7">
                {[
                  "Basement perimeter walls",
                  "Garage walls and ceilings",
                  "Utility room boarding",
                  "Ceiling repairs after leaks",
                  "Repair sections too large to patch",
                  "Small partition walls and partial rooms",
                ].map((p) => (
                  <li key={p} className="border-l-2 border-forest pl-5 text-body-lg text-graphite">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="md:col-span-5">
                <EditorialImage
                  src={editorialCornerBead}
                  alt="A crisp 90° corner bead set true on a freshly hung wall"
                  caption="A 90° bead set true — every shadow falls clean."
                  aspect="aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Atmospheric divider */}
        <ParallaxBackdrop
          image={bgBlurSeamDetail}
          alt=""
          height="55vh"
          eyebrow="Behind the work"
          headline="Seams that disappear under paint."
        />

        <section className="section-y bg-paper">
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionTitle
              eyebrow="Why focused"
              headline="Too specialized for a handyman. Too small for a full renovator."
              lede={service.positioning}
            />
          </div>
        </section>

        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Process" headline="Clean install, contained worksite." />
            <div className="mt-12">
              <ProcessSteps
                steps={[
                  { title: "Site walk + measure", description: "We confirm scope, framing, and any insulation work needed first." },
                  { title: "Insulation if applicable", description: "Batt or vapour barrier installed before boarding when the package calls for it." },
                  { title: "Board, tape, mud", description: "Sheets hung, joints taped, three-coat mud, sanded smooth — dust contained to the work area." },
                  { title: "Paint-ready handoff", description: "Ready for primer and paint, or we finish that too." },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Starter pricing" headline="Realistic install ranges." />
            <div className="mt-10 max-w-3xl">
              <PricingTable title={service.label} tiers={service.planningRanges} note="Larger scopes are quoted by square foot or as a package after a site walk. Written scope before any work starts." />
            </div>
          </div>
        </section>

        {/* Editorial mosaic — install in context */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="What it looks like" headline="Install in context." />
            <div className="mt-12">
              <ImageMosaic
                layout="3-up"
                items={[
                  { src: heroInstallation, alt: "Newly hung drywall sheet with taped joints", caption: "Sheets up, joints taped, ready for the first mud coat." },
                  { src: editorialCornerBead, alt: "A clean 90° corner bead", caption: "Corner bead set true." },
                  { src: editorialFinishedTrim, alt: "Baseboard meeting freshly painted wall in clean line", caption: "Trim line sharp where wall meets floor." },
                ]}
              />
            </div>
          </div>
        </section>

        <FearDispelSection groups={FEAR_DISPEL.drywallInstallation} />

        <CTABand
          headline="Move that unfinished space forward."
          body="Send a couple of photos of the area and a sentence about what you want done. We'll reply within one business day with a realistic range and a recommended scope."
          onPrimaryClick={onBookClick}
          prefill={{
            source: "Drywall Installation page",
            description: "I'd like a quote for new drywall installation — ",
          }}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default DrywallInstallation;
