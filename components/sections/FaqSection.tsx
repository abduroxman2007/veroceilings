import { getTranslations } from "next-intl/server";
import { getActiveFaqs } from "@/lib/db/faqs";
import { getSiteSettings, telHref } from "@/lib/db/site-settings";
import FaqAccordion from "@/components/ui/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

interface Props { locale: string; }

export default async function FaqSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "faq" });
  const localeKey = locale as "uz" | "ru" | "en";
  const [faqs, settings] = await Promise.all([getActiveFaqs(), getSiteSettings()]);

  const items = faqs.map((f) => ({
    question: f[`question_${localeKey}`],
    answer: f[`answer_${localeKey}`],
  }));

  return (
    <section className="section" style={{ background: "var(--color-surface)" }} aria-label={t("title")}>
      {items.length > 0 && <JsonLd schema={faqSchema(items)} />}
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              border: "1px solid var(--color-accent)",
              borderRadius: "999px",
              padding: "0.35rem 1rem",
              marginBottom: "1.25rem",
            }}
          >
            FAQ
          </span>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 0 }}>
            {t("title")}
          </h2>
        </div>

        <FaqAccordion items={items} />

        <p style={{ textAlign: "center", marginTop: "2.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          {locale === "uz" ? "Javobingizni topa olmadingizmi? " : locale === "ru" ? "Не нашли ответ на свой вопрос? " : "Didn't find your answer? "}
          <a href={telHref(settings.phone_primary)} style={{ color: "var(--color-accent)", fontWeight: 700, textDecoration: "none" }}>
            {settings.phone_primary}
          </a>
        </p>
      </div>
    </section>
  );
}
