"use client";

import { useActionState, useId } from "react";
import { upsertSiteSettingsAction } from "@/lib/actions";
import type { SiteSettings } from "@/lib/db/site-settings";
import { Loader2, Save, AlertCircle, CheckCircle2 } from "lucide-react";

interface Props {
  settings: SiteSettings;
}

const FIELDS: { key: keyof SiteSettings; label: string }[] = [
  { key: "phone_primary", label: "Asosiy telefon" },
  { key: "phone_secondary", label: "Qo'shimcha telefon" },
  { key: "email", label: "Email" },
  { key: "address_uz", label: "Manzil (UZ)" },
  { key: "address_ru", label: "Manzil (RU)" },
  { key: "address_en", label: "Manzil (EN)" },
  { key: "telegram_username", label: "Telegram username" },
  { key: "instagram_url", label: "Instagram havolasi" },
  { key: "youtube_url", label: "YouTube havolasi" },
  { key: "google_maps_url", label: "Google Maps havolasi" },
  { key: "yandex_maps_url", label: "Yandex Maps havolasi" },
];

export default function SiteSettingsForm({ settings }: Props) {
  const [state, formAction, pending] = useActionState(upsertSiteSettingsAction, null);
  const uid = useId();

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "700px" }}>
      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Sayt sozlamalari</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label htmlFor={`${uid}-${key}`} className="admin-field-label">{label}</label>
              <input id={`${uid}-${key}`} name={key} defaultValue={settings[key]} className="admin-input-lg" />
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button type="submit" disabled={pending} className="btn-primary" style={{ opacity: pending ? 0.75 : 1 }}>
          {pending ? <Loader2 size={16} className="admin-spin" /> : <Save size={16} />}
          {pending ? "Saqlanmoqda..." : "Saqlash"}
        </button>
        {state?.success && (
          <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#16a34a", fontSize: "0.85rem", margin: 0 }}>
            <CheckCircle2 size={16} /> Saqlandi
          </p>
        )}
        {state?.error && (
          <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#dc2626", fontSize: "0.85rem", margin: 0 }}>
            <AlertCircle size={16} /> {state.error}
          </p>
        )}
      </div>

      <style>{`
        .admin-form-section { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .admin-form-section-title { font-size: 1rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-primary); }
        .admin-field-label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--color-text-muted); margin-bottom: 0.4rem; }
        .admin-input-lg { width: 100%; padding: 0.6rem 0.8rem; border: 1px solid var(--color-border); border-radius: 6px; font-size: 0.9rem; font-family: var(--font-sans); }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
