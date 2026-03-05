jest.mock("@/lib/auth/session", () => ({
  getUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import { deleteFeatureAction } from "@/app/actions/feature";
import { getUser } from "@/lib/auth/session";
import { FeatureService } from "@/model/feature";
import { redirect } from "next/navigation";

describe("deleteFeatureAction security", () => {
  const mockGetUser = getUser as jest.Mock;
  const mockRedirect = redirect as jest.Mock;
  let deleteFeatureSpy: jest.SpiedFunction<FeatureService["deleteFeature"]>;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteFeatureSpy = jest.spyOn(FeatureService.prototype, "deleteFeature");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("rejects invalid feature/project payload", async () => {
    const formData = new FormData();
    formData.append("featureId", "abc");
    formData.append("projectId", "invalid");

    const result = await deleteFeatureAction({ success: true }, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.internalServerError).toBeDefined();
    expect(deleteFeatureSpy).not.toHaveBeenCalled();
  });

  it("blocks deletion when feature is not owned by user", async () => {
    const projectId = "52e3703b-1f11-47dd-bd42-39f3ab462983";
    mockGetUser.mockResolvedValue({ id: "user-1" });
    deleteFeatureSpy.mockResolvedValue(undefined as never);

    const formData = new FormData();
    formData.append("featureId", "11");
    formData.append("projectId", projectId);

    const result = await deleteFeatureAction({ success: true }, formData);

    expect(deleteFeatureSpy).toHaveBeenCalledWith(11, "user-1");
    expect(result.success).toBe(false);
    expect(result.errors?.internalServerError).toBeDefined();
    expect(mockRedirect).not.toHaveBeenCalledWith(`/project/${projectId}`);
  });

  it("redirects to project after successful deletion", async () => {
    const projectId = "9ec7d102-f322-4139-8f6e-14599d5ecab2";
    mockGetUser.mockResolvedValue({ id: "user-1" });
    deleteFeatureSpy.mockResolvedValue({ id: 11 } as never);

    const formData = new FormData();
    formData.append("featureId", "11");
    formData.append("projectId", projectId);

    await deleteFeatureAction({ success: true }, formData);

    expect(deleteFeatureSpy).toHaveBeenCalledWith(11, "user-1");
    expect(mockRedirect).toHaveBeenCalledWith(`/project/${projectId}`);
  });
});
