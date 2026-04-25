import Navigation from "@/components/drywall/Navigation";
import Footer from "@/components/drywall/Footer";
import InnerHero from "@/components/drywall/InnerHero";
import SectionTitle from "@/components/drywall/SectionTitle";
import SEOHead from "@/components/drywall/SEOHead";
import AmbientBackdrop from "@/components/drywall/AmbientBackdrop";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { TRADE, BUSINESS } from "@/config";
import heroContact from "@/assets/drywall/hero-contact.jpg";
import bgBlurBoneCorner from "@/assets/drywall/bg-blur-bone-corner.jpg";
import ba4Before from "@/assets/drywall/ba-4-before.jpg";
import ba4After from "@/assets/drywall/ba-4-after.jpg";

interface PageProps {
  onBookClick?: () => void;
}

const Contact = ({ onBookClick }: PageProps) => {
  return (
    <>
      <SEOHead
        title="Contact — Cochrane Drywall & Insulation"
        description="Send photos, get a clear ballpark, and start with a tidy quote. Drywall, paint, and insulation in Cochrane, Alberta."
        path="/contact"
      />
      <Navigation onBookClick={onBookClick} />
      <main>
        <InnerHero
          eyebrow="Contact"
          title="Send the photo. Start with a clear next step."
          lede="One business day. Realistic ballpark. No vague contractor language. No form-letter follow-up."
          backgroundImage={heroContact}
          backgroundAlt="Quiet closed wooden interior door freshly painted bone white"
        />

        {/* Form section with ambient backdrop */}
        <section className="section-y relative overflow-hidden">
          <AmbientBackdrop image={bgBlurBoneCorner} opacity={0.08} />
          <div className="container relative z-10 mx-auto px-6 grid gap-12 md:grid-cols-12 max-md:gap-10">
            {/* Reassurance + details */}
            <div className="md:col-span-5 space-y-10">
              <div>
                <SectionTitle eyebrow="What happens next" headline="No project spiral." as="h2" />
                <ol className="mt-8 space-y-4 text-body-lg text-graphite">
                  <li>
                    <span className="font-eyebrow text-forest">01</span> &nbsp; You send 2–4 photos and a sentence about the space.
                  </li>
                  <li>
                    <span className="font-eyebrow text-forest">02</span> &nbsp; Within one business day, you get a realistic range and a clear next step.
                  </li>
                  <li>
                    <span className="font-eyebrow text-forest">03</span> &nbsp; If the range works, we book a tidy visit and confirm the scope in writing.
                  </li>
                </ol>
              </div>

              <div className="space-y-4 border-t border-seam pt-8">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-forest" />
                  <p className="text-graphite">{BUSINESS.serviceArea.primary} &amp; surrounding area</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-4 w-4 text-forest" />
                  <p className="text-graphite">{TRADE.contact.hours}</p>
                </div>
                {TRADE.contact.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-forest" />
                    <a href={`tel:${TRADE.contact.phone}`} className="story-link text-graphite">
                      {TRADE.contact.phone}
                    </a>
                  </div>
                )}
                {TRADE.contact.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-forest" />
                    <a href={`mailto:${TRADE.contact.email}`} className="story-link text-graphite">
                      {TRADE.contact.email}
                    </a>
                  </div>
                )}
              </div>

              <p className="text-caption text-mist">
                Service area: Cochrane, Calgary, Airdrie, and Bragg Creek for the right project.
              </p>
            </div>

            {/* CTA card opens the booking modal */}
            <div className="md:col-span-7">
              <div className="border border-seam bg-paper p-8 md:p-12 max-md:p-6 shadow-editorial">
                <p className="font-eyebrow">Quote request</p>
                <h2 className="mt-3 font-display text-display-lg text-charcoal">
                  Tell us what you're dealing with.
                </h2>
                <p className="mt-4 text-body-lg text-graphite">
                  Open the quote form and we'll walk you through four short steps — service, location, timing, and a couple of photos. Five minutes. No pressure, no sales call.
                </p>
                <button
                  type="button"
                  onClick={onBookClick}
                  className="cta-forest mt-8 inline-flex rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep max-md:w-full max-md:justify-center"
                >
                  Open the photo-quote form →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visual reassurance — what 'fixed and forgotten' looks like */}
        <section className="section-y bg-paper">
          <div className="container mx-auto px-6">
            <SectionTitle
              eyebrow="What you're sending the photo for"
              headline="Fixed. Painted. Forgotten."
            />
            <div className="mt-12 max-w-3xl">
              <BeforeAfterPair
                pairs={[
                  {
                    before: ba4Before,
                    after: ba4After,
                    caption: "A water-stained ceiling, primed and repainted — the kind of result a single phone photo starts.",
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer onBookClick={onBookClick} />
    </>
  );
};

export default Contact;
