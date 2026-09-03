import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSlider from "@/components/sections/HeroSlider";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProductsPreview from "@/components/sections/ProductsPreview";
import ProjectsGalleryPreview from "@/components/sections/ProjectsGalleryPreview";
import VideoSection from "@/components/sections/VideoSection";
import CalculatorCTA from "@/components/sections/CalculatorCTA";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import { getAllProducts } from "@/lib/db/products";
import { getActiveHeroSlides } from "@/lib/db/hero-slides";
import { getSiteSettings } from "@/lib/db/site-settings";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `https://veroceilings.uz/${locale}`,
      languages: {
        uz: "https://veroceilings.uz/uz",
        ru: "https://veroceilings.uz/ru",
        en: "https://veroceilings.uz/en",
        "x-default": "https://veroceilings.uz/uz",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://veroceilings.uz/${locale}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const [products, heroSlides, settings] = await Promise.all([
    getAllProducts(),
    getActiveHeroSlides(),
    getSiteSettings(),
  ]);

  return (
    <>
      {/* Hidden H1 for SEO — visible to crawlers */}
      <h1 className="sr-only">{t("h1")}</h1>

      <HeroSlider locale={locale} slides={heroSlides} phone={settings.phone_primary} />
      <WhyUsSection locale={locale} />
      <ProductsPreview products={products} locale={locale} />
      <VideoSection locale={locale} />
      <ProjectsGalleryPreview locale={locale} />
      <CalculatorCTA locale={locale} />
      <FaqSection locale={locale} />
      <ContactSection locale={locale} variant="dark" />
    </>
  );
}
