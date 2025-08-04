"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface CookieConsentContextType {
  hasConsented: boolean;
  setHasConsented: (value: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export const CookieConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  useEffect(() => {
    // Check if consent cookie exists on mount
    const consentCookie = Cookies.get("myWebsiteCookieConsent");
    if (consentCookie === "true") {
      setHasConsented(true);
    }
  }, []);

  return (
    <CookieConsentContext.Provider value={{ hasConsented, setHasConsented }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
};
