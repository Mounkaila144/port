import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { NumbersStrip } from "@/components/site/NumbersStrip";
import { FeaturedCaseStudies } from "@/components/site/FeaturedCaseStudies";
import { ServicesOverview } from "@/components/site/ServicesOverview";
import { SecondaryCta } from "@/components/site/SecondaryCta";
import { JsonLd, organizationLd, webPageLd } from "@/components/site/JsonLd";
import { setRequestLocale, getTranslations } from "next-intl/server";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agency.ptrniger.com";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd
        data={webPageLd({
          url: `${SITE}/${locale}`,
          name: t("brand.name"),
          description: t("hero.subtitle"),
          inLanguage: locale,
        })}
      />
      <Hero />
      <TrustStrip />
      <NumbersStrip />
      <FeaturedCaseStudies />
      <ServicesOverview />
      <SecondaryCta />
    </>
  );
}
