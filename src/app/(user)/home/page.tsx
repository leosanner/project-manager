import { getUser } from "@/lib/auth/session";
import { Component as BauhausCard } from "@/components/ui/bauhaus-card";
import { summUserProjects } from "@/utils/project";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectService } from "@/model/project";

export default async function Home() {
  const user = await getUser();
  if (!user) {
    return null;
  }
  const projectService = new ProjectService();
  const projects = await projectService.displayUserProjectsSummary(user.id);

  const projectsSummary = summUserProjects(projects);
  const accentColors = ["#39D5FF", "#8B5CF6", "#FF4D73", "#FF8A3D", "#FFD24A"];

  const metrics = [
    {
      label: "Total Projects",
      value: projectsSummary.totalProjects,
      accentColor: "#39D5FF",
    },
    {
      label: "Total Features",
      value: projectsSummary.totalFeatures,
      accentColor: "#8B5CF6",
    },
    {
      label: "Total Tasks",
      value: projectsSummary.totalTasks,
      accentColor: "#FF4D73",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-8 md:py-12">
        <header className="mb-10 md:mb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="max-w-[760px] flex-1">
              <h1
                className="mb-3 inline-block text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
                style={{ textShadow: "0 0 30px rgba(57, 213, 255, 0.3)" }}
              >
                Your Projects,{" "}
                <span className="text-cyan-500"> {user.name}</span>
              </h1>
              <p className="text-base leading-relaxed text-[#C7CCD6] md:text-lg">
                Strategic overview of all active initiatives and their execution
                status.
              </p>
            </div>

            <Link
              href="/project/new"
              className="inline-flex cursor-pointer items-center gap-3 self-start rounded-lg px-6 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#0A0A0A",
                border: "1px solid rgba(57, 213, 255, 0.4)",
                boxShadow: "0 0 20px rgba(57, 213, 255, 0.15)",
              }}
            >
              <Plus size={20} color="#39D5FF" strokeWidth={2.5} />
              <span className="text-base font-semibold tracking-[0.01em] text-white">
                New Project
              </span>
            </Link>
          </div>
        </header>

        <section className="mb-14 md:mb-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="relative overflow-hidden rounded-lg bg-[#0A0A0A] p-8 transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(255, 255, 255, 0.18)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-40"
                  style={{ background: metric.accentColor }}
                />

                <div className="relative z-10">
                  <div className="mb-3 text-xs tracking-[0.02em] text-[#C7CCD6] uppercase md:text-sm">
                    {metric.label}
                  </div>
                  <div className="text-5xl leading-none font-semibold tracking-tight text-white">
                    {metric.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Active Projects
            </h2>
          </div>

          {projects.length === 0 ? (
            <div
              className="rounded-lg bg-[#0A0A0A] px-6 py-10 text-center text-[#C7CCD6]"
              style={{ border: "1px solid rgba(255, 255, 255, 0.18)" }}
            >
              No projects yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const accentColor = accentColors[index % accentColors.length];
                const formattedDate = project.updatedAt.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  },
                );
                return (
                  <div
                    key={`${project.projectName}-${index}`}
                    className="flex justify-center"
                  >
                    <BauhausCard
                      id={`${index}`}
                      accentColor={accentColor}
                      backgroundColor="#0A0A0A"
                      separatorColor="rgba(255, 255, 255, 0.18)"
                      borderRadius="1.5em"
                      borderWidth="2px"
                      topInscription={`Updated ${formattedDate}`}
                      mainText={project.projectName}
                      mainTextHref={`/project/${project.projectId}`}
                      subMainText={`${project.totalFeatures} Features • ${project.totalTasks} Tasks`}
                      progressBarInscription=""
                      progress={0}
                      progressValue=""
                      hideProgress={true}
                      filledButtonInscription="Features"
                      filledButtonHref={`/project/${project.projectId}/new-feature`}
                      outlinedButtonInscription="Docs"
                      textColorTop="#C7CCD6"
                      textColorMain="#FFFFFF"
                      textColorSub="#C7CCD6"
                      textColorProgressLabel="#C7CCD6"
                      textColorProgressValue="#FFFFFF"
                      progressBarBackground="rgba(255, 255, 255, 0.1)"
                      chronicleButtonBg={accentColor}
                      chronicleButtonFg="#000000"
                      chronicleButtonHoverFg="#000000"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
