"use client";

import { deleteProjectAction } from "@/app/actions/project";
import DisplayErrors from "@/components/display-errors";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

type DeleteProjectFormProps = {
  projectId: string;
};

export default function DeleteProjectForm({ projectId }: DeleteProjectFormProps) {
  const [state, formAction, isPending] = useActionState(deleteProjectAction, {
    success: true,
  });
  const formId = `delete-project-${projectId}`;

  return (
    <form id={formId} action={formAction} className="space-y-2">
      <input type="hidden" name="projectId" value={projectId} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            className="border border-red-400/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete project"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project, all features, and their
              markdown content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="submit"
              form={formId}
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
