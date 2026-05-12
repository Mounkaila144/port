import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="space-y-3">
        <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl lg:text-6xl">
          {t("contact.pageTitle")}
        </h1>
        <p className="max-w-2xl text-muted">{t("contact.pageSubtitle")}</p>
      </header>

      <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-ptr-teal/30 bg-ptr-teal/[0.04] p-4 text-sm text-off-white">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ptr-teal" />
        <p>{t("services.euDataResidency")}</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <h2 className="font-display text-2xl text-off-white">{t("contact.intakeTitle")}</h2>
          <Suspense fallback={null}>
            <ContactForm className="mt-6" />
          </Suspense>
        </section>
        <aside className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-white/[0.08] bg-surface/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t("contact.fallbackEmailLabel")}
            </p>
            <a
              href={`mailto:${t("brand.agencyEmail")}`}
              className="mt-2 inline-flex items-center gap-2 break-all text-lg text-ptr-teal hover:underline"
            >
              <Mail className="h-5 w-5" />
              {t("brand.agencyEmail")}
            </a>
            <p className="mt-4 text-sm text-muted">{t("hero.timezoneBadge")}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
