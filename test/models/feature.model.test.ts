import { FeatureModel } from "@/model/feature";

describe("FeatureModel", () => {
  it("filters feature tasks by author", async () => {
    const model = new FeatureModel();
    const getTasksByFeatureMock = jest.fn().mockResolvedValue([
      { id: 1, description: "A", authorId: "user-1" },
      { id: 2, description: "B", authorId: "user-2" },
      { id: 3, description: "C", authorId: "user-1" },
    ]);

    model.taskRepository = {
      getTasksByFeature: getTasksByFeatureMock,
    } as never;

    const tasks = await model.getFeatureTasks({
      featureId: 10,
      featureAuthorId: "user-1",
    });

    expect(getTasksByFeatureMock).toHaveBeenCalledWith(10);
    expect(tasks).toEqual([
      { id: 1, description: "A", authorId: "user-1" },
      { id: 3, description: "C", authorId: "user-1" },
    ]);
  });

  it("delegates createFeature to repository", async () => {
    const model = new FeatureModel();
    const createFeatureMock = jest.fn().mockResolvedValue({ id: 10 });

    model.featureRepository = {
      createFeature: createFeatureMock,
    } as never;

    const input = {
      description: "Build feature workflow",
      projectId: "project-1",
      deadline: new Date("2026-03-01"),
    };

    const result = await model.createFeature(input as never);

    expect(createFeatureMock).toHaveBeenCalledWith(input);
    expect(result).toEqual({ id: 10 });
  });
});
