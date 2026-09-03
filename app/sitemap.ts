import { MetadataRoute } from "next";
import { getAllProductSlugsWithDates } from "@/lib/db/products";

const BASE_URL = "https://veroceilings.uz";
const LOCALES = ["uz", "ru", "en"] as const;
const STATIC_PAGES = ["", "products", "projects", "about", "contact", "faq", "calculator", "architects"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProductSlugsWithDates();

  // No per-page content-change date is tracked for these, so lastModified is
  // omitted rather than stamped with the sitemap's own build time — a fake
  // "changed today" on every URL is a worse signal than no signal at all.
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${page ? `/${page}` : ""}`,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : page === "products" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE_URL}/${l}${page ? `/${page}` : ""}`])
        ),
      },
    }))
  );

  const productEntries: MetadataRoute.Sitemap = products.flatMap(({ slug, updatedAt }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/products/${slug}`,
      ...(updatedAt ? { lastModified: updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE_URL}/${l}/products/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...productEntries];
}
