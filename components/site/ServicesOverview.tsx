import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, Wrench, Search, Hammer } from "lucide-react";

const PACKAGES = [
  { key: "maintenance", icon: Wrench },
  { key: "audit", icon: Search },
  { key: "build", icon: Hammer },
] as const;

export async function ServicesOverview() {
  const t = await getTranslations();
  return (
    <section className="border-t border-line bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-3xl tracking-tight text-off-white sm:text-4xl">
              {t("servicesOverview.title")}
            </h2>
            <p className="text-muted">{t("servicesOverview.subtitle")}</p>
          </div>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm text-off-white hover:border-ptr-teal/40"
          >
            {t("servicesOverview.viewAll")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="group flex flex-col gap-4 rounded-3xl border border-line bg-carbon/60 p-6 transition-colors hover:border-ptr-teal/40"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ptr-teal/10 text-ptr-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t(`services.packages.${key}.duration`)}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl text-off-white">
                  {t(`services.packages.${key}.name`)}
                </h3>
                <p className="text-sm text-muted">{t(`services.packages.${key}.pitch`)}</p>
              </div>
              <p className="font-mono text-sm text-ptr-teal">
                {t(`services.packages.${key}.price`)}
              </p>
              <Link
                href="/services"
                className="mt-auto inline-flex items-center gap-1 text-sm text-off-white hover:text-ptr-teal"
              >
                {t("services.engageCta")} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
