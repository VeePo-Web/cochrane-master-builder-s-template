/**
 * /the-offer — The Grand Slam Offer page.
 *
 * Hormozi: every business needs one page whose ONLY job is to make the offer.
 * This page does nothing else. It converts or it doesn't.
 * Everything on the site should eventually lead here.
 *
 * Structure:
 *   1. Hero — offer name, tagline, compact guarantee chips
 *   2. GrandSlamOffer — full value stack + who for / not for
 *   3. GuaranteeBlock — full 3-tier guarantee
 *   4. ValueLadder — where this fits in the service path
 *   5. ObjectionSection — false belief destruction
 *   6. SocialProofEngine — featured Before/After reviews
 *   7. CapacitySignal — honest scarcity
 *   8. Final CTA — one action, one button
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { GrandSlamOffer } from "@/components/master/GrandSlamOffer";
import { GuaranteeBlock } from "@/components/master/GuaranteeBlock";
import { ValueLadder } from "@/components/master/ValueLadder";
import { ObjectionSection } from "@/components/master/ObjectionSection";
import { SocialProofEngine } from "@/components/master/SocialProofEngine";
import { CapacitySignal } from "@/components/master/CapacitySignal";
import { GenerationalBadge } from "@/components/master/StoryBrandTheme";

interface TheOfferProps {
  onBookClick?: () => void;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const child = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const TheOffer = ({ onBookClick }: TheOfferProps) => {
  useEffect(() => {
    const prev = document.title;
    document.title =
      "The Generational Finish Guarantee — Cochrane Master Builders";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main>
      {/* ══════════════════════════════════════════════════════════
          HERO — The offer name. Nothing else.
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0B1120] min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1120]"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 md:py-40">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={child}>
              <GenerationalBadge
                serviceName="Master Builders"
                variant="dark"
                className="mb-8"
              />
            </motion.div>

            <motion.h1
              variants={child}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.04]
                tracking-[-0.02em] text-white font-light max-w-3xl"
            >
              The Generational Finish Guarantee.
            </motion.h1>

            <motion.p
              variants={child}
              className="mt-6 max-w-xl text-[1.125rem] leading-[1.75]
                text-white/55 font-light font-body"
            >
              Everything included. Nothing hidden. All of it in writing.
            </motion.p>

            {/* Compact guarantee chips */}
            <motion.div variants={child} className="mt-8">
              <GuaranteeBlock variant="compact" />
            </motion.div>

            {/* Capacity signal */}
            <motion.div variants={child} className="mt-6">
              <CapacitySignal variant="inline" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GRAND SLAM OFFER — Full value stack + who for
      ═══════════════════════════════════════════════════════════ */}
      <GrandSlamOffer onBookClick={onBookClick} showGuarantee={false} />

      {/* ══════════════════════════════════════════════════════════
          GUARANTEE — 3-tier risk reversal
      ═══════════════════════════════════════════════════════════ */}
      <GuaranteeBlock variant="full" />

      {/* ══════════════════════════════════════════════════════════
          VALUE LADDER — Where this fits
      ═══════════════════════════════════════════════════════════ */}
      <ValueLadder highlightIndex={2} />

      {/* ══════════════════════════════════════════════════════════
          OBJECTION SECTION — False belief destruction
      ═══════════════════════════════════════════════════════════ */}
      <ObjectionSection />

      {/* ══════════════════════════════════════════════════════════
          SOCIAL PROOF — Before/After results
      ═══════════════════════════════════════════════════════════ */}
      <SocialProofEngine variant="featured" maxItems={3} />

      {/* ══════════════════════════════════════════════════════════
          CAPACITY SIGNAL — Honest scarcity
      ═══════════════════════════════════════════════════════════ */}
      <CapacitySignal variant="banner" />

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA — One action. One button. Nothing else.
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0B1120] py-40 md:py-56 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C9A87C]/55 mb-8">
            Cochrane Master Builders · The Offer
          </p>

          <h2
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]
              tracking-[-0.02em] text-white font-light"
          >
            Begin your project.
          </h2>

          <p
            className="mt-6 max-w-lg mx-auto text-[1.125rem] leading-[1.75]
              text-white/45 font-light font-body"
          >
            Two photos. One sentence. A written range within one business day.
            The guarantee is in writing before any work starts.
          </p>

          {/* Primary CTA */}
          <div className="mt-12">
            <button
              onClick={onBookClick}
              className="group inline-flex items-center gap-3 rounded-full
                bg-[#8B6B4A] px-8 py-5 font-body text-[0.875rem]
                tracking-[0.08em] uppercase text-white
                transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:bg-[#9E7B58]
                hover:shadow-[0_8px_32px_rgba(139,107,74,0.35)]
                active:scale-[0.98]"
            >
              Get Your Free Written Assessment
              <span
                className="w-8 h-8 rounded-full bg-white/12 flex items-center
                  justify-center transition-transform duration-500
                  group-hover:translate-x-1 group-hover:-translate-y-[1px]"
                aria-hidden
              >
                →
              </span>
            </button>
          </div>

          {/* Trust anchors */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              "Free Estimate",
              "Written Quote",
              "15-Year Structural Guarantee",
            ].map((a) => (
              <span
                key={a}
                className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/22"
              >
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default TheOffer;
