import { Link } from "react-router-dom";
import Navigation from "@/components/detailing/Navigation";
import Footer from "@/components/detailing/Footer";
import ScrollReveal from "@/components/detailing/ScrollReveal";
import InnerHero from "@/components/detailing/InnerHero";
import RevealImage from "@/components/detailing/RevealImage";
import SectionDivider from "@/components/detailing/SectionDivider";
import dividerMitt from "@/assets/divider-mitt.jpg";
import beforeInterior from "@/assets/before-interior-dirty.jpg";
import afterInterior from "@/assets/after-interior-clean.jpg";
import beforeExterior from "@/assets/before-exterior-dirty.jpg";
import afterExterior from "@/assets/after-exterior-clean.jpg";
import beforeDashboard from "@/assets/before-dashboard-dirty.jpg";
import afterDashboard from "@/assets/after-dashboard-clean.jpg";
import resultsHero from "@/assets/results-hero.jpg";

interface ResultsProps {
  onBookClick?: () => void;
}

const proofPairs = [
  {
    num: "01",
    service: "Interior Renovation",
    before: beforeInterior,
    after: afterInterior,
    label: "Sample work",
    condition: "Dated finishes, worn flooring, builder-grade trim",
  },
  {
    num: "02",
    service: "Full Custom Build",
    before: beforeExterior,
    after: afterExterior,
    label: "Sample work",
    condition: "Bare lot through finished elevation",
  },
  {
    num: "03",
    service: "Kitchen & Millwork",
    before: beforeDashboard,
    after: afterDashboard,
    label: "Sample work",
    condition: "Original cabinetry, dated layout, low-spec finishes",
  },
];

const Results = ({ onBookClick }: ResultsProps) => {
  return (
    <>
      <Navigation onBookClick={onBookClick} />
      <main id="main-content">
        <InnerHero
          image={resultsHero}
          imageAlt="Master-built custom home exterior at golden hour"
          overline="Results"
          headline="Real builds, in progress."
          subhead="Every project documented from rough-in to final walk-through — your home could be one of the first featured here."
        />
        {proofPairs.map((pair, i) => (
          <section key={pair.label} className="relative py-20 md:py-28 lg:py-32 bg-asphalt grain-overlay">
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-asphalt to-transparent pointer-events-none z-[1]" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-asphalt to-transparent pointer-events-none z-[1]" />

            <div className="container mx-auto px-6 lg:px-8 relative z-[2]">
              <ScrollReveal>
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="font-display text-display-lg text-copper/15 select-none leading-none">{pair.num}</span>
                  <p className="font-overline text-copper">{pair.service}</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <ScrollReveal delay={0.05}>
                  <RevealImage src={pair.before} alt={`Before: ${pair.service} — ${pair.label}`} />
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <RevealImage src={pair.after} alt={`After: ${pair.service} — ${pair.label}`} />
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.2}>
                <div className="flex items-center justify-between mt-5">
                  <p className="font-overline text-white/30">Before</p>
                  <p className="font-display text-body-sm text-white">{pair.label}</p>
                  <p className="font-overline text-copper/50 flex items-center gap-2">
                    <span className="inline-block w-4 h-px bg-copper/40" />After
                  </p>
                </div>
                <p className="text-caption text-white/35 text-center mt-2">{pair.condition}</p>
              </ScrollReveal>
            </div>

            {i < proofPairs.length - 1 && (
              <div className="container mx-auto px-6 lg:px-8 mt-16">
                <div className="editorial-rule" />
              </div>
            )}
          </section>
        ))}

        <SectionDivider imageSrc={dividerMitt} alt="Master-craft millwork and joinery detail" variant="warm" />

        <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
          <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
            <ScrollReveal>
              <p className="font-overline text-copper mb-6">Client Stories</p>
              <div className="editorial-rule mx-auto mb-10" />
              <h2 className="font-display text-display-md text-white mb-5">Real reviews coming soon.</h2>
              <p className="text-body-lg text-white/50 font-light max-w-[44ch] mx-auto">
                We're documenting every build. Be one of the first — your honest review helps the next family decide.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay text-center">
          <div className="container mx-auto px-6 lg:px-8 max-w-xl">
            <ScrollReveal>
              <div className="editorial-rule mx-auto mb-10" />
              <h2 className="font-display text-display-md text-white mb-4">Your home is next.</h2>
              <p className="text-body-lg text-white/50 mb-10 max-w-[42ch] mx-auto">
                Book a free consultation. We'll text you back to confirm.
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
};

export default Results;
