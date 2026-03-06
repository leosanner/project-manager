"use server";

import { getUser } from "@/lib/auth/session";
import { FeatureService } from "@/model/feature";
import { createFeatureSchema, UpdateFeatureMarkdownSchema } from "@/schemas/feature";
import { validadeSchema } from "@/utils/schemas";
import { revalidatePath } from "next/cache";
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
  const formObject = Object.fromEntries(formData);
  const validatedObj = validadeSchema(UpdateFeatureMarkdownSchema.pick({
    featureId: true,
    projectId: true,
  }), formObject);

  if (!validatedObj.success) {
    return {
      success: false,
      errors: {
        internalServerError: ["Invalid feature or project"],
      },
    };
  }
  const parsedObj = UpdateFeatureMarkdownSchema.pick({
    featureId: true,
    projectId: true,
  }).parse(formObject);

  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const featureService = new FeatureService();

  try {
    const featureDeleted = await featureService.deleteFeature(
      user.id,
      parsedObj.featureId,
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

  redirect(`/project/${parsedObj.projectId}`);
}

type UpdateFeatureMarkdownAction = {
  success: boolean;
  errors?: Record<string, string[]>;
  submittedAt?: number;
};

export async function updateFeatureMarkdownAction(
  _prevState: UpdateFeatureMarkdownAction,
  formData: FormData,
): Promise<UpdateFeatureMarkdownAction> {
  const formObject = Object.fromEntries(formData);
  const validatedObj = validadeSchema(UpdateFeatureMarkdownSchema, formObject);

  if (!validatedObj.success) {
    return validatedObj;
  }

  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const parsedObj = UpdateFeatureMarkdownSchema.parse(formObject);
  const featureService = new FeatureService();

  try {
    const updatedFeature = await featureService.updateMarkdownContent(
      parsedObj.markdownContent,
      parsedObj.featureId,
      user.id,
    );

    if (!updatedFeature) {
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
        internalServerError: ["Internal server error updating markdown"],
      },
    };
  }

  revalidatePath(`/project/${parsedObj.projectId}/${parsedObj.featureId}`);

  return {
    success: true,
    submittedAt: Date.now(),
  };
}
