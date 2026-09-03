import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Image from "next/image";
import CalculatorForm from "@/components/ui/CalculatorForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.pages.calculator" });
  return buildPageMetadata({
    locale,
    path: "calculator",
    title: t("title"),
    description: t("description"),
    image: "/images/slider/slid5.jpg",
  });
}

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator" });

  return (
    <>
      <div className="page-header" style={{ marginTop: "82px" }}>
        <Image src="/images/slider/slid5.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.3)" }} />
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

      <div className="section" style={{ background: "var(--color-surface-alt)" }}>
        <div className="container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
              {t("subtitle")}
            </p>

            <CalculatorForm locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
