/**
 * The 4-of-8 Gate — the make-or-break of safe programmatic local SEO.
 *
 * A matrix cell ({sub-service} × {community}) is only ELIGIBLE for generation
 * if it assembles >= GATE_THRESHOLD genuine local signals. Cells below the bar
 * are SKIPPED (never noindexed-but-present, never padded) so thin geo-pages
 * never drag the domain down or trip Google's scaled-content / doorway review.
 *
 * Pure logic — the build/route layer consumes this to decide which URLs exist
 * and which enter the sitemap.
 */

import type { SubService } from "@/config/template/remix-variables";
import type { Community } from "@/data/communities";
import { getLocalSignals, type SignalMaps, type MatrixCell, type SignalKey } from "./signals";

export const GATE_THRESHOLD = 4;

export interface GateResult {
  eligible: boolean;
  signals: SignalKey[];
  count: number;
  /** Why a cell was skipped (empty when eligible). */
  reason?: string;
}

/** Evaluate a single matrix cell against the 4-of-8 Gate. */
export function evaluateCell(cell: MatrixCell, maps: SignalMaps = {}): GateResult {
  const { present } = getLocalSignals(cell, maps);
  const count = present.length;
  const eligible = count >= GATE_THRESHOLD;
  return {
    eligible,
    signals: present,
    count,
    reason: eligible ? undefined : `only ${count}/${GATE_THRESHOLD} local signals (${present.join(", ") || "none"})`,
  };
}

export interface EligibilityReport {
  intended: number;
  eligible: number;
  skipped: number;
  skipRate: number;
  /** Eligible-cell count per service slug. */
  perService: Record<string, number>;
  /** Skip reasons → how many cells hit them. */
  skipReasons: Record<string, number>;
  /** The eligible cells, ready for the build/sitemap layer. */
  eligibleCells: { serviceSlug: string; communitySlug: string; signals: SignalKey[] }[];
}

/** Run the Gate across the full SUB_SERVICES × COMMUNITIES matrix. */
export function matrixEligibilityReport(
  services: SubService[],
  communities: Community[],
  maps: SignalMaps = {},
): EligibilityReport {
  let eligible = 0;
  const perService: Record<string, number> = {};
  const skipReasons: Record<string, number> = {};
  const eligibleCells: EligibilityReport["eligibleCells"] = [];

  for (const svc of services) {
    perService[svc.slug] = 0;
    for (const community of communities) {
      const cell: MatrixCell = { serviceSlug: svc.slug, serviceTitle: svc.title, community };
      const res = evaluateCell(cell, maps);
      if (res.eligible) {
        eligible++;
        perService[svc.slug]++;
        eligibleCells.push({ serviceSlug: svc.slug, communitySlug: community.slug, signals: res.signals });
      } else {
        const key = `${res.count}/${GATE_THRESHOLD} signals`;
        skipReasons[key] = (skipReasons[key] ?? 0) + 1;
      }
    }
  }

  const intended = services.length * communities.length;
  const skipped = intended - eligible;
  return {
    intended,
    eligible,
    skipped,
    skipRate: intended > 0 ? skipped / intended : 0,
    perService,
    skipReasons,
    eligibleCells,
  };
}
