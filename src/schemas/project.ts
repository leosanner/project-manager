import z from "zod";

export const ProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters long")
    .max(120, "Project name must have at most 120 characters")
    .refine((value) => !/[<>]/.test(value), {
      message: "Project name contains invalid characters",
    }),
});
