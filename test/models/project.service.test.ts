import { ProjectService } from "@/model/project";

describe("ProjectService", () => {
  it("maps user project ids correctly", async () => {
    const service = new ProjectService();
    const getUserProjectsMock = jest.fn().mockResolvedValue([
      { id: "project-1", name: "A" },
      { id: "project-2", name: "B" },
    ]);

    service.projectRepository = {
      getUserProjects: getUserProjectsMock,
    } as never;

    const ids = await service.getUserProjectsIds("user-1");

    expect(getUserProjectsMock).toHaveBeenCalledWith("user-1");
    expect(ids).toEqual(["project-1", "project-2"]);
  });

  it("delegates createProject to repository", async () => {
    const service = new ProjectService();
    const createProjectMock = jest.fn().mockResolvedValue(undefined);

    service.projectRepository = {
      createProject: createProjectMock,
    } as never;

    const input = { name: "Project Manager", authorId: "user-1" };
    await service.createProject(input as never);

    expect(createProjectMock).toHaveBeenCalledWith(input);
  });

  it("builds project summary with feature and task totals", async () => {
    const now = new Date("2026-02-27T10:00:00.000Z");
    const service = new ProjectService();

    const getUserProjectsMock = jest.fn().mockResolvedValue([
      { id: "project-1", name: "Alpha", updatedAt: now },
      { id: "project-2", name: "Beta", updatedAt: now },
    ]);
    const getProjectFeaturesMock = jest
      .fn()
      .mockImplementation(async (projectId: string) => {
        if (projectId === "project-1") return [{ id: 11 }, { id: 12 }];
        return [];
      });
    const getFeatureTasksMock = jest
      .fn()
      .mockImplementation(async (featureId: number) => {
        if (featureId === 11) return [{ id: 1 }, { id: 2 }];
        if (featureId === 12) return [{ id: 3 }];
        return [];
      });

    service.projectRepository = {
      getUserProjects: getUserProjectsMock,
      getProjectFeatures: getProjectFeaturesMock,
    } as never;
    service.featureRepository = {
      getFeatureTasks: getFeatureTasksMock,
    } as never;

    const summary = await service.displayUserProjectsSummary("user-1");

    expect(summary).toEqual([
      {
        projectId: "project-1",
        projectName: "Alpha",
        updatedAt: now,
        totalTasks: 3,
        totalFeatures: 2,
      },
      {
        projectId: "project-2",
        projectName: "Beta",
        updatedAt: now,
        totalTasks: 0,
        totalFeatures: 0,
      },
    ]);
  });
});
