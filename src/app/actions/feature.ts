"use server";

import { FeatureModel } from "@/model/feature";
import { createFeatureSchema } from "@/schemas/feature";
import { validadeSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";

type CreateFeatureAction = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function createFeatureAction(
  prevState: CreateFeatureAction,
  formData: FormData,
): Promise<CreateFeatureAction> {
  const featureSchema = createFeatureSchema(5);
  const formObject = Object.fromEntries(formData);
  const schemaValidated = validadeSchema(featureSchema, formObject);

  if (!schemaValidated.success) {
    return schemaValidated;
  }

  const featureModel = new FeatureModel();
  const parsedObj = featureSchema.parse(formObject);

  try {
    await featureModel.createFeature(parsedObj);
  } catch (error) {
    return {
      success: false,
      errors: {
        internalServerError: ["Internal server error creating feature"],
      },
    };
  }

  redirect(`/project/${parsedObj.projectId}`);
}
