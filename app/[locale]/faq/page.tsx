import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import FaqSection from "@/components/sections/FaqSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.pages.faq" });
  return buildPageMetadata({
    locale,
    path: "faq",
    title: t("title"),
    description: t("description"),
    image: "/images/slider/slid4.jpg",
  });
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      <div className="page-header" style={{ marginTop: "82px" }}>
        <Image src="/images/slider/slid4.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.3)" }} />
        <div className="page-header__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li><Link href={`/${locale}`}>{locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : "Home"}</Link></li>
              <li className="breadcrumb__sep">›</li>
              <li style={{ color: "white" }}>FAQ</li>
            </ol>
          </nav>
          <h1 className="page-header__title">{t("title")}</h1>
        </div>
      </div>

      <FaqSection locale={locale} />
    </>
  );
}
