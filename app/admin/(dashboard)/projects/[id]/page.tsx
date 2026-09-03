import { getProjectById } from "@/lib/db/projects";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        {project.title_uz}
      </h1>
      <ProjectForm project={project} />
    </div>
  );
}
