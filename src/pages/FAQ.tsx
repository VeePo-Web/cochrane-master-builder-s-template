import Navigation from "@/components/detailing/Navigation";
import Footer from "@/components/detailing/Footer";
import ScrollReveal from "@/components/detailing/ScrollReveal";
import InnerHero from "@/components/detailing/InnerHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dividerCoating from "@/assets/divider-coating.jpg";
import SectionDivider from "@/components/detailing/SectionDivider";
import dividerMicrofiber from "@/assets/divider-microfiber.jpg";

interface FAQProps {
  onBookClick?: () => void;
}

const faqCategories = [
  {
    title: "The Service",
    items: [
      { q: "What exactly is The Full Reset?", a: "Full interior detail — vacuum, shampoo, dash, console, seats, carpets, leather, doors, trunk, mats — plus hand wash, tires and rims, clay bar, and sealant outside. The whole car, done right." },
      { q: "How long does it take?", a: "Most Full Resets take 3–5 hours depending on vehicle size and condition. We'll give you a time estimate when we confirm your booking." },
      { q: "Do you come to my location?", a: "Yes. We're fully mobile. We come to your home, office, or wherever your car is parked in Calgary, Airdrie, and Cochrane. All we need is access to the vehicle, a water tap, a nearby power outlet, and a flat driveway or parking pad. Keys handed off (or vehicle unlocked) on arrival." },
      { q: "What if my car is really dirty?", a: "That's literally what we do. No judgment — the worse it is, the more satisfying the reset. We've seen it all." },
      { q: "Do you offer paint correction or polishing?", a: "No — we don't offer machine polish or paint correction. Our exterior service is hand wash, clay bar, and sealant." },
      { q: "What vehicles can't you service?", a: "Anything larger than a minivan — no semis, buses, or heavy machinery." },
    ],
  },
  {
    title: "Pricing & Booking",
    items: [
      { q: "How much does it cost?", a: "Interior detail: $139 sedan · $159 SUV/Truck · $199 7-seater. Add $30 for the full exterior — hand wash, tires, clay bar, sealant. Add-ons (ceramic spray, iron extraction, standalone clay bar) priced on request." },
      { q: "Is travel included in the price?", a: "Yes. Anywhere in Calgary, Airdrie, or Cochrane — travel is included. No surprise fees." },
      { q: "How do I book?", a: "Use the form, text us, or DM us on Instagram. We confirm by text. Call or text (306) 209-7804 anytime — text is the fastest way to reach us." },
      { q: "How do I pay?", a: "Cash, e-transfer, or card." },
    ],
  },
  {
    title: "The Process",
    items: [
      { q: "What do I need to do to prepare?", a: "Remove personal items and valuables from the car. Make sure we'll have access to a water tap, a power outlet, and a flat driveway or parking pad on arrival. That's it — we handle everything else." },
      { q: "Do I need to be home?", a: "Not necessarily. As long as we can access the vehicle and you've left it unlocked (or given us a key), we can work while you're out. We just need keys handed off (or the car unlocked) and may need you reachable for ±15 min flex on arrival time." },
      { q: "What products do you use?", a: "Standard professional detailing products, safe for interior and exterior surfaces. We avoid anything that risks damage to leather, plastics, or paint." },
    ],
  },
  {
    title: "Vehicle Concerns",
    items: [
      { q: "Will you damage my paint or interior?", a: "No. Calem handles every vehicle personally. Our exterior process is hand wash, clay bar, and sealant — no machine polish — so there's no abrasive risk to paint." },
      { q: "Can you remove pet hair?", a: "Yes. Pet hair removal is part of every interior service. We use specialized tools designed for embedded hair in fabric and carpet." },
      { q: "Do you work on trucks and SUVs?", a: "Absolutely. Trucks, SUVs, vans, sedans — we handle all vehicle types up to a minivan. Pricing adjusts for size." },
      { q: "What about stains that won't come out?", a: "We're transparent. If a stain is permanent (e.g., bleach, dye), we'll let you know upfront. Most stains, even old ones, respond well to our process." },
    ],
  },
];

const FAQ = ({ onBookClick }: FAQProps) => (
  <>
    <Navigation onBookClick={onBookClick} />
    <main id="main-content">
      <InnerHero
        image={dividerCoating}
        imageAlt="Close-up of ceramic coating application on dark paint"
        overline="FAQ"
        headline="Questions? Answered."
        subhead="Everything you need to know before booking."
        minHeight="min-h-[50vh]"
        align="center"
      />

      {/* ── FAQ Accordion ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
          {faqCategories.map((cat, ci) => (
            <ScrollReveal key={cat.title} delay={ci * 0.05} className="mb-20 last:mb-0">
              {/* Category header with border */}
              <div className="border-l-2 border-copper/20 pl-6 mb-8">
                <p className="font-overline text-copper">{cat.title}</p>
              </div>

              <Accordion type="single" collapsible>
                {cat.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${ci}-${i}`}
                    className="border-b border-white/8 border-t-0 border-l-0 border-r-0 rounded-none px-0 data-[state=open]:border-l-2 data-[state=open]:border-l-copper/20 data-[state=open]:pl-6 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-display text-body-lg font-medium text-white hover:no-underline py-6 [&>svg]:text-copper/40 [&>svg]:transition-colors [&[data-state=open]>svg]:text-copper">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-body-lg text-white/60 font-light leading-relaxed pb-6">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <SectionDivider imageSrc={dividerMicrofiber} alt="Close-up microfiber cloth on dark paint surface" variant="deep" />

      {/* ── CTA ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl">
          <ScrollReveal>
            <div className="editorial-rule mx-auto mb-10" />
            <h2 className="font-display text-display-md text-white mb-4">Still have questions?</h2>
            <p className="text-body-lg text-white/50 mb-10 max-w-[42ch] mx-auto">
              Book a reset and we'll walk you through everything. Or text us anytime — we'll text you back as soon as we can.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Book Your Reset
              </button>
              <a
                href="sms:+13062097804"
                className="inline-flex items-center text-white/50 text-body-sm hover:text-copper transition-colors duration-300 underline underline-offset-4 decoration-copper/30 hover:decoration-copper py-3.5"
              >
                Text (306) 209-7804
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer onBookClick={onBookClick} />
  </>
);

export default FAQ;
