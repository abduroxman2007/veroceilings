import { getAllFaqs } from "@/lib/db/faqs";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteFaqAction } from "@/lib/actions";

export default async function AdminFaqPage() {
  const faqs = await getAllFaqs();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)" }}>Savol-javoblar (FAQ)</h1>
        <Link href="/admin/faq/new" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
          <Plus size={16} /> Yangi qo&apos;shish
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Savol</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Tartib</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Faol</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)", textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "500", fontSize: "0.9rem", maxWidth: "420px" }}>{f.question_uz}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{f.sort_order}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem" }}>
                  <span className={f.is_active ? "badge badge-quoted" : "badge badge-closed"}>{f.is_active ? "Ha" : "Yo'q"}</span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    <Link
                      href={`/admin/faq/${f.id}`}
                      style={{ display: "inline-flex", background: "transparent", border: "1px solid var(--color-border)", padding: "0.4rem", borderRadius: "4px", color: "var(--color-primary)" }}
                    >
                      <Edit size={14} />
                    </Link>
                    <DeleteButton action={deleteFaqAction} id={f.id} confirmText="Ushbu savolni o'chirishni tasdiqlaysizmi?" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
