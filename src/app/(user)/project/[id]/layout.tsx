import { getUser } from "@/lib/auth/session";
import { ProjectService } from "@/model/project";
import { redirect } from "next/navigation";

type ProjectLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const user = await getUser();
  const { id } = await params;
  const projectModel = new ProjectService();
  if ((await projectModel.getUserProjectsIds(user!.id)).includes(id)) {
    return <>{children}</>;
  }

  redirect("/home");
}
