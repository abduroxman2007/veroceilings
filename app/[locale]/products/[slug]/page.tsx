import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/lib/db/products";
import ProductTemplate from "@/components/templates/ProductTemplate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  const locales = ["uz", "ru", "en"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found" };

  const t = await getTranslations({ locale, namespace: "products" });
  const seoTitleKey = `${slug}.seo_title` as Parameters<typeof t>[0];
  const seoDescKey = `${slug}.seo_description` as Parameters<typeof t>[0];
  const titleKey = `${slug}.title` as Parameters<typeof t>[0];

  let seoTitle: string;
  let seoDesc: string;
  try { seoTitle = t(seoTitleKey); } catch { try { seoTitle = t(titleKey); } catch { seoTitle = slug; } }
  try { seoDesc = t(seoDescKey); } catch { seoDesc = ""; }

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `https://veroceilings.uz/${locale}/products/${slug}`,
      languages: {
        uz: `https://veroceilings.uz/uz/products/${slug}`,
        ru: `https://veroceilings.uz/ru/products/${slug}`,
        en: `https://veroceilings.uz/en/products/${slug}`,
        "x-default": `https://veroceilings.uz/uz/products/${slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [{ url: product.hero_image_url, width: 1200, height: 630 }],
      url: `https://veroceilings.uz/${locale}/products/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [product.hero_image_url],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductTemplate product={product} locale={locale} />;
}
