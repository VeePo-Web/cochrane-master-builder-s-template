/**
 * ObjectionSection — Hormozi + Brunson false belief destruction.
 *
 * NOT a FAQ. An active objection handler. Brunson: before someone buys,
 * three false beliefs must be broken. Hormozi: address each with
 * a pattern interrupt headline + price anchor + risk reversal.
 *
 * Palette: template tokens only. Dark objection peak built from
 * ink-blueprint + copper so it reads as the same product as every page.
 * Universal across all remix sites — the three objections never change,
 * only the (now generic) examples do.
 */

import { motion } from "framer-motion";

interface Objection {
  num: string;
  falseBelief: string;
  headline: string;
  body: string;
  resolution: string;
}

interface ObjectionSectionProps {
  objections?: Objection[];
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const DEFAULT_OBJECTIONS: Objection[] = [
  {
    num: "01",
    falseBelief: "Quality work always costs more than I can afford.",
    headline: "The expensive option is paying twice.",
    body: "The cheapest quote is rarely the cheapest job. Work done wrong gets paid for twice — once to do it, once to redo it. Our written quote is tied to your exact scope, and our guarantee means the number you approve is the number you pay. You pay once. That's the math.",
    resolution:
      "A written quote tied to your specific scope. A guarantee that means you never pay for the same job again. The investment you make is the last one you make.",
  },
  {
    num: "02",
    falseBelief: "Everyone says they're different. None of them are.",
    headline: "We know. That's why everything is in writing.",
    body: "We hear it from almost every client who called us after a bad experience. So we don't ask you to take our word for it. The quote is written. The scope is written. The guarantee is written — on the invoice. A promise you can read is a different thing from a promise you're told.",
    resolution:
      "We work on that assumption every single time we quote a job. The quote is written. The guarantee is written. The timeline is agreed before any work starts. Which is why the guarantee goes on the invoice.",
  },
  {
    num: "03",
    falseBelief: "I can deal with this later. It's not that urgent.",
    headline: "The problem will not fix itself.",
    body: "Small problems rarely stay small. The job that's straightforward today becomes a bigger, costlier one the longer it waits. The right time to deal with it was a while ago — the second-best time is now, while it is still the smaller invoice.",
    resolution:
      "The job is cheaper now than it will be in a year. The problem is smaller now than it will feel after months of living with it. The right time is always slightly in the past.",
  },
];

export const ObjectionSection = ({
  objections = DEFAULT_OBJECTIONS,
  className = "",
}: ObjectionSectionProps) => {
  return (
    <section
      className={["bg-ink-blueprint py-20 md:py-32 overflow-hidden", className].join(
        " "
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <div className="inline-block rounded-full border border-copper/35 bg-copper/10 px-4 py-1.5 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper">
              The real questions
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-bone font-light italic max-w-xl">
            What people actually want to know before they hire us.
          </h2>
        </motion.div>

        {/* Three objection panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {objections.map(({ num, falseBelief, headline, body, resolution }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            >
              {/* Dark Double-Bezel */}
              <div className="ring-1 ring-bone/10 rounded-[1.5rem] p-1.5 bg-bone/5 h-full">
                <div className="rounded-[calc(1.5rem-0.375rem)] p-8 bg-[hsl(215_30%_11%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] h-full flex flex-col">
                  {/* Number + false belief label */}
                  <div>
                    <span
                      className="font-display text-[4rem] leading-none italic text-copper/25 select-none block"
                      aria-hidden
                    >
                      {num}
                    </span>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 mt-1">
                      The false belief: "{falseBelief}"
                    </p>
                  </div>

                  {/* Pattern interrupt headline */}
                  <h3 className="font-display text-[1.5rem] leading-[1.2] tracking-[-0.01em] text-bone italic font-light mt-6">
                    {headline}
                  </h3>

                  {/* Body */}
                  <p className="mt-5 font-body text-[0.9375rem] leading-[1.8] text-bone/60 font-light flex-1">
                    {body}
                  </p>

                  {/* Resolution — copper, slightly elevated */}
                  <div className="mt-7 border-t border-bone/10 pt-6">
                    <p className="font-display text-[1rem] leading-[1.5] tracking-[-0.005em] text-copper/80 italic font-light">
                      {resolution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
