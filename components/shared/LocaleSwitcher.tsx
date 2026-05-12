"use client"

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations();
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (locale: Locale) => {
    router.replace(pathname as "/", { locale });
  };

  return (
    <div
      role="group"
      aria-label={t("switchToEnglish")}
      className={
        className ??
        "flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 backdrop-blur-md"
      }
    >
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-current={active === locale ? "true" : undefined}
          aria-label={
            locale === "en" ? t("switchToEnglish") : t("switchToFrench")
          }
          className={`px-3 py-1 text-xs font-mono uppercase rounded-full transition-colors ${
            active === locale
              ? "bg-white/15 text-off-white"
              : "text-muted hover:text-off-white"
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
