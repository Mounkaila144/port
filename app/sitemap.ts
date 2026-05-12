import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { caseStudies } from "@/content/case-studies";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agency.ptrniger.com";

const ROUTES: { en: string; fr: string }[] = [
  { en: "", fr: "" },
  { en: "/work", fr: "/realisations" },
  { en: "/services", fr: "/services" },
  { en: "/about", fr: "/a-propos" },
  { en: "/contact", fr: "/contact" },
  { en: "/privacy", fr: "/confidentialite" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const r of ROUTES) {
    for (const locale of routing.locales) {
      const path = locale === "fr" ? r.fr : r.en;
      entries.push({
        url: `${SITE}/${locale}${path}`,
        lastModified: now,
        alternates: {
          languages: {
            en: `${SITE}/en${r.en}`,
            fr: `${SITE}/fr${r.fr}`,
            "x-default": `${SITE}/en${r.en}`,
          },
        },
      });
    }
  }

  for (const cs of caseStudies) {
    entries.push({
      url: `${SITE}/en/case-studies/${cs.slug}`,
      lastModified: now,
      alternates: {
        languages: {
          en: `${SITE}/en/case-studies/${cs.slug}`,
          fr: `${SITE}/fr/etudes-de-cas/${cs.slugFr}`,
          "x-default": `${SITE}/en/case-studies/${cs.slug}`,
        },
      },
    });
    entries.push({
      url: `${SITE}/fr/etudes-de-cas/${cs.slugFr}`,
      lastModified: now,
    });
  }

  return entries;
}
