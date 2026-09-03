import { getAllProjects } from "@/lib/db/projects";
import Image from "next/image";
import Link from "next/link";
import { Edit, Plus, Video } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProjectAction } from "@/lib/actions";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)" }}>Loyihalar</h1>
        <Link href="/admin/projects/new" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
          <Plus size={16} /> Yangi qo&apos;shish
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Rasm</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Nomi</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Shift turi</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Media</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)", textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ position: "relative", width: "48px", height: "48px", borderRadius: "4px", overflow: "hidden" }}>
                    {p.media_url && <Image src={p.media_url} alt="" fill sizes="48px" style={{ objectFit: "cover" }} />}
                  </div>
                </td>
                <td style={{ padding: "1rem", fontWeight: "500", fontSize: "0.9rem" }}>{p.title_uz}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{p.ceiling_type_used}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  {p.media?.length ?? (p.media_url ? 1 : 0)} ta {p.is_video && <Video size={12} style={{ display: "inline", marginLeft: "0.25rem" }} />}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      style={{ display: "inline-flex", background: "transparent", border: "1px solid var(--color-border)", padding: "0.4rem", borderRadius: "4px", color: "var(--color-primary)" }}
                    >
                      <Edit size={14} />
                    </Link>
                    <DeleteButton action={deleteProjectAction} id={p.id} confirmText={`"${p.title_uz}" loyihasini o'chirishni tasdiqlaysizmi?`} />
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
