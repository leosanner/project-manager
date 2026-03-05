import { createFeatureSchema } from "@/schemas/feature";

describe("FeatureSchema security", () => {
  const FeatureSchema = createFeatureSchema(5);
  const toLocalDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}:00`;
  };

  it("rejects non-uuid project IDs", () => {
    const parsed = FeatureSchema.safeParse({
      description: "Build API endpoints",
      deadline: "2030-01-10",
      projectId: "1 OR 1=1",
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects script payload in description", () => {
    const parsed = FeatureSchema.safeParse({
      description: "<script>alert('xss')</script>",
      deadline: "2030-01-10",
      projectId: "4d89f3e1-5640-46ef-a3bb-65d86fa26bd6",
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts valid payload", () => {
    const parsed = FeatureSchema.safeParse({
      description: "Build project summary widget",
      deadline: "2030-01-10",
      projectId: "4d89f3e1-5640-46ef-a3bb-65d86fa26bd6",
    });

    expect(parsed.success).toBe(true);
  });

  it("accepts deadline on the same day when time is in the future", () => {
    const parsed = FeatureSchema.safeParse({
      description: "Build project summary widget",
      deadline: toLocalDateTime(new Date(Date.now() + 2 * 60 * 60 * 1000)),
      projectId: "4d89f3e1-5640-46ef-a3bb-65d86fa26bd6",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects deadline on the same day when time is in the past", () => {
    const parsed = FeatureSchema.safeParse({
      description: "Build project summary widget",
      deadline: toLocalDateTime(new Date(Date.now() - 2 * 60 * 60 * 1000)),
      projectId: "4d89f3e1-5640-46ef-a3bb-65d86fa26bd6",
    });

    expect(parsed.success).toBe(false);
  });
});
