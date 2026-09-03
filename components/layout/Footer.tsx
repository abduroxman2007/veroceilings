import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { telHref, type SiteSettings } from "@/lib/db/site-settings";

interface FooterProps {
  locale: string;
  settings: SiteSettings;
}

export default async function Footer({ locale, settings }: FooterProps) {
  const t = await getTranslations("footer");
  const nt = await getTranslations("navbar");
  const addressKey = `address_${locale}` as "address_uz" | "address_ru" | "address_en";
  const address = settings[addressKey] ?? settings.address_uz;

  return (
    <footer
      style={{
        background: "var(--color-primary-dark)",
        color: "rgba(255,255,255,0.85)",
        paddingTop: "4rem",
      }}
      role="contentinfo"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <Link href={`/${locale}`} aria-label="Vero Ceilings — Bosh sahifa">
              <Image
                src="/images/vero_logo.png"
                alt="Vero Ceilings — O'zbekistondagi eng yirik osma shift ishlab chiqaruvchisi"
                width={160}
                height={48}
                style={{ maxHeight: "48px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", lineHeight: "1.7", opacity: 0.75, maxWidth: "260px" }}>
              {t("rights")}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Vero Ceilings"
                className="footer-social-link"
              >
                <Instagram size={20} />
              </a>
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Vero Ceilings"
                className="footer-social-link"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1.25rem" }}>
              {t("links.title")}
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { href: `/${locale}`, label: t("links.home") },
                { href: `/${locale}/about`, label: t("links.about") },
                { href: `/${locale}/products`, label: t("links.products") },
                { href: `/${locale}/projects`, label: t("links.projects") },
                { href: `/${locale}/contact`, label: t("links.contact") },
                { href: `/${locale}/faq`, label: "FAQ" },
                { href: `/${locale}/calculator`, label: nt("calculator") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1.25rem" }}>
              {t("products.title")}
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { href: `/${locale}/products/metalarmstrong`, label: t("products.metal_armstrong.title") },
                { href: `/${locale}/products/gypsumarmstrong`, label: t("products.gypsum_armstrong.title") },
                { href: `/${locale}/products/washingarmstrong`, label: t("products.washing_armstrong.title") },
                { href: `/${locale}/products/grilyato`, label: t("products.grilyato.title") },
                { href: `/${locale}/products/slatceiling`, label: t("products.slat_ceiling.title") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1.25rem" }}>
              {t("contact.title")}
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <MapPin size={16} style={{ marginTop: "2px", color: "var(--color-accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", opacity: 0.8, lineHeight: "1.5" }}>{address}</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Phone size={16} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                <a href={telHref(settings.phone_primary)} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {settings.phone_primary}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Phone size={16} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                <a href={telHref(settings.phone_secondary)} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {settings.phone_secondary}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Mail size={16} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                <a href={`mailto:${settings.email}`} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", paddingBottom: "2rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between" }}>
          <div style={{ maxWidth: "400px" }}>
            <h3 style={{ fontWeight: "700", fontSize: "1rem", color: "white", marginBottom: "0.375rem" }}>
              {t("newsletter.title")}
            </h3>
            <p style={{ fontSize: "0.8rem", opacity: 0.65 }}>{t("newsletter.description")}</p>
          </div>
          <NewsletterForm placeholder={t("newsletter.placeholder")} buttonText={t("newsletter.button")} />
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem 0", textAlign: "center", fontSize: "0.8rem", opacity: 0.5 }}>
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
