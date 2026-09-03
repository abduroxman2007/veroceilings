"use client";

import { useActionState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { upsertFaqAction } from "@/lib/actions";
import type { Faq } from "@/lib/db/faqs";
import { Loader2, Save, AlertCircle } from "lucide-react";

interface Props {
  faq?: Faq;
}

export default function FaqForm({ faq }: Props) {
  const [state, formAction, pending] = useActionState(upsertFaqAction, null);
  const uid = useId();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/faq");
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
      <textarea id={`${uid}-${name}`} name={name} defaultValue={defaultValue} rows={4} className="admin-input-lg" style={{ resize: "vertical" }} />
    </div>
  );

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "700px" }}>
      {faq?.id && <input type="hidden" name="id" value={faq.id} />}

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Savol</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {field("question_uz", "Savol (UZ)", faq?.question_uz)}
          {field("question_ru", "Savol (RU)", faq?.question_ru)}
          {field("question_en", "Savol (EN)", faq?.question_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <h2 className="admin-form-section-title">Javob</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {textarea("answer_uz", "Javob (UZ)", faq?.answer_uz)}
          {textarea("answer_ru", "Javob (RU)", faq?.answer_ru)}
          {textarea("answer_en", "Javob (EN)", faq?.answer_en)}
        </div>
      </section>

      <section className="admin-form-section">
        <div className="admin-grid-2">
          {field("sort_order", "Tartib raqami", String(faq?.sort_order ?? 0))}
          <div>
            <label className="admin-field-label">Faol</label>
            <select name="is_active" defaultValue={String(faq?.is_active ?? true)} className="admin-input-lg">
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
        .admin-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
