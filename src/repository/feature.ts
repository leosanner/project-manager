import { prisma } from "@/lib/prisma/index";
import { FeatureUncheckedCreateInput } from "../../generated/prisma/models";

export class FeatureRepository {
  async displayUserFeatures(projectIds: string[]) {
    return await prisma.feature.groupBy({
      by: ["projectId"],
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });
  }

  async getFeatureTasks(featureId: number) {
    return await prisma.feature
      .findUnique({ where: { id: featureId } })
      .tasks();
  }

  async createFeature(featureData: FeatureUncheckedCreateInput) {
    return await prisma.feature.create({
      data: featureData,
    });
  }
}
