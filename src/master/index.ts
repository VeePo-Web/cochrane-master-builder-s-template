/**
 * MASTER — single barrel export for the parent Cochrane Master Builders brand.
 *
 * Import from here in any component or page:
 *   import { MASTER, MASTER_STYLE, SERVICE_AREAS, TRADES, REMIX_CHECKLIST } from "@/master";
 */

export { MASTER } from "./brand/identity";
export { MASTER_STYLE } from "./brand/style-guide";
export { TRADES, getTrade, getSisterSites } from "./trades";
export type { TradeEntry } from "./trades";
export { SERVICE_AREAS, getNearestAreas } from "./seo/service-areas";
export type { ServiceArea } from "./seo/service-areas";
export { pickSisterSites, allDeployedSites } from "./seo/backlink-network";
export { REMIX_CHECKLIST, CHECKLIST_GROUPS } from "./checklist";
export type { CheckItem, CheckId, ChecklistGroup } from "./checklist";
export { MASTER_VERSION } from "./VERSION";
export type { Master } from "./brand/identity";
export type { MasterStyle } from "./brand/style-guide";
