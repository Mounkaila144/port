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
  "Clinoo",
  "Jandoo",
  "Wuroobiz",
] as const;

export async function TrustStrip() {
  const t = await getTranslations();
  // Duplicate the list so the -50% translate animation loops seamlessly.
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section
      aria-label={t("hero.trustStrip")}
      className="relative border-y border-line bg-surface/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {t("hero.trustStrip")}
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <ul className="flex w-max gap-3 animate-marquee-slow" aria-hidden>
            {loop.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="flex h-14 shrink-0 items-center justify-center rounded-xl border border-line bg-soft px-5 text-center font-mono text-[11px] uppercase tracking-wider text-muted"
                title={name}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        {/* Screen-reader copy of the real (non-duplicated) list. */}
        <ul className="sr-only">
          {CLIENTS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
