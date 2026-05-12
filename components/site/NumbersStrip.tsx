import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { CountUp } from "./CountUp";

export async function NumbersStrip() {
  const t = await getTranslations("numbersStrip");

  const sectors = new Set(projects.map((p) => p.sector).filter(Boolean)).size;

  const stats: { value: number; suffix: string; label: string }[] = [
    { value: 5, suffix: "+", label: t("yearsLabel") },
    { value: projects.length, suffix: "+", label: t("projectsLabel") },
    { value: caseStudies.length, suffix: "", label: t("caseStudiesLabel") },
    { value: sectors, suffix: "", label: t("sectorsLabel") },
  ];

  return (
    <section
      aria-labelledby="numbers-strip-title"
      className="relative border-b border-line"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ptr-red">
              {t("eyebrow")}
            </p>
            <h2
              id="numbers-strip-title"
              className="font-display text-3xl tracking-tight text-off-white sm:text-4xl"
            >
              {t("title")}
            </h2>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative flex flex-col gap-3 bg-carbon p-6 transition-colors hover:bg-surface sm:p-8"
            >
              <span
                aria-hidden
                className={`absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] ${
                  i % 2 === 0 ? "text-ptr-red" : "text-ptr-teal"
                }`}
              >
                0{i + 1}
              </span>
              <dt className="sr-only">{s.label}</dt>
              <dd className="mt-8 font-display text-5xl tracking-tight text-off-white sm:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {s.label}
              </p>
              <span
                aria-hidden
                className={`absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  i % 2 === 0 ? "bg-ptr-red" : "bg-ptr-teal"
                }`}
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
