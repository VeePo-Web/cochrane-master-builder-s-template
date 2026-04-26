import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import SmoothScrollProvider from "./components/drywall/SmoothScrollProvider";
import PageTransition from "./components/drywall/PageTransition";
import BookingModal from "./components/drywall/BookingModal";
import BackToTop from "./components/drywall/BackToTop";
import StickyCTA from "./components/drywall/StickyCTA";
import ScrollToTop from "./components/ScrollToTop";
import type { BookingClickHandler, BookingPrefill } from "./config/drywall-booking";

const Index = lazy(() => import("./pages/Index"));
const DrywallRepair = lazy(() => import("./pages/DrywallRepair"));
const DrywallInstallation = lazy(() => import("./pages/DrywallInstallation"));
const Painting = lazy(() => import("./pages/Painting"));
const GaragePackages = lazy(() => import("./pages/GaragePackages"));
const BasementPackages = lazy(() => import("./pages/BasementPackages"));
const PricingProcess = lazy(() => import("./pages/PricingProcess"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Reviews = lazy(() => import("./pages/Reviews"));
const FavouriteThings = lazy(() => import("./pages/FavouriteThings"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Brand = lazy(() => import("./pages/Brand"));
const Knowledge = lazy(() => import("./pages/Knowledge"));

const queryClient = new QueryClient();

const AnimatedRoutes = ({ onBookClick }: { onBookClick: BookingClickHandler }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/drywall-repair" element={<PageTransition><DrywallRepair onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/drywall-installation" element={<PageTransition><DrywallInstallation onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/painting" element={<PageTransition><Painting onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/garage-packages" element={<PageTransition><GaragePackages onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/basement-packages" element={<PageTransition><BasementPackages onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/pricing-process" element={<PageTransition><PricingProcess onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/reviews" element={<PageTransition><Reviews onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/favourite-things" element={<PageTransition><FavouriteThings onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/thank-you" element={<PageTransition><ThankYou /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms onBookClick={onBookClick} /></PageTransition>} />
          <Route path="/brand" element={<PageTransition><Brand /></PageTransition>} />
          <Route path="/knowledge" element={<PageTransition><Knowledge /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | undefined>(undefined);

  // Accept either a click event (legacy onClick={onBookClick}) or a prefill object.
  const openBooking: BookingClickHandler = (input) => {
    const next =
      input && typeof input === "object" && !("nativeEvent" in input) && !("currentTarget" in input)
        ? (input as BookingPrefill)
        : undefined;
    setPrefill(next);
    setBookingOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SmoothScrollProvider>
            <AnimatedRoutes onBookClick={openBooking} />
            <BackToTop />
            <StickyCTA onBookClick={openBooking} />
            <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} prefill={prefill} />
          </SmoothScrollProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
