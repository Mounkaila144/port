import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main className="grid min-h-screen place-items-center bg-carbon px-6 text-off-white">
      <div className="max-w-lg space-y-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          404
        </p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {t("notFoundTitle") /* falls back to key if missing */}
        </h1>
        <p className="text-muted">
          {t("notFoundDescription")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon transition-shadow hover:shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--ptr-teal)_70%,transparent)]"
        >
          {t("notFoundCta")}
        </Link>
      </div>
    </main>
  );
}
