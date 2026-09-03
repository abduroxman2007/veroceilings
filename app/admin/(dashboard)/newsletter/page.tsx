import { getAllSubscribers } from "@/lib/db/newsletter";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uz-UZ", { dateStyle: "medium" });
}

export default async function AdminNewsletterPage() {
  const subscribers = await getAllSubscribers();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)" }}>Obunachilar</h1>
        <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{subscribers.length} ta obunachi</span>
      </div>

      {subscribers.length === 0 ? (
        <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: "3rem", textAlign: "center", color: "var(--color-text-muted)" }}>
          <p>Hozircha obunachilar yo&apos;q.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
                <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Email</th>
                <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Til</th>
                <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Sana</th>
                <th style={{ padding: "1rem", fontWeight: "600", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Holat</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "500", fontSize: "0.9rem" }}>{s.email}</td>
                  <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{s.locale}</td>
                  <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{formatDate(s.created_at)}</td>
                  <td style={{ padding: "1rem", fontSize: "0.85rem" }}>
                    <span className={s.is_active ? "badge badge-quoted" : "badge badge-closed"}>{s.is_active ? "Faol" : "Bekor qilingan"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
