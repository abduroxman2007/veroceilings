import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

interface Props { locale: string; }

// 8 preview images for homepage
const PREVIEW_IMAGES = [
  { src: "/images/project-gallery/airportproject.jpg", alt_uz: "Toshkent xalqaro aeroporti — grilyato shift montaji", alt_ru: "Аэропорт Ташкента — монтаж потолка Грильято", alt_en: "Tashkent airport — Grilyato ceiling installation" },
  { src: "/images/project-gallery/office-grilyato.jpg", alt_uz: "Zamonaviy ofisda grilyato osma shift", alt_ru: "Грильято в современном офисе", alt_en: "Grilyato ceiling in modern office" },
  { src: "/images/project-gallery/shoping-center.jpg", alt_uz: "Savdo markazida osma shift tizimi", alt_ru: "Система потолка в торговом центре", alt_en: "Ceiling system in shopping centre" },
  { src: "/images/project-gallery/hotel.jpg", alt_uz: "Mehmonxonada Armstrong shift", alt_ru: "Armstrong в отеле", alt_en: "Armstrong ceiling in hotel" },
  { src: "/images/project-gallery/restaurantproject.jpg", alt_uz: "Restoranda reykali shift", alt_ru: "Реечный потолок в ресторане", alt_en: "Slat ceiling in restaurant" },
  { src: "/images/project-gallery/educationalproject.png", alt_uz: "Ta'lim muassasasida Armstrong shift", alt_ru: "Armstrong в образовательном учреждении", alt_en: "Armstrong ceiling in educational facility" },
  { src: "/images/project-gallery/office-armstrong.jpg", alt_uz: "Ofis binosida metall Armstrong", alt_ru: "Металлический Armstrong в офисе", alt_en: "Metal Armstrong in office building" },
  { src: "/images/project-gallery/office-slatceiling.jpg", alt_uz: "Ofis lobbisida reykali shift", alt_ru: "Реечный потолок в лобби офиса", alt_en: "Slat ceiling in office lobby" },
];

export default async function ProjectsGalleryPreview({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "projects" });

  const altKey = `alt_${locale}` as "alt_uz" | "alt_ru" | "alt_en";

  return (
    <section className="section" style={{ background: "var(--color-surface-alt)" }} aria-label={t("page_title")}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <h2 className="section-title">
              {locale === "uz" ? "Amalga oshirilgan loyihalar" : locale === "ru" ? "Реализованные проекты" : "Completed Projects"}
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>{t("page_title")}</p>
          </div>
          <Link href={`/${locale}/projects`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-accent)", textDecoration: "none", fontWeight: "600" }}>
            {locale === "uz" ? "Barcha loyihalar" : locale === "ru" ? "Все проекты" : "All projects"} <ArrowRight size={16} />
          </Link>
        </div>

        {/* CSS Grid layout for uniform sizing */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.25rem" }}>
          {PREVIEW_IMAGES.map((img, i) => (
            <div key={i} className="hover-card" style={{ aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
              <Image
                src={img.src}
                alt={img[altKey]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href={`/${locale}/projects`} className="btn-primary">
            {locale === "uz" ? "Barcha 50+ loyiha" : locale === "ru" ? "Все 50+ объектов" : "View all 50+ projects"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
