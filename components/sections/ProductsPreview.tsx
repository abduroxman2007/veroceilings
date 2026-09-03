import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { StaticProduct } from "@/lib/data/static-products";
import { ArrowRight } from "lucide-react";

interface Props { products: StaticProduct[]; locale: string; }

export default async function ProductsPreview({ products, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "products" });
  const mainProducts = products.filter((p) => p.category === "product").slice(0, 6);

  return (
    <section className="section" aria-label={t("products_section_title")}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <h2 className="section-title">{t("products_section_title")}</h2>
            <p style={{ color: "var(--color-text-muted)" }}>{t("page_title")}</p>
          </div>
          <Link href={`/${locale}/products`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-accent)", textDecoration: "none", fontWeight: "600", whiteSpace: "nowrap" }}>
            {locale === "uz" ? "Barcha mahsulotlar" : locale === "ru" ? "Все продукты" : "View all"} <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.75rem" }}>
          {mainProducts.map((product) => {
            const titleKey = `${product.slug}.title` as Parameters<typeof t>[0];
            const descKey = `${product.slug}.description` as Parameters<typeof t>[0];
            let title = product.slug;
            let desc = "";
            try { title = t(titleKey); } catch { }
            try { desc = t(descKey); } catch { }

            return (
              <Link key={product.id} href={`/${locale}/products/${product.slug}`} style={{ textDecoration: "none" }}>
                <article className="product-card">
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <Image
                      src={product.hero_image_url}
                      alt={`${title} — Vero Ceilings ${locale === "uz" ? "Toshkent" : locale === "ru" ? "Ташкент" : "Tashkent"}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover", transition: "transform 0.4s" }}
                    />
                    <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "var(--color-accent)", color: "var(--color-primary-dark)", padding: "0.25rem 0.625rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {product.category === "product" ? (locale === "uz" ? "Mahsulot" : locale === "ru" ? "Продукт" : "Product") : (locale === "uz" ? "Aksessuar" : locale === "ru" ? "Аксессуар" : "Accessory")}
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 className="card-title" style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--color-primary)", marginBottom: "0.625rem" }}>{title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: "1.6", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--color-accent)", fontWeight: "600", fontSize: "0.875rem", marginTop: "1.25rem" }}>
                      {locale === "uz" ? "Batafsil ko'rish" : locale === "ru" ? "Подробнее" : "View details"} <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
