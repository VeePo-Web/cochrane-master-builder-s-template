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
import {
  HeroEtchedUnderline,
  SloganHeartbeat,
  CornerstoneStamp,
  FoundationCounter,
  CMBTrio,
  PlumbLineDivider,
  BlueprintGrain,
} from "@/components/template/bespoke";
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
        <section className="relative overflow-hidden bg-bone">
          <BlueprintGrain opacity={0.018} />
          {MASTER_REMIX.HERO_IMAGE && (
            <HeroImage src={MASTER_REMIX.HERO_IMAGE} alt="" gradientFrom="left" opacity={32} />
          )}
          <div className="container relative z-10 mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
            <div className="grid items-end gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <ScrollReveal>
                  {/* Eyebrow: 24px copper hairline + Jost caps */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="hairline-copper w-6 flex-shrink-0" />
                    <p className="eyebrow-copper">{c.hero.eyebrow}</p>
                  </div>
                  <h1
                    className="text-charcoal"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.025em",
                      lineHeight: 0.98,
                    }}
                  >
                    {c.hero.headline}
                  </h1>

                  {/* Hand-etched copper underline — draws itself on mount */}
                  <HeroEtchedUnderline className="mt-3 mb-4 block" />

                  {/* Slogan whisper — beneath the H1 */}
                  <SloganHeartbeat variant="whisper" className="mb-6 block" />

                  <p className="mt-2 max-w-[56ch] text-body-lg text-graphite">{c.hero.sub}</p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onBookClick?.({ source: "Home hero" })}
                      className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
                    >
                      {TEMPLATE_COPY.cta.primary}
                    </button>
                    <Link
                      to="/pricing"
                      className="rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.12em] uppercase text-charcoal transition-all duration-300 hover:text-forest"
                      style={{ border: "1px solid hsl(var(--copper) / 0.20)" }}
                    >
                      {TEMPLATE_COPY.cta.secondary}
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Cornerstone stamp — bottom-right of hero */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
            <CornerstoneStamp size={72} />
          </div>
        </section>
      </RemixSlot>

      {/* TRUST BAR — with CMBTrio and FoundationCounter */}
      <SectionFrame tone="paper" size="sm">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <RemixSlot name="TRUST_NUMBERS">
              <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} />
            </RemixSlot>
          </div>
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <FoundationCounter />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <CMBTrio size={36} mode="inline" className="opacity-60" />
          </div>
        </div>
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
                src={MASTER_REMIX.HERO_IMAGE}
                alt={`${MASTER_REMIX.SERVICE} surface detail in ${MASTER_REMIX.COMMUNITIES[0]} — completed, sign-off day`}
                caption="A finished surface — taken on sign-off day."
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
            <ServicesGrid services={MASTER_REMIX.SUB_SERVICES} hrefFor={() => "/services"} />
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
          image={MASTER_REMIX.MANIFESTO_BACKDROP || MASTER_REMIX.HERO_IMAGE}
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
              to="/pricing"
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
