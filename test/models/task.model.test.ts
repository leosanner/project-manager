import { TaskModel } from "@/model/task";

describe("TaskModel", () => {
  it("delegates createTask to repository and returns created task", async () => {
    const model = new TaskModel();
    const createTaskMock = jest.fn().mockResolvedValue({
      id: 15,
      description: "Ship first milestone",
      featureId: 2,
      authorId: "user-1",
    });

    model.taskRepository = {
      createTask: createTaskMock,
    } as never;

    const input = {
      description: "Ship first milestone",
      featureId: 2,
      authorId: "user-1",
    };

    const result = await model.createTask(input as never);

    expect(createTaskMock).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      id: 15,
      description: "Ship first milestone",
      featureId: 2,
      authorId: "user-1",
    });
  });
});
