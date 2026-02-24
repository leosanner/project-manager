import z from "zod";

export const ProjectSchema = z.object({
  name: z.string(),
});
