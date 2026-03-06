import { getUser } from "@/lib/auth/session";
import { ProjectService } from "@/model/project";
import { redirect } from "next/navigation";
import DeleteFeatureForm from "./delete-feature-form";
import FeatureMarkdownEditor from "./feature-markdown-editor";

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
  const projectFeatures = await projectModel.getProjectFeatures(id);
  const currentFeature = projectFeatures?.find(
    (feature) => feature.id === parsedFeatureId,
  );

  if (!currentFeature) {
    redirect(`/project/${id}`);
  }

  return (
    <section className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Feature #{currentFeature.id}
            </h1>
            <p className="mt-2 text-sm text-[#C7CCD6] md:text-base">
              {currentFeature.description}
            </p>
          </div>
          <DeleteFeatureForm projectId={id} featureId={parsedFeatureId} />
        </header>

        <FeatureMarkdownEditor
          projectId={id}
          featureId={parsedFeatureId}
          initialMarkdown={currentFeature.markdownContent}
        />
      </div>
    </section>
  );
}
