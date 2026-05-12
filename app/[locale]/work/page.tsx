"use client"

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Search as SearchIcon, Globe } from "lucide-react";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import type { Project } from "@/content/types";

const SECTORS = ["all", ...Array.from(new Set(projects.map((p) => p.sector).filter(Boolean) as string[]))];
const REGIONS = ["all", ...Array.from(new Set(projects.map((p) => p.region).filter(Boolean) as string[]))];
const TYPES = ["all", "Entreprise", "Freelance", "Personnel"] as const;

function projectCaseStudy(p: Project) {
  return caseStudies.find((cs) =>
    cs.cover === p.cover || cs.title === p.title || cs.client === p.company,
  );
}

export default function WorkPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [query, setQuery] = React.useState("");
  const [sector, setSector] = React.useState<string>("all");
  const [region, setRegion] = React.useState<string>("all");
  const [type, setType] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    return projects.filter((p) => {
      if (sector !== "all" && p.sector !== sector) return false;
      if (region !== "all" && p.region !== region) return false;
      if (type !== "all" && p.kind !== type) return false;
      if (query) {
        const haystack = [p.title, p.company, p.description, ...p.tags, p.sector ?? "", p.region ?? ""]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [query, sector, region, type]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <header className="space-y-3">
        <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl lg:text-6xl">
          {t("work.pageTitle")}
        </h1>
        <p className="max-w-2xl text-muted">{t("work.pageSubtitle")}</p>
      </header>

      <div className="mt-8 space-y-3">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("work.search")}
            className="w-full rounded-full border border-line bg-surface/60 px-12 py-3 text-sm text-off-white placeholder:text-muted focus:border-ptr-teal/40 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterGroup label={t("work.filterSector")} items={SECTORS} active={sector} onChange={setSector} />
          <FilterGroup label={t("work.filterRegion")} items={REGIONS} active={region} onChange={setRegion} />
          <FilterGroup label={t("work.filterType")} items={[...TYPES] as string[]} active={type} onChange={setType} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">{t("work.empty")}</p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const cs = projectCaseStudy(p);
            const slug = cs ? (locale === "fr" ? cs.slugFr : cs.slug) : null;
            const card = (
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/60 transition-colors hover:border-ptr-teal/40">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                    {p.region && <span>{p.region}</span>}
                    {p.region && <span aria-hidden className="opacity-60">·</span>}
                    <span>{p.year}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-lg text-off-white">{p.title}</h2>
                    {cs && (
                      <span className="rounded-full border border-ptr-teal/30 bg-ptr-teal/[0.08] px-2 py-0.5 text-[10px] font-mono uppercase text-ptr-teal">
                        case study
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted line-clamp-3">{p.description}</p>
                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-soft px-2 py-0.5 text-[10px] font-mono uppercase text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center gap-3 pt-1">
                    {p.links.site !== "#" && (
                      <a
                        href={p.links.site}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-muted hover:text-ptr-teal"
                      >
                        <Globe className="h-3 w-3" />
                        live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
            return (
              <li key={p.id}>
                {slug ? (
                  <Link
                    href={{ pathname: "/case-studies/[slug]", params: { slug } }}
                    className="block h-full"
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  items,
  active,
  onChange,
}: {
  label: string;
  items: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-soft p-1">
      <span className="px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</span>
      {items.map((it) => (
        <button
          key={it}
          type="button"
          onClick={() => onChange(it)}
          className={`rounded-full px-3 py-1 text-xs transition-colors ${
            active === it ? "bg-ptr-teal text-carbon" : "text-muted hover:text-off-white"
          }`}
        >
          {it === "all" ? "All" : it}
        </button>
      ))}
    </div>
  );
}
