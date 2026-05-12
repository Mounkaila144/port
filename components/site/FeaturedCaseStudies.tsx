import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { caseStudies } from "@/content/case-studies";
import { ArrowUpRight } from "lucide-react";

export async function FeaturedCaseStudies() {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-display text-3xl tracking-tight text-off-white sm:text-4xl">
            {t("featuredCaseStudies.title")}
          </h2>
          <p className="text-muted">{t("featuredCaseStudies.subtitle")}</p>
        </div>
        <Link
          href="/work"
          className="hidden sm:inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm text-off-white hover:border-ptr-teal/40"
        >
          {t("featuredCaseStudies.viewAll")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {caseStudies.map((cs) => {
          const summary = locale === "fr" ? cs.summary.fr : cs.summary.en;
          const slug = locale === "fr" ? cs.slugFr : cs.slug;
          return (
            <li key={cs.slug}>
              <Link
                href={{ pathname: "/case-studies/[slug]", params: { slug } }}
                className="group block overflow-hidden rounded-3xl border border-line bg-surface/60 transition-colors hover:border-ptr-teal/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={cs.cover}
                    alt={`${cs.title} — ${cs.client}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                    <span>{cs.flag}</span>
                    <span>{cs.region}</span>
                    <span aria-hidden className="opacity-60">·</span>
                    <span>{cs.sector}</span>
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="font-display text-xl text-off-white">{cs.title}</h3>
                  <p className="text-sm text-muted line-clamp-3">{summary}</p>
                  <ul className="flex flex-wrap gap-1.5 pt-2">
                    {cs.stack.slice(0, 4).map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line bg-soft px-2.5 py-0.5 text-[10px] font-mono uppercase text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
