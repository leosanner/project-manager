"use server";

import { getUser } from "@/lib/auth/session";
import { ProjectService } from "@/model/project";
import { TaskModel } from "@/model/task";
import { CreateTaskSchema } from "@/schemas/task";
import { validadeSchema } from "@/utils/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const internalError = {
  internalServerError: ["Invalid project and feature"],
};

export async function createTaskAction(
  prevState: {
    success: boolean;
    projectId?: string;
    featureId?: number;
    submittedAt?: number;
    errors?: Record<string, string[]>;
  },
  formData: FormData,
) {
  const projectModel = new ProjectService();
  const taskModel = new TaskModel();
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (!prevState.projectId || !prevState.featureId) {
    return {
      success: false,
      errors: {
        ...internalError,
      },
    };
  }

  const projectFeatures = await projectModel.getProjectFeatures(
    prevState.projectId,
  );
  if (
    !projectFeatures
      ?.map((feature) => {
        return feature.id;
      })
      .includes(prevState.featureId)
  ) {
    return {
      success: false,
      errors: internalError,
    };
  }
  const formObject = Object.fromEntries(formData);
  const validatedObj = validadeSchema(CreateTaskSchema, formObject);

  if (!validatedObj.success) {
    return {
      ...validatedObj,
      projectId: prevState.projectId,
      featureId: prevState.featureId,
    };
  }

  const featureId = prevState.featureId;
  const authorId = user.id;
  const parsedObj = CreateTaskSchema.parse(formObject);

  try {
    await taskModel.createTask({ ...parsedObj, authorId, featureId });
  } catch {
    return {
      success: false,
      errors: internalError,
      projectId: prevState.projectId,
      featureId: prevState.featureId,
    };
  }

  revalidatePath(`/project/${prevState.projectId}/${prevState.featureId}`);

  return {
    success: true,
    projectId: prevState.projectId,
    featureId: prevState.featureId,
    submittedAt: Date.now(),
  };
}
