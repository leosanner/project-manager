import { prisma } from "@/lib/prisma/index";
import { TaskUncheckedCreateInput } from "../../generated/prisma/models";

export class TaskRepository {
  async getTasksByFeature(featureId: number) {
    return await prisma.task.findMany({
      where: {
        featureId: featureId,
      },
    });
  }

  async createTask(taskInput: TaskUncheckedCreateInput) {
    return await prisma.task.create({
      data: taskInput,
    });
  }
}
