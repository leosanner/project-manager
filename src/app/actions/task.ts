"use server";

import { ProjectService } from "@/model/project";
import { success } from "zod";

const internalError = {
  internalServerError: ["Invalid project and feature"],
};

export async function createTaskAction(
  prevState: {
    success: boolean;
    projectId?: string;
    featureId?: number;
    errors?: Record<string, string[]>;
  },
  formData: FormData,
) {
  if (!prevState.projectId || !prevState.featureId) {
    return {
      success: false,
      errors: {
        ...internalError,
      },
    };
  }

  const projectModel = new ProjectService();
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
      ...internalError,
    };
  }
  // validar schema do form
  // criar a task
  // retornar
}
