import { lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustNumbers from "@/components/template/TrustNumbers";
import ServicesGrid from "@/components/template/ServicesGrid";
import PriceBandsTable from "@/components/template/PriceBandsTable";
import RemixSlot from "@/components/template/RemixSlot";
import EditorialImage from "@/components/shared/EditorialImage";
import EditorialQuote from "@/components/shared/EditorialQuote";
import BeforeAfterPair from "@/components/shared/BeforeAfterPair";
import ProcessSteps from "@/components/shared/ProcessSteps";
import FAQAccordion from "@/components/shared/FAQAccordion";
import CTABand from "@/components/shared/CTABand";
import HeroImage from "@/components/shared/HeroImage";
import ScrollReveal from "@/components/shared/ScrollReveal";
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
import type { BookingClickHandler } from "@/config/booking";

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

  // Magnetic seal — the cornerstone stamp drifts a few px toward the cursor,
  // "a compass needle finding true north" (its own brief). Pointer-fine only,
  // honours reduced-motion, GPU transform; touch/mobile keep the static seal.
  const sealRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sealRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const MAX = 6; // px of drift at the viewport edge
    let raf = 0;
    let tx = 0, ty = 0, gx = 0, gy = 0;
    let promoted = false;
    const promote = () => { if (!promoted) { el.style.willChange = "transform"; promoted = true; } };
    const tick = () => {
      tx += (gx - tx) * 0.08;
      ty += (gy - ty) * 0.08;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      if (Math.abs(gx - tx) > 0.1 || Math.abs(gy - ty) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        // Settled — release the GPU layer hint until the next move.
        el.style.willChange = "auto";
        promoted = false;
      }
    };
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width) return; // hidden (below md) — skip
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      gx = Math.max(-1, Math.min(1, dx)) * MAX;
      gy = Math.max(-1, Math.min(1, dy)) * MAX;
      if (!raf) { promote(); raf = requestAnimationFrame(tick); }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      el.style.willChange = "";
      el.style.transform = "";
    };
  }, []);

  return (
    <TemplateLayout onBookClick={onBookClick}>
      {/* HERO */}
      <RemixSlot name="HERO_IMAGE" hint="Bind a service-specific AVIF (≤140KB)">
        <section className="relative isolate flex items-start overflow-hidden border-b border-seam/60 bg-bone md:min-h-[82svh] md:items-center lg:min-h-[88svh]">
          <BlueprintGrain opacity={0.018} />
          {/* Atmospheric depth — faint warm aura so the imageless hero reads layered, not flat */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(48% 55% at 16% 52%, hsl(var(--forest) / 0.05), transparent 70%), radial-gradient(42% 50% at 90% 26%, hsl(var(--copper) / 0.05), transparent 72%)",
            }}
          />
          {MASTER_REMIX.HERO_IMAGE && (
            <HeroImage src={MASTER_REMIX.HERO_IMAGE} alt="" gradientFrom="left" opacity={32} />
          )}
          <div className="container relative z-10 mx-auto w-full px-6 py-20 md:py-28">
            <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
              {/* LEFT — the argument (sequential reveal: eyebrow → headline → mark → sub → CTA) */}
              <div className="md:col-span-7">
                <ScrollReveal>
                  {/* Eyebrow: 24px copper hairline + Jost caps */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="hairline-copper w-6 flex-shrink-0 animate-line-grow" />
                    <p className="eyebrow-copper">{c.hero.eyebrow}</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.06} className="hero-rise">
                  <h1
                    className="text-balance text-charcoal leading-[1.04] tracking-[-0.02em] md:leading-[0.95] md:tracking-[-0.035em]"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                      fontWeight: 300,
                      fontKerning: "normal",
                      fontFeatureSettings: '"kern" 1, "liga" 1',
                    }}
                  >
                    {c.hero.headline}
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.14}>
                  {/* Hand-etched copper underline — a measured stroke, not a full-column rule */}
                  <HeroEtchedUnderline className="mt-5 mb-5 block w-40 md:w-56" />
                  {/* Slogan whisper — beneath the H1 */}
                  <SloganHeartbeat variant="whisper" className="mb-7 block" />
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="max-w-[56ch] text-pretty text-body-lg text-graphite">{c.hero.sub}</p>
                </ScrollReveal>

                <ScrollReveal delay={0.28}>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <button
                      type="button"
                      onClick={() => onBookClick?.({ source: "Home hero" })}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-none bg-forest px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground shadow-[0_1px_0_hsl(var(--forest-deep))] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_12px_30px_-10px_hsl(var(--forest)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bone active:translate-y-0 active:scale-[0.985] sm:w-auto"
                    >
                      {TEMPLATE_COPY.cta.primary}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                      />
                    </button>
                    <Link
                      to="/pricing"
                      className="w-full rounded-none border border-[hsl(var(--copper)/0.35)] px-7 py-4 text-center text-sm font-medium uppercase tracking-[0.12em] text-charcoal transition-[transform,color,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-forest/30 hover:bg-forest/[0.04] hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bone active:translate-y-0 active:scale-[0.985] sm:w-auto"
                    >
                      {TEMPLATE_COPY.cta.secondary}
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Mobile-only above-fold trust strip — answers "is this legit + low-risk?"
                    at the decision point, before any scroll. Desktop unchanged (md:hidden);
                    the same proof renders in the Trust Bar section for >=md. */}
                <ScrollReveal delay={0.34} className="md:hidden">
                  <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-seam/60 pt-5">
                    {MASTER_REMIX.TRUST_NUMBERS.slice(0, 3).map((t) => (
                      <li key={t.label} className="flex items-baseline gap-1.5">
                        <span className="text-base font-semibold leading-none text-forest">{t.number}</span>
                        <span className="text-[11px] uppercase leading-tight tracking-[0.1em] text-mist">{t.label}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>

              {/* RIGHT — the seal: cornerstone registration mark, grid-anchored (desktop) */}
              <ScrollReveal delay={0.34} className="hidden md:col-span-5 md:block">
                <div className="flex items-center justify-center border-l border-seam/70 pl-10 lg:pl-16">
                  <div ref={sealRef}>
                    <CornerstoneStamp size={132} />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Mobile seal — in-flow beneath the argument, never colliding */}
            <ScrollReveal delay={0.34} className="md:hidden">
              <div className="mt-12 flex items-center gap-4">
                <span className="hairline-copper flex-1" />
                <CornerstoneStamp size={56} />
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll cue — a copper bead falls down the seam. Wordless wayfinding,
              desktop-only so it never crowds the phone seal. Reduced-motion safe. */}
          <div
            aria-hidden
            className="hero-scroll-cue pointer-events-none absolute bottom-0 left-1/2 z-10 hidden h-12 w-px -translate-x-1/2 bg-[hsl(var(--copper)/0.16)] lg:block"
          />
        </section>
      </RemixSlot>

      {/* TRUST BAR */}
      <SectionFrame tone="paper" size="sm">
        <RemixSlot name="TRUST_NUMBERS">
          <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} />
        </RemixSlot>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-seam/60 pt-6 md:flex-row md:items-center">
          <p className="font-eyebrow text-[11px] tracking-[0.18em] text-mist md:text-[11px]">
            Since 1958 · Cochrane, AB
          </p>
          <FoundationCounter />
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
