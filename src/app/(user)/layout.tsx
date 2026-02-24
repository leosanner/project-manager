import { getUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type HomeLayoutProps = Readonly<{ children: ReactNode }>;

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
