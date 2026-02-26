"use server";
import { validadeSchema } from "@/utils/schemas";
import { LoginSchema } from "@/schemas/auth";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import { APIError } from "better-auth";

type LoginAction = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function loginAction(
  prevState: LoginAction,
  formData: FormData,
): Promise<LoginAction> {
  const formObject = Object.fromEntries(formData);
  const validateResult = validadeSchema(LoginSchema, formObject);

  if (!validateResult.success) {
    return validateResult;
  }

  const parsedForm = LoginSchema.parse(formObject);

  try {
    await auth.api.signInEmail({
      body: {
        email: parsedForm.email,
        password: parsedForm.password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        errors: {
          betterAuth: [error.message],
        },
      };
    }
    throw error;
  }

  redirect("/");
}
