"use client";

import { deleteProjectAction } from "@/app/actions/project";
import DisplayErrors from "@/components/display-errors";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

type DeleteProjectFormProps = {
  projectId: string;
};

export default function DeleteProjectForm({ projectId }: DeleteProjectFormProps) {
  const [state, formAction, isPending] = useActionState(deleteProjectAction, {
    success: true,
  });

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Delete this project? All features and their markdown content will be deleted.",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="space-y-2"
    >
      <input type="hidden" name="projectId" value={projectId} />
      <Button
        type="submit"
        variant="destructive"
        className="border border-red-400/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete project"}
      </Button>

      {state.errors && (
        <>
          <DisplayErrors errors={state.errors} fieldName="projectId" />
          <DisplayErrors
            errors={state.errors}
            fieldName="internalApplicationError"
          />
        </>
      )}
    </form>
  );
}
