import z from "zod";

export const CreateTaskSchema = z.object({
  description: z.string().trim().min(2),
});
