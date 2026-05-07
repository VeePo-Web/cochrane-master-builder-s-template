import Navigation from "@/components/custom home building/Navigation";
import Footer from "@/components/custom home building/Footer";
import ScrollReveal from "@/components/custom home building/ScrollReveal";
import InnerHero from "@/components/custom home building/InnerHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dividerCoating from "@/assets/divider-coating.jpg";
import SectionDivider from "@/components/custom home building/SectionDivider";
import dividerMicrofiber from "@/assets/divider-millwork.jpg";

interface FAQProps {
  onBookClick?: () => void;
}

const faqCategories = [
  {
    title: "The Work",
    items: [
      { q: "What does Cochrane Master Builders actually do?", a: "Custom homes, full renovations, additions, and master-craft interior finishing — drywall, millwork, cabinetry, paint, trim, and finish carpentry. From foundation to final walk-through, all run by a master builder." },
      { q: "How long does a typical project take?", a: "Renovations run 4–16 weeks depending on scope. Custom homes typically 8–14 months. We give you a fixed schedule with your quote and update it weekly." },
      { q: "Where do you build?", a: "Cochrane, Calgary, and Rocky View County. We're happy to travel for the right project — just ask." },
      { q: "Will you take on a small project?", a: "Yes. A single-room renovation, a kitchen refresh, or a basement development is welcome. We're built for craft, not volume." },
      { q: "Do you handle architectural drawings and permits?", a: "Yes. We coordinate design, drawings, engineering, and permits as part of the build — one master builder, one accountable point of contact." },
      { q: "What kinds of projects can't you take on?", a: "Pure commercial fit-outs and out-of-province builds. Everything else, ask." },
    ],
  },
  {
    title: "Pricing & Quoting",
    items: [
      { q: "How much does a project cost?", a: "Every quote is fixed-scope and detailed line-by-line. After a free on-site walkthrough, we deliver a written quote within 7–10 days. No surprise change orders." },
      { q: "Are consultations free?", a: "Yes. The first on-site walkthrough is free. We'll talk scope, materials, and what success looks like for you." },
      { q: "How do I get started?", a: "Use the form, text us, or call. We confirm your consultation by text. Call or text (306) 209-7804 anytime." },
      { q: "How do I pay?", a: "Standard milestone draw schedule. E-transfer, cheque, or direct deposit." },
    ],
  },
  {
    title: "The Process",
    items: [
      { q: "What do I need to do to prepare?", a: "Just know what you want done — even loosely. We'll handle drawings, scope, materials, permits, scheduling, and trades. You approve at every milestone." },
      { q: "Do I need to be home during construction?", a: "Not for site work. We coordinate access and only ask for sign-off at scheduled milestones." },
      { q: "What materials do you use?", a: "Premium, locally-sourced materials wherever possible. We'll walk you through every selection — finishes, fixtures, cabinetry — before any order is placed." },
    ],
  },
  {
    title: "Project Concerns",
    items: [
      { q: "Will the build run over budget?", a: "Our quotes are fixed-scope. Anything outside scope is approved by you in writing before work begins. No surprises." },
      { q: "Do you handle warranty?", a: "Yes. Workmanship warranty on every project. Major builds include New Home Warranty Alberta coverage where required." },
      { q: "Do you work with our designer or architect?", a: "Absolutely. We collaborate with your designer, architect, or interior designer — or we can bring in trusted partners." },
      { q: "What if we change our mind mid-build?", a: "Change orders are documented, priced, and signed before work proceeds. You're always in control of cost." },
    ],
  },
];

const FAQ = ({ onBookClick }: FAQProps) => (
  <>
    <Navigation onBookClick={onBookClick} />
    <main id="main-content">
      <InnerHero
        image={dividerCoating}
        imageAlt="Close-up of master-craft interior finishing — paint, trim, and joinery"
        overline="FAQ"
        headline="Questions? Answered."
        subhead="Everything you need to know before requesting a consultation."
        minHeight="min-h-[50vh]"
        align="center"
      />

      {/* ── FAQ Accordion ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
          {faqCategories.map((cat, ci) => (
            <ScrollReveal key={cat.title} delay={ci * 0.05} className="mb-20 last:mb-0">
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

      <SectionDivider imageSrc={dividerMicrofiber} alt="Master-craft interior finishing — paint and trim detail" variant="deep" />

      {/* ── CTA ── */}
      <section className="py-28 md:py-36 lg:py-48 bg-asphalt grain-overlay text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl">
          <ScrollReveal>
            <div className="editorial-rule mx-auto mb-10" />
            <h2 className="font-display text-display-md text-white mb-4">Still have questions?</h2>
            <p className="text-body-lg text-white/50 mb-10 max-w-[42ch] mx-auto">
              Book a free on-site consultation and we'll walk you through the whole process. Or text us anytime — we'll text you back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Request a Consultation
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
