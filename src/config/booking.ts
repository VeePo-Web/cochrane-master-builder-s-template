/**
 * BOOKING CONFIG — universal booking types + draft shape for the template.
 *
 * BookingPrefill and BookingClickHandler are the universal types — re-exported
 * from booking-schema.ts. Any component that only needs those types may
 * import directly from "@/config/template/booking-schema" instead.
 */

// Re-export universal types so existing components keep working
export type { BookingPrefill, BookingClickHandler } from "@/config/template/booking-schema";

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

export interface BookingDraft {
  description: string;
  address: string;
  date: string;
  time: TimeWindowId | "";
  name: string;
  email: string;
  phone: string;
}

export const EMPTY_DRAFT: BookingDraft = {
  description: "",
  address: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
};
