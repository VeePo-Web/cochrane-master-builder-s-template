/**
 * Capacity Signal Configuration — Hormozi's honest scarcity principle.
 *
 * NEVER fake urgency. Real scarcity signals create real urgency.
 * Update weeksOut and slotsRemaining weekly/monthly.
 * Set isActive: false during slow periods to hide the component.
 *
 * Hormozi: "Scarcity must be real or it destroys trust."
 */

export const CAPACITY = {
  /** How many weeks out are you currently booking? Update weekly. */
  weeksOut: 3,
  /** How many project slots remain this month? Update at start of each month. */
  slotsRemaining: 4,
  /** Current or upcoming month name */
  month: "June",
  /** Set false to hide CapacitySignal component entirely (e.g. slow season) */
  isActive: true,
} as const;
