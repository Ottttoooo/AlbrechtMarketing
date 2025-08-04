"use client";

import { ReactNode } from "react";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CookieConsentProvider>
      <ReCaptchaProvider>
        {children}
      </ReCaptchaProvider>
    </CookieConsentProvider>
  );
}
