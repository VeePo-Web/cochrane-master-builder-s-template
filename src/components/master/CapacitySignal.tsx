/**
 * CapacitySignal — Hormozi's honest scarcity principle.
 *
 * Real capacity signals. Never fake urgency — real urgency converts
 * better and never destroys trust. Update CAPACITY config weekly.
 *
 * Variants:
 *   "banner"  — full-width band, between sections
 *   "inline"  — single line, above CTA buttons in hero sections
 *   "chip"    — small pill badge, sticky CTAs or nav
 */

import { CAPACITY } from "@/config/capacity.config";

interface CapacitySignalProps {
  variant?: "banner" | "inline" | "chip";
  className?: string;
}

// Pulsing dot — signals live / real-time status
const PulseDot = () => (
  <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden>
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-50" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
  </span>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className="w-3.5 h-3.5 flex-shrink-0"
    aria-hidden
  >
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5 1.5V3.5M11 1.5V3.5M2 6.5H14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

export const CapacitySignal = ({
  variant = "banner",
  className = "",
}: CapacitySignalProps) => {
  if (!CAPACITY.isActive) return null;

  const weeksText =
    CAPACITY.weeksOut === 1
      ? "1 week out"
      : `${CAPACITY.weeksOut} weeks out`;

  const slotsText =
    CAPACITY.slotsRemaining === 1
      ? `${CAPACITY.slotsRemaining} project slot remaining`
      : `${CAPACITY.slotsRemaining} project slots remaining`;

  // ── Chip ─────────────────────────────────────────────────────────────────
  if (variant === "chip") {
    return (
      <div
        className={[
          "inline-flex items-center gap-2 rounded-full",
          "border border-copper/25 bg-copper/8 px-3 py-1",
          className,
        ].join(" ")}
      >
        <PulseDot />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper">
          Booking {weeksText}
        </span>
      </div>
    );
  }

  // ── Inline ────────────────────────────────────────────────────────────────
  if (variant === "inline") {
    return (
      <div
        className={[
          "flex flex-wrap items-center gap-x-6 gap-y-2",
          className,
        ].join(" ")}
      >
        <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-copper/70">
          <PulseDot />
          Currently booking {weeksText}
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-copper/50">
          <CalendarIcon />
          {slotsText} in {CAPACITY.month}
        </span>
      </div>
    );
  }

  // ── Banner ────────────────────────────────────────────────────────────────
  return (
    <div
      className={[
        "w-full border-y border-forest/10 bg-forest/5 py-3 px-6",
        className,
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
        <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
          <PulseDot />
          Currently booking {weeksText}
        </span>
        <span
          className="hidden sm:block w-px h-4 bg-seam"
          aria-hidden
        />
        <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-copper/70">
          <CalendarIcon />
          {slotsText} in {CAPACITY.month}
        </span>
      </div>
    </div>
  );
};
