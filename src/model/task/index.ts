import { TaskRepository } from "@/repository/task";
import { TaskUncheckedCreateInput } from "../../../generated/prisma/models";

export class TaskModel {
  taskRepository: TaskRepository;
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(taskInputData: TaskUncheckedCreateInput) {
    return await this.taskRepository.createTask(taskInputData);
  }
}
