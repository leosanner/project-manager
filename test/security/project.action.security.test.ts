jest.mock("@/lib/auth/session", () => ({
  getUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import { deleteProjectAction } from "@/app/actions/project";
import { getUser } from "@/lib/auth/session";
import { ProjectService } from "@/model/project";
import { redirect } from "next/navigation";

describe("deleteProjectAction security", () => {
  const mockGetUser = getUser as jest.Mock;
  const mockRedirect = redirect as jest.Mock;
  let deleteProjectSpy: jest.SpiedFunction<ProjectService["deleteProject"]>;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteProjectSpy = jest.spyOn(ProjectService.prototype, "deleteProject");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("rejects invalid project ID payload", async () => {
    const formData = new FormData();
    formData.append("projectId", "invalid");

    const result = await deleteProjectAction({ success: true }, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.projectId).toBeDefined();
    expect(deleteProjectSpy).not.toHaveBeenCalled();
  });

  it("blocks deletion when project is not owned by user", async () => {
    const projectId = "52e3703b-1f11-47dd-bd42-39f3ab462983";
    mockGetUser.mockResolvedValue({ id: "user-1" });
    deleteProjectSpy.mockResolvedValue(undefined as never);

    const formData = new FormData();
    formData.append("projectId", projectId);

    const result = await deleteProjectAction({ success: true }, formData);

    expect(deleteProjectSpy).toHaveBeenCalledWith(projectId, "user-1");
    expect(result.success).toBe(false);
    expect(result.errors?.internalApplicationError).toBeDefined();
    expect(mockRedirect).not.toHaveBeenCalledWith("/home");
  });

  it("redirects to home after successful deletion", async () => {
    const projectId = "9ec7d102-f322-4139-8f6e-14599d5ecab2";
    mockGetUser.mockResolvedValue({ id: "user-1" });
    deleteProjectSpy.mockResolvedValue({ id: projectId } as never);

    const formData = new FormData();
    formData.append("projectId", projectId);

    await deleteProjectAction({ success: true }, formData);

    expect(deleteProjectSpy).toHaveBeenCalledWith(projectId, "user-1");
    expect(mockRedirect).toHaveBeenCalledWith("/home");
  });
});
