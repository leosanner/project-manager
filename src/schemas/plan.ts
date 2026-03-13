import { z } from "zod";

export const CreatePlanSchema = z.object({
  plantype: z.enum(["FREE", "PREMIUM", "PRO"]),
  maxProjects: z.coerce
    .number()
    .int("Max projects must be an integer")
    .min(1, "Max projects must be at least 1"),
  maxFeatures: z.coerce
    .number()
    .int("Max features must be an integer")
    .min(1, "Max features must be at least 1"),
  maxDocuments: z.coerce
    .number()
    .int("Max documents must be an integer")
    .min(1, "Max documents must be at least 1"),
  price: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0"),
});
