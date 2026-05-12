"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

const COOKIE = "NEXT_THEME";
const ONE_YEAR = 60 * 60 * 24 * 365;

export function ThemeToggle() {
  const t = useTranslations("theme");
  // Initial render mirrors what the server emitted via the cookie — the <html>
  // class is the source of truth, so reading it on mount avoids hydration drift.
  const [isDark, setIsDark] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    document.cookie = `${COOKIE}=${next ? "dark" : "light"}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
    setIsDark(next);
  }

  const label = isDark ? t("switchToLight") : t("switchToDark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-soft text-off-white transition-colors hover:border-ptr-red/50 hover:text-ptr-red"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
