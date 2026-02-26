import NewFeatureForm from "./new-feature-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <NewFeatureForm projectId={id} />;
}
