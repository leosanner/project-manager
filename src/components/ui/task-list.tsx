"use client";

import * as React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useActionState } from "react";
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

export interface Feature {
  id: number | string;
  name: string;
  completed: boolean;
  updatedAt: string;
  deadline: string;
  href?: string;
}

export interface TaskListProps {
  title?: string;
  features: Feature[];
  projectId?: string;
}

const CompletedBadge = ({ completed }: { completed: boolean }) => {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        completed
          ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400"
      }`}
    >
      {completed ? "Completed" : "In Progress"}
    </span>
  );
};

export const TaskList = ({
  title = "Feature List",
  features,
  projectId,
}: TaskListProps) => {
  const hasDeleteAction = Boolean(projectId);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="w-12 p-4 font-medium text-muted-foreground"
              >
                No
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Name
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Completed
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Updated At
              </th>
              <th
                scope="col"
                className="p-4 text-right font-medium text-muted-foreground"
              >
                Deadline
              </th>
              {hasDeleteAction && (
                <th
                  scope="col"
                  className="w-16 p-4 text-right font-medium text-muted-foreground"
                >
                  {""}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.id}
                className="border-b border-border last:border-none hover:bg-muted/50"
              >
                <td className="p-4 text-muted-foreground">{index + 1}</td>
                <td className="p-4 font-medium">
                  {feature.href ? (
                    <Link
                      href={feature.href}
                      className="underline-offset-4 hover:underline hover:text-cyan-400 transition-colors"
                    >
                      {feature.name}
                    </Link>
                  ) : (
                    feature.name
                  )}
                </td>
                <td className="p-4">
                  <CompletedBadge completed={feature.completed} />
                </td>
                <td className="p-4 text-muted-foreground">
                  {feature.updatedAt}
                </td>
                <td className="p-4 text-right text-muted-foreground">
                  {feature.deadline}
                </td>
                {hasDeleteAction && projectId && (
                  <td className="p-4 text-right">
                    <DeleteFeatureInlineForm
                      projectId={projectId}
                      featureId={Number(feature.id)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

type DeleteFeatureInlineFormProps = {
  projectId: string;
  featureId: number;
};

const DeleteFeatureInlineForm = ({
  projectId,
  featureId,
}: DeleteFeatureInlineFormProps) => {
  const [state, formAction, isPending] = useActionState(deleteFeatureAction, {
    success: true,
  });
  const formId = `delete-feature-inline-${projectId}-${featureId}`;

  return (
    <form id={formId} action={formAction} className="flex items-center justify-end gap-2">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="featureId" value={featureId} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            disabled={isPending}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-red-400/50 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Delete feature"
            title="Delete feature"
          >
            <Trash2 size={16} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete feature?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this feature and its markdown content.
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
};
