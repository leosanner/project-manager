import { prisma } from "@/lib/prisma/index";
import { ProjectUncheckedCreateInput } from "../../generated/prisma/models";

export class ProjectRepository {
  async getUserProjects(userId: string) {
    return await prisma.project.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async createProject(projectData: ProjectUncheckedCreateInput) {
    await prisma.project.create({
      data: projectData,
    });
  }

  async getProjectFeatures(projectId: string) {
    const project = prisma.project
      .findUnique({
        where: {
          id: projectId,
        },
      })
      .features();

    return project;
  }
}
