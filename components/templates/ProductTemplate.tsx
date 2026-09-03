import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { StaticProduct } from "@/lib/data/static-products";
import { getRelatedProducts } from "@/lib/db/products";
import { getVideoForProduct } from "@/lib/db/site-videos";
import ProductImageSwiper from "@/components/ui/ProductImageSwiper";
import ApplicationCasesSwiper from "@/components/ui/ApplicationCasesSwiper";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { getSiteSettings, telHref } from "@/lib/db/site-settings";
import JsonLd from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/seo/schema";

interface Props {
  product: StaticProduct;
  locale: string;
}

export default async function ProductTemplate({ product, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "products" });
  const slug = product.slug;

  const titleKey = `${slug}.title` as Parameters<typeof t>[0];
  const descKey = `${slug}.description` as Parameters<typeof t>[0];

  let title = slug;
  let desc = "";
  try { title = t(titleKey); } catch { }
  try { desc = t(descKey); } catch { }

  let specs: Record<string, string> | null = null;
  try {
    const raw = t.raw(`${slug}.specs` as Parameters<typeof t>[0]);
    if (raw && typeof raw === "object") specs = raw as Record<string, string>;
  } catch { }

  let specKeys: Record<string, string> = {};
  try {
    specKeys = t.raw("spec_keys") as Record<string, string>;
  } catch { }

  const altLocale = `alt_${locale}` as "alt_uz" | "alt_ru" | "alt_en";
  const galleryImages = (product.images ?? []).map((img) => ({ src: img.src, alt: img[altLocale] || title }));
  const applicationImages = (product.application_cases ?? []).map((img) => ({ src: img.src, alt: img[altLocale] || title }));

  const relatedProducts = await getRelatedProducts(product.related_products ?? []);
  const settings = await getSiteSettings();

  const dbVideo = await getVideoForProduct(slug);
  const videoTitle = dbVideo ? dbVideo[`title_${locale}` as "title_uz" | "title_ru" | "title_en"] : title;
  const embedVideoId = dbVideo?.youtube_id;

  const home = locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : "Home";
  const productsLabel = locale === "uz" ? "Mahsulotlar" : locale === "ru" ? "Продукция" : "Products";

  const localeKey = locale as "uz" | "ru" | "en";

  return (
    <>
      <JsonLd
        schema={productSchema({
          slug,
          title,
          description: desc,
          image: product.hero_image_url,
          locale: localeKey,
          specs,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: home, url: `/${locale}` },
          { name: productsLabel, url: `/${locale}/products` },
          { name: title },
        ])}
      />

      <div className="page-header" style={{ marginTop: "82px" }}>
        <div style={{ position: "absolute", inset: 0, background: `url(${product.hero_image_url}) center/cover`, filter: "brightness(0.35)" }} />
        <div className="page-header__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li><Link href={`/${locale}`}>{home}</Link></li>
              <li className="breadcrumb__sep">›</li>
              <li><Link href={`/${locale}/products`}>{productsLabel}</Link></li>
              <li className="breadcrumb__sep">›</li>
              <li style={{ color: "white" }}>{title}</li>
            </ol>
          </nav>
          <h1 className="page-header__title">{title}</h1>
        </div>
      </div>

      {/* Hero: gallery + info */}
      <div className="section">
        <div className="container product-hero">
          <div className="product-hero__gallery">
            <ProductImageSwiper images={galleryImages} />
          </div>

          <div className="product-hero__info">
            <h2 className="product-hero__title">{title}</h2>
            <p className="product-hero__desc">{desc}</p>

            {specs && Object.keys(specs).length > 0 && (
              <div className="product-specs">
                <h3>{t("specs_title")}</h3>
                <ul>
                  {Object.entries(specs).map(([key, value]) => (
                    <li key={key}>
                      <span className="product-specs__key">{specKeys[key] ?? key}</span>
                      <span className="product-specs__value">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-order-cta">
              <h3>{t("order_cta_title")}</h3>
              <p>{t("order_cta_text")}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                <a href={telHref(settings.phone_primary)} className="btn-primary">
                  <Phone size={16} /> {settings.phone_primary}
                </a>
                <Link href={`/${locale}/contact`} className="btn-secondary">
                  {t("order_cta_button")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {applicationImages.length > 0 && (
        <div className="section" style={{ background: "var(--color-surface-alt)" }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: "center" }}>{t("application_cases_title")}</h2>
            <div style={{ marginTop: "2rem" }}>
              <ApplicationCasesSwiper images={applicationImages} />
            </div>
          </div>
        </div>
      )}

      {embedVideoId && (
        <div className="section" style={{ background: "var(--color-primary-dark)", color: "white" }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: "center", color: "white" }}>{t("video_installation_title")}</h2>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${embedVideoId}?rel=0&modestbranding=1`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="section">
          <div className="container">
            <h2 className="section-title" style={{ textAlign: "center" }}>{t("related_products_title")}</h2>
            <div className="related-products-container">
              {relatedProducts.map((rp) => {
                const rTitleKey = `${rp.slug}.title` as Parameters<typeof t>[0];
                const rDescKey = `${rp.slug}.description` as Parameters<typeof t>[0];
                let rTitle = rp.slug;
                let rDesc = "";
                try { rTitle = t(rTitleKey); } catch { }
                try { rDesc = t(rDescKey); } catch { }

                return (
                  <Link key={rp.id} href={`/${locale}/products/${rp.slug}`} style={{ textDecoration: "none" }}>
                    <article className="product-card">
                      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                        <Image src={rp.hero_image_url} alt={rTitle} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 className="card-title" style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-primary)", marginBottom: "0.625rem" }}>{rTitle}</h3>
                        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{rDesc}</p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .product-hero { display: flex; gap: 3rem; align-items: flex-start; }
        .product-hero__gallery { flex: 1; min-width: 0; }
        .product-details-swiper { height: 500px !important; border-radius: 12px; }
        .product-details-swiper .swiper-slide { height: 460px !important; }
        .product-details-swiper .swiper-pagination { margin-top: 24px !important; }
        .product-details-swiper .swiper-pagination-bullet { background: var(--color-accent); }
        .application-cases-swiper { height: 320px !important; }
        .application-cases-swiper .swiper-slide { height: 280px !important; border-radius: 8px; overflow: hidden; }
        .application-cases-swiper .swiper-pagination { margin-top: 32px !important; }
        .application-cases-swiper .swiper-pagination-bullet { background: var(--color-accent); }
        .product-hero__info { flex: 1; min-width: 0; }
        .product-hero__title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; color: var(--color-primary); margin-bottom: 1rem; }
        .product-hero__desc { font-size: 1.05rem; line-height: 1.7; color: var(--color-text-muted); margin-bottom: 2rem; }
        .product-specs { background: var(--color-surface-alt); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .product-specs h3 { font-size: 1.1rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--color-accent); }
        .product-specs ul { list-style: none; padding: 0; margin: 0; }
        .product-specs li { display: flex; justify-content: space-between; gap: 1rem; padding: 0.65rem 0; border-bottom: 1px solid var(--color-border); font-size: 0.9rem; }
        .product-specs li:last-child { border-bottom: none; padding-bottom: 0; }
        .product-specs__key { color: var(--color-text); font-weight: 600; }
        .product-specs__value { color: var(--color-text-muted); text-align: right; }
        .product-order-cta { padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, rgba(234,88,12,0.08), rgba(234,88,12,0.02)); border: 1px solid rgba(234,88,12,0.25); }
        .product-order-cta h3 { font-size: 1.1rem; margin-bottom: 0.4rem; color: var(--color-primary); }
        .product-order-cta p { font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.25rem; }
        .video-container { position: relative; padding-bottom: 42%; height: 0; overflow: hidden; max-width: 900px; margin: 2rem auto 0; background: #000; border-radius: 12px; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .related-products-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.75rem; margin-top: 2rem; }
        @media (max-width: 768px) {
          .product-hero { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
