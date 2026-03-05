import { FeatureRepository } from "@/repository/feature";
import { FeatureUncheckedCreateInput } from "../../../generated/prisma/models";
import { TaskRepository } from "@/repository/task";
import { string } from "zod";
import { ProjectRepository } from "@/repository/project";

export class FeatureService {
  featureRepository: FeatureRepository;
  taskRepository: TaskRepository;
  projectRepository: ProjectRepository;

  constructor() {
    this.featureRepository = new FeatureRepository();
    this.taskRepository = new TaskRepository();
    this.projectRepository = new ProjectRepository();
  }

  async displayUserFeatures(projectIds: string[]) {
    return await this.featureRepository.displayUserFeatures(projectIds);
  }

  async getFeatureTasks(data: { featureId: number; featureAuthorId: string }) {
    const featureTasks = await this.taskRepository.getTasksByFeature(
      data.featureId,
    );

    return featureTasks?.filter(
      (task) => task.authorId === data.featureAuthorId,
    );
  }

  async createFeature(featureData: FeatureUncheckedCreateInput) {
    return await this.featureRepository.createFeature(featureData);
  }

  async deleteFeature(featureId: number, authorId: string) {
    const totalFeatures =
      await this.projectRepository.getTotalFeatures(authorId);

    for (const feature of totalFeatures) {
      if (feature.id == String(featureId)) {
        return this.featureRepository.deleteFeature(featureId);
      }
    }
  }
}
