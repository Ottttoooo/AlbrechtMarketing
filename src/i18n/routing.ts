import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",

  pathnames: {
    "/": "/",
    "/services": {
      en: "/services",
      de: "/dienstleistungen",
    },
    "/services/online-ads": {
      en: "/services/online-ads",
      de: "/dienstleistungen/online-werbung",
    },
    "/services/content-creation": {
      en: "/services/content-creation",
      de: "/dienstleistungen/inhalte-erstellen",
    },
    "/services/social-media": {
      en: "/services/social-media",
      de: "/dienstleistungen/social-media",
    },
    "/services/web-design": {
      en: "/services/web-design",
      de: "/dienstleistungen/webdesign",
    },
    "/about": {
      en: "/about",
      de: "/ueber-uns",
    },
    "/contact": {
      en: "/contact",
      de: "/kontaktiere-uns",
    },
    "/contact/general": {
      en: "/contact/general",
      de: "/kontaktiere-uns/allgemein",
    },
    "/contact/pricing": {
      en: "/contact/pricing",
      de: "/kontaktiere-uns/preise",
    },
    "/contact/consultation": {
      en: "/contact/consultation",
      de: "/kontaktiere-uns/beratung",
    },
    "/pricing": {
      en: "/pricing",
      de: "/preise",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
