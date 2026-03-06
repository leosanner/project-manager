import { FeatureService } from "@/model/feature";

describe("FeatureService", () => {
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

  it("returns markdown content when feature belongs to user", async () => {
    const model = new FeatureService();
    const getFeatureByUserMock = jest.fn().mockResolvedValue({
      id: 10,
      markdownContent: "# Hello",
    });

    model.featureRepository = {
      getFeatureByUser: getFeatureByUserMock,
    } as never;

    const result = await model.displayMarkdownContent("user-1", 10);

    expect(getFeatureByUserMock).toHaveBeenCalledWith("user-1", 10);
    expect(result).toBe("# Hello");
  });

  it("updates markdown when feature belongs to user", async () => {
    const model = new FeatureService();
    const getFeatureByUserMock = jest.fn().mockResolvedValue({ id: 10 });
    const updateMarkdownMock = jest.fn().mockResolvedValue({
      id: 10,
      markdownContent: "## Updated",
    });

    model.featureRepository = {
      getFeatureByUser: getFeatureByUserMock,
      updateMarkdown: updateMarkdownMock,
    } as never;

    const result = await model.updateMarkdownContent("## Updated", 10, "user-1");

    expect(getFeatureByUserMock).toHaveBeenCalledWith("user-1", 10);
    expect(updateMarkdownMock).toHaveBeenCalledWith("## Updated", 10);
    expect(result).toEqual({
      id: 10,
      markdownContent: "## Updated",
    });
  });

  it("does not update markdown when feature is outside user scope", async () => {
    const model = new FeatureService();
    const getFeatureByUserMock = jest.fn().mockResolvedValue(null);
    const updateMarkdownMock = jest.fn();

    model.featureRepository = {
      getFeatureByUser: getFeatureByUserMock,
      updateMarkdown: updateMarkdownMock,
    } as never;

    const result = await model.updateMarkdownContent("## Updated", 999, "user-1");

    expect(getFeatureByUserMock).toHaveBeenCalledWith("user-1", 999);
    expect(updateMarkdownMock).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it("deletes feature when it belongs to user", async () => {
    const model = new FeatureService();
    const getFeatureByUserMock = jest.fn().mockResolvedValue({ id: 11 });
    const deleteFeatureMock = jest.fn().mockResolvedValue({ id: 11 });

    model.featureRepository = {
      getFeatureByUser: getFeatureByUserMock,
      deleteFeature: deleteFeatureMock,
    } as never;

    const result = await model.deleteFeature("user-1", 11);

    expect(getFeatureByUserMock).toHaveBeenCalledWith("user-1", 11);
    expect(deleteFeatureMock).toHaveBeenCalledWith(11);
    expect(result).toEqual({ id: 11 });
  });
});
