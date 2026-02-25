"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FolderPlus,
  Home,
  Menu,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type UserSidebarShellProps = {
  children: React.ReactNode;
  userName?: string | null;
  userEmail?: string | null;
};

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "New Project",
    url: "/project/new",
    icon: FolderPlus,
  },
];

export default function UserSidebarShell({
  children,
  userName,
  userEmail,
}: UserSidebarShellProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-white/15 bg-black p-3 text-white transition-colors hover:bg-zinc-900"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 border-r border-white/10 bg-black text-white transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col px-4 pb-4 pt-20">
          <div className="px-2 pb-6 text-sm uppercase tracking-wide text-white/50">
            Project Manager
          </div>
          <nav className="flex-1 space-y-2">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10",
                  pathname === item.url && "bg-white/15",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
              <div className="rounded-md border border-white/15 p-1.5">
                <User className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{userName ?? "User"}</p>
                <p className="truncate text-xs text-white/60">{userEmail ?? "No email"}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-h-screen pt-16">{children}</main>
    </div>
  );
}
