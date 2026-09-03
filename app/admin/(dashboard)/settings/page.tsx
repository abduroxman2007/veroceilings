import { getSiteSettings } from "@/lib/db/site-settings";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        Sozlamalar
      </h1>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
