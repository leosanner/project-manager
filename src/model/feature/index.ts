import { FeatureRepository } from "@/repository/feature";
import { FeatureUncheckedCreateInput } from "../../../generated/prisma/models";

export class FeatureModel {
  featureRepository: FeatureRepository;

  constructor() {
    this.featureRepository = new FeatureRepository();
  }

  async createFeature(featureData: FeatureUncheckedCreateInput) {
    return await this.featureRepository.createFeature(featureData);
  }
}
