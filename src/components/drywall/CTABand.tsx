import type { BookingPrefill } from "@/config/drywall-booking";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface CTABandProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryLabel?: string;
  onPrimaryClick?: (prefill?: BookingPrefill) => void;
  /** Optional context to seed the booking modal when the primary CTA is tapped. */
  prefill?: BookingPrefill;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  /** Friction-reducer micro-copy rendered directly below the CTA buttons. */
  reassurance?: string;
}

const CTABand = ({
  eyebrow = "Next step",
  headline,
  body,
  primaryLabel = "Get my free quote",
  onPrimaryClick,
  prefill,
  secondaryLabel,
  onSecondaryClick,
  reassurance,
}: CTABandProps) => {
  return (
    <section data-cta-band className="relative overflow-hidden bg-forest text-primary-foreground">
      {/* Atmospheric ghost year — depth at Z exit point */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-0 bottom-0 font-display text-primary-foreground leading-none"
        style={{ fontSize: "clamp(8rem,22vw,20rem)", opacity: 0.06, lineHeight: 1 }}
      >
        {MASTER_REMIX.FOUNDATION_YEAR}
      </span>
      <div className="container relative mx-auto px-6 py-16 md:py-32">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-primary-foreground/70">{eyebrow}</p>
          <h2 className="mt-3 text-display-lg text-primary-foreground">{headline}</h2>
          {body && <p className="mt-6 max-w-2xl text-body-lg text-primary-foreground/85">{body}</p>}
          <div className="mt-8 flex flex-wrap gap-3 max-md:flex-col">
            <button
              type="button"
              onClick={() => onPrimaryClick?.(prefill)}
              className="rounded-sm bg-bone px-6 py-3.5 text-sm font-medium text-charcoal transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-paper hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 max-md:w-full"
            >
              {primaryLabel}
            </button>
            {secondaryLabel && (
              <button
                type="button"
                onClick={onSecondaryClick}
                className="rounded-sm border border-primary-foreground/30 px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-primary-foreground/10 hover:-translate-y-0.5 active:translate-y-0 max-md:w-full"
              >
                {secondaryLabel}
              </button>
            )}
          </div>
          {reassurance && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/55">
              {reassurance}
            </p>
          )}
          {/* Generational slogan — sealing every CTA band with the brand promise */}
          <p
            className="mt-10 uppercase text-primary-foreground/55"
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.24em",
            }}
          >
            <span aria-hidden style={{ color: "hsl(var(--copper))", marginRight: "0.6em" }}>▪</span>
            {MASTER_REMIX.BRAND_SLOGAN}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
