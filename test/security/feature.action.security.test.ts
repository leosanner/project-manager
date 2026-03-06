jest.mock("@/lib/auth/session", () => ({
  getUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

import {
  deleteFeatureAction,
  updateFeatureMarkdownAction,
} from "@/app/actions/feature";
import { getUser } from "@/lib/auth/session";
import { FeatureService } from "@/model/feature";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

describe("Feature actions security", () => {
  const mockGetUser = getUser as jest.Mock;
  const mockRedirect = redirect as jest.Mock;
  const mockRevalidatePath = revalidatePath as jest.Mock;
  let deleteFeatureSpy: jest.SpiedFunction<FeatureService["deleteFeature"]>;
  let updateMarkdownSpy: jest.SpiedFunction<FeatureService["updateMarkdownContent"]>;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteFeatureSpy = jest.spyOn(FeatureService.prototype, "deleteFeature");
    updateMarkdownSpy = jest.spyOn(
      FeatureService.prototype,
      "updateMarkdownContent",
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("rejects invalid feature/project payload on delete", async () => {
    const formData = new FormData();
    formData.append("featureId", "abc");
    formData.append("projectId", "invalid");

    const result = await deleteFeatureAction({ success: true }, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.internalServerError).toBeDefined();
    expect(deleteFeatureSpy).not.toHaveBeenCalled();
  });

  it("calls deleteFeature with correct argument order", async () => {
    const projectId = "52e3703b-1f11-47dd-bd42-39f3ab462983";
    mockGetUser.mockResolvedValue({ id: "user-1" });
    deleteFeatureSpy.mockResolvedValue(undefined as never);

    const formData = new FormData();
    formData.append("featureId", "11");
    formData.append("projectId", projectId);

    const result = await deleteFeatureAction({ success: true }, formData);

    expect(deleteFeatureSpy).toHaveBeenCalledWith("user-1", 11);
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

    expect(deleteFeatureSpy).toHaveBeenCalledWith("user-1", 11);
    expect(mockRedirect).toHaveBeenCalledWith(`/project/${projectId}`);
  });

  it("rejects invalid markdown update payload", async () => {
    const formData = new FormData();
    formData.append("featureId", "abc");
    formData.append("projectId", "invalid");
    formData.append("markdownContent", "");

    const result = await updateFeatureMarkdownAction({ success: true }, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(updateMarkdownSpy).not.toHaveBeenCalled();
  });

  it("blocks markdown update when feature is outside user scope", async () => {
    mockGetUser.mockResolvedValue({ id: "user-1" });
    updateMarkdownSpy.mockResolvedValue(undefined as never);
    const formData = new FormData();
    formData.append("featureId", "11");
    formData.append("projectId", "9ec7d102-f322-4139-8f6e-14599d5ecab2");
    formData.append("markdownContent", "# Draft");

    const result = await updateFeatureMarkdownAction({ success: true }, formData);

    expect(updateMarkdownSpy).toHaveBeenCalledWith("# Draft", 11, "user-1");
    expect(result.success).toBe(false);
    expect(result.errors?.internalServerError).toBeDefined();
    expect(mockRevalidatePath).not.toHaveBeenCalled();
  });

  it("revalidates feature path after successful markdown update", async () => {
    const projectId = "9ec7d102-f322-4139-8f6e-14599d5ecab2";
    mockGetUser.mockResolvedValue({ id: "user-1" });
    updateMarkdownSpy.mockResolvedValue({
      id: 11,
      markdownContent: "## Updated",
    } as never);
    const formData = new FormData();
    formData.append("featureId", "11");
    formData.append("projectId", projectId);
    formData.append("markdownContent", "## Updated");

    const result = await updateFeatureMarkdownAction({ success: true }, formData);

    expect(updateMarkdownSpy).toHaveBeenCalledWith("## Updated", 11, "user-1");
    expect(result.success).toBe(true);
    expect(mockRevalidatePath).toHaveBeenCalledWith(`/project/${projectId}/11`);
  });
});
