"use client";

import { Link } from "@/i18n/routing";
import React from "react";
import dynamic from "next/dynamic";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { useAnalytics } from "@/hooks/useAnalytics";

// Dynamically import CookieConsent with no SSR
const CookieConsent = dynamic(
  () => import("react-cookie-consent").then((mod) => mod.CookieConsent),
  { ssr: false }
);

const CookieConsentBanner = () => {
  const [mounted, setMounted] = React.useState(false);
  const { setHasConsented } = useCookieConsent();
  const { initializeGA } = useAnalytics();

  React.useEffect(() => {
    const existingConsent = document.cookie.includes("myWebsiteCookieConsent=true");
    if (existingConsent) {
      setHasConsented(true);
      initializeGA();
    }
    setMounted(true);
  }, [setHasConsented, initializeGA]);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="myWebsiteCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{
        background: "#4D91EF",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.3s ease",
        padding: "5px 20px",
      }}
      buttonClasses="cookie-consent-button"
      declineButtonClasses="cookie-consent-decline-button"
      declineButtonStyle={{
        background: "none",
        border: "1px solid #fff",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "4px",
        padding: "5px 20px",
        transition: "background 0.3s ease",
        margin: "10px",
        marginRight: "0px",
      }}
      enableDeclineButton
      onAccept={() => {
        setHasConsented(true);
        initializeGA();
        console.log("Cookies and analytics accepted");
      }}
      onDecline={() => {
        setHasConsented(false);
        console.log("Cookies and analytics declined");
      }}
    >
      This website uses cookies to enhance your browsing experience and provide
      personalized services. By clicking &quot;Accept,&quot; you consent to the
      use of cookies.{" "}
      <Link href="/legal/privacy" style={{ color: "#4D91EF" }}>
        Learn more
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieConsentBanner;
