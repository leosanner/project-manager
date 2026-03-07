"use server";

import { AdminModel } from "@/model/admin";
import { CreatePlanSchema } from "@/schemas/plan";
import { validadeSchema } from "@/utils/schemas";
import { revalidatePath } from "next/cache";

type CreatePlanAction = {
  success: boolean;
  submittedAt?: number;
  errors?: Record<string, string[]>;
};

export async function createPlanAction(
  _prevState: CreatePlanAction,
  formData: FormData,
): Promise<CreatePlanAction> {
  const formObject = Object.fromEntries(formData);
  const validatedSchema = validadeSchema(CreatePlanSchema, formObject);

  if (!validatedSchema.success) {
    return validatedSchema;
  }

  const parsedForm = CreatePlanSchema.parse(formObject);
  const adminModel = new AdminModel();

  try {
    const createdPlan = await adminModel.createNewPlan(parsedForm);

    if (!createdPlan) {
      return {
        success: false,
        errors: {
          internalServerError: ["Only admins can create plans"],
        },
      };
    }
  } catch {
    return {
      success: false,
      errors: {
        internalServerError: ["Internal server error creating plan"],
      },
    };
  }

  revalidatePath("/admin");

  return {
    success: true,
    submittedAt: Date.now(),
  };
}
