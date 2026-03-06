import { ProjectService } from "@/model/project";
import { TaskList, type Feature } from "@/components/ui/task-list";
import Link from "next/link";
import DeleteProjectForm from "./delete-project-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const projectService = new ProjectService();
  const projectFeatures = (await projectService.getProjectFeatures(id)) ?? [];

  const featureTasks: Feature[] = projectFeatures.map((feature) => ({
    id: feature.id,
    name: feature.description,
    completed: feature.completed,
    updatedAt: feature.updatedAt.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    deadline: feature.deadline.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    href: `/project/${id}/${feature.id}`,
  }));

  return (
    <section className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Project Details
            </h1>
            <div className="flex items-center gap-3">
              <DeleteProjectForm projectId={id} />
              <Link
                href={`/project/${id}/new-feature`}
                className="inline-flex rounded-md border border-cyan-400/60 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Create Feature
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <TaskList title="Project Features" features={featureTasks} />
        </div>
      </div>
    </section>
  );
}
