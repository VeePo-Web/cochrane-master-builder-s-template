/**
 * /why-we-love — "Why We Love Drywall" manifesto page.
 *
 * Thin wrapper: sets document title, pulls the drywall manifesto config,
 * renders <TradeManifesto>. This is the pattern for all 150 sub-sites:
 *
 *   Tile Masters:      import { tileManifesto }     from "@/config/manifesto/tile.manifesto"
 *   Painting Masters:  import { paintingManifesto }  from "@/config/manifesto/painting.manifesto"
 *   etc.
 *
 * Zero component code changes needed per new trade. Fill the config → done.
 */

import { useEffect } from "react";
import { TradeManifesto } from "@/components/master/TradeManifesto";
import { drywallManifesto } from "@/config/manifesto/drywall.manifesto";

interface WhyWeLoveProps {
  onBookClick?: () => void;
}

const WhyWeLove = ({ onBookClick }: WhyWeLoveProps) => {
  useEffect(() => {
    const prev = document.title;
    document.title = drywallManifesto.pageTitle;
    return () => {
      document.title = prev;
    };
  }, []);

  return <TradeManifesto config={drywallManifesto} onBookClick={onBookClick} />;
};

export default WhyWeLove;
