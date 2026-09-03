"use client";

import { useActionState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { upsertSiteVideoAction } from "@/lib/actions";
import type { SiteVideo } from "@/lib/db/site-videos";
import { Loader2, Save, AlertCircle } from "lucide-react";

const SECTIONS = ["architects", "homepage", "product"];

interface Props {
  video?: SiteVideo;
}

export default function SiteVideoForm({ video }: Props) {
  const [state, formAction, pending] = useActionState(upsertSiteVideoAction, null);
  const uid = useId();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/videos");
      router.refresh();
    }
  }, [state, router]);

  const field = (name: string, label: string, defaultValue?: string) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="admin-field-label">{label}</label>
      <input id={`${uid}-${name}`} name={name} defaultValue={defaultValue} className="admin-input-lg" />
    </div>
  );

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "700px" }}>
      {video?.id && <input type="hidden" name="id" value={video.id} />}

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Video</h2>
        <div className="admin-grid-3">
          {field("youtube_id", "YouTube video ID", video?.youtube_id)}
          <div>
            <label className="admin-field-label">Bo&apos;lim</label>
            <select name="section" defaultValue={video?.section ?? "architects"} className="admin-input-lg">
              {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {field("product_slug", "Mahsulot slug (ixtiyoriy)", video?.product_slug ?? "")}
        </div>
        {field("sort_order", "Tartib raqami", String(video?.sort_order ?? 0))}
        <div style={{ marginTop: "1rem" }}>
          <label className="admin-field-label">Faol</label>
          <select name="is_active" defaultValue={String(video?.is_active ?? true)} className="admin-input-lg">
            <option value="true">Ha</option>
            <option value="false">Yo&apos;q</option>
          </select>
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Sarlavha</h2>
        <div className="admin-grid-3">
          {field("title_uz", "Sarlavha (UZ)", video?.title_uz)}
          {field("title_ru", "Sarlavha (RU)", video?.title_ru)}
          {field("title_en", "Sarlavha (EN)", video?.title_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Tavsif</h2>
        <div className="admin-grid-3">
          {field("description_uz", "Tavsif (UZ)", video?.description_uz)}
          {field("description_ru", "Tavsif (RU)", video?.description_ru)}
          {field("description_en", "Tavsif (EN)", video?.description_en)}
        </div>
      </section>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button type="submit" disabled={pending} className="btn-primary" style={{ opacity: pending ? 0.75 : 1 }}>
          {pending ? <Loader2 size={16} className="admin-spin" /> : <Save size={16} />}
          {pending ? "Saqlanmoqda..." : "Saqlash"}
        </button>
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
        .admin-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
