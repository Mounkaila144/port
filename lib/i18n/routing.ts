import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  pathnames: {
    "/": "/",
    "/work": {
      en: "/work",
      fr: "/realisations",
    },
    "/case-studies": {
      en: "/case-studies",
      fr: "/etudes-de-cas",
    },
    "/case-studies/[slug]": {
      en: "/case-studies/[slug]",
      fr: "/etudes-de-cas/[slug]",
    },
    "/services": "/services",
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/contact": "/contact",
    "/privacy": {
      en: "/privacy",
      fr: "/confidentialite",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
