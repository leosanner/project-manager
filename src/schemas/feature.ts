import z from "zod";

const setDayInterval = (numDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + numDays);
  return date;
};

const coerceDeadlineAsLocalDate = (value: unknown) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "string") {
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;
      return new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0, 0);
    }

    const localDateTimeMatch = value.match(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/,
    );

    if (localDateTimeMatch) {
      const [, year, month, day, hour, minute, second] = localDateTimeMatch;
      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second ?? "0"),
        0,
      );
    }

    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return value;
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
    deadline: z.preprocess(coerceDeadlineAsLocalDate, z.date())
      .default(setDayInterval(numDays))
      .refine((value) => value > new Date(), {
        path: ["date"],
        message: "Deadline must be in the future",
      }),
    projectId: z.uuid("Project ID must be a valid UUID"),
  });
};
