import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", padding: "0.5rem 0.8rem 0.25rem" }}>
          <div>
            <h1 style={{ color: "white", fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Vero <span style={{ color: "var(--color-accent)" }}>Admin</span>
            </h1>
            <p className="admin-mobile-only" style={{ display: "none" }} />
          </div>

          {/* On mobile the sidebar is a top bar, so logout rides up here. */}
          <form action={logoutAction} className="admin-mobile-only">
            <button type="submit" aria-label="Chiqish" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.6rem", color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "0.78rem" }}>
              <LogOut size={15} /> Chiqish
            </button>
          </form>
        </div>

        <AdminNav />

        <form action={logoutAction} className="admin-desktop-only">
          <button
            type="submit"
            style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.6rem 0.8rem", marginTop: "0.5rem", color: "rgba(255,255,255,0.6)", background: "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left", fontSize: "0.86rem", borderRadius: 8 }}
          >
            <LogOut size={18} /> Chiqish
          </button>
        </form>
      </aside>

      <main className="admin-content">{children}</main>

      <style>{`
        @media (max-width: 900px) { .admin-desktop-only { display: none; } }
      `}</style>
    </div>
  );
}
