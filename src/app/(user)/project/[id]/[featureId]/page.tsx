type PageProps = {
  params: Promise<{
    id: string;
    featureId: number;
  }>;
};
export default async function Page({ params }: PageProps) {
  const { id, featureId } = await params;

  return <div>Página da feature</div>;
}
