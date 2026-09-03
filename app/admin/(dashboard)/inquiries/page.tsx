import { getAllInquiries } from "@/lib/db/inquiries";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", { dateStyle: "medium", timeStyle: "short" });
}

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)" }}>Murojaatlar (CRM)</h1>
        <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{inquiries.length} ta murojaat</span>
      </div>

      {inquiries.length === 0 ? (
        <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: "3rem", textAlign: "center", color: "var(--color-text-muted)" }}>
          <p>Hozircha murojaatlar yo&apos;q.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {inquiries.map((inq) => (
            <div key={inq.id} style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.95rem" }}>{inq.customer_name || "—"}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    {inq.phone} {inq.email ? `· ${inq.email}` : ""} {inq.company ? `· ${inq.company}` : ""}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    {formatDate(inq.created_at)} · {inq.source} · {inq.locale}
                  </p>
                </div>
                <InquiryStatusSelect id={inq.id} status={inq.status} />
              </div>

              {inq.message && (
                <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--color-text)", background: "var(--color-surface-alt)", padding: "0.75rem", borderRadius: "6px" }}>
                  {inq.message}
                </p>
              )}

              {inq.calculation_data && (
                <pre style={{ marginTop: "0.75rem", fontSize: "0.78rem", background: "#111827", color: "#e5e7eb", padding: "0.75rem", borderRadius: "6px", overflowX: "auto" }}>
                  {JSON.stringify(inq.calculation_data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
