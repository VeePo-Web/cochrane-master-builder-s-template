/**
 * routes.tsx — the route table for vite-react-ssg.
 *
 * A RootLayout route holds all providers + chrome and renders <Outlet/>.
 * Every page is wrapped in <BookedPage> so it keeps its onBookClick prop API.
 * Pages are imported eagerly for reliable server rendering (renderToString
 * does not support React.lazy/Suspense); client code-splitting is a follow-up.
 *
 * Dynamic paths (matrix + areas) are enumerated for prerender by the
 * `includedRoutes` hook in main.tsx (driven by the 4-of-8 gate).
 */

import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { ClientOnly } from "vite-react-ssg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MetaTags } from "@/components/template/MetaTags";
import SiteSchema from "@/components/seo/SiteSchema";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/drywall/BackToTop";
import StickyCTA from "@/components/drywall/StickyCTA";
import SmoothScrollProvider from "@/components/drywall/SmoothScrollProvider";
import { BookingProvider, useBooking } from "@/booking/BookingProvider";
import { BookedPage } from "@/booking/BookedPage";

// ── Pages (eager) ──
import TemplateHome from "@/pages/template/Home";
import TemplateBrandStory from "@/pages/template/BrandStory";
import TemplateWhyWeLove from "@/pages/template/WhyWeLoveService";
import TemplateServices from "@/pages/template/Services";
import TemplateServiceDetail from "@/pages/template/ServiceDetail";
import TemplateServiceLocation from "@/pages/template/ServiceLocation";
import TemplatePricing from "@/pages/template/Pricing";
import TemplateGallery from "@/pages/template/Gallery";
import TemplateReviews from "@/pages/template/Reviews";
import TemplateAbout from "@/pages/template/About";
import TemplateContact from "@/pages/template/Contact";
import TemplatePrivacy from "@/pages/template/Privacy";
import TemplateTerms from "@/pages/template/Terms";
import TemplateNotFound from "@/pages/template/NotFound";
import TemplateThankYou from "@/pages/template/ThankYou";
import TemplateGuarantee from "@/pages/template/Guarantee";
import TemplateFAQ from "@/pages/template/FAQ";
import AreasHub from "@/pages/AreasHub";
import RegionPage from "@/pages/RegionPage";
import CommunityPage from "@/pages/CommunityPage";

const queryClient = new QueryClient();

const StickyCTAConnected = () => {
  const onBookClick = useBooking();
  return <StickyCTA onBookClick={() => onBookClick()} />;
};

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MetaTags />
      <SiteSchema />
      <ScrollToTop />
      <BookingProvider>
        <Outlet />
        <BackToTop />
        <StickyCTAConnected />
        {/* Lenis smooth-scroll is a client-only side effect */}
        <ClientOnly>{() => <SmoothScrollProvider />}</ClientOnly>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BookedPage Component={TemplateHome} /> },
      { path: "brand-story", element: <BookedPage Component={TemplateBrandStory} /> },
      { path: "why-we-love", element: <BookedPage Component={TemplateWhyWeLove} /> },
      { path: "services", element: <BookedPage Component={TemplateServices} /> },
      { path: "services/:slug", element: <BookedPage Component={TemplateServiceDetail} /> },
      { path: "services/:slug/:community", element: <BookedPage Component={TemplateServiceLocation} /> },
      { path: "services/detail", element: <BookedPage Component={TemplateServiceDetail} /> },
      { path: "pricing", element: <BookedPage Component={TemplatePricing} /> },
      { path: "gallery", element: <BookedPage Component={TemplateGallery} /> },
      { path: "reviews", element: <BookedPage Component={TemplateReviews} /> },
      { path: "about", element: <BookedPage Component={TemplateAbout} /> },
      { path: "contact", element: <BookedPage Component={TemplateContact} /> },
      { path: "guarantee", element: <BookedPage Component={TemplateGuarantee} /> },
      { path: "faq", element: <BookedPage Component={TemplateFAQ} /> },
      { path: "privacy", element: <BookedPage Component={TemplatePrivacy} /> },
      { path: "terms", element: <BookedPage Component={TemplateTerms} /> },
      { path: "areas-we-serve", element: <BookedPage Component={AreasHub} /> },
      { path: "areas-we-serve/:region", element: <BookedPage Component={RegionPage} /> },
      { path: "areas-we-serve/:region/:community", element: <BookedPage Component={CommunityPage} /> },
      { path: "thank-you", element: <BookedPage Component={TemplateThankYou} /> },
      { path: "*", element: <BookedPage Component={TemplateNotFound} /> },
    ],
  },
];
