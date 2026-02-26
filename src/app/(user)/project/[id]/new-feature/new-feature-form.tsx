"use client";

import { createFeatureAction } from "@/app/actions/feature";
import DisplayErrors from "@/components/display-errors";
import { Button } from "@/components/ui/button";
import { CalendarScheduler } from "@/components/ui/calendar-scheduler";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import Link from "next/link";
import { useActionState, useState } from "react";

type NewFeatureFormProps = {
  projectId: string;
};

export default function NewFeatureForm({ projectId }: NewFeatureFormProps) {
  const [state, formAction, isPending] = useActionState(createFeatureAction, {
    success: true,
  });
  const [deadline, setDeadline] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  return (
    <section className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div
          className="rounded-2xl bg-[#0A0A0A] p-6 md:p-8"
          style={{ border: "1px solid rgba(255, 255, 255, 0.18)" }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Create New Feature
            </h1>
            <p className="mt-2 text-sm text-[#C7CCD6] md:text-base">
              Add a feature with a clear description and deadline.
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="deadline" value={deadline} />

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[#C7CCD6]"
              >
                Feature description
              </label>
              <Input
                id="description"
                name="description"
                placeholder="Ex: Build proposal versioning workflow"
                required
                minLength={5}
                className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white placeholder:text-[#7E8591]"
              />
              {state.errors && (
                <DisplayErrors errors={state.errors} fieldName="description" />
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#C7CCD6]">
                Deadline
              </label>
              <CalendarScheduler
                onConfirm={(value) => {
                  if (!value.date) {
                    setDeadline("");
                    setSelectedTime(undefined);
                    return;
                  }
                  setDeadline(format(value.date, "yyyy-MM-dd"));
                  setSelectedTime(value.time);
                }}
              />
              <Input
                value={deadline}
                readOnly
                placeholder="No deadline selected"
                className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white"
              />
              {selectedTime && (
                <p className="text-xs text-[#7E8591]">
                  Selected time: {selectedTime}
                </p>
              )}
              {state.errors && (
                <DisplayErrors errors={state.errors} fieldName="deadline" />
              )}
            </div>

            {state.errors && (
              <>
                <DisplayErrors errors={state.errors} fieldName="projectId" />
                <DisplayErrors
                  errors={state.errors}
                  fieldName="internalServerError"
                />
              </>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href={`/project/${projectId}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isPending || !deadline}>
                {isPending ? "Creating..." : "Create feature"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
