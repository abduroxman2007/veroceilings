import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Calculator, ArrowRight, Phone } from "lucide-react";
import { getSiteSettings, telHref } from "@/lib/db/site-settings";

interface Props { locale: string; }

export default async function CalculatorCTA({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "calculator" });
  const settings = await getSiteSettings();

  return (
    <section
      aria-label={t("title")}
      style={{
        background: "linear-gradient(135deg, var(--color-primary-dark) 0%, #1a1a3e 100%)",
        padding: "5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background pattern */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(200,169,110,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,169,110,0.05) 0%, transparent 40%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", background: "rgba(200,169,110,0.15)", borderRadius: "50%", marginBottom: "1.5rem", border: "2px solid rgba(200,169,110,0.3)" }}>
          <Calculator size={32} style={{ color: "var(--color-accent)" }} />
        </div>

        <h2 style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.25rem)", fontWeight: "900", color: "white", marginBottom: "1rem", lineHeight: 1.2 }}>
          {t("title")}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: "1.7" }}>
          {t("subtitle")}
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`/${locale}/calculator`} className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
            <Calculator size={18} />
            {t("page_title")}
          </Link>
          <a href={telHref(settings.phone_primary)} className="btn-outline-accent">
            <Phone size={18} />
            {locale === "uz" ? "Bepul konsultatsiya" : locale === "ru" ? "Бесплатная консультация" : "Free consultation"}
          </a>
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3rem" }}>
          {[
            { icon: "✓", text: locale === "uz" ? "30 soniyada hisoblash" : locale === "ru" ? "Расчёт за 30 секунд" : "30-second calculation" },
            { icon: "✓", text: locale === "uz" ? "Bepul smeta" : locale === "ru" ? "Бесплатная смета" : "Free estimate" },
            { icon: "✓", text: locale === "uz" ? "Zavod narxlari" : locale === "ru" ? "Цены от завода" : "Factory prices" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem" }}>
              <span style={{ color: "var(--color-accent)", fontWeight: "700" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
