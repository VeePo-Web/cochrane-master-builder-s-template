/**
 * BookingProvider — app-wide booking handler + modal, via context.
 *
 * Replaces the prop-drilled onBookClick from App state. The SSG routes-array
 * model renders route elements without App props, so the booking handler is
 * provided through context and consumed by pages via <BookedPage> (which keeps
 * each page's existing `onBookClick` prop API intact — zero per-page changes).
 */

import { createContext, useContext, useState, type ReactNode } from "react";
import { BookingModal } from "@/components/template/BookingModal";
import type { BookingClickHandler, BookingPrefill } from "@/config/template/booking-schema";

const BookingContext = createContext<BookingClickHandler>(() => {});

export const useBooking = (): BookingClickHandler => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | undefined>(undefined);

  const openBooking: BookingClickHandler = (input) => {
    // Guard: some call sites bind onBookClick directly to onClick → ignore events.
    const next =
      input && typeof input === "object" && !("nativeEvent" in input) && !("currentTarget" in input)
        ? (input as BookingPrefill)
        : undefined;
    setPrefill(next);
    setOpen(true);
  };

  return (
    <BookingContext.Provider value={openBooking}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} prefill={prefill} />
    </BookingContext.Provider>
  );
};
