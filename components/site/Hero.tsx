"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const t = useTranslations();
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="max-w-3xl space-y-6">
          <motion.span
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-ptr-teal/30 bg-ptr-teal/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ptr-teal"
          >
            <span aria-hidden className="relative inline-flex h-1.5 w-3 items-center">
              <span className="absolute left-0 h-1.5 w-1.5 rounded-full bg-ptr-red" />
              <span className="absolute right-0 h-1.5 w-1.5 rounded-full bg-ptr-teal" />
            </span>
            {t("hero.timezoneBadge")}
          </motion.span>

          <h1 className="font-display text-4xl tracking-tight text-off-white sm:text-5xl lg:text-7xl">
            <motion.span {...fade(0.1)} className="block">
              {t("hero.h1Lead")}
            </motion.span>
            <motion.span {...fade(0.25)} className="relative inline-block">
              <span className="text-mask-ptr">{t("hero.h1Tail")}</span>
              <motion.span
                aria-hidden
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ transformOrigin: "left" }}
                className="absolute -bottom-1 left-0 h-1 w-2/3 rounded-full bg-ptr-red"
              />
            </motion.span>
          </h1>

          <motion.p
            {...fade(0.4)}
            className="max-w-2xl text-base text-muted sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            {...fade(0.55)}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon transition-shadow hover:shadow-[0_0_40px_-5px_color-mix(in_oklab,var(--ptr-teal)_70%,transparent)]"
            >
              {t("nav.primaryCta")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-6 py-3 text-sm font-medium text-off-white hover:border-ptr-red/40 hover:bg-elev"
            >
              {t("nav.work")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
