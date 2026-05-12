import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="space-y-3 lg:col-span-5">
          <p className="font-display text-2xl text-off-white">{t("brand.name")}</p>
          <p className="max-w-md text-sm text-muted">{t("footer.tagline")}</p>
        </div>

        <div className="lg:col-span-3 space-y-3 text-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {t("footer.navigation")}
          </p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/work" className="hover:text-off-white">{t("nav.work")}</Link></li>
            <li><Link href="/services" className="hover:text-off-white">{t("nav.services")}</Link></li>
            <li><Link href="/about" className="hover:text-off-white">{t("nav.about")}</Link></li>
            <li><Link href="/contact" className="hover:text-off-white">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-3 text-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {t("footer.legal")}
          </p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/privacy" className="hover:text-off-white">{t("footer.privacy")}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-3 text-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {t("nav.contact")}
          </p>
          <a
            href={`mailto:${t("brand.agencyEmail")}`}
            className="block break-all text-muted hover:text-ptr-teal"
          >
            {t("brand.agencyEmail")}
          </a>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 font-mono text-[11px] uppercase tracking-wider text-muted sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {t("brand.name")}. {t("footer.rights")}</span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ptr-teal" />
            {t("hero.timezoneBadge")}
          </span>
        </div>
      </div>
    </footer>
  );
}
