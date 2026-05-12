"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

const KEY = "ptr-cookies-ack";

export function CookieBanner() {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined" && !window.localStorage.getItem(KEY)) {
        setOpen(true);
      }
    } catch {
      /* no-op */
    }
  }, []);

  if (!open) return null;

  function accept() {
    try {
      window.localStorage.setItem(KEY, new Date().toISOString());
    } catch {
      /* no-op */
    }
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookies.title")}
      className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-3xl rounded-2xl border border-line bg-carbon/95 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-display text-base text-off-white">{t("cookies.title")}</p>
          <p className="text-sm text-muted">{t("cookies.body")}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/privacy" className="text-xs text-muted underline-offset-4 hover:underline">
            {t("cookies.more")}
          </Link>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-ptr-teal px-5 py-2 text-sm font-semibold text-carbon"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
