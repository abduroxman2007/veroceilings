import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Play } from "lucide-react";
import { getVideosBySection } from "@/lib/db/site-videos";

interface Props {
  locale: string;
  /** Set false when this section already lives on /architects — a "see all" link
   *  back to the same page it's already on is a dead link, not a CTA. */
  showViewAllLink?: boolean;
}

export default async function VideoSection({ locale, showViewAllLink = true }: Props) {
  const t = await getTranslations({ locale, namespace: "architects" });
  const localeKey = `title_${locale}` as "title_uz" | "title_ru" | "title_en";
  const descKey = `description_${locale}` as "description_uz" | "description_ru" | "description_en";

  const dbVideos = await getVideosBySection("architects");
  const videos = dbVideos.map((v) => ({ id: v.youtube_id, title: v[localeKey], desc: v[descKey] }));

  return (
    <section className="section" style={{ background: "var(--color-primary-dark)", color: "white" }} aria-label={t("library_title")}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.05rem)", fontWeight: "800", marginBottom: "0.75rem" }}>
            {locale === "uz" ? "O'rnatish va qo'llanma videolari" : locale === "ru" ? "Видео монтажа и инструкции" : "Installation & Guide Videos"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto" }}>{t("library_description")}</p>
        </div>

        {videos.length === 0 && (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginBottom: "3rem" }}>
            {locale === "uz" ? "Tez orada qo'shiladi." : locale === "ru" ? "Скоро появится." : "Coming soon."}
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {videos.map((v) => (
            <div key={v.id} style={{ borderRadius: "10px", overflow: "hidden", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ fontWeight: "600", fontSize: "0.85rem", marginBottom: "0.375rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {showViewAllLink && (
          <div style={{ textAlign: "center" }}>
            <Link href={`/${locale}/architects`} className="btn-outline-accent">
              {locale === "uz" ? "Barcha texnik videolar" : locale === "ru" ? "Все технические видео" : "All technical videos"}
              <Play size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
