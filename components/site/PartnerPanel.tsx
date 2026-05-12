import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, Handshake } from "lucide-react";

export async function PartnerPanel() {
  const t = await getTranslations();
  return (
    <section
      aria-labelledby="partner-title"
      className="rounded-3xl border border-ptr-red/30 bg-gradient-to-br from-ptr-red/[0.06] via-transparent to-ptr-teal/[0.04] p-8 lg:p-12"
    >
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-ptr-red/30 bg-ptr-red/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ptr-red">
            <Handshake className="h-3 w-3" />
            {t("services.partner.subtitle")}
          </span>
          <h2 id="partner-title" className="font-display text-3xl tracking-tight text-off-white sm:text-4xl">
            {t("services.partner.title")}
          </h2>
          <p className="max-w-2xl text-muted">{t("services.partner.body")}</p>
        </div>
        <div className="flex lg:col-span-4 lg:justify-end">
          <Link
            href={{ pathname: "/contact", query: { type: "partnership" } }}
            className="inline-flex items-center gap-2 rounded-full bg-off-white px-6 py-3 text-sm font-semibold text-carbon"
          >
            {t("services.partner.cta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
