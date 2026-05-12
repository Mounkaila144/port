import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export async function Hero() {
  const t = await getTranslations();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-ptr-teal/30 bg-ptr-teal/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ptr-teal">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ptr-teal" />
            {t("hero.timezoneBadge")}
          </span>
          <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl lg:text-7xl">
            {t("hero.h1Lead")}
            <br />
            <span className="text-ptr-teal">{t("hero.h1Tail")}</span>
          </h1>
          <p className="max-w-2xl text-base text-muted sm:text-lg">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon transition-shadow hover:shadow-[0_0_40px_-5px_color-mix(in_oklab,var(--ptr-teal)_70%,transparent)]"
            >
              {t("nav.primaryCta")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-off-white hover:border-white/30 hover:bg-white/[0.06]"
            >
              {t("nav.work")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
