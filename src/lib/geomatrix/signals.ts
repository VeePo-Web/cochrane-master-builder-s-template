/**
 * Local-specificity signal derivation — the data side of the 4-of-8 Gate.
 *
 * A matrix page ({sub-service} × {community}) is only generated if it can
 * assemble >= 4 genuine local signals. We DERIVE these from the existing rich
 * community data (landmarks, streets, faqs, nearestCommunities) + reviews —
 * no bulk authoring required. Optional per-region maps (condition/permit/
 * association) can be supplied by a remix to lift thin communities over the bar.
 *
 * Determinism: which landmark/street/review/faq is featured is keyed by a
 * stable seed, so the same URL is identical across builds.
 */

import type { Community } from "@/data/communities";
import { getNearestCommunities } from "@/data/communities";
import { REVIEWS, type Review } from "@/config/reviews";
import { seed, pick } from "./hash";

export type SignalKey =
  | "landmark"
  | "condition"
  | "project"
  | "permit"
  | "association"
  | "proximity"
  | "testimonial"
  | "localFaq";

export const ALL_SIGNAL_KEYS: SignalKey[] = [
  "landmark", "condition", "project", "permit",
  "association", "proximity", "testimonial", "localFaq",
];

/** Optional per-region enrichment a remix may provide to lift thin communities. */
export interface SignalMaps {
  /** region.slug → a service-relevant local condition note. */
  conditionByRegion?: Record<string, string>;
  /** region.slug → a local code/permit note. */
  permitByRegion?: Record<string, string>;
  /** community.slug → a named local association/event. */
  associationByCommunity?: Record<string, string>;
}

export interface LocalSignals {
  /** Which of the 8 signals resolved to real content for this cell. */
  present: SignalKey[];
  landmark?: string;
  project?: string;          // a named street → "work completed near {street}"
  proximity?: string;        // named nearby communities
  condition?: string;
  permit?: string;
  association?: string;
  testimonial?: Pick<Review, "name" | "community" | "quote" | "rating">;
  localFaq?: { question: string; answer: string };
}

export interface MatrixCell {
  serviceSlug: string;
  serviceTitle: string;
  community: Community;
}

/**
 * Assemble the local signals available for a matrix cell.
 * Each signal resolves from real data or stays absent (never padded).
 */
export function getLocalSignals(cell: MatrixCell, maps: SignalMaps = {}): LocalSignals {
  const { serviceSlug, community } = cell;
  const present: SignalKey[] = [];
  const out: LocalSignals = { present };

  // 1. Landmark — a named place in the community
  const landmark = pick(community.landmarks, seed(serviceSlug, community.slug, "landmark"));
  if (landmark) { out.landmark = landmark; present.push("landmark"); }

  // 3. Project reference — a named street as a completed-work locus
  const street = pick(community.streets, seed(serviceSlug, community.slug, "street"));
  if (street) { out.project = street; present.push("project"); }

  // 6. Proximity — named nearby communities (substantive, not just "the region")
  const nearest = getNearestCommunities(community.slug, 3).map((c) => c.name);
  if (nearest.length > 0) {
    out.proximity = nearest.join(", ");
    present.push("proximity");
  }

  // 8. Community-specific FAQ
  const faq = pick(community.faqs, seed(serviceSlug, community.slug, "faq"));
  if (faq) { out.localFaq = faq; present.push("localFaq"); }

  // 7. Named local testimonial — a review from this community
  const localReviews = REVIEWS.filter((r) => r.approved && r.community === community.name);
  const review = pick(localReviews, seed(serviceSlug, community.slug, "review"));
  if (review) {
    out.testimonial = { name: review.name, community: review.community, quote: review.quote, rating: review.rating };
    present.push("testimonial");
  }

  // 2/4/5. Optional remix-supplied enrichment
  const condition = maps.conditionByRegion?.[community.region];
  if (condition) { out.condition = condition; present.push("condition"); }
  const permit = maps.permitByRegion?.[community.region];
  if (permit) { out.permit = permit; present.push("permit"); }
  const association = maps.associationByCommunity?.[community.slug];
  if (association) { out.association = association; present.push("association"); }

  return out;
}
