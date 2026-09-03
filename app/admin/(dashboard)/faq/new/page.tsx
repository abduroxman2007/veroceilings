import FaqForm from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        Yangi savol
      </h1>
      <FaqForm />
    </div>
  );
}
