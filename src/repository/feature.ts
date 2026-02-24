import { prisma } from "@/lib/prisma/index";

export class FeatureRepository {
  async getFeatureTasks(featureId: number) {
    return await prisma.feature
      .findUnique({ where: { id: featureId } })
      .tasks();
  }
}
