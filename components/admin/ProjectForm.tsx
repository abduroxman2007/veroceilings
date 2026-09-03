"use client";

import { useActionState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { upsertProjectAction } from "@/lib/actions";
import ProjectMediaEditor from "@/components/admin/ProjectMediaEditor";
import type { Project } from "@/lib/db/projects";
import { Loader2, Save, AlertCircle } from "lucide-react";

const CEILING_TYPES = ["grilyato", "armstrong", "metalarmstrong", "slatceiling"];

interface Props {
  project?: Project;
}

export default function ProjectForm({ project }: Props) {
  const [state, formAction, pending] = useActionState(upsertProjectAction, null);
  const uid = useId();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/projects");
      router.refresh();
    }
  }, [state, router]);

  const field = (name: string, label: string, defaultValue?: string, type: "text" | "number" = "text") => (
    <div>
      <label htmlFor={`${uid}-${name}`} className="admin-field-label">{label}</label>
      <input id={`${uid}-${name}`} name={name} type={type} defaultValue={defaultValue} className="admin-input-lg" />
    </div>
  );

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "900px" }}>
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Sarlavha</h2>
        <div className="admin-grid-3">
          {field("title_uz", "Nomi (UZ)", project?.title_uz)}
          {field("title_ru", "Nomi (RU)", project?.title_ru)}
          {field("title_en", "Nomi (EN)", project?.title_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Joylashuv</h2>
        <div className="admin-grid-3">
          {field("location_uz", "Manzil (UZ)", project?.location_uz ?? "Toshkent")}
          {field("location_ru", "Manzil (RU)", project?.location_ru ?? "Ташкент")}
          {field("location_en", "Manzil (EN)", project?.location_en ?? "Tashkent")}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Tafsilotlar</h2>
        <div className="admin-grid-3">
          <div>
            <label className="admin-field-label">Shift turi</label>
            <select name="ceiling_type_used" defaultValue={project?.ceiling_type_used ?? "grilyato"} className="admin-input-lg">
              {CEILING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {field("year", "Yil", String(project?.year ?? new Date().getUTCFullYear()), "number")}
          {field("area_sqm", "Maydon (m²)", project?.area_sqm != null ? String(project.area_sqm) : "", "number")}
        </div>
        <div className="admin-grid-3" style={{ marginTop: "1rem" }}>
          {field("sort_order", "Tartib raqami", String(project?.sort_order ?? 0), "number")}
          <div>
            <label className="admin-field-label">Faol</label>
            <select name="is_active" defaultValue={String(project?.is_active ?? true)} className="admin-input-lg">
              <option value="true">Ha</option>
              <option value="false">Yo&apos;q</option>
            </select>
          </div>
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Rasm va videolar</h2>
        <ProjectMediaEditor name="media" initialItems={project?.media ?? []} label="Loyiha galereyasi" />
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
