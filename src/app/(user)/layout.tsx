import { getUser } from "@/lib/auth/session";
import UserSidebarShell from "@/components/user-sidebar-shell";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type HomeLayoutProps = Readonly<{ children: ReactNode }>;

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <UserSidebarShell userName={user.name} userEmail={user.email}>
      {children}
    </UserSidebarShell>
  );
}
