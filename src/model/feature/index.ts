import { FeatureRepository } from "@/repository/feature";
import { FeatureUncheckedCreateInput } from "../../../generated/prisma/models";

export class FeatureModel {
  featureRepository: FeatureRepository;

  constructor() {
    this.featureRepository = new FeatureRepository();
  }

  async getFeatureTasks(data: { featureId: number; featureAuthorId: string }) {
    const featureTasks = await this.featureRepository.getFeatureTasks(
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
