import SiteVideoForm from "@/components/admin/SiteVideoForm";

export default function NewVideoPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        Yangi video
      </h1>
      <SiteVideoForm />
    </div>
  );
}
