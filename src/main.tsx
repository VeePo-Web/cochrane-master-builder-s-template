import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";
import { MASTER_REMIX } from "./config/template/remix-variables";
import { COMMUNITIES } from "./data/communities";
import { matrixEligibilityReport } from "./lib/geomatrix";

/**
 * Enumerate the dynamic paths to prerender:
 *   • /services/:slug            — one per sub-service
 *   • /services/:slug/:community — the Service × Location matrix, ELIGIBLE cells
 *     only (the 4-of-8 gate decides which exist)
 *
 * Template-preview mode (placeholder {SUB_SERVICE_n} titles) caps the matrix to
 * a small sample so the default repo build stays fast. A real remix (real
 * titles) prerenders every eligible cell.
 */
function dynamicMatrixPaths(): string[] {
  const out: string[] = [];
  for (const s of MASTER_REMIX.SUB_SERVICES) out.push(`/services/${s.slug}`);

  const report = matrixEligibilityReport(MASTER_REMIX.SUB_SERVICES, COMMUNITIES);
  const isTemplatePreview = MASTER_REMIX.SUB_SERVICES.some((s) => s.title.trim().startsWith("{"));
  const cells = isTemplatePreview ? report.eligibleCells.slice(0, 12) : report.eligibleCells;
  for (const c of cells) out.push(`/services/${c.serviceSlug}/${c.communitySlug}`);
  return out;
}

// vite-react-ssg entry. `npm run build` prerenders every route in `routes` plus
// the dynamic paths below to static HTML; dev / client hydration use the same table.
export const createRoot = ViteReactSSG({ routes });

// vite-react-ssg reads `includedRoutes` as a NAMED EXPORT from the entry.
export const includedRoutes = (paths: string[]): string[] =>
  Array.from(new Set([...paths, ...dynamicMatrixPaths()]));
