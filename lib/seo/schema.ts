import type { SiteSettings } from "@/lib/db/site-settings";

export const SITE_URL = "https://veroceilings.uz";

type Locale = "uz" | "ru" | "en";

/**
 * Organization + LocalBusiness for the factory itself. Every figure here must
 * stay verifiable — this is the entity Google associates with the brand, and
 * inflated claims are both a trust and a legal risk.
 */
export function organizationSchema(settings: SiteSettings, locale: Locale) {
  const addressKey = `address_${locale}` as keyof SiteSettings;

  const sameAs = [settings.instagram_url, settings.youtube_url].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Vero Ceilings",
    legalName: "Vero Ceilings",
    url: SITE_URL,
    logo: `${SITE_URL}/images/vero_logo.png`,
    image: `${SITE_URL}/images/vero_logo.png`,
    foundingDate: "2014",
    telephone: settings.phone_primary,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: (settings[addressKey] as string) || settings.address_uz,
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Tajikistan" },
      { "@type": "Country", name: "Turkmenistan" },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** WebSite entity — enables the sitelinks search box and names the publisher. */
export function webSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: "Vero Ceilings",
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

interface ProductSchemaInput {
  slug: string;
  title: string;
  description: string;
  image: string;
  locale: Locale;
  specs?: Record<string, string> | null;
}

/**
 * Product schema. Deliberately omits `offers` — we publish no prices yet, and a
 * fabricated or empty price block is worse than none (Google flags it, and it
 * would be untrue). Add offers here once a real price page exists.
 */
export function productSchema({ slug, title, description, image, locale, specs }: ProductSchemaInput) {
  const additionalProperty = specs
    ? Object.entries(specs).map(([name, value]) => ({
        "@type": "PropertyValue",
        name,
        value,
      }))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/${locale}/products/${slug}#product`,
    name: title,
    description,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    sku: slug,
    url: `${SITE_URL}/${locale}/products/${slug}`,
    brand: { "@type": "Brand", name: "Vero Ceilings" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    category: "Suspended ceiling systems",
    ...(additionalProperty?.length ? { additionalProperty } : {}),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}` } : {}),
    })),
  };
}
