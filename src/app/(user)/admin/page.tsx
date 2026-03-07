import { AdminModel } from "@/model/admin";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Shield,
  Sparkles,
  UserCog,
  Users,
} from "lucide-react";

const pendingActions = [
  {
    title: "Role change requested",
    description: "Promote Bruno N. to MANAGER role",
    project: "Ops Modernization",
    severity: "Medium",
  },
  {
    title: "Workspace access request",
    description: "Client wants read-only access to proposal history",
    project: "Phoenix Rebrand",
    severity: "Low",
  },
  {
    title: "Policy exception",
    description: "Temporary file export permission requested",
    project: "Orbit ERP",
    severity: "High",
  },
];

const auditLogs = [
  {
    event: "Role Updated",
    actor: "admin@pmflow.com",
    target: "rafael@pmflow.com",
    timestamp: "Today, 10:45",
  },
  {
    event: "User Invited",
    actor: "julia@pmflow.com",
    target: "carla@agency.com",
    timestamp: "Today, 09:18",
  },
  {
    event: "Access Revoked",
    actor: "admin@pmflow.com",
    target: "mateus@pmflow.com",
    timestamp: "Yesterday, 18:02",
  },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getRoleStyles = (role: string) => {
  if (role === "ADMIN") {
    return {
      background: "rgba(57, 213, 255, 0.12)",
      color: "#9be8ff",
      borderColor: "rgba(57, 213, 255, 0.4)",
    };
  }

  return {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#C7CCD6",
    borderColor: "rgba(255, 255, 255, 0.2)",
  };
};

export default async function AdminPage() {
  const adminModel = new AdminModel();
  const users = (await adminModel.getUsers()) ?? [];

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;

  const summaryCards = [
    {
      title: "Total Users",
      value: `${totalUsers}`,
      delta: "Registered accounts",
      icon: Users,
      accent: "#39D5FF",
    },
    {
      title: "Admins",
      value: `${totalAdmins}`,
      delta: "Users with full access",
      icon: Shield,
      accent: "#8B5CF6",
    },
    {
      title: "Pending Reviews",
      value: "17",
      delta: "5 high priority",
      icon: Clock3,
      accent: "#FF8A3D",
    },
    {
      title: "Incidents",
      value: "2",
      delta: "-1 compared to yesterday",
      icon: AlertTriangle,
      accent: "#FF4D73",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-[1400px] space-y-8 px-6 py-10 md:px-8 md:py-12">
        <header className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#0A0A0A] p-7 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              background:
                "radial-gradient(1000px 260px at -10% -40%, rgba(57, 213, 255, 0.35), transparent 60%), radial-gradient(900px 260px at 110% -60%, rgba(139, 92, 246, 0.35), transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-300 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Admin Area
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Workspace Control Panel
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[#C7CCD6] md:text-base">
                Centralized visual area for user governance, role monitoring,
                security actions and approval workflows.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Open System Report
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-white/15 bg-[#0A0A0A] p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-medium tracking-wide text-[#C7CCD6] uppercase">
                  {card.title}
                </p>
                <span
                  className="rounded-md border px-2 py-1"
                  style={{ borderColor: `${card.accent}66` }}
                >
                  <card.icon
                    className="h-4 w-4"
                    style={{ color: card.accent }}
                    aria-hidden
                  />
                </span>
              </div>

              <p className="text-4xl font-semibold tracking-tight text-white">
                {card.value}
              </p>
              <p className="mt-2 text-xs text-[#C7CCD6]">{card.delta}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.45fr_1fr]">
          <article className="overflow-hidden rounded-xl border border-white/15 bg-[#0A0A0A]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">Users Overview</h2>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10"
              >
                <UserCog className="h-3.5 w-3.5" />
                Manage
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-xs tracking-wide text-[#C7CCD6] uppercase">
                  <tr>
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Verified</th>
                    <th className="px-5 py-3">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-6 text-center text-sm text-[#C7CCD6]"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => {
                      const roleStyles = getRoleStyles(user.role);

                      return (
                        <tr
                          key={user.id}
                          className="border-b border-white/5 text-white/90 transition-colors hover:bg-white/[0.03]"
                        >
                          <td className="px-5 py-3.5">
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-xs text-[#C7CCD6]">{user.email}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className="rounded-md border px-2 py-1 text-xs"
                              style={{
                                background: roleStyles.background,
                                color: roleStyles.color,
                                borderColor: roleStyles.borderColor,
                              }}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                              style={{
                                background: user.emailVerified
                                  ? "rgba(34, 197, 94, 0.15)"
                                  : "rgba(148, 163, 184, 0.2)",
                                color: user.emailVerified ? "#86efac" : "#cbd5e1",
                              }}
                            >
                              {user.emailVerified ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-[#C7CCD6]">
                            {formatDate(user.createdAt)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-xl border border-white/15 bg-[#0A0A0A] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Pending Actions</h2>
                <span className="rounded-full border border-orange-300/25 bg-orange-300/10 px-2.5 py-1 text-xs text-orange-200">
                  {pendingActions.length}
                </span>
              </div>

              <div className="space-y-3">
                {pendingActions.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-white">{action.title}</p>
                      <span className="rounded border border-white/15 px-1.5 py-0.5 text-[11px] text-[#C7CCD6]">
                        {action.severity}
                      </span>
                    </div>
                    <p className="text-xs text-[#C7CCD6]">{action.description}</p>
                    <p className="mt-2 text-[11px] text-white/70">{action.project}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-white/15 bg-[#0A0A0A] p-5">
              <div className="mb-4 flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-cyan-300" />
                <h2 className="text-lg font-semibold text-white">Audit Trail</h2>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={`${log.event}-${log.timestamp}`}
                    className="rounded-lg border border-white/10 p-3"
                  >
                    <p className="text-sm font-medium text-white">{log.event}</p>
                    <p className="mt-1 text-xs text-[#C7CCD6]">
                      {log.actor} {"->"} {log.target}
                    </p>
                    <p className="mt-2 text-[11px] text-white/60">{log.timestamp}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
