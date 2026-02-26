import { prisma } from "@/lib/prisma/index";

export class TaskRepository {
  async getTasksByFeature(featureId: number) {
    return await prisma.task.findMany({
      where: {
        featureId: featureId,
      },
    });
  }
}
