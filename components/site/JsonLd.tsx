// Server JSON-LD emitter (Story 5.4 / AD-029).

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agency.ptrniger.com";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PTR Niger",
  url: SITE,
  logo: `${SITE}/image/ptrniger.png`,
  email: "mail@ptrniger.com",
  foundingDate: "2017",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Niamey",
    addressCountry: "NE",
  },
  areaServed: ["NE", "FR", "BE", "JP", "EU"],
};

export function webPageLd(opts: {
  url: string;
  name: string;
  description: string;
  inLanguage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.inLanguage,
    isPartOf: { "@type": "WebSite", name: "PTR Niger", url: SITE },
  };
}
