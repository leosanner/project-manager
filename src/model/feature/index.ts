import { FeatureRepository } from "@/repository/feature";
import { FeatureUncheckedCreateInput } from "../../../generated/prisma/models";
import { TaskRepository } from "@/repository/task";

export class FeatureModel {
  featureRepository: FeatureRepository;
  taskRepository: TaskRepository;

  constructor() {
    this.featureRepository = new FeatureRepository();
    this.taskRepository = new TaskRepository();
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
}
