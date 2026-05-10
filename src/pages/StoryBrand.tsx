/**
 * /our-story — The Cochrane Master Builders StoryBrand Identity Page.
 *
 * Seven sections following the Donald Miller StoryBrand framework:
 *   1. The Opening       — Character hook & emotional anchor
 *   2. The Character     — Who we build for
 *   3. The Problem       — What stands in the way
 *   4. The Guide         — Cochrane Master Builders as trusted authority
 *   5. The Plan          — The process that eliminates fear
 *   6. The Stakes        — Failure vs. success transformation
 *   7. The Call          — Final CTA, the decision
 *
 * Taste-skill spec: Editorial Luxury vibe + Z-Axis Cascade layout.
 * All motion: Framer Motion whileInView, custom cubic-bezier, Double-Bezel.
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { GenerationalBadge } from "@/components/master/StoryBrandTheme";
import bgTrowelArc from "@/assets/drywall/bg-blur-trowel-arc.jpg";
import bgBasementProgression from "@/assets/drywall/bg-blur-basement-progression.jpg";
import bgInsulationCavity from "@/assets/drywall/bg-blur-insulation-cavity.jpg";

interface StoryBrandProps {
  onBookClick?: () => void;
}

// ─── Motion constants ────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: EASE, delay },
});

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

// ─── Reusable Double-Bezel wrapper ───────────────────────────────────────────
const DoubleBezel = ({
  children,
  outerClass = "",
  innerClass = "",
}: {
  children: React.ReactNode;
  outerClass?: string;
  innerClass?: string;
}) => (
  <div
    className={[
      "ring-1 ring-[#1F2F4D]/08 rounded-[2rem] p-2 bg-[#EDE9E1]/50",
      outerClass,
    ].join(" ")}
  >
    <div
      className={[
        "rounded-[calc(2rem-0.5rem)] overflow-hidden",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]",
        innerClass,
      ].join(" ")}
    >
      {children}
    </div>
  </div>
);

// ─── Dark Double-Bezel (for Problem section cards) ───────────────────────────
const DarkBezel = ({
  children,
  innerClass = "",
}: {
  children: React.ReactNode;
  innerClass?: string;
}) => (
  <div className="ring-1 ring-white/08 rounded-[1.5rem] p-1.5 bg-white/[0.03]">
    <div
      className={[
        "rounded-[calc(1.5rem-0.375rem)] p-8",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        innerClass,
      ].join(" ")}
    >
      {children}
    </div>
  </div>
);

// ─── Eyebrow pill ─────────────────────────────────────────────────────────────
const Eyebrow = ({
  children,
  variant = "bronze",
}: {
  children: React.ReactNode;
  variant?: "bronze" | "navy" | "light";
}) => {
  const styles: Record<string, string> = {
    bronze:
      "border border-[#8B6B4A]/35 bg-[#8B6B4A]/10 text-[#C9A87C]",
    navy:
      "border border-[#1F2F4D]/12 bg-[#1F2F4D]/06 text-[#5C6B8A]",
    light:
      "border border-white/15 bg-white/06 text-white/50",
  };
  return (
    <div
      className={[
        "inline-block rounded-full px-4 py-1.5 mb-6",
        "font-mono text-[10px] uppercase tracking-[0.28em]",
        styles[variant],
      ].join(" ")}
    >
      {children}
    </div>
  );
};

// ─── Page component ───────────────────────────────────────────────────────────
const StoryBrand = ({ onBookClick }: StoryBrandProps) => {
  useEffect(() => {
    const prev = document.title;
    document.title =
      "Our Story — Cochrane Master Builders · Building for Generations";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main>
      {/* ══════════════════════════════════════════════════════════════
          §1 — THE OPENING — Character Hook & Emotional Anchor
          Background: near-black navy (#0B1120), warm film grain
          Layout: full-bleed min-h-[100dvh], centered
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex items-center bg-[#0B1120] overflow-hidden">
        {/* Atmospheric background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgTrowelArc})`,
            opacity: 0.1,
            filter: "saturate(0.5)",
          }}
          aria-hidden
        />
        {/* Gradient vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/70 via-transparent to-[#0B1120]/90"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <motion.div variants={staggerChild}>
              <GenerationalBadge
                serviceName="Master Builders"
                variant="dark"
                className="mb-8"
              />
            </motion.div>

            {/* H1 — two lines, line 2 italic */}
            <motion.h1
              variants={staggerChild}
              className="font-display text-[clamp(3.25rem,8vw,7.5rem)]
                leading-[1.02] tracking-[-0.02em] text-white font-light"
            >
              Building Strong
              <br />
              <em className="italic text-white/80">Foundations.</em>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={staggerChild}
              className="mt-8 max-w-2xl text-[1.125rem] leading-[1.8]
                text-white/55 font-light font-body"
            >
              Not just for today. For the children who will grow up inside
              these walls. For the grandchildren who will one day say — this
              was built right.
            </motion.p>

            {/* Primary CTA — Button-in-Button */}
            <motion.div variants={staggerChild} className="mt-12">
              <button
                onClick={onBookClick}
                className="group inline-flex items-center gap-3 rounded-full
                  bg-[#8B6B4A] px-7 py-4 font-body text-[0.875rem]
                  tracking-[0.06em] uppercase text-white
                  transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                  hover:bg-[#9E7B58] hover:shadow-[0_8px_32px_rgba(139,107,74,0.3)]
                  active:scale-[0.98]"
              >
                Schedule Your Consultation
                <span
                  className="w-8 h-8 rounded-full bg-white/15 flex items-center
                    justify-center transition-transform duration-500
                    group-hover:translate-x-1 group-hover:-translate-y-[1px]"
                  aria-hidden
                >
                  →
                </span>
              </button>
            </motion.div>

            {/* Trust micro-anchors */}
            <motion.div
              variants={staggerChild}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {[
                "Free Estimate",
                "No Obligation",
                "Cochrane-Based",
              ].map((a) => (
                <span
                  key={a}
                  className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25"
                >
                  {a}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §2 — THE CHARACTER — Who We Build For
          Background: warm parchment (#FDFBF7)
          Layout: asymmetric 7/5 split, image with Double-Bezel
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FDFBF7] py-32 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left — text block */}
            <motion.div
              {...fadeUp()}
              className="col-span-12 md:col-span-7"
            >
              <Eyebrow variant="navy">Who we build for</Eyebrow>
              <h2
                className="font-display text-[clamp(2.25rem,4vw,3.75rem)]
                  leading-[1.08] tracking-[-0.02em] text-[#1F2F4D] max-w-xl"
              >
                Your home is the most important thing you will ever pass down.
              </h2>
              <p
                className="mt-8 max-w-lg text-[1.125rem] leading-[1.8]
                  text-[#5C6B8A] font-light font-body"
              >
                The matriarch who needs the work done right the first time —
                no mess, no second visits. The patriarch who recognizes
                craftsmanship when he sees it, and knows it from a contractor
                who is simply filling space.
              </p>
              <p
                className="mt-5 max-w-lg text-[1.125rem] leading-[1.8]
                  text-[#5C6B8A] font-light font-body"
              >
                These are the people we work for. People who understand that
                a wall is not just a wall — it is a part of the story their
                family will live inside.
              </p>
            </motion.div>

            {/* Right — Double-Bezel image, Z-axis rotated */}
            <motion.div
              {...fadeUp(0.15)}
              className="col-span-12 md:col-span-5"
            >
              <DoubleBezel>
                <img
                  src={bgInsulationCavity}
                  alt="Craftsman finishing interior wall with care"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ transform: "rotate(-1.5deg) scale(1.04)" }}
                  loading="lazy"
                />
              </DoubleBezel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §3 — THE PROBLEM — What Stands in the Way
          Background: brand navy (#1F2F4D)
          Layout: asymmetric bento grid — tall left + 2 right stacked
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1F2F4D] py-32 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <Eyebrow variant="bronze">The problem</Eyebrow>
            <h2
              className="font-display text-[clamp(2rem,3.5vw,3.25rem)]
                leading-[1.1] tracking-[-0.015em] text-white font-light italic
                max-w-2xl"
            >
              Most contractors aren't built for work that lasts. They're built
              for speed.
            </h2>
          </motion.div>

          {/* Asymmetric bento grid */}
          <div className="grid grid-cols-12 gap-4 mt-16">
            {/* Panel 1 — tall left */}
            <motion.div
              {...fadeUp(0.08)}
              className="col-span-12 md:col-span-5 md:row-span-2"
            >
              <DarkBezel innerClass="bg-[#0B1120] h-full min-h-[280px] md:min-h-[420px] flex flex-col justify-between">
                <span
                  className="font-display text-[5rem] leading-none italic
                    text-[#8B6B4A]/30 select-none"
                  aria-hidden
                >
                  01
                </span>
                <div>
                  <h3
                    className="font-display text-[1.625rem] leading-[1.2]
                      tracking-[-0.01em] text-white font-light"
                  >
                    The job they call too small to bother with.
                  </h3>
                  <p
                    className="mt-4 text-[0.9375rem] leading-[1.75]
                      text-white/45 font-light font-body"
                  >
                    Until you hire someone who does it badly — and you're left
                    with a wall that reminds you of that decision every day.
                  </p>
                </div>
              </DarkBezel>
            </motion.div>

            {/* Panel 2 — wide top right */}
            <motion.div
              {...fadeUp(0.16)}
              className="col-span-12 md:col-span-7"
            >
              <DarkBezel innerClass="bg-white/[0.04] min-h-[190px] flex flex-col justify-between">
                <span
                  className="font-display text-[4rem] leading-none italic
                    text-[#8B6B4A]/25 select-none"
                  aria-hidden
                >
                  02
                </span>
                <div>
                  <h3
                    className="font-display text-[1.5rem] leading-[1.25]
                      tracking-[-0.01em] text-white font-light"
                  >
                    The contractor who gives a quote, then disappears for six
                    weeks.
                  </h3>
                </div>
              </DarkBezel>
            </motion.div>

            {/* Panel 3 — wide bottom right */}
            <motion.div
              {...fadeUp(0.24)}
              className="col-span-12 md:col-span-7"
            >
              <DarkBezel innerClass="bg-[#8B6B4A]/12 min-h-[190px] flex flex-col justify-between">
                <span
                  className="font-display text-[4rem] leading-none italic
                    text-[#8B6B4A]/30 select-none"
                  aria-hidden
                >
                  03
                </span>
                <div>
                  <h3
                    className="font-display text-[1.5rem] leading-[1.25]
                      tracking-[-0.01em] text-white font-light"
                  >
                    The wall you have been looking at for a year because it
                    never felt like the right time.
                  </h3>
                </div>
              </DarkBezel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §4 — THE GUIDE — Cochrane Master Builders
          Background: full-bleed atmospheric photo + dark overlay
          Layout: centered pull-quote + three authority pillars
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-40 md:py-56 overflow-hidden">
        {/* Full-bleed background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgBasementProgression})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[#0B1120]/72"
          aria-hidden
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Editorial pull-quote */}
          <motion.div
            {...fadeUp()}
            className="text-center"
          >
            {/* Decorative opening quote */}
            <div
              className="font-display text-[8rem] leading-none text-[#8B6B4A]/18
                mb-[-3rem] select-none"
              aria-hidden
            >
              "
            </div>
            <blockquote
              className="font-display text-[clamp(1.875rem,3.5vw,3rem)]
                leading-[1.3] tracking-[-0.01em] text-white/88 italic font-light"
            >
              We do not build projects. We build the parts of your home your
              grandchildren will touch.
            </blockquote>
            <p
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em]
                text-[#C9A87C]/70"
            >
              — Cochrane Master Builders · Est. Legacy
            </p>
          </motion.div>

          {/* Three authority pillars */}
          <motion.div
            {...fadeUp(0.15)}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10
              overflow-hidden rounded-xl"
          >
            {[
              {
                value: "4th",
                label: "Generation Craftsmanship",
                isText: true,
              },
              { value: "15yr", label: "Structural Warranty", isText: true },
              { value: "shield", label: "Cochrane Born & Raised", isText: false },
            ].map(({ value, label, isText }) => (
              <div
                key={label}
                className="bg-[#0B1120]/82 px-8 py-12 text-center"
              >
                {isText ? (
                  <p
                    className="font-display text-[3.25rem] leading-none italic
                      text-[#C9A87C] font-light"
                  >
                    {value}
                  </p>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A87C"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-12 h-12 mx-auto"
                    aria-hidden
                  >
                    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                  </svg>
                )}
                <p
                  className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em]
                    text-white/55"
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §5 — THE PLAN — How It Works
          Background: warm parchment (#FDFBF7)
          Layout: vertical Z-axis cascade — slightly rotated cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FDFBF7] py-32 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <Eyebrow variant="navy">The plan</Eyebrow>
            <h2
              className="font-display text-[clamp(2rem,3.5vw,3.25rem)]
                leading-[1.1] tracking-[-0.015em] text-[#1F2F4D]"
            >
              A process built for people who have been let down before.
            </h2>
          </motion.div>

          {/* Z-axis cascade cards */}
          <div className="max-w-3xl mx-auto mt-16 space-y-3">
            {[
              {
                num: "01",
                title: "Send Your Photos",
                body: "Two photographs and one sentence about the space. That is all it takes to start. No phone calls, no commitment — just a clear picture of what you're working with.",
                rotate: "rotate-[0.4deg]",
              },
              {
                num: "02",
                title: "Receive a Transparent Range",
                body: "Within one business day — a realistic ballpark tied to your specific scope, in writing. Not a vague estimate. Not a sales call. A number you can actually plan around.",
                rotate: "rotate-[-0.3deg]",
              },
              {
                num: "03",
                title: "A Contained, Respected Worksite",
                body: "We arrive on time, confine the work area, protect your home as if it were ours. Because when you hire us, for that window of time, it is.",
                rotate: "rotate-[0.2deg]",
              },
              {
                num: "04",
                title: "The Generational Finish",
                body: "We leave when the result is finished — not patched, not 'good enough.' Finished. Touch-ups guaranteed in writing for 14 days. Structural work for 15 years.",
                rotate: "rotate-0",
              },
            ].map(({ num, title, body, rotate }, i) => (
              <motion.div
                key={num}
                {...fadeUp(i * 0.1)}
                className={rotate}
              >
                {/* Light Double-Bezel */}
                <div
                  className="ring-1 ring-[#1F2F4D]/06 rounded-[1.75rem] p-1.5
                    bg-white/80"
                >
                  <div
                    className="rounded-[calc(1.75rem-0.375rem)] p-8 bg-[#FDFBF7]
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Step number */}
                      <span
                        className="font-display text-[5rem] leading-none italic
                          text-[#8B6B4A]/25 select-none flex-shrink-0"
                        aria-hidden
                      >
                        {num}
                      </span>
                      {/* Content */}
                      <div className="md:pt-2">
                        <h3
                          className="font-display text-[1.625rem] leading-[1.15]
                            tracking-[-0.01em] text-[#1F2F4D]
                            md:mt-[-1.25rem]"
                        >
                          {title}
                        </h3>
                        <p
                          className="mt-4 text-[1rem] leading-[1.75]
                            text-[#5C6B8A] font-light font-body max-w-md"
                        >
                          {body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §6 — THE STAKES — Failure vs. Success
          Layout: full-width split panel — dark left, cream right
          No background images — pure typographic contrast
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 min-h-[60vh] overflow-hidden">
        {/* Vertical divider */}
        <div
          className="absolute inset-y-0 left-1/2 w-px bg-[#1F2F4D]/12
            hidden md:block"
          aria-hidden
        />

        {/* Left — Failure */}
        <motion.div
          {...fadeUp()}
          className="bg-[#0B1120] px-10 md:px-16 py-24 flex flex-col justify-center"
        >
          <Eyebrow variant="light">If you delay</Eyebrow>
          <h3
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)]
              leading-[1.15] tracking-[-0.01em] text-white/70 italic font-light"
          >
            The wall does not fix itself.
          </h3>
          <ul className="mt-8 space-y-4">
            {[
              "Small damage becomes structural compromise.",
              "The contractor you waited to call charges double — if they even return your call.",
              "The home you pass down carries the weight of what you chose not to do.",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-[0.9375rem]
                  leading-[1.8] text-white/40 font-light font-body"
              >
                <span
                  className="mt-[0.35rem] w-1.5 h-1.5 rounded-full bg-[#8B6B4A]/40
                    flex-shrink-0"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — Success */}
        <motion.div
          {...fadeUp(0.12)}
          className="bg-[#FDFBF7] px-10 md:px-16 py-24 flex flex-col justify-center"
        >
          <Eyebrow variant="navy">When you build right</Eyebrow>
          <h3
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)]
              leading-[1.15] tracking-[-0.01em] text-[#1F2F4D] font-medium"
          >
            Your home tells a story of intention.
          </h3>
          <ul className="mt-8 space-y-4">
            {[
              "Work done once, done completely, with a guarantee attached.",
              "A clean site, clear communication, and a result you walk past with pride.",
              "A foundation that outlasts the reason you needed it fixed.",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-[0.9375rem]
                  leading-[1.8] text-[#5C6B8A] font-light font-body"
              >
                <span
                  className="mt-[0.35rem] w-1.5 h-1.5 rounded-full bg-[#8B6B4A]
                    flex-shrink-0"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §7 — THE CALL — Final CTA
          Background: #0B1120 — darkest navy
          Layout: centered, massive Cormorant headline
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0B1120] py-40 md:py-56 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={staggerChild}>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]
                text-[#C9A87C]/60 mb-8"
            >
              Cochrane Master Builders · Family Legacy
            </p>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            variants={staggerChild}
            className="font-display text-[clamp(2.75rem,6vw,5.5rem)]
              leading-[1.04] tracking-[-0.02em] text-white font-light"
          >
            Your foundation.
            <br />
            Their{" "}
            <em className="italic text-white/80">inheritance.</em>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            variants={staggerChild}
            className="mt-8 max-w-xl mx-auto text-[1.125rem] leading-[1.8]
              text-white/45 font-light font-body"
          >
            Every great family home started with a single decision to build it
            right. Make that decision today.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={staggerChild} className="mt-12">
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
              Get Your Free Estimate
              <span
                className="w-8 h-8 rounded-full bg-white/12 flex items-center
                  justify-center transition-transform duration-500
                  group-hover:translate-x-1 group-hover:-translate-y-[1px]"
                aria-hidden
              >
                →
              </span>
            </button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div variants={staggerChild} className="mt-4">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full
                border border-white/12 px-8 py-4 font-body text-[0.875rem]
                tracking-[0.08em] uppercase text-white/50
                hover:border-white/25 hover:text-white/80
                transition-all duration-500"
            >
              View Our Work
            </a>
          </motion.div>

          {/* Trust anchors */}
          <motion.div
            variants={staggerChild}
            className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2"
          >
            {[
              "Free Estimate",
              "Cochrane Team",
              "Guaranteed in Writing",
            ].map((anchor) => (
              <span
                key={anchor}
                className="font-mono text-[9px] uppercase tracking-[0.22em]
                  text-white/22"
              >
                {anchor}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default StoryBrand;
