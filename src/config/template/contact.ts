import { MASTER_REMIX } from "./remix-variables";

/**
 * Single source of truth for click-to-call.
 * Reads MASTER_REMIX.PHONE (E.164, e.g. "+14031234567") so a remix only ever
 * sets the number in one place and every Call surface (sticky bar, mobile nav,
 * footer, JSON-LD) stays consistent.
 */
const E164 = MASTER_REMIX.PHONE;

/** Raw E.164 number, safe to drop into JSON-LD or aria labels. */
export const PHONE_E164 = E164;

/** `tel:` href for click-to-call links/buttons. */
export const PHONE_TEL = `tel:${E164}`;

/** Human-readable North-American display, e.g. "(403) 123-4567". */
export const PHONE_DISPLAY = (() => {
  const digits = E164.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits.slice(-10);
  if (ten.length !== 10) return E164;
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
})();

/**
 * Single source of truth for email contact. The site contacts by email only
 * (phone surfaces are retired) — every Email link/label reads from here.
 */
export const EMAIL = "inquiry@cochranemasterbuilders.com";

/** `mailto:` href for email links/buttons. */
export const EMAIL_HREF = `mailto:${EMAIL}`;
