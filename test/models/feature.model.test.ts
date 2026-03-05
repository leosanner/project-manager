import { FeatureService } from "@/model/feature";

describe("FeatureModel", () => {
  it("filters feature tasks by author", async () => {
    const model = new FeatureService();
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
    const model = new FeatureService();
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

  it("deletes feature when it belongs to one of the user's projects", async () => {
    const model = new FeatureService();
    const getTotalFeaturesMock = jest.fn().mockResolvedValue([
      { id: "project-1", features: [{ id: 10 }, { id: 11 }] },
      { id: "project-2", features: [{ id: 20 }] },
    ]);
    const deleteFeatureMock = jest.fn().mockResolvedValue({ id: 11 });

    model.projectRepository = {
      getTotalFeatures: getTotalFeaturesMock,
    } as never;
    model.featureRepository = {
      deleteFeature: deleteFeatureMock,
    } as never;

    const result = await model.deleteFeature(11, "user-1");

    expect(getTotalFeaturesMock).toHaveBeenCalledWith("user-1");
    expect(deleteFeatureMock).toHaveBeenCalledWith(11);
    expect(result).toEqual({ id: 11 });
  });

  it("does not delete feature when it is outside the user's scope", async () => {
    const model = new FeatureService();
    const getTotalFeaturesMock = jest.fn().mockResolvedValue([
      { id: "project-1", features: [{ id: 10 }] },
    ]);
    const deleteFeatureMock = jest.fn();

    model.projectRepository = {
      getTotalFeatures: getTotalFeaturesMock,
    } as never;
    model.featureRepository = {
      deleteFeature: deleteFeatureMock,
    } as never;

    const result = await model.deleteFeature(999, "user-1");

    expect(getTotalFeaturesMock).toHaveBeenCalledWith("user-1");
    expect(deleteFeatureMock).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
