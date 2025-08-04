"use client";

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ReCaptchaProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      useEnterprise={false}
      scriptProps={{
        async: true, // Changed to true for better performance
        defer: true, // Changed to true for better performance
        appendTo: "head",
        nonce: undefined,
      }}
      container={{ // Added explicit container parameters
        parameters: {
          badge: 'bottomright',
          theme: 'light'
        }
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}