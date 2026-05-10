import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const TemplateNotFound = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.notFound;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <SectionFrame tone="bone" size="xl" grain>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-eyebrow mb-6">{c.eyebrow}</p>
          <h1 className="text-display-xl text-charcoal">{c.title}</h1>
          <p className="mt-6 text-body-lg text-graphite">{c.lede}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/template"
              className="cta-forest rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              Back to home
            </Link>
            <Link
              to="/template/services"
              className="rounded-sm border border-charcoal/20 px-6 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-bone"
            >
              See services
            </Link>
          </div>
        </div>
      </SectionFrame>
    </TemplateLayout>
  );
};

export default TemplateNotFound;
