"use client";

import { createProjectAction } from "@/app/actions/project";
import DisplayErrors from "@/components/display-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";

export default function NewProject() {
  const [state, formAction, isPending] = useActionState(createProjectAction, {
    success: true,
  });

  return (
    <section className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div
          className="rounded-2xl bg-[#0A0A0A] p-6 md:p-8"
          style={{ border: "1px solid rgba(255, 255, 255, 0.18)" }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Create New Project
            </h1>
            <p className="mt-2 text-sm text-[#C7CCD6] md:text-base">
              Give your project a clear name. You can add features and tasks
              after creation.
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#C7CCD6]"
              >
                Project name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Project Manager SaaS"
                required
                minLength={1}
                className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white placeholder:text-[#7E8591]"
              />
              {state.errors && (
                <DisplayErrors errors={state.errors} fieldName="name" />
              )}
            </div>

            {state.errors && (
              <DisplayErrors
                errors={state.errors}
                fieldName="internalApplicationError"
              />
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href="/home">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create project"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
