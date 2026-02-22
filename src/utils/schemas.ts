import { z } from "zod";

export const validadeSchema = (schema: z.Schema, obj: object) => {
  const { success, error } = schema.safeParse(obj);

  if (success) {
    return {
      success: true,
    };
  }

  const errorsSummary: Record<string, string[]> = {};

  for (const err of error.issues) {
    const fieldName = err.path.at(0);
    if (!fieldName) continue;

    if (!(fieldName in errorsSummary)) {
      errorsSummary[fieldName as string] = [];
    }
    errorsSummary[fieldName as string].push(err.message);
  }

  return {
    success: false,
    errors: errorsSummary,
  };
};
