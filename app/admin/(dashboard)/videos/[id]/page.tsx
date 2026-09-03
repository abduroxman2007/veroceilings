import { getVideoById } from "@/lib/db/site-videos";
import { notFound } from "next/navigation";
import SiteVideoForm from "@/components/admin/SiteVideoForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditVideoPage({ params }: Props) {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        {video.title_uz}
      </h1>
      <SiteVideoForm video={video} />
    </div>
  );
}
