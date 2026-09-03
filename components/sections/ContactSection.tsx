import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Building2, ExternalLink, CheckCircle2, Navigation } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { getSiteSettings, telHref as toTelHref } from "@/lib/db/site-settings";

interface Props {
  locale: string;
  /** "light" (default) fits under the page's own hero on the standalone /contact page.
   *  "dark" merges the section into the same navy gradient as the info panel — used when
   *  this section is the homepage's closing section, immediately followed by the dark Footer. */
  variant?: "light" | "dark";
  /** Set false when the page already shows this same title in its own hero banner
   *  (e.g. the standalone /contact page), to avoid repeating the identical headline. */
  showHeading?: boolean;
}

export default async function ContactSection({ locale, variant = "light", showHeading = true }: Props) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const settings = await getSiteSettings();
  const localeKey = locale as "uz" | "ru" | "en";

  const title = t("title");
  const subtitle = t("subtitle");
  const viewMap = t("view_map");

  const phoneNumber = settings.phone_primary;
  const emailAddress = settings.email;
  const location = settings[`address_${localeKey}`] ?? settings.address_uz;

  const telHref = toTelHref(phoneNumber);
  const mailHref = `mailto:${emailAddress}`;
  const mapHref = settings.google_maps_url;
  const yandexHref = settings.yandex_maps_url;

  const trustChips = [
    locale === "uz" ? "To'g'ridan-to'g'ri zavoddan" : locale === "ru" ? "Напрямую с завода" : "Direct from the factory",
    locale === "uz" ? "15 yillik kafolat" : locale === "ru" ? "Гарантия 15 лет" : "15-year warranty",
    locale === "uz" ? "15 daqiqada javob" : locale === "ru" ? "Ответ в течение 15 минут" : "Reply within 15 minutes",
  ];

  return (
    <section
      className="section"
      style={{ background: variant === "dark" ? "linear-gradient(135deg, var(--color-primary-dark) 0%, #1a1a3e 100%)" : "var(--color-surface-alt)" }}
      aria-label={title}
    >
      <div className="container">
        <div className={`vero-contact-split${variant === "dark" ? " vero-contact-split--dark" : ""}`}>
          {/* Left / top panel — dark, informational */}
          <div className="vero-contact-info">
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle at 15% 15%, rgba(234,88,12,0.16) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(234,88,12,0.10) 0%, transparent 50%)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  background: "rgba(234,88,12,0.15)",
                  borderRadius: "50%",
                  marginBottom: "1.5rem",
                  border: "1.5px solid rgba(234,88,12,0.3)",
                  flexShrink: 0,
                }}
              >
                <Building2 size={26} style={{ color: "var(--color-accent)" }} aria-hidden />
              </div>

              {showHeading && (
                <h2 style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.85rem)", fontWeight: 900, color: "white", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "0.6rem" }}>
                  {title}
                </h2>
              )}
              <p style={{ color: "var(--color-accent-light)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "1.75rem", maxWidth: "420px" }}>
                {subtitle}
              </p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, padding: 0, marginBottom: "2.25rem" }}>
                {trustChips.map((chip) => (
                  <li key={chip} style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                    <CheckCircle2 size={15} style={{ color: "var(--color-accent-light)", flexShrink: 0 }} aria-hidden />
                    {chip}
                  </li>
                ))}
              </ul>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "2rem" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <a href={telHref} className="vero-contact-row">
                  <span className="vero-contact-icon" aria-hidden><Phone size={17} /></span>
                  <span style={{ fontSize: "0.98rem", fontWeight: 700, color: "white" }}>{phoneNumber}</span>
                </a>

                <a href={mailHref} className="vero-contact-row">
                  <span className="vero-contact-icon" aria-hidden><Mail size={17} /></span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "white", wordBreak: "break-word" }}>{emailAddress}</span>
                </a>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                  <span className="vero-contact-icon" aria-hidden style={{ marginTop: "1px" }}><MapPin size={17} /></span>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: "0.4rem" }}>
                      {location}
                    </p>
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-accent-light)", textDecoration: "none" }}
                    >
                      {viewMap}
                      <ExternalLink size={13} aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right / bottom panel — light, the form — its own floating card, not fused to the info panel */}
          <div className="vero-contact-form-panel">
            <h3 className="vero-contact-form-heading">
              {locale === "uz" ? "So'rov qoldiring" : locale === "ru" ? "Оставить заявку" : "Send a request"}
            </h3>
            <ContactForm locale={locale} />
          </div>

          {/* Custom map panel — spans the full card width below both panels */}
          <div className="vero-contact-map">
            <div className="vero-contact-map__grid" aria-hidden />
            <div className="vero-contact-map__ring" aria-hidden>
              <MapPin size={26} />
            </div>
            <p className="vero-contact-map__address">{location}</p>
            <div className="vero-contact-map__actions">
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className="vero-map-btn vero-map-btn--google">
                <Navigation size={14} aria-hidden /> Google Maps
              </a>
              <a href={yandexHref} target="_blank" rel="noopener noreferrer" className="vero-map-btn vero-map-btn--yandex">
                <Navigation size={14} aria-hidden /> Yandex Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vero-contact-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .vero-contact-info {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--color-primary-dark) 0%, #1a1a3e 100%);
          padding: clamp(2rem, 4vw, 2.75rem);
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(10,15,29,0.18);
        }
        .vero-contact-form-panel {
          background: var(--color-surface);
          padding: clamp(1.75rem, 4vw, 2.5rem);
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(10,15,29,0.1);
          align-self: start;
        }
        .vero-contact-form-heading {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 1.25rem;
        }
        .vero-contact-map {
          grid-column: 1 / -1;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2.5rem 1.5rem;
          background: radial-gradient(circle at 50% 40%, #10162a 0%, #05080F 70%);
        }
        .vero-contact-map__grid {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(rgba(234,88,12,0.35) 1px, transparent 1px),
            radial-gradient(rgba(234,88,12,0.15) 1px, transparent 1px);
          background-size: 28px 28px, 28px 28px;
          background-position: 0 0, 14px 14px;
          -webkit-mask-image: radial-gradient(circle at 50% 45%, black 0%, transparent 75%);
          mask-image: radial-gradient(circle at 50% 45%, black 0%, transparent 75%);
        }
        .vero-contact-map__ring {
          position: relative;
          z-index: 1;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent);
          color: white;
          box-shadow: 0 0 0 8px rgba(234,88,12,0.18), 0 0 0 16px rgba(234,88,12,0.08);
        }
        .vero-contact-map__address {
          position: relative;
          z-index: 1;
          color: rgba(255,255,255,0.82);
          font-size: 0.92rem;
          text-align: center;
          max-width: 420px;
          margin: 0;
        }
        .vero-contact-map__actions { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
        .vero-map-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.3rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s, filter 0.15s;
        }
        .vero-map-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
        .vero-map-btn--google { background: var(--color-accent); color: white; }
        .vero-map-btn--yandex { background: #2b6de0; color: white; }
        .vero-contact-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          width: fit-content;
          border-radius: 6px;
        }
        .vero-contact-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(234,88,12,0.15);
          border: 1px solid rgba(234,88,12,0.3);
          color: var(--color-accent-light);
          flex-shrink: 0;
        }
        .vero-contact-row:focus-visible,
        .vero-contact-info a:focus-visible {
          outline: 2px solid var(--color-accent-light);
          outline-offset: 3px;
        }
        .vero-contact-split--dark .vero-contact-info {
          background: linear-gradient(135deg, #10162a 0%, #1a1a3e 100%);
          border: 1px solid rgba(255,255,255,0.08);
        }
        @media (min-width: 880px) {
          .vero-contact-split {
            grid-template-columns: minmax(300px, 0.85fr) minmax(360px, 1.15fr);
          }
        }
      `}</style>
    </section>
  );
}
