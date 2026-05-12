import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";

const SECTOR_KEYS = [0, 1, 2, 3, 4] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {t("about.founded")}
        </p>
        <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl lg:text-6xl">
          {t("about.pageTitle")}
        </h1>
      </header>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <p className="text-lg text-off-white">{t("about.intro")}</p>
          <p className="text-muted">{t("about.differentiator")}</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08] bg-surface lg:col-span-5">
          {/* equipe.png will be supplied by the user. Falls back to bordered placeholder. */}
          <Image
            src="/image/equipe.png"
            alt={t("about.teamPhotoAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl text-off-white">{t("about.compositionTitle")}</h2>
          <p className="mt-3 text-muted">{t("about.composition")}</p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-off-white">{t("about.sectorsTitle")}</h2>
          <ul className="mt-3 space-y-2 text-off-white">
            {SECTOR_KEYS.map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ptr-teal" />
                <span>{t(`about.sectors.${i}`)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-off-white">{t("about.stackTitle")}</h2>
        <p className="mt-3 max-w-3xl text-muted">{t("about.stackBlurb")}</p>
      </section>

      <div className="mt-12 inline-flex items-start gap-3 rounded-2xl border border-ptr-teal/30 bg-ptr-teal/[0.04] p-4 text-sm text-off-white">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ptr-teal" />
        <p>{t("about.euDataResidency")}</p>
      </div>
    </div>
  );
}
