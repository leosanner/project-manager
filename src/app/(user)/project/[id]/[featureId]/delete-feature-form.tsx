"use client";

import { deleteFeatureAction } from "@/app/actions/feature";
import DisplayErrors from "@/components/display-errors";
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

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Delete this feature and its markdown content?",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="space-y-2"
    >
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="featureId" value={featureId} />
      <Button
        type="submit"
        variant="destructive"
        className="border border-red-400/50 bg-red-500/10 text-red-300 hover:bg-red-500/20"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete feature"}
      </Button>

      {state.errors && (
        <DisplayErrors errors={state.errors} fieldName="internalServerError" />
      )}
    </form>
  );
}
