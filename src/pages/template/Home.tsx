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
  PlumbLineDivider,
  BlueprintGrain,
} from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

const SocialProofEngine = lazy(() => import("@/components/master/SocialProofEngine").then(m => ({ default: m.SocialProofEngine })));
const GuaranteeBlock = lazy(() => import("@/components/master/GuaranteeBlock").then(m => ({ default: m.GuaranteeBlock })));

interface Props { onBookClick?: BookingClickHandler }

const HOME_PROCESS = [
  { title: "Share your project details", description: "From your phone or email. A few photos, the scope, and the context. That is the entire ask." },
  { title: "Receive a written quote in 24 hours", description: "Itemised. Tied to scope. Backed by our guarantee. No sales call between you and the number." },
  { title: "We {SERVICE_VERB} on the agreed window", description: "Same team, start to finish. We leave things cleaner than we found them — or the work is free." },
  { title: "Sign-off and warranty registered", description: "Walk-through with you. Warranty registered. A revision window opens for 14 days at zero cost." },
];

const TemplateHome = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.home;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      {/* HERO */}
      <RemixSlot name="HERO_IMAGE" hint="Bind a service-specific AVIF (≤140KB)">
        <section className="relative overflow-hidden bg-bone min-h-[85vh] md:min-h-screen">
          <BlueprintGrain opacity={0.018} />
          {/* Atmospheric ghost year — depth layer behind the grid */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 bottom-0 font-display text-charcoal leading-none"
            style={{ fontSize: "clamp(10rem, 22vw, 20rem)", opacity: 0.03, lineHeight: 1 }}
          >
            {MASTER_REMIX.FOUNDATION_YEAR}
          </span>
          {MASTER_REMIX.HERO_IMAGE && (
            <HeroImage src={MASTER_REMIX.HERO_IMAGE} alt="" gradientFrom="left" opacity={32} />
          )}
          <div className="container relative z-10 mx-auto px-6 pt-24 pb-16 md:pt-40 md:pb-32">
            <div className="grid items-center gap-12 md:grid-cols-12">

              {/* Left column — headline + copy + CTAs */}
              <div className="md:col-span-8">
                <ScrollReveal>
                  {/* Eyebrow: copper hairline + Jost caps */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="hairline-copper w-6 flex-shrink-0" />
                    <p className="eyebrow-copper">{c.hero.eyebrow}</p>
                  </div>
                  <h1
                    className="text-charcoal"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.0,
                    }}
                  >
                    {c.hero.headline}
                  </h1>

                  {/* Hand-etched copper underline — draws itself on mount */}
                  <HeroEtchedUnderline className="mt-2 mb-4 block" />

                  {/* Slogan whisper — beneath the H1 */}
                  <SloganHeartbeat variant="whisper" className="mb-6 block" />

                  <p className="mt-4 md:max-w-[56ch] text-body-lg text-graphite leading-relaxed">{c.hero.sub}</p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => onBookClick?.({ source: "Home hero" })}
                      className="w-full sm:w-auto rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-primary-foreground transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-forest-deep hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                    >
                      {TEMPLATE_COPY.cta.primary}
                    </button>
                    <Link
                      to="/pricing"
                      className="w-full sm:w-auto rounded-none border border-copper/20 px-6 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-charcoal transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-forest hover:border-copper/40 hover:-translate-y-0.5 active:translate-y-0 text-center"
                    >
                      {TEMPLATE_COPY.cta.secondary}
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right column — image or placeholder + cornerstone stamp */}
              <div className="hidden md:flex md:col-span-4 flex-col items-center gap-8">
                {MASTER_REMIX.HERO_IMAGE ? (
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-sm">
                    <img
                      src={MASTER_REMIX.HERO_IMAGE}
                      alt=""
                      className="w-full h-full object-cover"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full aspect-[3/4] rounded-sm bg-charcoal/5 animate-pulse"
                    aria-hidden="true"
                  />
                )}
                <CornerstoneStamp size={72} />
              </div>

            </div>
          </div>

          {/* Cornerstone stamp — mobile only, absolute bottom-right */}
          <div className="absolute bottom-6 right-6 z-10 md:hidden">
            <CornerstoneStamp size={56} />
          </div>
        </section>
      </RemixSlot>

      {/* TRUST BAR */}
      <SectionFrame tone="paper" size="sm" className="!py-16 md:!py-20">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <RemixSlot name="TRUST_NUMBERS">
              <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} />
            </RemixSlot>
          </div>
          <div className="flex justify-start md:col-span-4 md:justify-end md:border-l md:border-seam md:pl-10 lg:pl-12">
            <FoundationCounter className="w-full max-w-xs md:max-w-none" />
          </div>
        </div>
      </SectionFrame>

      {/* PROMISE */}
      <SectionFrame tone="bone" size="lg" grain className="md:!py-32">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionTitle eyebrow={c.promise.eyebrow} headline={c.promise.headline} lede={c.promise.body} />
          </div>
          <div className="md:col-span-5 md:-mr-6">
            <RemixSlot name="HERO_IMAGE" hint="Editorial detail shot of {SERVICE}">
              <EditorialImage
                src={MASTER_REMIX.HERO_IMAGE}
                alt={`${MASTER_REMIX.SERVICE} work in ${MASTER_REMIX.COMMUNITIES[0]} — completed`}
                caption="Completed work — taken on sign-off day."
              />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      {/* SERVICES */}
      <SectionFrame tone="paper" size="lg" className="md:!py-32">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 top-0 font-display text-charcoal leading-none"
            style={{ fontSize: "clamp(8rem,18vw,16rem)", opacity: 0.04, lineHeight: 1 }}
          >
            01
          </span>
          <SectionTitle eyebrow={c.services.eyebrow} headline={c.services.headline} lede={c.services.lede} />
          <div className="mt-12">
            <RemixSlot name="SUB_SERVICES">
              <ServicesGrid services={MASTER_REMIX.SUB_SERVICES} hrefFor={() => "/services"} />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      {/* PROOF */}
      <SectionFrame tone="bone" size="lg" className="md:!py-32">
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
          quote="The standard is the standard. We do not lower it for a smaller project, a tighter budget, or a faster timeline."
          attribution="The {BRAND_NAME} team"
          image={MASTER_REMIX.MANIFESTO_BACKDROP || MASTER_REMIX.HERO_IMAGE}
        />
      </RemixSlot>

      {/* PROCESS */}
      <SectionFrame tone="paper" size="lg" className="md:!py-32">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 top-0 font-display text-charcoal leading-none"
            style={{ fontSize: "clamp(8rem,18vw,16rem)", opacity: 0.04, lineHeight: 1 }}
          >
            02
          </span>
          <SectionTitle eyebrow={c.process.eyebrow} headline={c.process.headline} />
          <div className="mt-12">
            <ProcessSteps steps={HOME_PROCESS} />
          </div>
        </div>
      </SectionFrame>

      {/* SOCIAL PROOF */}
      <SectionFrame tone="bone" size="sm" className="!py-0">
        <Suspense fallback={null}>
          <SocialProofEngine variant="grid" maxItems={3} />
        </Suspense>
      </SectionFrame>

      {/* GUARANTEE */}
      <SectionFrame tone="paper" size="sm" className="!py-0">
        <Suspense fallback={null}>
          <GuaranteeBlock variant="full" />
        </Suspense>
      </SectionFrame>

      {/* PRICING PREVIEW */}
      <SectionFrame tone="bone" size="lg" className="md:!py-32">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 top-0 font-display text-charcoal leading-none"
            style={{ fontSize: "clamp(8rem,18vw,16rem)", opacity: 0.04, lineHeight: 1 }}
          >
            03
          </span>
          <div className="relative grid gap-12 md:gap-16 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <SectionTitle
                eyebrow="Pricing preview"
                headline="The bands are public. The number is the number."
                lede="See the full scope on our pricing page — including the philosophy, the process, and the objections we've already heard."
              />
              <Link
                to="/pricing"
                className="mt-8 inline-flex w-full sm:w-auto rounded-none border border-charcoal/20 px-6 py-3.5 text-sm font-medium text-charcoal transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-charcoal hover:text-bone hover:-translate-y-0.5 active:translate-y-0"
              >
                See every price — and why
              </Link>
            </div>
            <div className="md:col-span-7">
              <RemixSlot name="PRICE_BANDS">
                <PriceBandsTable
                  title="{SERVICE} — honest bands"
                  bands={MASTER_REMIX.PRICE_BANDS}
                  note="The number on the invoice equals the band you see — the only thing that adjusts it is an option you choose."
                />
              </RemixSlot>
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* FAQ */}
      <SectionFrame tone="paper" size="lg" className="md:!py-32">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 top-0 font-display text-charcoal leading-none"
            style={{ fontSize: "clamp(8rem,18vw,16rem)", opacity: 0.04, lineHeight: 1 }}
          >
            04
          </span>
          <div className="relative grid md:grid-cols-12 gap-12 md:gap-16 md:items-start">
            <div className="md:col-span-4">
              <SectionTitle eyebrow={c.faq.eyebrow} headline={c.faq.headline} />
            </div>
            <div className="md:col-span-8">
              <RemixSlot name="FAQS">
                <FAQAccordion items={MASTER_REMIX.FAQS.slice(0, 6)} />
              </RemixSlot>
            </div>
          </div>
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
        reassurance="Free quote · No obligation · 24-hour reply"
      />
    </TemplateLayout>
  );
};

export default TemplateHome;
