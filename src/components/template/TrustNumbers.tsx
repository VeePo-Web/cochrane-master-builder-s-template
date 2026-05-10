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
    <ul className="flex flex-wrap items-baseline justify-center gap-x-12 gap-y-6 text-center md:justify-between">
      {items.map((it) => (
        <li key={it.label} className="min-w-[8rem]">
          <p className="font-display text-display-sm text-forest md:text-display-md">{it.number}</p>
          <p className="mt-2 text-caption uppercase tracking-[0.18em] text-mist">{it.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default TrustNumbers;
