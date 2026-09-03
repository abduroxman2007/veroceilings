import { getTranslations } from "next-intl/server";
import { FaDesktop, FaUsers, FaIndustry, FaHandshake, FaCertificate } from "react-icons/fa";
import Link from "next/link";

interface Props { locale: string; }

export default async function WhyUsSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "whyus" });

  const stats = [
    { value: "10+", label: locale === "uz" ? "Yillik tajriba" : locale === "ru" ? "Лет на рынке" : "Years experience", icon: <FaDesktop size={40} color="var(--color-accent)" /> },
    { value: "1700+", label: locale === "uz" ? "Mutaxassislar" : locale === "ru" ? "Специалистов" : "Specialists", icon: <FaUsers size={40} color="var(--color-accent)" /> },
    { value: "200+", label: locale === "uz" ? "Zamonaviy uskunalar" : locale === "ru" ? "Единиц оборудования" : "Production machines", icon: <FaIndustry size={40} color="var(--color-accent)" /> },
    { value: "120+", label: locale === "uz" ? "Doimiy hamkorlar" : locale === "ru" ? "Партнёров" : "Long-term partners", icon: <FaHandshake size={40} color="var(--color-accent)" /> },
    { value: "15", label: locale === "uz" ? "Yillik kafolat" : locale === "ru" ? "Лет гарантии" : "Year warranty", icon: <FaCertificate size={40} color="var(--color-accent)" /> },
  ];

  return (
    <section className="section" style={{ background: "var(--color-surface)", paddingTop: "4rem" }} aria-label={t("title")}>
      <div className="container">
        
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.65rem, 3.3vw, 2.3rem)", fontWeight: "700", color: "var(--color-primary)" }}>
            {locale === "uz" ? "Nima uchun bizni tanlashadi" : locale === "ru" ? "Почему выбирают нас" : "Why choose us"}{" "}
            <span style={{ color: "var(--color-accent)" }}>Vero</span>
          </h2>
        </div>

        {/* Top 4 Cards Grid exactly like old design */}
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gridAutoRows: "minmax(min-content, max-content)",
            gap: "1.5rem", 
            marginBottom: "5rem" 
          }}
        >
          
          {/* Card 1: Experience (Top Left) */}
          <div style={{ gridColumn: "1 / 2", background: "var(--color-surface-alt)", borderRadius: "12px", padding: "2.5rem 2rem", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontWeight: "800", fontSize: "1.05rem", marginBottom: "1rem", color: "var(--color-primary)" }}>{t(`features.experience.title`)}</h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>{t(`features.experience.description`)}</p>
          </div>

          {/* Card 2: Quality (Top Middle) */}
          <div style={{ gridColumn: "2 / 3", background: "var(--color-surface-alt)", borderRadius: "12px", padding: "2.5rem 2rem", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontWeight: "800", fontSize: "1.05rem", marginBottom: "1rem", color: "var(--color-primary)" }}>{t(`features.quality.title`)}</h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>{t(`features.quality.description`)}</p>
          </div>

          {/* Card 3: Variety (Bottom Left + Middle, spanning 2 columns) */}
          <div style={{ gridColumn: "1 / 3", background: "var(--color-surface-alt)", borderRadius: "12px", padding: "2.5rem 2rem", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontWeight: "800", fontSize: "1.05rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
              {locale === "uz" ? "100+ yuqori samarali shiftlar" : locale === "ru" ? "100+ высокоэффективных потолков" : "100+ high-performance ceilings"}
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
              {locale === "uz" 
                ? "Vero zamonaviy bozordagi asosiy uslublarni qamrab oluvchi 100 dan ortiq shift dizaynlarini taklif etadi. Keng assortimentdagi mahsulotlarimiz sizning tasavvuringizni haqiqatga aylantirishga yordam beradi." 
                : locale === "ru" 
                ? "Vero предлагает более 100 дизайнов потолков, которые охватывают основные стили на современном рынке. Наш широкий ассортимент продукции предоставляет практичные решения для любых задач." 
                : "Vero offers over 100 ceiling designs covering the main styles in the modern market. Our wide product range provides practical solutions to help you realize your vision."}
            </p>
          </div>

          {/* Card 4: Guarantee (Right Column, spanning both rows) */}
          <div style={{ gridColumn: "3 / 4", gridRow: "1 / 3", background: "var(--color-primary-dark)", borderRadius: "12px", padding: "2.5rem 2rem", color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontWeight: "800", fontSize: "1.05rem", marginBottom: "1rem", color: "white" }}>{t(`features.guarantee.title`)}</h3>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "2.5rem" }}>{t(`features.guarantee.description`)}</p>
            </div>
            <div>
              <Link href={`/${locale}/calculator`} className="btn-primary animate-pulse-accent">
                {t("start_trial_button")}
              </Link>
            </div>
          </div>
          
          <style>{`
            @media (max-width: 992px) {
              .hover-card, [style*="gridColumn: 1 / 2"], [style*="gridColumn: 2 / 3"], [style*="gridColumn: 1 / 3"], [style*="gridColumn: 3 / 4"] { grid-column: 1 / -1 !important; grid-row: auto !important; }
            }
          `}</style>
        </div>

        {/* Bottom Stats Row */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4rem" }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ marginBottom: "1rem" }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: "1.85rem", fontWeight: "900", color: "var(--color-accent)", lineHeight: 1, marginBottom: "0.5rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: "600" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
