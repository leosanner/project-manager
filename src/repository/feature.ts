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

  async getFeatureByUser(userId: string, featureId: number) {
    return await prisma.feature.findFirst({
      where: {
        id: featureId,
        project: {
          authorId: userId,
        },
      },
    });
  }

  async updateMarkdown(markdownContent: string, featureId: number) {
    return await prisma.feature.update({
      where: {
        id: featureId,
      },
      data: {
        markdownContent,
      },
    });
  }

  async deleteFeature(featureId: number) {
    return await prisma.feature.delete({
      where: {
        id: featureId,
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
