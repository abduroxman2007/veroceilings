"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { key: "products", href: "/products" },
  { key: "projects", href: "/projects" },
  { key: "calculator", href: "/calculator" },
  { key: "architects", href: "/architects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

interface Props {
  phone?: string;
}

export default function Navbar({ phone = "+998 78 333 73 77" }: Props) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  // Detect locale from pathname
  const locale = pathname.split("/")[1] || "uz";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "box-shadow 0.3s, padding 0.3s",
        background: "var(--color-primary)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
      role="banner"
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        {/* Logo */}
        <Link href={`/${locale}`} aria-label={t("logo_alt")} style={{ flexShrink: 0 }}>
          <Image
            src="/images/vero_logo.png"
            alt={t("logo_alt")}
            width={160}
            height={48}
            priority
            style={{ maxHeight: "42px", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname.includes(`/${locale}${link.href}`);
            return (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={`header-nav-link ${isActive ? "active" : ""}`}
              >
                {t(link.key)}
              </Link>
            );
          })}

          <a
            href="/catalog.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="header-nav-link"
          >
            {t("catalog")}
          </a>
        </nav>

        {/* Right side: Language + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <LanguageSwitcher />
          <a
            href={phoneHref}
            style={{
              color: "var(--color-accent)",
              fontWeight: "700",
              fontSize: "0.85rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            className="desktop-nav"
          >
            {phone}
          </a>

          {/* Mobile toggle */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.25rem",
              display: "none",
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: "var(--color-primary)",
            padding: "1rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              onClick={() => setIsOpen(false)}
              style={{
                color: "rgba(255,255,255,0.9)",
                padding: "0.875rem 1rem",
                fontSize: "1rem",
                fontWeight: "500",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t(link.key)}
            </Link>
          ))}
          <a
            href={phoneHref}
            style={{
              color: "var(--color-accent)",
              padding: "0.875rem 1rem",
              fontSize: "1.05rem",
              fontWeight: "700",
              textDecoration: "none",
              marginTop: "0.5rem",
            }}
          >
            📞 {phone}
          </a>
        </nav>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
