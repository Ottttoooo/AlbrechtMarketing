"use client";

declare global {
  interface Window {
    gtag: (
      command: "js" | "config" | "event",
      // For 'config' command
      targetId?: string,
      // For configuration options
      configObject?: {
        page_path?: string;
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
  }
}

// Get the GA ID from environment variables
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const useAnalytics = () => {

  const initializeGA = () => {
    if (typeof window === "undefined") return;

    // Skip GA in development
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) {
      console.log('🔧 Google Analytics disabled in development mode');
      return;
    }

    // Check if GTM is already loaded by looking for the script
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (existingScript) {
      console.log('Google Analytics script already exists');
      return;
    }

    // Log initialization in non-production
    if (isDevelopment) {
      console.log('🔧 Initializing Google Analytics:', {
        measurementId: GA_MEASUREMENT_ID,
        environment: process.env.NODE_ENV,
        hostname: window.location.hostname
      });
    }

    // Don't proceed if GA ID is missing
    if (!GA_MEASUREMENT_ID) {
      console.error('Google Analytics Measurement ID is not defined');
      return;
    }

    // Validate GA Measurement ID format
    if (!GA_MEASUREMENT_ID?.match(/^G-[A-Z0-9]+$/)) {
      console.error('❌ Invalid Google Analytics Measurement ID format:', {
        measurementId: GA_MEASUREMENT_ID,
        expected: 'Should start with G- followed by alphanumeric characters'
      });
      return;
    }

    // Log the measurement ID in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Using Google Analytics ID:', GA_MEASUREMENT_ID);
    }

    // Create GTM script
    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    // Create initialization script
    const initScript = document.createElement("script");
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        debug_mode: false,
        page_location: window.location.href,
        page_path: window.location.pathname,
        send_page_view: true
      });
    `;

    // Add event listeners before appending
    gtmScript.addEventListener('load', () => {
      console.log('✅ Google Analytics loaded successfully');
      document.head.appendChild(initScript);
    });

    gtmScript.addEventListener('error', (error) => {
      console.error('❌ Error loading Google Analytics:', {
        measurementId: GA_MEASUREMENT_ID,
        url: gtmScript.src,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
    });

    // Append the script
    document.head.appendChild(gtmScript);
  };

  const trackPageView = (url: string) => {
    // Skip tracking in development
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) return;

    if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;
    
    try {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_location: window.location.origin + url,
        page_path: url,
        send_page_view: true
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  return { initializeGA, trackPageView };
};
