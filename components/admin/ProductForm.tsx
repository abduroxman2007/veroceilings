"use client";

import { useActionState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { upsertProductAction } from "@/lib/actions";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import GalleryEditor from "@/components/admin/GalleryEditor";
import type { DBProduct } from "@/lib/db/products";
import { Loader2, Save, AlertCircle } from "lucide-react";

const CATEGORIES = ["product", "accessory"];

interface Props {
  product?: DBProduct;
}

export default function ProductForm({ product }: Props) {
  const [state, formAction, pending] = useActionState(upsertProductAction, null);
  const uid = useId();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/products");
      router.refresh();
    }
  }, [state, router]);

  const field = (name: string, label: string, defaultValue?: string, type: "text" | "number" = "text") => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="admin-field-label">{label}</label>
      <input id={`${uid}-${name}`} name={name} type={type} defaultValue={defaultValue} className="admin-input-lg" />
    </div>
  );

  const textarea = (name: string, label: string, defaultValue?: string) => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="admin-field-label">{label}</label>
      <textarea id={`${uid}-${name}`} name={name} defaultValue={defaultValue} rows={3} className="admin-input-lg" style={{ resize: "vertical" }} />
    </div>
  );

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "900px" }}>
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      {/* template_type is a legacy column with no effect on rendering anymore —
          every product uses the one shared ProductTemplate. Kept only because
          the DB column is NOT NULL; not shown as a choice since it's not one. */}
      <input type="hidden" name="template_type" value={product?.template_type ?? "TemplateGrilyato"} />

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Asosiy</h2>
        <div className="admin-grid-3">
          {field("slug", "Slug (URL)", product?.slug)}
          <div>
            <label className="admin-field-label">Toifa</label>
            <select name="category" defaultValue={product?.category ?? "product"} className="admin-input-lg">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="admin-grid-3" style={{ marginTop: "1rem" }}>
          {field("sort_order", "Tartib raqami", String(product?.sort_order ?? 0), "number")}
          {field("video_id", "YouTube video ID (ixtiyoriy)", product?.video_id)}
          <div>
            <label className="admin-field-label">Faol</label>
            <select name="is_active" defaultValue={String(product?.is_active ?? true)} className="admin-input-lg">
              <option value="true">Ha</option>
              <option value="false">Yo&apos;q</option>
            </select>
          </div>
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Sarlavha (barcha tillarda)</h2>
        <div className="admin-grid-3">
          {field("title_uz", "Nomi (UZ)", product?.title_uz)}
          {field("title_ru", "Nomi (RU)", product?.title_ru)}
          {field("title_en", "Nomi (EN)", product?.title_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Tavsif</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {textarea("description_uz", "Tavsif (UZ)", product?.description_uz)}
          {textarea("description_ru", "Tavsif (RU)", product?.description_ru)}
          {textarea("description_en", "Tavsif (EN)", product?.description_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">SEO</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {field("seo_title_uz", "SEO sarlavha (UZ)", product?.seo_title_uz)}
          {field("seo_title_ru", "SEO sarlavha (RU)", product?.seo_title_ru)}
          {field("seo_title_en", "SEO sarlavha (EN)", product?.seo_title_en)}
          {textarea("seo_description_uz", "SEO tavsif (UZ)", product?.seo_description_uz)}
          {textarea("seo_description_ru", "SEO tavsif (RU)", product?.seo_description_ru)}
          {textarea("seo_description_en", "SEO tavsif (EN)", product?.seo_description_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Media</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <SingleImageUploader name="hero_image_url" initialUrl={product?.hero_image_url} label="Asosiy rasm" />
          <GalleryEditor name="images" initialItems={product?.images ?? []} label="Galereya rasmlari" />
          <GalleryEditor name="application_cases" initialItems={product?.application_cases ?? []} label="Qo'llanilish namunalari" />
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Bog&apos;liq mahsulotlar</h2>
        <input
          name="related_products"
          defaultValue={JSON.stringify(product?.related_products ?? [])}
          className="admin-input-lg"
          style={{ fontFamily: "monospace", fontSize: "0.8rem" }}
        />
        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.35rem" }}>
          JSON massiv sifatida slug&apos;lar, masalan: [&quot;stringer&quot;,&quot;suspension&quot;]
        </p>
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
        .admin-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
