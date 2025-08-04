"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export function ClientAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView } = useAnalytics();
  const { hasConsented } = useCookieConsent();

  useEffect(() => {
    if (hasConsented) {
      // Construct the full URL including search params
      const url = searchParams.size > 0 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
        
      // Track the page view
      trackPageView(url);

      // Development logging
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics:', {
          type: 'pageview',
          url,
          environment: process.env.NODE_ENV,
          gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
        });
      }
    }
  }, [pathname, searchParams, hasConsented, trackPageView]);

  return null; // This component doesn't render anything
}
