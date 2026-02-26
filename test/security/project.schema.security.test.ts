import { ProjectSchema } from "@/schemas/project";

describe("ProjectSchema security", () => {
  it("rejects script tag payloads in project name", () => {
    const parsed = ProjectSchema.safeParse({
      name: "<script>alert('xss')</script>",
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects blank or whitespace-only names", () => {
    const parsed = ProjectSchema.safeParse({
      name: "   ",
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts a normal project name", () => {
    const parsed = ProjectSchema.safeParse({
      name: "Project Manager SaaS",
    });

    expect(parsed.success).toBe(true);
  });
});
