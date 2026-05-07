import { Link } from "react-router-dom";
import Navigation from "@/components/detailing/Navigation";
import Footer from "@/components/detailing/Footer";
import ScrollReveal from "@/components/detailing/ScrollReveal";
import SectionDivider from "@/components/detailing/SectionDivider";
import InnerHero from "@/components/detailing/InnerHero";
import RevealImage from "@/components/detailing/RevealImage";
import servicesHero from "@/assets/services-equipment-flatlay.jpg";
import vendorDetail from "@/assets/vendor-detail.jpg";
import dividerMicrofiber from "@/assets/divider-millwork.jpg";
import dividerInterior from "@/assets/divider-interior.jpg";

interface ServicesProps {
  onBookClick?: () => void;
}

const Services = ({ onBookClick }: ServicesProps) => (
  <>
    <Navigation onBookClick={onBookClick} />
    <main id="main-content">
      <InnerHero
        image={servicesHero}
        imageAlt="Master-builder tools and finishing materials arranged on a dark workbench"
        overline="Services"
        headline="Every detail, master-built."
        subhead="From bare lot to finished room — choose the level of build your home calls for. We work across Cochrane, Calgary, and Rocky View County."
      />

      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <ScrollReveal className="mb-20 lg:mb-28">
            <p className="font-overline text-copper mb-6">Our Services</p>
            <h2 className="font-display text-display-lg text-white mb-5">Choose Your Build</h2>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              Serving Cochrane, Calgary, and Rocky View County.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="editorial-rule mb-10" />
            <div className="border-l-2 border-copper pl-6 md:pl-10 bg-gradient-to-r from-copper/[0.03] to-transparent rounded-r-lg py-1">
              <p className="font-overline text-copper mb-4">Flagship Service</p>
              <h3 className="font-display text-display-sm text-white mb-2">The Custom Build</h3>
              <p className="font-display text-display-lg text-copper mb-1">Fixed-scope quotes</p>
              <p className="text-caption text-white/40 mb-1">Custom homes · Major renovations · Additions · Master interior finishing</p>
              <p className="font-overline text-copper/50 mb-5">Most Requested</p>
              <p className="text-caption text-white/35 mb-6">Architectural design through final walk-through</p>
              <p className="text-body text-white/50 max-w-lg mb-8">
                Foundation, framing, drywall, millwork, cabinetry, paint, and trim — every joint
                and finish run by a master builder, on-site, with one accountable point of contact.
              </p>
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Request a Consultation
              </button>
            </div>
            <div className="editorial-rule mt-10" />
          </ScrollReveal>

          <ScrollReveal className="mt-16 lg:mt-20 mb-16 lg:mb-20">
            <RevealImage
              src={vendorDetail}
              alt="Close-up of master-craft millwork — joinery, trim, and finish detail"
              aspectRatio="aspect-[21/9]"
            />
          </ScrollReveal>

          <ScrollReveal className="mt-20 lg:mt-28">
            <div className="pl-6 md:pl-10 border-l-2 border-transparent hover:border-copper/20 transition-colors duration-500">
              <p className="font-overline text-copper mb-4">Renovations</p>
              <h3 className="font-display text-display-sm text-white mb-2">Full-Home &amp; Single-Room Renovations</h3>
              <p className="font-display text-display-md text-copper mb-1">Fixed-scope quotes</p>
              <p className="text-caption text-white/40 mb-1">Kitchens · Bathrooms · Basement developments · Whole-home gut renovations</p>
              <p className="text-caption text-white/35 mb-6">Typical timelines: 4–16 weeks</p>
              <p className="text-body text-white/50 max-w-lg mb-8">
                Demolition through finished trim — drywall, millwork, cabinetry, paint, plumbing
                and electrical coordination, and master finish carpentry. We handle permits and trades.
              </p>
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/15 text-white font-body text-label uppercase tracking-[0.15em] hover:bg-white/5 transition-all duration-[400ms]"
              >
                Request a Quote
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-20 lg:mt-28">
            <div className="editorial-rule mb-16 lg:mb-20" />
            <div className="pl-6 md:pl-10 border-l-2 border-transparent hover:border-copper/20 transition-colors duration-500">
              <p className="font-overline text-copper mb-4">Add-On Scopes</p>
              <h3 className="font-display text-display-sm text-white mb-2">Tailor your build</h3>
              <p className="text-body text-white/50 max-w-lg mb-8">
                Add any of these to a renovation or custom build.
              </p>
              <ul className="space-y-4 mb-8 max-w-lg">
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Custom Millwork &amp; Cabinetry</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Quoted per scope</span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Architectural Drawings &amp; Permits</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Quoted per scope</span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Exterior Finishing &amp; Landscaping</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Quoted per scope</span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Garage &amp; Outbuilding Builds</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Quoted per scope</span>
                </li>
              </ul>
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/15 text-white font-body text-label uppercase tracking-[0.15em] hover:bg-white/5 transition-all duration-[400ms]"
              >
                Discuss Add-On Scope
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider imageSrc={dividerMicrofiber} alt="Close-up of paint and trim finish detail" variant="deep" />

      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
          <ScrollReveal>
            <p className="font-overline text-copper mb-6">Transparent Pricing</p>
            <div className="editorial-rule mb-12" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mb-12">
            <p className="font-overline text-copper/60 mb-4">How We Quote</p>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              Every quote is fixed-scope and detailed line-by-line. After a free on-site walkthrough,
              we deliver your written quote within <span className="text-copper">7–10 days</span>.
              No surprise change orders. No vague allowances.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-overline text-copper/60 mb-4">No Surprises</p>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              Anything outside the original scope is documented, priced, and approved by you in writing
              before work proceeds. You stay in control of cost from start to finish.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider imageSrc={dividerInterior} alt="Master-built interior — finished room ready for hand-off" variant="warm" />

      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl">
          <ScrollReveal>
            <div className="editorial-rule mx-auto mb-10" />
            <h2 className="font-display text-display-md text-white mb-4">Let's build it.</h2>
            <p className="text-body-lg text-white/50 mb-10 max-w-[42ch] mx-auto">
              Not sure where your project fits? Book a free walkthrough — we'll scope it with you on-site. No pressure, no upsell.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Request a Consultation
              </button>
              <Link
                to="/results"
                className="inline-flex items-center text-white/50 text-body-sm hover:text-copper transition-colors duration-300 underline underline-offset-4 decoration-copper/30 hover:decoration-copper py-3.5"
              >
                View Results
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer onBookClick={onBookClick} />
  </>
);

export default Services;
