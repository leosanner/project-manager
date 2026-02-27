"use client";

import { createTaskAction } from "@/app/actions/task";
import DisplayErrors from "@/components/display-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

type NewTaskFormProps = {
  projectId: string;
  featureId: number;
};

export default function NewTaskForm({ projectId, featureId }: NewTaskFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createTaskAction, {
    success: false,
    projectId,
    featureId,
  });

  useEffect(() => {
    if (!state.success || !state.submittedAt) return;
    formRef.current?.reset();
    router.refresh();
  }, [router, state.success, state.submittedAt]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-xl border border-white/20 bg-[#0A0A0A] p-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#C7CCD6]"
        >
          Task description
        </label>
        <Input
          id="description"
          name="description"
          placeholder="Ex: Add version history endpoint"
          minLength={2}
          required
          className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white placeholder:text-[#7E8591]"
        />
        {state?.errors && (
          <DisplayErrors errors={state.errors} fieldName="description" />
        )}
      </div>

      {state?.errors && (
        <>
          <DisplayErrors errors={state.errors} fieldName="featureId" />
          <DisplayErrors errors={state.errors} fieldName="projectId" />
          <DisplayErrors errors={state.errors} fieldName="internalServerError" />
        </>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create task"}
        </Button>
      </div>
    </form>
  );
}
