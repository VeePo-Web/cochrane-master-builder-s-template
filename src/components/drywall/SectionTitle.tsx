interface SectionTitleProps {
  eyebrow?: string;
  headline: string;
  lede?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

const SectionTitle = ({ eyebrow, headline, lede, align = "left", as: Tag = "h2" }: SectionTitleProps) => {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={alignCls}>
      {eyebrow && (
        align === "center" ? (
          <p className="font-eyebrow mb-4">{eyebrow}</p>
        ) : (
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 flex-shrink-0 bg-copper/40" />
            <p className="font-eyebrow">{eyebrow}</p>
          </div>
        )
      )}
      <Tag className={Tag === "h1" ? "text-display-xl text-charcoal" : Tag === "h2" ? "text-display-lg text-charcoal" : "text-display-md text-charcoal"}>
        {headline}
      </Tag>
      {lede && <p className="mt-6 max-w-2xl text-body-lg text-graphite">{lede}</p>}
    </div>
  );
};

export default SectionTitle;
