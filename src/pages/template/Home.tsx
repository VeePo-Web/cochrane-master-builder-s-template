import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import TrustNumbers from "@/components/template/TrustNumbers";
import ServicesGrid from "@/components/template/ServicesGrid";
import PriceBandsTable from "@/components/template/PriceBandsTable";
import RemixSlot from "@/components/template/RemixSlot";
import EditorialImage from "@/components/drywall/EditorialImage";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import FAQAccordion from "@/components/drywall/FAQAccordion";
import CTABand from "@/components/drywall/CTABand";
import HeroImage from "@/components/drywall/HeroImage";
import ScrollReveal from "@/components/drywall/ScrollReveal";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

const SocialProofEngine = lazy(() => import("@/components/master/SocialProofEngine").then(m => ({ default: m.SocialProofEngine })));
const GuaranteeBlock = lazy(() => import("@/components/master/GuaranteeBlock").then(m => ({ default: m.GuaranteeBlock })));

interface Props { onBookClick?: BookingClickHandler }

const HOME_PROCESS = [
  { title: "Send three photos", description: "From your phone. Of the {SERVICE} surface, the lighting, and the room context. That is the entire ask." },
  { title: "Receive a written quote in 24 hours", description: "Itemised. Tied to scope. Bound to the 15-year structural guarantee. No sales call between you and the number." },
  { title: "We {SERVICE_VERB} on the agreed window", description: "Same crew, start to finish. Worksite cleaner than we found it or the work is free." },
  { title: "Sign-off and warranty registered", description: "Walk-through with you. Warranty card filed. Touch-up window opens for 14 days at zero cost." },
];

const TemplateHome = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.home;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      {/* HERO */}
      <RemixSlot name="HERO_IMAGE" hint="Bind a service-specific AVIF (≤140KB)">
        <section className="paper-grain relative overflow-hidden bg-bone">
          {MASTER_REMIX.HERO_IMAGE && (
            <HeroImage src={MASTER_REMIX.HERO_IMAGE} alt="" gradientFrom="left" opacity={32} />
          )}
          <div className="container relative z-10 mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
            <div className="grid items-end gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <ScrollReveal>
                  <p className="font-eyebrow mb-5">{c.hero.eyebrow}</p>
                  <h1 className="text-display-xl text-charcoal">{c.hero.headline}</h1>
                  <p className="mt-6 max-w-2xl text-body-lg text-graphite">{c.hero.sub}</p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onBookClick?.({ source: "Home hero" })}
                      className="cta-forest rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep"
                    >
                      {TEMPLATE_COPY.cta.primary}
                    </button>
                    <Link
                      to="/template/pricing"
                      className="rounded-sm border border-charcoal/20 px-6 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-bone"
                    >
                      {TEMPLATE_COPY.cta.secondary}
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </RemixSlot>

      {/* TRUST BAR */}
      <SectionFrame tone="paper" size="sm">
        <RemixSlot name="TRUST_NUMBERS">
          <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} />
        </RemixSlot>
      </SectionFrame>

      {/* PROMISE */}
      <SectionFrame tone="bone" size="lg" grain>
        <div className="grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionTitle eyebrow={c.promise.eyebrow} headline={c.promise.headline} lede={c.promise.body} />
          </div>
          <div className="md:col-span-5">
            <RemixSlot name="HERO_IMAGE" hint="Editorial detail shot of {SERVICE}">
              <EditorialImage
                src={MASTER_REMIX.HERO_IMAGE || "/placeholder.svg"}
                alt="Detail of completed {SERVICE} surface"
                caption="A finished {SERVICE} surface — taken on sign-off day."
              />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      {/* SERVICES */}
      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.services.eyebrow} headline={c.services.headline} lede={c.services.lede} />
        <div className="mt-12">
          <RemixSlot name="SUB_SERVICES">
            <ServicesGrid services={MASTER_REMIX.SUB_SERVICES} hrefFor={() => "/template/services"} />
          </RemixSlot>
        </div>
      </SectionFrame>

      {/* PROOF */}
      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow={c.proof.eyebrow} headline={c.proof.headline} lede={c.proof.lede} />
        <div className="mt-12">
          <RemixSlot name="PROOF" hint="Before/after image pairs">
            <BeforeAfterPair pairs={MASTER_REMIX.PROOF} />
          </RemixSlot>
        </div>
      </SectionFrame>

      {/* MANIFESTO QUOTE */}
      <RemixSlot name="HERO_IMAGE" hint="Atmospheric backdrop">
        <EditorialQuote
          quote="The standard is the standard. We do not lower it for a smaller job, a tighter budget, or a faster timeline."
          attribution="The {BRAND_NAME} crew"
          image={MASTER_REMIX.HERO_IMAGE || "/placeholder.svg"}
        />
      </RemixSlot>

      {/* PROCESS */}
      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.process.eyebrow} headline={c.process.headline} />
        <div className="mt-12">
          <ProcessSteps steps={HOME_PROCESS} />
        </div>
      </SectionFrame>

      {/* SOCIAL PROOF */}
      <SectionFrame tone="bone" size="lg">
        <Suspense fallback={null}>
          <SocialProofEngine variant="grid" maxItems={3} />
        </Suspense>
      </SectionFrame>

      {/* GUARANTEE */}
      <SectionFrame tone="paper" size="lg">
        <Suspense fallback={null}>
          <GuaranteeBlock variant="full" />
        </Suspense>
      </SectionFrame>

      {/* PRICING PREVIEW */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <SectionTitle
              eyebrow="Pricing preview"
              headline="The bands are public. The number is the number."
              lede="See the full scope on /pricing — including the philosophy, the process, and the objections we've already heard."
            />
            <Link
              to="/template/pricing"
              className="mt-8 inline-flex rounded-sm border border-charcoal/20 px-6 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-bone"
            >
              See the full pricing page
            </Link>
          </div>
          <div className="md:col-span-7">
            <RemixSlot name="PRICE_BANDS">
              <PriceBandsTable
                title="{SERVICE} — honest bands"
                bands={MASTER_REMIX.PRICE_BANDS}
                note="Final number on the invoice equals the band; only material grade selected by you adjusts it."
              />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      {/* FAQ */}
      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.faq.eyebrow} headline={c.faq.headline} />
        <div className="mt-10">
          <RemixSlot name="FAQS">
            <FAQAccordion items={MASTER_REMIX.FAQS.slice(0, 6)} />
          </RemixSlot>
        </div>
      </SectionFrame>

      {/* CTA BAND */}
      <CTABand
        eyebrow={c.cta.eyebrow}
        headline={c.cta.headline}
        body={c.cta.body}
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Home → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default TemplateHome;
