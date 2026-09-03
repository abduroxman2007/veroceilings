import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import ContactSection from "@/components/sections/ContactSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.pages.contact" });
  return buildPageMetadata({
    locale,
    path: "contact",
    title: t("title"),
    description: t("description"),
    image: "/images/slider/slid10.png",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <div className="page-header" style={{ marginTop: "82px" }}>
        <Image src="/images/slider/slid10.png" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.3)" }} />
        <div className="page-header__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li><Link href={`/${locale}`}>{locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : "Home"}</Link></li>
              <li className="breadcrumb__sep">›</li>
              <li style={{ color: "white" }}>{t("title")}</li>
            </ol>
          </nav>
          <h1 className="page-header__title">{t("title")}</h1>
        </div>
      </div>

      <ContactSection locale={locale} showHeading={false} />
    </>
  );
}
