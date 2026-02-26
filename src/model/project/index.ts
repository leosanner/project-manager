import { FeatureRepository } from "@/repository/feature";
import { ProjectRepository } from "@/repository/project";
import { ProjectUncheckedCreateInput } from "../../../generated/prisma/models";

export class ProjectService {
  projectRepository: ProjectRepository;
  featureRepository: FeatureRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.featureRepository = new FeatureRepository();
  }

  async getUserProjects(userId: string) {
    return this.projectRepository.getUserProjects(userId);
  }

  async createProject(projectData: ProjectUncheckedCreateInput) {
    return await this.projectRepository.createProject(projectData);
  }

  async getProjectFeatures(projectId: string) {
    return await this.projectRepository.getProjectFeatures(projectId);
  }

  async displayUserProjectsSummary(userId: string) {
    const projects = await this.getUserProjects(userId);

    const projectSummary = projects.map(async (proj) => {
      const features = await this.getProjectFeatures(proj.id);
      const tasks = features?.map(async (feature) => {
        const totalTasks = await this.featureRepository.getFeatureTasks(
          feature.id,
        );

        return totalTasks ? totalTasks.length : 0;
      });

      const totalTasks = tasks ? await Promise.all(tasks) : [0];

      const tasksNumber =
        totalTasks.length > 0
          ? totalTasks.reduce((acc, num) => {
              return acc + num;
            })
          : 0;

      return {
        projectId: proj.id,
        projectName: proj.name,
        updatedAt: proj.updatedAt,
        totalTasks: tasksNumber,
        totalFeatures: features ? features.length : 0,
      };
    });

    return await Promise.all(projectSummary);
  }
}
