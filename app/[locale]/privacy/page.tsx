import { getLocale, setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";
  return (
    <article className="prose prose-invert mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h1 className="font-display text-4xl text-off-white">
        {isFr ? "Politique de confidentialité" : "Privacy policy"}
      </h1>
      <p className="text-muted">{isFr ? "Dernière mise à jour : 2026-05-01." : "Last updated: 2026-05-01."}</p>

      <h2 className="mt-8 font-display text-2xl text-off-white">
        {isFr ? "Données collectées" : "Data we collect"}
      </h2>
      <p className="text-muted">
        {isFr
          ? "Nous collectons uniquement les données que vous nous fournissez via le formulaire de contact (nom, société, email, type de projet, brief, source de référence) et les compteurs anonymes de pages vues via Umami auto-hébergé."
          : "We only collect data you give us via the contact form (name, company, email, project type, brief, referral source) and anonymous page-view counts via self-hosted Umami."}
      </p>

      <h2 className="mt-8 font-display text-2xl text-off-white">
        {isFr ? "Sous-traitants" : "Processors"}
      </h2>
      <ul className="text-muted">
        <li>{isFr ? "Hébergeur VPS (UE)" : "VPS host (EU)"}</li>
        <li>{isFr ? "Umami (auto-hébergé, même VPS)" : "Umami (self-hosted, same VPS)"}</li>
        <li>{isFr ? "Calendly (uniquement si vous prenez un rendez-vous)" : "Calendly (only if you book a call)"}</li>
        <li>{isFr ? "Telegram Bot API (notifications de soumission de formulaire)" : "Telegram Bot API (form-submission notifications)"}</li>
      </ul>

      <h2 className="mt-8 font-display text-2xl text-off-white">
        {isFr ? "Vos droits" : "Your rights"}
      </h2>
      <p className="text-muted">
        {isFr
          ? "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à mail@ptrniger.com."
          : "You can request access, rectification or deletion of your data by emailing mail@ptrniger.com."}
      </p>

      <h2 className="mt-8 font-display text-2xl text-off-white">
        {isFr ? "Cookies" : "Cookies"}
      </h2>
      <p className="text-muted">
        {isFr
          ? "Notre Umami auto-hébergé n'écrit pas de cookies de tracking. Calendly et le formulaire de contact peuvent écrire des cookies courts uniquement quand vous interagissez avec eux. Aucun cookie publicitaire."
          : "Our self-hosted Umami sets no tracking cookies. Calendly and the contact form may set short-lived cookies only when you interact with them. No advertising cookies."}
      </p>
    </article>
  );
}
