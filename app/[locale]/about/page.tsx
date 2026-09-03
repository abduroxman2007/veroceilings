import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ContactSection from "@/components/sections/ContactSection";
import ApplicationCasesSwiper from "@/components/ui/ApplicationCasesSwiper";
import { Factory, Globe2 } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.pages.about" });
  return buildPageMetadata({
    locale,
    path: "about",
    title: t("title"),
    description: t("description"),
    image: "/images/slider/slid1.jpg",
  });
}

const GALLERY = [
  "/images/aboutus/au2.jpg",
  "/images/aboutus/au3.jpg",
  "/images/aboutus/au4.jpg",
  "/images/aboutus/au5.jpg",
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <div className="page-header" style={{ marginTop: "82px" }}>
        <Image src="/images/slider/slid1.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.3)" }} />
        <div className="page-header__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li><Link href={`/${locale}`}>{locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : "Home"}</Link></li>
              <li className="breadcrumb__sep">›</li>
              <li style={{ color: "white" }}>{t("page_title")}</li>
            </ol>
          </nav>
          <h1 className="page-header__title">{t("page_title")}</h1>
        </div>
      </div>

      {/* Facility photos */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }} className="about-hero-grid">
            <div style={{ position: "relative", height: "360px", borderRadius: "12px", overflow: "hidden" }}>
              <Image src="/images/aboutus/au0.jpg" alt="Vero Ceilings ishlab chiqarish zavodi — Toshkent" fill sizes="(max-width: 768px) 100vw, 66vw" style={{ objectFit: "cover" }} priority />
            </div>
            <div style={{ position: "relative", height: "360px", borderRadius: "12px", overflow: "hidden" }}>
              <Image src="/images/aboutus/au6.jpg" alt="Vero Group rahbariyati" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Company description */}
      <div className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 className="section-title" style={{ textAlign: "center" }}>{t("title")}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-muted)", marginTop: "1.5rem" }}>
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="section" style={{ background: "var(--color-surface-alt)" }}>
        <div className="container">
          <ApplicationCasesSwiper images={GALLERY.map((src) => ({ src, alt: t("title") }))} />
        </div>
      </div>

      {/* Story + vision */}
      <div className="section" style={{ background: "var(--color-surface-alt)" }}>
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <Image src="/images/aboutus/au1.jpg" alt={t("story_image_alt")} fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>

            <div>
              <h2 className="section-title">{t("story_title")}</h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1.75rem" }}>{t("story_text")}</p>

              <div className="about-highlight-card">
                <div className="about-highlight-card__icon">
                  <Factory size={20} />
                </div>
                <div>
                  <h3>{t("intro_title")}</h3>
                  <p>{t("intro_text")}</p>
                </div>
              </div>

              <div className="about-highlight-card about-highlight-card--accent">
                <div className="about-highlight-card__icon about-highlight-card__icon--accent">
                  <Globe2 size={20} />
                </div>
                <div>
                  <h3>{t("vision_title")}</h3>
                  <p>{t("vision_text")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhyUsSection locale={locale} />
      <ContactSection locale={locale} variant="dark" />

      <style>{`
        .about-story-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 3rem; align-items: stretch; }
        .about-story-image { position: relative; border-radius: 16px; overflow: hidden; min-height: 380px; box-shadow: 0 16px 40px rgba(10,15,29,0.14); }
        .about-highlight-card { display: flex; gap: 1rem; align-items: flex-start; padding: 1.5rem; background: white; border-radius: 12px; border: 1px solid var(--color-border); margin-bottom: 1.25rem; box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
        .about-highlight-card:last-child { margin-bottom: 0; }
        .about-highlight-card--accent { background: linear-gradient(135deg, rgba(234,88,12,0.06), rgba(234,88,12,0.01)); border-color: rgba(234,88,12,0.25); }
        .about-highlight-card__icon { flex-shrink: 0; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--color-surface-alt); color: var(--color-primary); }
        .about-highlight-card__icon--accent { background: rgba(234,88,12,0.15); color: var(--color-accent); }
        .about-highlight-card h3 { font-size: 1.05rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.4rem; }
        .about-highlight-card p { color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.7; margin: 0; }
        @media (max-width: 860px) {
          .about-hero-grid { grid-template-columns: 1fr !important; }
          .about-story-grid { grid-template-columns: 1fr; }
          .about-story-image { min-height: 260px; }
        }
      `}</style>
    </>
  );
}
