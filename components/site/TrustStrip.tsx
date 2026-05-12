import { getTranslations } from "next-intl/server";

// Story 2.2 — TrustStrip. Real client logos to be supplied with written
// permission (LD-7/LD-8). Until then we render named placeholder cards
// (no Unsplash, no third-party imagery). Drop SVG/PNG files into
// public/logos/clients/ and replace the placeholders below.
const CLIENTS = [
  "Softis Pilates",
  "GuidaCenter",
  "Commande Sans Frontière",
  "EMMA-Lab",
] as const;

export async function TrustStrip() {
  const t = await getTranslations();
  return (
    <section aria-label={t("hero.trustStrip")} className="border-y border-white/[0.06] bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {t("hero.trustStrip")}
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="flex h-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted"
              title={name}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
