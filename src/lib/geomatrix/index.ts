/**
 * geomatrix — the Service × Location matrix foundation.
 *
 * Phase 1 (this barrel): addressability (slug), local-signal derivation,
 * the Scaled-Uniqueness Engine, and the 4-of-8 Gate. The page/route, static
 * schema, prerender, and discovery layer (sitemap/llms/robots) are later phases.
 *
 * See docs/service-location-matrix-plan.md and the /geomatrix skill.
 */

export { fnv1a, seed, seededIndex, pick } from "./hash";
export {
  getLocalSignals,
  ALL_SIGNAL_KEYS,
  type SignalKey,
  type SignalMaps,
  type LocalSignals,
  type MatrixCell,
} from "./signals";
export {
  buildLocalContext,
  buildLocalFaq,
  INTRO_VARIANT_COUNT,
} from "./uniqueness";
export {
  GATE_THRESHOLD,
  evaluateCell,
  matrixEligibilityReport,
  type GateResult,
  type EligibilityReport,
} from "./gate";
