"use server";
import { getUser } from "@/lib/auth/session";
import { ProjectService } from "@/model/project";
import { ProjectSchema } from "@/schemas/project";
import { validadeSchema } from "@/utils/schemas";
import { redirect } from "next/navigation";

type CreateProjectAction = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function createProjectAction(
  prevState: CreateProjectAction,
  formData: FormData,
): Promise<CreateProjectAction> {
  const formObject = Object.fromEntries(formData);
  const validateResult = validadeSchema(ProjectSchema, formObject);

  if (!validateResult.success) {
    return validateResult;
  }

  const parsedForm = ProjectSchema.parse(formObject);
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const projectService = new ProjectService();

  try {
    await projectService.createProject({ ...parsedForm, authorId: user.id });
  } catch (err) {
    console.log(err);
    return {
      success: false,
      errors: {
        internalApplicationError: ["internal error"],
      },
    };
  }
  redirect("/home");
}
