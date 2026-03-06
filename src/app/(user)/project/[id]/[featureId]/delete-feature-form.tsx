"use client";

import { deleteFeatureAction } from "@/app/actions/feature";
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

type DeleteFeatureFormProps = {
  projectId: string;
  featureId: number;
};

export default function DeleteFeatureForm({
  projectId,
  featureId,
}: DeleteFeatureFormProps) {
  const [state, formAction, isPending] = useActionState(deleteFeatureAction, {
    success: true,
  });
  const formId = `delete-feature-${projectId}-${featureId}`;

  return (
    <form id={formId} action={formAction} className="space-y-2">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="featureId" value={featureId} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            className="border border-red-400/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete feature"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete feature?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this feature and its markdown
              content.
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
        <DisplayErrors errors={state.errors} fieldName="internalServerError" />
      )}
    </form>
  );
}
