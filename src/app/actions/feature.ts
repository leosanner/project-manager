"use server";

import { getUser } from "@/lib/auth/session";
import { FeatureService } from "@/model/feature";
import { createFeatureSchema } from "@/schemas/feature";
import { validadeSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";
import { z } from "zod";

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

  const featureModel = new FeatureService();
  const parsedObj = featureSchema.parse(formObject);

  try {
    await featureModel.createFeature(parsedObj);
  } catch {
    return {
      success: false,
      errors: {
        internalServerError: ["Internal server error creating feature"],
      },
    };
  }

  redirect(`/project/${parsedObj.projectId}`);
}

type DeleteFeatureAction = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function deleteFeatureAction(
  _prevState: DeleteFeatureAction,
  formData: FormData,
): Promise<DeleteFeatureAction> {
  const featureId = formData.get("featureId");
  const projectId = formData.get("projectId");
  const parsedFeatureId = z.coerce
    .number()
    .int()
    .positive()
    .safeParse(featureId);
  const parsedProjectId = z.uuid().safeParse(projectId);

  if (!parsedFeatureId.success || !parsedProjectId.success) {
    return {
      success: false,
      errors: {
        internalServerError: ["Invalid feature or project"],
      },
    };
  }

  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const featureService = new FeatureService();

  try {
    const featureDeleted = await featureService.deleteFeature(
      parsedFeatureId.data,
      user.id,
    );

    if (!featureDeleted) {
      return {
        success: false,
        errors: {
          internalServerError: ["Feature not found or not allowed"],
        },
      };
    }
  } catch {
    return {
      success: false,
      errors: {
        internalServerError: ["Internal server error deleting feature"],
      },
    };
  }

  redirect(`/project/${parsedProjectId.data}`);
}
