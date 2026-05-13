/**
 * COCHRANE DRYWALL — Booking Schema (single source of truth for the form)
 *
 * Simplified single-screen quote request:
 *  - what they need
 *  - where they are
 *  - when works
 *  - optional photos / video
 *  - contact
 */

export const TIME_WINDOWS = [
  { id: "morning", label: "Morning", desc: "8 AM – 12 PM" },
  { id: "afternoon", label: "Afternoon", desc: "12 – 5 PM" },
  { id: "evening", label: "Evening", desc: "5 – 8 PM" },
  { id: "flexible", label: "Flexible", desc: "Any time that works" },
] as const;

export type TimeWindowId = (typeof TIME_WINDOWS)[number]["id"];

export const MAX_MEDIA_FILES = 5;
export const MAX_MEDIA_BYTES = 25 * 1024 * 1024; // 25 MB
export const ACCEPTED_MEDIA_MIME = "image/*,video/*";

export interface DrywallBookingDraft {
  description: string;
  address: string;
  date: string;
  time: TimeWindowId | "";
  name: string;
  email: string;
  phone: string;
}

export const EMPTY_DRAFT: DrywallBookingDraft = {
  description: "",
  address: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
};

/**
 * Lightweight prefill payload — passed from any CTA into the booking modal.
 * `source` is recorded so the team can see which CTA / page generated the lead.
 */
export interface BookingPrefill {
  /** Pre-filled "What do you need done?" text. */
  description?: string;
  /** Internal label (e.g. "Garage Packages → Full starter") prepended to the description as `[via: …]`. */
  source?: string;
  /** Slug of the service page that triggered the modal — used for cross-sell on /thank-you. */
  serviceSlug?: string;
}

/** Anything that opens the modal accepts an optional prefill. */
export type BookingClickHandler = (prefill?: BookingPrefill) => void;
