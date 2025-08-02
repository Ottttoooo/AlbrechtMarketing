'use client';

import { Link } from "@/i18n/routing";
import React from "react";
import dynamic from 'next/dynamic';

// Dynamically import CookieConsent with no SSR
const CookieConsent = dynamic(
  () => import('react-cookie-consent').then(mod => mod.CookieConsent),
  { ssr: false }
);

const CookieConsentBanner = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="myWebsiteCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ background: "#4CAF50", color: "#fff", fontSize: "14px" }}
      declineButtonStyle={{
        background: "#f44336",
        color: "#fff",
        fontSize: "14px",
      }}
      enableDeclineButton
      onAccept={() => {
        // Logic for enabling cookies (e.g., analytics, tracking scripts)
        console.log("Cookies accepted");
      }}
      onDecline={() => {
        // Logic for disabling cookies
        console.log("Cookies declined");
      }}
    >
      This website uses cookies to enhance your browsing experience and provide
      personalized services. By clicking &quot;Accept,&quot; you consent to the use of
      cookies.{" "}
      <Link href="/legal/privacy" style={{ color: "#4CAF50" }}>
        Learn more
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieConsentBanner;
