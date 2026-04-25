import { Link } from "react-router-dom";
import Navigation from "@/components/detailing/Navigation";
import Footer from "@/components/detailing/Footer";
import ScrollReveal from "@/components/detailing/ScrollReveal";
import SectionDivider from "@/components/detailing/SectionDivider";
import InnerHero from "@/components/detailing/InnerHero";
import RevealImage from "@/components/detailing/RevealImage";
import servicesHero from "@/assets/services-equipment-flatlay.jpg";
import vendorDetail from "@/assets/vendor-detail.jpg";
import dividerMicrofiber from "@/assets/divider-microfiber.jpg";
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
        imageAlt="Professional detailing equipment arranged on dark surface"
        overline="Services"
        headline="Every detail matters."
        subhead="Choose the level of restoration your vehicle needs. All services are mobile — we come to you."
      />

      {/* ── Service Tiers ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <ScrollReveal className="mb-20 lg:mb-28">
            <p className="font-overline text-copper mb-6">Our Services</p>
            <h2 className="font-display text-display-lg text-white mb-5">Choose Your Service</h2>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              Travel included in Calgary, Airdrie, and Cochrane.
            </p>
          </ScrollReveal>

          {/* ── Flagship: The Full Reset ── */}
          <ScrollReveal>
            <div className="editorial-rule mb-10" />
            <div className="border-l-2 border-copper pl-6 md:pl-10 bg-gradient-to-r from-copper/[0.03] to-transparent rounded-r-lg py-1">
              <p className="font-overline text-copper mb-4">Flagship Service</p>
              <h3 className="font-display text-display-sm text-white mb-2">The Full Reset</h3>
              <p className="font-display text-display-lg text-copper mb-1">Interior from $139 · +$30 exterior</p>
              <p className="text-caption text-white/40 mb-1">Sedans $139 · SUV/Truck $159 · 7-seater $199 · Add $30 for exterior</p>
              <p className="font-overline text-copper/50 mb-5">Most Popular</p>
              <p className="text-caption text-white/35 mb-6">3–5 hours · Travel included</p>
              <p className="text-body text-white/50 max-w-lg mb-8">
                Full interior detail — vacuum, shampoo, dash and console, leather and plastic
                conditioning, mats, doors, trunk — plus hand wash, tires and rims, clay bar,
                and sealant. Travel included.
              </p>
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Book Your Reset
              </button>
            </div>
            <div className="editorial-rule mt-10" />
          </ScrollReveal>

          {/* ── Editorial image break ── */}
          <ScrollReveal className="mt-16 lg:mt-20 mb-16 lg:mb-20">
            <RevealImage
              src={vendorDetail}
              alt="Close-up of professional detailing tools and ceramic coating application"
              aspectRatio="aspect-[21/9]"
            />
          </ScrollReveal>

          {/* ── Interior Deep Clean ── */}
          <ScrollReveal className="mt-20 lg:mt-28">
            <div className="pl-6 md:pl-10 border-l-2 border-transparent hover:border-copper/20 transition-colors duration-500">
              <p className="font-overline text-copper mb-4">Interior</p>
              <h3 className="font-display text-display-sm text-white mb-2">Basic Wash (Interior)</h3>
              <p className="font-display text-display-md text-copper mb-1">From $139</p>
              <p className="text-caption text-white/40 mb-1">Sedans from $139 · SUV/truck $159 · 7-seater $199</p>
              <p className="text-caption text-white/35 mb-6">2–4 hours · Travel included</p>
              <p className="text-body text-white/50 max-w-lg mb-8">
                Interior vacuum, dash and console, seats and carpet shampoo, leather and plastic
                conditioning, windows and mirrors, doors, trunk, mats. Pet hair and stains included.
              </p>
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/15 text-white font-body text-label uppercase tracking-[0.15em] hover:bg-white/5 transition-all duration-[400ms]"
              >
                Book Now
              </button>
            </div>
          </ScrollReveal>

          {/* ── Add-Ons ── */}
          <ScrollReveal className="mt-20 lg:mt-28">
            <div className="editorial-rule mb-16 lg:mb-20" />
            <div className="pl-6 md:pl-10 border-l-2 border-transparent hover:border-copper/20 transition-colors duration-500">
              <p className="font-overline text-copper mb-4">Add-Ons</p>
              <h3 className="font-display text-display-sm text-white mb-2">Tailor your reset</h3>
              <p className="text-body text-white/50 max-w-lg mb-8">
                Stack any of these onto an interior service.
              </p>
              <ul className="space-y-4 mb-8 max-w-lg">
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Exterior Add-On</span>
                  <span className="font-display text-body text-copper whitespace-nowrap">+$30</span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Ceramic Spray Coat</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Ask for pricing</span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Iron Extraction</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Ask for pricing</span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
                  <span className="text-body text-white/70">Clay Bar (standalone)</span>
                  <span className="text-caption text-white/40 whitespace-nowrap">Ask for pricing</span>
                </li>
              </ul>
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-6 py-2.5 rounded-full border border-white/15 text-white font-body text-label uppercase tracking-[0.15em] hover:bg-white/5 transition-all duration-[400ms]"
              >
                Book With Add-Ons
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider imageSrc={dividerMicrofiber} alt="Close-up microfiber cloth on dark paint surface" variant="deep" />

      {/* ── Pricing Transparency ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
          <ScrollReveal>
            <p className="font-overline text-copper mb-6">Transparent Pricing</p>
            <div className="editorial-rule mb-12" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mb-12">
            <p className="font-overline text-copper/60 mb-4">Pricing by Vehicle</p>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              Interior pricing: Sedans $139 · SUV/Truck $159 · 7-seater $199. Add <span className="text-copper">$30</span> for
              the full exterior. Add-on services priced on request. We don't service anything
              larger than a minivan (no semis, buses, or heavy machinery).
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-overline text-copper/60 mb-4">No Surprises</p>
            <p className="text-body-lg text-white/50 font-light max-w-[44ch]">
              No hidden fees. No surprise upsells. We confirm final pricing before we start,
              and travel is always included within Calgary, Airdrie, and Cochrane. Prices
              are firm except in extreme cases (excessive pet hair, mud).
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider imageSrc={dividerInterior} alt="Pristine leather interior detail after professional cleaning" variant="warm" />

      {/* ── CTA ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl">
          <ScrollReveal>
            <div className="editorial-rule mx-auto mb-10" />
            <h2 className="font-display text-display-md text-white mb-4">Let us help.</h2>
            <p className="text-body-lg text-white/50 mb-10 max-w-[42ch] mx-auto">
              Not sure which service you need? Book a reset and we'll assess your vehicle on arrival. No pressure, no upsell.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Book Your Reset
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
