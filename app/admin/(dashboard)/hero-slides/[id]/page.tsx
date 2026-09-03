import { getHeroSlideById } from "@/lib/db/hero-slides";
import { notFound } from "next/navigation";
import HeroSlideForm from "@/components/admin/HeroSlideForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditHeroSlidePage({ params }: Props) {
  const { id } = await params;
  const slide = await getHeroSlideById(id);
  if (!slide) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        {slide.title_uz}
      </h1>
      <HeroSlideForm slide={slide} />
    </div>
  );
}
