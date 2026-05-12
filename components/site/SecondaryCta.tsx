import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, Mail } from "lucide-react";

export async function SecondaryCta() {
  const t = await getTranslations();
  return (
    <section className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <h2 className="font-display text-3xl tracking-tight text-off-white sm:text-5xl">
              {t("secondaryCta.title")}
            </h2>
            <p className="max-w-2xl text-muted">{t("secondaryCta.subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon"
            >
              {t("secondaryCta.primary")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${t("brand.agencyEmail")}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm text-off-white"
            >
              <Mail className="h-4 w-4" />
              {t("secondaryCta.secondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
