import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import Hero from "@/components/drywall/Hero";
import TrustBar from "@/components/drywall/TrustBar";
import SectionTitle from "@/components/drywall/SectionTitle";
import ServiceCard from "@/components/drywall/ServiceCard";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import FAQAccordion from "@/components/drywall/FAQAccordion";
import CTABand from "@/components/drywall/CTABand";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import SEOHead from "@/components/drywall/SEOHead";
import JsonLd from "@/components/drywall/JsonLd";
import ScrollReveal from "@/components/drywall/ScrollReveal";
import ParallaxBackdrop from "@/components/drywall/ParallaxBackdrop";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import { BUSINESS, BRAND_IDENTITY, FEAR_DISPEL } from "@/config";
import heroHome from "@/assets/drywall/hero-home.jpg";
import ba1Before from "@/assets/drywall/ba-1-before.jpg";
import ba1After from "@/assets/drywall/ba-1-after.jpg";
import ba2Before from "@/assets/drywall/ba-2-before.jpg";
import ba2After from "@/assets/drywall/ba-2-after.jpg";
import ba3Before from "@/assets/drywall/ba-3-before.jpg";
import ba3After from "@/assets/drywall/ba-3-after.jpg";
import bgBlurTrowelArc from "@/assets/drywall/bg-blur-trowel-arc.jpg";
import bgBlurInsulationCavity from "@/assets/drywall/bg-blur-insulation-cavity.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";
import bgBlurBasementProgression from "@/assets/drywall/bg-blur-basement-progression.jpg";

interface IndexProps {
  onBookClick?: () => void;
}

const homeFAQs = [
  {
    question: "Is my job too small?",
    answer: FEAR_DISPEL.drywallRepair[0].sentences.slice(0, 2).join(" "),
  },
  {
    question: "How does pricing actually work?",
    answer: "Send a couple of photos and a sentence. Within one business day, you get a realistic range tied to your specific scope — not a generic per-foot guess. If the range feels right, we confirm the full quote in writing before any work starts.",
  },
  {
    question: "How disruptive will this be to the rest of the house?",
    answer: FEAR_DISPEL.drywallRepair[3].sentences.slice(0, 2).join(" "),
  },
  {
    question: "Do you work outside Cochrane?",
    answer: "Cochrane is home base and gets the fastest response, but we regularly work in Calgary, Airdrie, and Bragg Creek when the project fits. Send the photos either way — we'll tell you straight if it's a good match.",
  },
];

const Index = ({ onBookClick }: IndexProps) => {
  const services = Object.values(BUSINESS.services);

  return (
    <>
      <SEOHead
        title="Cochrane Drywall, Paint & Insulation — Small Jobs Welcome"
        description="Send a couple of photos. Get a real range within one business day. Drywall repair, install, painting, and insulation for Cochrane homeowners — sized to the job, not the renovation."
        path="/"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Cochrane Drywall & Insulation",
          description: BUSINESS.narrative.paragraph1,
          url: "https://cochranedrywall.ca",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cochrane",
            addressRegion: "AB",
            addressCountry: "CA",
          },
          areaServed: ["Cochrane", "Calgary", "Airdrie", "Bragg Creek"],
          priceRange: "$$",
          image: "/og-image.jpg",
        }}
      />

      <Navigation onBookClick={onBookClick} />
      <main id="main-content">
        {/* 1. Hero */}
        <Hero
          headline="Finally get that wall handled."
          sub="Drywall, paint, and insulation done at the size you actually need it. Send a couple of photos — we'll come back with a real range, a tidy plan, and a clear next step. No project spiral. No vague maybes."
          onPrimaryClick={onBookClick}
          backgroundImage={heroHome}
          backgroundAlt="Freshly finished bone-painted basement corner with soft window light"
        />

        {/* 2. Trust bar */}
        <TrustBar />

        {/* Atmospheric divider — trowel arc */}
        <ParallaxBackdrop
          image={bgBlurTrowelArc}
          alt="Trowel arcing across fresh mud, cinematic blur"
          height="55vh"
        />

        {/* 3. Main problems we solve */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle
              eyebrow="The middle-ground job"
              headline="Too important to ignore. Too small for a renovator."
              lede={BUSINESS.narrative.paragraph2}
            />
          </div>
        </section>

        {/* 4. Core services overview */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Services" headline="Four services. Built to work together, scoped to stand alone." />
            <div className="mt-12 grid gap-px bg-seam md:grid-cols-2 lg:grid-cols-4 max-md:gap-0 max-md:divide-y max-md:divide-seam max-md:bg-paper">
              {services.map((s) => (
                <ScrollReveal key={s.slug} className="bg-paper">
                  <ServiceCard
                    title={s.shortLabel}
                    summary={s.summary}
                    range={s.planningRanges[0]?.range}
                    href={`/${s.slug}`}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Before/After preview */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Visible progress" headline="Damage out. Comfort in." />
            <div className="mt-12">
              <BeforeAfterPair
                pairs={[
                  { before: ba1Before, after: ba1After, caption: "A knob hole that bothered them for a year — patched, primed, and painted in a single afternoon visit." },
                  { before: ba2Before, after: ba2After, caption: "A double garage taken from rough framing to insulated, boarded, and finished in one starter package window." },
                  { before: ba3Before, after: ba3After, caption: "A water-stained ceiling section replaced and repainted — the room reads as one surface again." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 6. Why choose us — with ambient backdrop */}
        <section className="section-y bg-paper relative overflow-hidden">
          <AmbientBackdrop image={bgBlurInsulationCavity} opacity={0.08} />
          <div className="container relative z-10 mx-auto px-6">
            <SectionTitle eyebrow="Why us" headline="Focused beats broad." />
            <ul className="mt-10 grid gap-8 md:grid-cols-2 max-md:gap-6">
              {FEAR_DISPEL.whyChooseUs.map((line, i) => (
                <li key={i} className="border-l-2 border-forest pl-5 text-body-lg text-graphite">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Simple process */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Process" headline="Four steps. No project spiral." />
            <div className="mt-12">
              <ProcessSteps
                steps={[
                  { title: "Send photos", description: "A couple of pictures and a sentence about the space is enough to start the conversation." },
                  { title: "Get a clear range", description: "We reply within one business day with a realistic ballpark — not a guess, not a sales pitch." },
                  { title: "Book a tidy visit", description: "Contained worksite, predictable arrival window, dust controlled to the work area." },
                  { title: "Walk the finished work", description: "We leave when the result feels finished, not patched. Touch-ups within 14 days if anything settles." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Editorial pull quote */}
        <EditorialQuote
          image={bgBlurBoneCorner}
          quote="Damage out. Comfort in. The room you walk past, finally finished."
          attribution="House Rules"
        />

        {/* 8. Starter packages teaser */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Starter packages" headline="Start with one stage. Decide on the rest later." />
            <div className="mt-10 grid gap-px bg-seam md:grid-cols-2 max-md:gap-0 max-md:divide-y max-md:divide-seam max-md:bg-paper">
              <ServiceCard
                title={BUSINESS.packages.garage.label}
                summary={BUSINESS.packages.garage.summary}
                href={`/${BUSINESS.packages.garage.slug}`}
                cta="Garage packages"
              />
              <ServiceCard
                title={BUSINESS.packages.basement.label}
                summary={BUSINESS.packages.basement.summary}
                href={`/${BUSINESS.packages.basement.slug}`}
                cta="Basement packages"
              />
            </div>
          </div>
        </section>

        {/* 9. Testimonials placeholder — pull-quote pillar */}
        <section className="section-y">
          <div className="container mx-auto px-6">
            <blockquote className="mx-auto max-w-3xl text-center max-md:px-2">
              <p className="font-display text-pull-quote text-charcoal">
                “{BRAND_IDENTITY.pillars.cleanRepairs.label}.”
              </p>
              <footer className="mt-6 font-eyebrow">{BRAND_IDENTITY.pillars.cleanRepairs.meaning}</footer>
            </blockquote>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="Common questions" headline="What homeowners ask first." />
            <div className="mt-10 max-w-3xl">
              <FAQAccordion items={homeFAQs} />
            </div>
          </div>
        </section>

        {/* Atmospheric divider before final CTA */}
        <ParallaxBackdrop
          image={bgBlurBasementProgression}
          alt="Wide basement transitioning into a finished room, soft focus"
          height="50vh"
        />

        {/* 11. Final CTA */}
        <CTABand
          eyebrow="Your move"
          headline="You've looked at it long enough."
          body={FEAR_DISPEL.finalCta.slice(0, 3).join(" ")}
          onPrimaryClick={onBookClick}
          secondaryLabel="See pricing & process"
          onSecondaryClick={() => (window.location.href = "/pricing-process")}
        />
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default Index;
