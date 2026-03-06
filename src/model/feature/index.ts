import { FeatureRepository } from "@/repository/feature";
import { FeatureUncheckedCreateInput } from "../../../generated/prisma/models";
import { TaskRepository } from "@/repository/task";
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

  async displayMarkdownContent(authorId: string, featureId: number) {
    const feature = await this.findFeatureByUser(authorId, featureId);
    return feature?.markdownContent;
  }

  async updateMarkdownContent(
    markdownContent: string,
    featureId: number,
    authorId: string,
  ) {
    const feature = await this.findFeatureByUser(authorId, featureId);
    if (feature) {
      return await this.featureRepository.updateMarkdown(
        markdownContent,
        featureId,
      );
    }
  }

  async createFeature(featureData: FeatureUncheckedCreateInput) {
    return await this.featureRepository.createFeature(featureData);
  }

  async deleteFeature(authorId: string, featureId: number) {
    const feature = await this.findFeatureByUser(authorId, featureId);

    if (feature) {
      return await this.featureRepository.deleteFeature(featureId);
    }
  }

  private async findFeatureByUser(authorId: string, featureId: number) {
    return await this.featureRepository.getFeatureByUser(authorId, featureId);
  }
}
