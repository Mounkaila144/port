"use client"

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { ArrowUpRight, Menu, X } from "lucide-react";
import React from "react";

const NAV: { href: "/" | "/work" | "/services" | "/about" | "/contact"; key: "home" | "work" | "services" | "about" | "contact" }[] = [
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-carbon/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-ptr-teal/30 bg-ptr-teal/10 font-display text-sm text-ptr-teal"
          >
            PTR
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-sm text-off-white">{t("brand.name")}</span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {t("footer.tagline")}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
            {NAV.map(({ href, key }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-ptr-teal text-carbon"
                        : "text-muted hover:text-off-white"
                    }`}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-ptr-teal px-4 py-2 text-xs font-semibold text-carbon transition-shadow hover:shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--ptr-teal)_70%,transparent)]"
          >
            {t("nav.primaryCta")}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-off-white"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-carbon">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-off-white hover:bg-white/[0.04]"
                >
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-ptr-teal px-4 py-3 text-sm font-semibold text-carbon"
              >
                {t("nav.primaryCta")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
