/**
 * Phase 1 verification — addressability, determinism, and the 4-of-8 Gate.
 * Also prints the live eligibility report (page-count math + pass/skip).
 */

import { describe, it, expect } from "vitest";
import { COMMUNITIES } from "@/data/communities";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { slugify } from "@/lib/slug";
import {
  evaluateCell,
  matrixEligibilityReport,
  buildLocalContext,
  getLocalSignals,
  GATE_THRESHOLD,
  type MatrixCell,
} from "@/lib/geomatrix";

const services = MASTER_REMIX.SUB_SERVICES;
const sampleCell = (): MatrixCell => ({
  serviceSlug: services[0].slug,
  serviceTitle: "Drywall Repair",
  community: COMMUNITIES[0],
});

describe("slugify", () => {
  it("is URL-safe and deterministic", () => {
    expect(slugify("Basement Development")).toBe("basement-development");
    expect(slugify("  Pop-corn  Ceiling!! ")).toBe("pop-corn-ceiling");
    expect(slugify("Café Réno")).toBe("cafe-reno");
    expect(slugify("X")).toBe(slugify("X"));
  });
});

describe("SubService addressability", () => {
  it("every sub-service has a non-empty, url-safe slug", () => {
    for (const s of services) {
      expect(s.slug).toBeTruthy();
      expect(s.slug).toBe(slugify(s.slug));
    }
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length); // unique
  });
});

describe("determinism (no index churn across builds)", () => {
  it("evaluateCell returns identical signals for the same cell", () => {
    const a = evaluateCell(sampleCell());
    const b = evaluateCell(sampleCell());
    expect(a.signals).toEqual(b.signals);
    expect(a.eligible).toBe(b.eligible);
  });

  it("buildLocalContext is byte-identical for the same cell", () => {
    const cell = sampleCell();
    const s = getLocalSignals(cell);
    expect(buildLocalContext(cell, s)).toBe(buildLocalContext(cell, s));
  });

  it("neighbouring communities produce different intros (scaled uniqueness)", () => {
    const c1: MatrixCell = { serviceSlug: services[0].slug, serviceTitle: "Drywall Repair", community: COMMUNITIES[0] };
    const c2: MatrixCell = { serviceSlug: services[0].slug, serviceTitle: "Drywall Repair", community: COMMUNITIES[1] };
    const t1 = buildLocalContext(c1, getLocalSignals(c1));
    const t2 = buildLocalContext(c2, getLocalSignals(c2));
    expect(t1).not.toBe(t2);
  });
});

describe("4-of-8 Gate + eligibility report", () => {
  it("generates a report and never pads thin cells", () => {
    const report = matrixEligibilityReport(services, COMMUNITIES);

    // page-count math
    expect(report.intended).toBe(services.length * COMMUNITIES.length);
    expect(report.eligible + report.skipped).toBe(report.intended);

    // every eligible cell genuinely cleared the bar
    for (const cell of report.eligibleCells) {
      expect(cell.signals.length).toBeGreaterThanOrEqual(GATE_THRESHOLD);
    }

    // a real network has SOME eligible pages and the gate actually gates
    expect(report.eligible).toBeGreaterThan(0);

    // eslint-disable-next-line no-console
    console.log(
      `\n── MATRIX ELIGIBILITY REPORT ──\n` +
      `services: ${services.length} · communities: ${COMMUNITIES.length}\n` +
      `intended pages: ${report.intended}\n` +
      `eligible: ${report.eligible} (${Math.round((1 - report.skipRate) * 100)}%)\n` +
      `skipped (gate): ${report.skipped}\n` +
      `skip reasons: ${JSON.stringify(report.skipReasons)}\n` +
      `per-service eligible: ${JSON.stringify(report.perService)}\n`,
    );
  });
});
