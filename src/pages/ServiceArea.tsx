import { Link } from "react-router-dom";
import Navigation from "@/components/detailing/Navigation";
import Footer from "@/components/detailing/Footer";
import ScrollReveal from "@/components/detailing/ScrollReveal";
import SectionDivider from "@/components/detailing/SectionDivider";
import InnerHero from "@/components/detailing/InnerHero";
import calgarySkyline from "@/assets/calgary-skyline.jpg";
import rockies from "@/assets/service-area-rockies.jpg";

interface ServiceAreaProps {
  onBookClick?: () => void;
}

const neighborhoods = {
  Cochrane: ["Heritage Hills", "Sunset Ridge", "Riversong", "Fireside", "GlenEagles"],
  "Calgary NW": ["Tuscany", "Varsity", "Brentwood", "University District", "Kensington"],
  "Calgary SW": ["Altadore", "Marda Loop", "Aspen Woods", "Springbank Hill", "Signal Hill"],
  "Rocky View": ["Bearspaw", "Springbank", "Bragg Creek", "Chestermere", "Airdrie"],
  Surrounding: ["Canmore", "Banff (on request)"],
};

const ServiceArea = ({ onBookClick }: ServiceAreaProps) => (
  <>
    <Navigation onBookClick={onBookClick} />
    <main id="main-content">
      <InnerHero
        image={calgarySkyline}
        imageAlt="Calgary and Rocky View County skyline at golden hour with the Rocky Mountains beyond"
        overline="Where We Build"
        headline="Built local. Built right."
        subhead="Custom homes, renovations, and master-craft finishing across Cochrane, Calgary, and Rocky View County."
      />

      <section className="py-20 md:py-24 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
          <ScrollReveal>
            <div className="border-l-2 border-copper/20 pl-6 md:pl-8 text-left inline-block">
              <p className="font-overline text-copper mb-3">Local Master Builders</p>
              <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
                Every project is run by an on-site master builder. We build close to home so we can stay close to the work — Cochrane, Calgary, and Rocky View County.
              </p>
              <p className="text-caption text-white/30 mt-4 max-w-[44ch]">
                Out-of-area projects considered case-by-case. Just ask.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <ScrollReveal className="mb-16 lg:mb-20">
            <p className="font-overline text-copper mb-6">Coverage</p>
            <h2 className="font-display text-display-lg text-white mb-5">Communities We Build In</h2>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              Don't see yours? Text us — if you're in Cochrane, Calgary, or Rocky View County, we build there.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-14">
            {Object.entries(neighborhoods).map(([zone, areas], i) => (
              <ScrollReveal key={zone} delay={i * 0.08}>
                <div className="border-l border-copper/10 pl-5 hover:border-copper/30 transition-colors duration-500">
                  <p className="font-overline text-copper mb-5">{zone}</p>
                  <ul className="space-y-3">
                    {areas.map((a) => (
                      <li key={a} className="text-body-sm text-white/40">{a}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider imageSrc={rockies} alt="Rocky Mountain vista from Cochrane foothills at golden hour" height="40vh" variant="warm" />

      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl">
          <ScrollReveal>
            <div className="editorial-rule mx-auto mb-10" />
            <h2 className="font-display text-display-md text-white mb-4">Your lot. Your renovation. Your vision.</h2>
            <p className="text-body-lg text-white/50 mb-10 max-w-[42ch] mx-auto">
              Book a free on-site walkthrough. We'll talk scope, materials, and what success looks like.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Request a Consultation
              </button>
              <Link
                to="/services"
                className="inline-flex items-center text-white/50 text-body-sm hover:text-copper transition-colors duration-300 underline underline-offset-4 decoration-copper/30 hover:decoration-copper py-3.5"
              >
                View Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer onBookClick={onBookClick} />
  </>
);

export default ServiceArea;
