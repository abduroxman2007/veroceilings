import HeroSlideForm from "@/components/admin/HeroSlideForm";

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        Yangi slayd
      </h1>
      <HeroSlideForm />
    </div>
  );
}
