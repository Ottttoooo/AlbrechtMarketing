import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { AbstractIntlMessages } from "next-intl"; // Import the type from next-intl

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  // Load and merge all translation files for the locale
  const messages = await loadTranslations(locale) as AbstractIntlMessages;


  return {
    locale,
    messages,
  };
});

async function loadTranslations(locale: string) {
  const modules = {
    common: (await import(`../../messages/${locale}/common.json`)).default,
    home: (await import(`../../messages/${locale}/home.json`)).default,
    services: {
      ads: (await import(`../../messages/${locale}/services/ads.json`)).default,
      content: (await import(`../../messages/${locale}/services/content.json`)).default,
      social: (await import(`../../messages/${locale}/services/social.json`)).default,
      web: (await import(`../../messages/${locale}/services/web.json`)).default,
    },
    pricing: (await import(`../../messages/${locale}/pricing.json`)).default,
    about: (await import(`../../messages/${locale}/about.json`)).default,
    contact: {
      consultation: (await import(`../../messages/${locale}/contact/consultation.json`)).default,
      pricing: (await import(`../../messages/${locale}/contact/pricing.json`)).default,
      thankYou: (await import(`../../messages/${locale}/contact/thankYou.json`)).default,
      general: (await import(`../../messages/${locale}/contact/general.json`)).default,
    },
    legal: {
      privacy: (await import(`../../messages/${locale}/legal/privacy.json`)).default,
      imprint: (await import(`../../messages/${locale}/legal/imprint.json`)).default,
    },
  };

  // Return the modules directly without merging
  return modules;
}