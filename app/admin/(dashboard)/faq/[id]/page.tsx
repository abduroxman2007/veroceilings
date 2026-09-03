import { getFaqById } from "@/lib/db/faqs";
import { notFound } from "next/navigation";
import FaqForm from "@/components/admin/FaqForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditFaqPage({ params }: Props) {
  const { id } = await params;
  const faq = await getFaqById(id);
  if (!faq) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        {faq.question_uz}
      </h1>
      <FaqForm faq={faq} />
    </div>
  );
}
