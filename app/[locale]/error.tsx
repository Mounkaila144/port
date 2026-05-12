"use client"

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-carbon px-6 text-off-white">
      <div className="max-w-lg space-y-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">500</p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {t("errorTitle")}
        </h1>
        <p className="text-muted">{t("errorDescription")}</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon"
        >
          {t("errorRetry")}
        </button>
      </div>
    </main>
  );
}
