import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/schema";

const LOCALES = ["uz", "ru", "en"] as const;
const DEFAULT_LOCALE = "uz";

const OG_LOCALE: Record<string, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

interface PageMetaInput {
  locale: string;
  /** Path after the locale, no leading slash. "" for the locale root. */
  path: string;
  title: string;
  description: string;
  /** Absolute or root-relative. Defaults to the site OG image. */
  image?: string;
}

/**
 * Builds canonical + full hreflang (all locales plus x-default) + per-page
 * OpenGraph/Twitter in one place.
 *
 * Previously each page hand-rolled its own `alternates`, which drifted: most
 * used bare relative paths and omitted x-default, and none set their own
 * openGraph — so every page silently inherited the homepage's OG title and URL
 * from the root layout, and sharing any inner page previewed as the homepage.
 */
export function buildPageMetadata({ locale, path, title, description, image }: PageMetaInput): Metadata {
  const suffix = path ? `/${path}` : "";
  const url = `${SITE_URL}/${locale}${suffix}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/og-image.jpg`;

  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}/${l}${suffix}`])
  );
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${suffix}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      url,
      siteName: "Vero Ceilings",
      title,
      description,
      locale: OG_LOCALE[locale] ?? OG_LOCALE.uz,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
