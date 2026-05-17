import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, Globe } from "lucide-react";
import { govtechProjects } from "@/content/govtech";

export async function PublicSectorShowcase() {
  const t = await getTranslations();
  return (
    <section className="border-t border-line bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-3xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-ptr-teal/30 bg-ptr-teal/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ptr-teal">
            <span aria-hidden>🇳🇪</span>
            {t("publicSector.eyebrow")}
          </p>
          <h2 className="font-display text-3xl tracking-tight text-off-white sm:text-4xl">
            {t("publicSector.title")}
          </h2>
          <p className="text-muted">{t("publicSector.subtitle")}</p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {govtechProjects.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-carbon/60 transition-colors hover:border-ptr-teal/40"
              >
                {p.cover ? (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={p.cover}
                      alt={t(`publicSector.projects.${p.i18nKey}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                      <Icon className="h-3 w-3" />
                      <span>{p.year}</span>
                    </div>
                    <GovTechBadge className="absolute right-3 top-3" />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-ptr-teal/15 via-surface/40 to-carbon/60">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,var(--color-line)_1px,transparent_0)] [background-size:18px_18px]"
                    />
                    <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-ptr-teal/30 bg-ptr-teal/10 text-ptr-teal">
                      <Icon className="h-8 w-8" />
                    </span>
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-carbon/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-off-white backdrop-blur-md">
                      <span>{p.year}</span>
                    </div>
                    <GovTechBadge className="absolute right-3 top-3" />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="font-display text-lg leading-snug text-off-white">
                    {t(`publicSector.projects.${p.i18nKey}.title`)}
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ptr-red">
                        {t("publicSector.problemLabel")}
                      </p>
                      <p className="text-muted line-clamp-3">
                        {t(`publicSector.projects.${p.i18nKey}.problem`)}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ptr-teal">
                        {t("publicSector.solutionLabel")}
                      </p>
                      <p className="text-off-white/80 line-clamp-3">
                        {t(`publicSector.projects.${p.i18nKey}.solution`)}
                      </p>
                    </div>
                  </div>

                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-xs text-muted hover:text-ptr-teal"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      {t("publicSector.viewLive")}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-carbon/40 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-1">
            <h3 className="font-display text-xl text-off-white">
              {t("publicSector.ctaTitle")}
            </h3>
            <p className="text-sm text-muted">{t("publicSector.ctaSubtitle")}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-ptr-teal px-5 py-2.5 text-sm font-medium text-on-teal hover:bg-ptr-teal/90"
          >
            {t("publicSector.ctaButton")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GovTechBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-ptr-teal/40 bg-ptr-teal/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ptr-teal backdrop-blur-md ${className ?? ""}`}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ptr-teal" />
      GovTech
    </span>
  );
}
