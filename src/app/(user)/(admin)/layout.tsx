import { UserService } from "@/model/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userModel = new UserService();
  const userRole = await userModel.getUserRole();

  if (!userRole || userRole == "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
