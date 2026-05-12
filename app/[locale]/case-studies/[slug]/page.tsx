import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return caseStudies.flatMap((cs) => [
    { slug: cs.slug },
    { slug: cs.slugFr },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) return {};
  const summary = locale === "fr" ? cs.summary.fr : cs.summary.en;
  return {
    title: `${cs.title} — PTR Niger case study`,
    description: summary,
    openGraph: {
      title: `${cs.title} — PTR Niger`,
      description: summary,
      images: [{ url: cs.cover, width: 1200, height: 630, alt: cs.title }],
    },
  };
}

const SECTIONS = [
  { key: "situation" as const, title: { en: "Situation", fr: "Situation" } },
  { key: "challenge" as const, title: { en: "Challenge", fr: "Enjeu" } },
  { key: "solution" as const, title: { en: "Solution", fr: "Solution" } },
  { key: "result" as const, title: { en: "Result", fr: "Résultat" } },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cs = caseStudyBySlug(slug);
  if (!cs) notFound();

  const summary = locale === "fr" ? cs.summary.fr : cs.summary.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    headline: cs.title,
    abstract: summary,
    creator: { "@type": "Organization", name: "PTR Niger" },
    inLanguage: locale,
    image: cs.cover,
    dateCreated: cs.year,
    keywords: cs.stack.join(", "),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/work"
        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-ptr-teal"
      >
        ← {locale === "fr" ? "Toutes les réalisations" : "All work"}
      </Link>
      <header className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono uppercase tracking-wider text-muted">
            {cs.flag} {cs.region}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono uppercase tracking-wider text-muted">
            {cs.sector}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono uppercase tracking-wider text-muted">
            {cs.year}
          </span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl">
          {cs.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted">{summary}</p>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-white/[0.08]">
        <Image
          src={cs.cover}
          alt={`${cs.title} — ${cs.client}`}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          priority
          className="object-cover"
        />
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cs.metrics.map((m) => (
          <li
            key={m.value}
            className="rounded-2xl border border-white/[0.08] bg-surface/60 p-5"
          >
            <p className="font-display text-3xl text-ptr-teal">{m.value}</p>
            <p className="mt-1 text-sm text-muted">
              {locale === "fr" ? m.label.fr : m.label.en}
            </p>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {cs.stack.map((s) => (
          <li
            key={s}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-mono uppercase text-muted"
          >
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-12 space-y-10">
        {SECTIONS.map(({ key, title }) => (
          <section key={key} className="space-y-3">
            <h2 className="font-display text-2xl text-off-white">
              {locale === "fr" ? title.fr : title.en}
            </h2>
            <p className="leading-relaxed text-off-white">
              {locale === "fr" ? cs[key].fr : cs[key].en}
            </p>
          </section>
        ))}
      </div>

      {cs.links?.live && (
        <div className="mt-10">
          <a
            href={cs.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-off-white hover:border-ptr-teal/40"
          >
            {locale === "fr" ? "Voir la production" : "Visit live site"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}

      <div className="mt-16 rounded-3xl border border-ptr-teal/30 bg-ptr-teal/[0.04] p-8 text-center">
        <h3 className="font-display text-2xl text-off-white">
          {locale === "fr"
            ? "Un système comparable à construire ?"
            : "A similar system to build?"}
        </h3>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon"
        >
          {locale === "fr" ? "Réserver un appel" : "Book a call"}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
