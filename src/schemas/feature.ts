import z from "zod";

const setDayInterval = (numDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + numDays);
  return date;
};

export const createFeatureSchema = (numDays: number) => {
  return z.object({
    description: z
      .string()
      .trim()
      .min(5, "Description must be at least 5 characters long")
      .max(1000, "Description must have at most 1000 characters")
      .refine((value) => !/[<>]/.test(value), {
        message: "Description contains invalid characters",
      }),
    deadline: z.coerce.date().default(setDayInterval(numDays)),
    projectId: z.uuid("Project ID must be a valid UUID"),
  });
};
