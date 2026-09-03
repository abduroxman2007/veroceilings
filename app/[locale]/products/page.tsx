import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/db/products";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.pages.products" });
  return buildPageMetadata({
    locale,
    path: "products",
    title: t("title"),
    description: t("description"),
    image: "/images/slider/slid5.jpg",
  });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const allProducts = await getAllProducts();
  const mainProducts = allProducts.filter((p) => p.category === "product");
  const accessories = allProducts.filter((p) => p.category === "accessory");

  const altLocale = `alt_${locale}` as "alt_uz" | "alt_ru" | "alt_en";

  const renderGrid = (items: typeof allProducts) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.75rem" }}>
      {items.map((product) => {
        const titleKey = `${product.slug}.title` as Parameters<typeof t>[0];
        const descKey = `${product.slug}.description` as Parameters<typeof t>[0];
        let title = product.slug;
        let desc = "";
        try { title = t(titleKey); } catch { }
        try { desc = t(descKey); } catch { }
        const imgAlt = product.images[0]?.[altLocale] ?? title;

        return (
          <Link key={product.id} href={`/${locale}/products/${product.slug}`} style={{ textDecoration: "none" }}>
            <article className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#f0f0f0" }}>
                <Image
                  src={product.hero_image_url}
                  alt={imgAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                />
              </div>
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h2 style={{ fontWeight: "700", fontSize: "0.95rem", color: "var(--color-primary)", marginBottom: "0.625rem" }}>{title}</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: "1.65", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--color-accent)", fontWeight: "600", fontSize: "0.875rem", marginTop: "1.25rem" }}>
                  {locale === "uz" ? "Batafsil" : locale === "ru" ? "Подробнее" : "Details"} <ArrowRight size={14} />
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Page header */}
      <div className="page-header" style={{ marginTop: "82px" }}>
        <Image src="/images/slider/slid5.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.3)" }} />
        <div className="page-header__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li><Link href={`/${locale}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                {locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : "Home"}
              </Link></li>
              <li className="breadcrumb__sep">›</li>
              <li style={{ color: "white" }}>{t("products_section_title")}</li>
            </ol>
          </nav>
          <h1 className="page-header__title">{t("page_title")}</h1>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Main products */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 className="section-title" style={{ marginBottom: "2rem" }}>{t("products_section_title")}</h2>
            {renderGrid(mainProducts)}
          </div>

          {/* Accessories */}
          {accessories.length > 0 && (
            <div>
              <h2 className="section-title" style={{ marginBottom: "2rem" }}>{t("accessories_section_title")}</h2>
              {renderGrid(accessories)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
