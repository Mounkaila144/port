import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { PartnerPanel } from "@/components/site/PartnerPanel";
import { Wrench, Search, Hammer, ShieldCheck, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

const PACKAGES = [
  { key: "maintenance" as const, icon: Wrench, accent: "ptr-teal" },
  { key: "audit" as const, icon: Search, accent: "off-white" },
  { key: "build" as const, icon: Hammer, accent: "ptr-red" },
];

const PACKAGE_TO_CASE_STUDY = {
  maintenance: "wuroobiz-sme-erp-africa",
  audit: "guidacenter-niger-real-estate",
  build: "csf-cross-border-logistics-cn-ne",
} as const;

const DELIVERABLE_KEYS = [0, 1, 2, 3] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl lg:text-6xl">
          {t("services.pageTitle")}
        </h1>
        <p className="text-muted">{t("services.pageSubtitle")}</p>
      </header>

      <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-ptr-teal/30 bg-ptr-teal/[0.04] p-4 text-sm text-off-white">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ptr-teal" />
        <p className="max-w-3xl">{t("services.euDataResidency")}</p>
      </div>

      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {PACKAGES.map(({ key, icon: Icon }) => {
          const csSlug = PACKAGE_TO_CASE_STUDY[key];
          const cs = caseStudies.find((c) => c.slug === csSlug);
          const slugForLocale = cs ? (locale === "fr" ? cs.slugFr : cs.slug) : null;
          return (
            <li
              key={key}
              className="flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-surface/60 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ptr-teal/10 text-ptr-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t(`services.packages.${key}.format`)}
                </span>
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display text-2xl text-off-white">
                  {t(`services.packages.${key}.name`)}
                </h2>
                <p className="text-sm text-muted">{t(`services.packages.${key}.pitch`)}</p>
              </div>
              <dl className="space-y-2 border-y border-white/[0.06] py-4 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Duration</dt>
                  <dd className="text-right text-off-white">{t(`services.packages.${key}.duration`)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Investment</dt>
                  <dd className="text-right font-mono text-ptr-teal">{t(`services.packages.${key}.price`)}</dd>
                </div>
              </dl>
              <ul className="space-y-2 text-sm text-off-white">
                {DELIVERABLE_KEYS.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ptr-teal" />
                    <span>{t(`services.packages.${key}.deliverables.${i}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted italic">
                {t(`services.packages.${key}.fitFor`)}
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-2">
                <Link
                  href={{ pathname: "/contact", query: { type: key } }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ptr-teal px-5 py-2.5 text-sm font-semibold text-carbon"
                >
                  {t("services.engageCta")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {slugForLocale && cs && (
                  <Link
                    href={{ pathname: "/case-studies/[slug]", params: { slug: slugForLocale } }}
                    className="inline-flex items-center justify-center gap-1 text-xs text-muted hover:text-ptr-teal"
                  >
                    See it in production: {cs.title}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-16">
        <PartnerPanel />
      </div>
    </div>
  );
}
