import type { TrustNumber } from "@/config/template/remix-variables";

interface TrustNumbersProps {
  items: TrustNumber[];
  variant?: "row" | "grid";
}

/**
 * The numerical proof bar. Hormozi: every claim must reduce to a number
 * the prospect can quote back. Renders as a single hairline-divided row
 * (variant 'row') or a 2x2 grid for the Reviews page (variant 'grid').
 */
const TrustNumbers = ({ items, variant = "row" }: TrustNumbersProps) => {
  if (variant === "grid") {
    return (
      <div className="grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="bg-paper p-8">
            <p className="font-display text-display-md text-forest">{it.number}</p>
            <p className="font-eyebrow mt-3 text-mist">{it.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 md:gap-x-8">
      {items.map((it) => (
        <li key={it.label} className="relative pt-5">
          <span aria-hidden className="absolute left-0 top-0 h-px w-8 bg-copper" />
          <span aria-hidden className="absolute left-0 top-0 h-px w-full bg-seam" />
          <p
            className="font-display tabular-nums text-forest"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {it.number}
          </p>
          <p className="mt-2 min-h-10 text-caption uppercase tracking-[0.18em] text-mist md:mt-3">{it.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default TrustNumbers;
