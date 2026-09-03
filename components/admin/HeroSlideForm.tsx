"use client";

import { useActionState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { upsertHeroSlideAction } from "@/lib/actions";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import type { HeroSlide } from "@/lib/db/hero-slides";
import { Loader2, Save, AlertCircle } from "lucide-react";

interface Props {
  slide?: HeroSlide;
}

export default function HeroSlideForm({ slide }: Props) {
  const [state, formAction, pending] = useActionState(upsertHeroSlideAction, null);
  const uid = useId();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/hero-slides");
      router.refresh();
    }
  }, [state, router]);

  const field = (name: string, label: string, defaultValue?: string) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="admin-field-label">{label}</label>
      <input id={`${uid}-${name}`} name={name} defaultValue={defaultValue} className="admin-input-lg" />
    </div>
  );

  const textarea = (name: string, label: string, defaultValue?: string) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="admin-field-label">{label}</label>
      <textarea id={`${uid}-${name}`} name={name} defaultValue={defaultValue} rows={3} className="admin-input-lg" style={{ resize: "vertical" }} />
    </div>
  );

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "700px" }}>
      {slide?.id && <input type="hidden" name="id" value={slide.id} />}

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Rasm</h2>
        <SingleImageUploader name="image_url" initialUrl={slide?.image_url} label="Fon rasmi" />
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Sarlavha</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {textarea("title_uz", "Sarlavha (UZ)", slide?.title_uz)}
          {textarea("title_ru", "Sarlavha (RU)", slide?.title_ru)}
          {textarea("title_en", "Sarlavha (EN)", slide?.title_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Matn</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {textarea("text_uz", "Matn (UZ)", slide?.text_uz)}
          {textarea("text_ru", "Matn (RU)", slide?.text_ru)}
          {textarea("text_en", "Matn (EN)", slide?.text_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Tugma va havola</h2>
        <div className="admin-grid-3">
          {field("button_uz", "Tugma matni (UZ)", slide?.button_uz)}
          {field("button_ru", "Tugma matni (RU)", slide?.button_ru)}
          {field("button_en", "Tugma matni (EN)", slide?.button_en)}
        </div>
        <div className="admin-grid-3" style={{ marginTop: "1rem" }}>
          {field("link_href", "Havola (masalan /products)", slide?.link_href ?? "/products")}
          {field("sort_order", "Tartib raqami", String(slide?.sort_order ?? 0))}
          <div>
            <label className="admin-field-label">Faol</label>
            <select name="is_active" defaultValue={String(slide?.is_active ?? true)} className="admin-input-lg">
              <option value="true">Ha</option>
              <option value="false">Yo&apos;q</option>
            </select>
          </div>
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
