jest.mock("@/lib/auth/session", () => ({
  getUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

import { createTaskAction } from "@/app/actions/task";
import { getUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { ProjectService } from "@/model/project";
import { TaskModel } from "@/model/task";

describe("createTaskAction security", () => {
  const mockGetUser = getUser as jest.Mock;
  const mockRedirect = redirect as jest.Mock;
  let getProjectFeaturesSpy: jest.SpiedFunction<
    ProjectService["getProjectFeatures"]
  >;
  let createTaskSpy: jest.SpiedFunction<TaskModel["createTask"]>;

  beforeEach(() => {
    jest.clearAllMocks();
    getProjectFeaturesSpy = jest.spyOn(ProjectService.prototype, "getProjectFeatures");
    createTaskSpy = jest.spyOn(TaskModel.prototype, "createTask");
    createTaskSpy.mockResolvedValue(undefined as never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("blocks task creation when state projectId/featureId is missing", async () => {
    mockGetUser.mockResolvedValue({ id: "user-1" });

    const formData = new FormData();
    formData.append("description", "Valid description");

    const result = await createTaskAction({ success: true }, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.internalServerError).toBeDefined();
    expect(createTaskSpy).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("blocks creation when feature does not belong to the project", async () => {
    mockGetUser.mockResolvedValue({ id: "user-1" });
    getProjectFeaturesSpy.mockResolvedValue([{ id: 2 }, { id: 3 }] as never);

    const formData = new FormData();
    formData.append("description", "Valid description");

    const result = await createTaskAction(
      { success: true, projectId: "project-1", featureId: 1 },
      formData,
    );

    expect(result.success).toBe(false);
    expect(result.errors?.internalServerError).toBeDefined();
    expect(createTaskSpy).not.toHaveBeenCalled();
  });

  it("rejects invalid payload and does not call persistence", async () => {
    mockGetUser.mockResolvedValue({ id: "user-1" });
    getProjectFeaturesSpy.mockResolvedValue([{ id: 1 }] as never);

    const formData = new FormData();
    formData.append("description", "a");

    const result = await createTaskAction(
      { success: true, projectId: "project-1", featureId: 1 },
      formData,
    );

    expect(result.success).toBe(false);
    expect(result.errors?.description).toBeDefined();
    expect(createTaskSpy).not.toHaveBeenCalled();
  });

  it("uses featureId from action state, ignoring crafted form payload", async () => {
    mockGetUser.mockResolvedValue({ id: "user-1" });
    getProjectFeaturesSpy.mockResolvedValue([{ id: 1 }] as never);

    const formData = new FormData();
    formData.append("description", "Create endpoints");
    formData.append("featureId", "999");
    formData.append("projectId", "attacker-project");

    const result = await createTaskAction(
      { success: true, projectId: "project-1", featureId: 1 },
      formData,
    );

    expect(result.success).toBe(true);
    expect(createTaskSpy).toHaveBeenCalledWith({
      description: "Create endpoints",
      authorId: "user-1",
      featureId: 1,
    });
  });
});
