/**
 * BookedPage — adapts a page that expects an `onBookClick` prop to the
 * routes-array model by pulling the handler from BookingProvider context.
 * Lets every existing page keep its prop API unchanged.
 */

import type { ComponentType } from "react";
import { useBooking } from "./BookingProvider";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface BookedPageProps {
  Component: ComponentType<{ onBookClick?: BookingClickHandler }>;
}

export const BookedPage = ({ Component }: BookedPageProps) => {
  const onBookClick = useBooking();
  return <Component onBookClick={onBookClick} />;
};
