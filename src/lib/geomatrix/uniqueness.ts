/**
 * The Scaled-Uniqueness Engine.
 *
 * Turns one template into N genuinely-local pages. A deterministic seed per
 * (service × community) selects an intro variant and weaves in the assembled
 * signals, so neighbouring pages read differently while each URL is stable
 * across builds. This is what keeps 600 pages out of "scaled content abuse".
 *
 * No page/JSX here — pure content composition the matrix page will consume.
 */

import { seed, seededIndex } from "./hash";
import type { LocalSignals, MatrixCell } from "./signals";

/** Intro variants. Each weaves available signals and degrades gracefully. */
const INTRO_VARIANTS: ((c: MatrixCell, s: LocalSignals) => string)[] = [
  (c, s) =>
    `For homeowners in ${c.community.name}, ${c.serviceTitle.toLowerCase()} is one of the ` +
    `projects we're asked about most` +
    (s.landmark ? ` — from the homes around ${s.landmark}` : "") +
    (s.project ? ` to the newer builds off ${s.project}` : "") +
    `. ${proximityLine(s)}`,
  (c, s) =>
    `${c.serviceTitle} in ${c.community.name} comes with the same written standard we hold ` +
    `everywhere we work` +
    (s.project ? `, whether the job is on ${s.project}` : "") +
    (s.landmark ? ` or closer to ${s.landmark}` : "") +
    `. ${proximityLine(s)}`,
  (c, s) =>
    `${c.community.name} homes have their own character, and ${c.serviceTitle.toLowerCase()} ` +
    `here is no exception` +
    (s.condition ? ` — ${lowerFirst(s.condition)}` : "") +
    `.${s.landmark ? ` We know the area, from ${s.landmark} outward.` : ""} ${proximityLine(s)}`,
  (c, s) =>
    `Looking for ${c.serviceTitle.toLowerCase()} in ${c.community.name}? ` +
    `You get a written quote tied to your exact scope and a crew that knows the ` +
    `neighbourhood` +
    (s.landmark ? ` around ${s.landmark}` : "") +
    `. ${proximityLine(s)}`,
];

function proximityLine(s: LocalSignals): string {
  return s.proximity
    ? `We also serve nearby ${s.proximity}.`
    : `We serve the surrounding area as well.`;
}

function lowerFirst(str: string): string {
  return str.length ? str[0].toLowerCase() + str.slice(1) : str;
}

/** Deterministic local intro paragraph for a matrix cell. */
export function buildLocalContext(cell: MatrixCell, signals: LocalSignals): string {
  const idx = seededIndex(seed(cell.serviceSlug, cell.community.slug, "intro"), INTRO_VARIANTS.length);
  return INTRO_VARIANTS[idx](cell, signals);
}

/**
 * Local FAQ block for the page — the community's own FAQ plus a generated
 * service-in-town question. Deterministic, never stale.
 */
export function buildLocalFaq(cell: MatrixCell, signals: LocalSignals): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  faqs.push({
    question: `Do you provide ${cell.serviceTitle.toLowerCase()} in ${cell.community.name}?`,
    answer:
      `Yes — ${cell.community.name} is a core service area. You receive a written quote within ` +
      `one business day, tied to your scope and backed by our guarantee` +
      (signals.proximity ? `. We also serve nearby ${signals.proximity}.` : `.`),
  });
  if (signals.localFaq) faqs.push(signals.localFaq);
  return faqs;
}

/** Count of distinct INTRO variants — exposed for tests/telemetry. */
export const INTRO_VARIANT_COUNT = INTRO_VARIANTS.length;
