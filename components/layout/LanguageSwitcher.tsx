"use client";
import { usePathname, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LOCALE_LABELS: Record<string, string> = { uz: "UZ", ru: "RU", en: "EN" };
const LOCALE_FULL: Record<string, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        aria-label="Change language"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          padding: "0.375rem 0.625rem",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: "600",
          transition: "background 0.2s",
        }}
      >
        {LOCALE_LABELS[locale]}
        <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>

      {/*
        Always rendered (never `{open && ...}`) so the real <a href> links
        below exist in the server-rendered HTML for crawlers to discover and
        follow, even though only mouse/keyboard interaction reveals them
        visually — a JS-gated conditional would hide them from any crawler
        that doesn't simulate a click.
      */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          background: "rgba(13,13,26,0.98)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "6px",
          overflow: "hidden",
          minWidth: "140px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          display: open ? "block" : "none",
        }}
        role="menu"
      >
        {routing.locales.map((l) => (
          <Link
            key={l}
            href={pathname}
            locale={l}
            role="menuitem"
            onClick={() => setOpen(false)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "0.75rem 1rem",
              color: l === locale ? "var(--color-accent)" : "rgba(255,255,255,0.88)",
              background: l === locale ? "rgba(200,169,110,0.1)" : "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: l === locale ? "600" : "400",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.15s",
              textDecoration: "none",
            }}
          >
            <span style={{ fontWeight: "700", minWidth: "24px" }}>{LOCALE_LABELS[l]}</span>
            <span style={{ opacity: 0.7, fontSize: "0.8rem" }}>{LOCALE_FULL[l]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
