import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/db/projects";
import GalleryLightbox from "@/components/ui/GalleryLightbox";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.pages.projects" });
  return buildPageMetadata({
    locale,
    path: "projects",
    title: t("title"),
    description: t("description"),
    image: "/images/project-gallery/airportproject.jpg",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = await getAllProjects();

  const titleKey = `title_${locale}` as "title_uz" | "title_ru" | "title_en";
  const locationKey = `location_${locale}` as "location_uz" | "location_ru" | "location_en";

  return (
    <>
      <div className="page-header" style={{ marginTop: "82px" }}>
        <Image src="/images/project-gallery/airportproject.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.3)" }} />
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

      <div className="section">
        <div className="container">
          <GalleryLightbox
            images={projects.map(p => ({
              url: p.media_url,
              alt: p[titleKey] || "Project",
              mediaType: p.media_type || "image",
              videoUrl: p.video_url
            }))}
          />
        </div>
      </div>
    </>
  );
}
