import { getUser } from "@/lib/auth/session";
import { FeatureModel } from "@/model/feature";
import { ProjectService } from "@/model/project";
import { TaskList, type Task } from "@/components/ui/task-list";
import { redirect } from "next/navigation";
import NewTaskForm from "./new-task-form";

type PageProps = {
  params: Promise<{
    id: string;
    featureId: string;
  }>;
};
export default async function Page({ params }: PageProps) {
  const { id, featureId } = await params;
  const parsedFeatureId = Number(featureId);
  const user = await getUser();

  if (!Number.isInteger(parsedFeatureId) || !user) {
    redirect("/home");
  }

  const projectModel = new ProjectService();
  const featureModel = new FeatureModel();
  const projectFeatures = await projectModel.getProjectFeatures(id);
  const currentFeature = projectFeatures?.find(
    (feature) => feature.id === parsedFeatureId,
  );

  if (!currentFeature) {
    redirect(`/project/${id}`);
  }

  const tasks = await featureModel.getFeatureTasks({
    featureId: parsedFeatureId,
    featureAuthorId: user.id,
  });

  const featureTasks: Task[] =
    tasks?.map((task) => ({
      id: task.id,
      task: task.description,
      category: "Task",
      status: task.completed ? "Completed" : "In Progress",
      dueDate: task.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    })) ?? [];

  return (
    <section className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Feature #{currentFeature.id}
          </h1>
          <p className="mt-2 text-sm text-[#C7CCD6] md:text-base">
            {currentFeature.description}
          </p>
        </header>

        <NewTaskForm projectId={id} featureId={parsedFeatureId} />

        <TaskList title="Feature Tasks" tasks={featureTasks} />
      </div>
    </section>
  );
}
