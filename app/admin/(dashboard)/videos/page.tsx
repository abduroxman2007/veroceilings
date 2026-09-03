import { getAllVideos } from "@/lib/db/site-videos";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteSiteVideoAction } from "@/lib/actions";

export default async function AdminVideosPage() {
  const videos = await getAllVideos();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)" }}>Videolar</h1>
        <Link href="/admin/videos/new" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
          <Plus size={16} /> Yangi qo&apos;shish
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Nomi</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>YouTube ID</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Bo&apos;lim</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Mahsulot</th>
              <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)", textAlign: "right" }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "500", fontSize: "0.9rem" }}>{v.title_uz}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)", fontFamily: "monospace" }}>{v.youtube_id}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem" }}>{v.section}</td>
                <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{v.product_slug ?? "—"}</td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    <Link
                      href={`/admin/videos/${v.id}`}
                      style={{ display: "inline-flex", background: "transparent", border: "1px solid var(--color-border)", padding: "0.4rem", borderRadius: "4px", color: "var(--color-primary)" }}
                    >
                      <Edit size={14} />
                    </Link>
                    <DeleteButton action={deleteSiteVideoAction} id={v.id} confirmText={`"${v.title_uz}" videosini o'chirishni tasdiqlaysizmi?`} />
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
