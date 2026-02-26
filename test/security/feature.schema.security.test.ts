import { createFeatureSchema } from "@/schemas/feature";

describe("FeatureSchema security", () => {
  const FeatureSchema = createFeatureSchema(5);

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
});
