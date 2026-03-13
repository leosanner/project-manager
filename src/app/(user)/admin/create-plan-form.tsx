"use client";

import { createPlanAction } from "@/app/actions/admin";
import DisplayErrors from "@/components/display-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

export default function CreatePlanForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPlanAction, {
    success: false,
  });

  useEffect(() => {
    if (!state.success || !state.submittedAt) return;

    formRef.current?.reset();
    router.refresh();
  }, [router, state.success, state.submittedAt]);

  return (
    <article className="rounded-xl border border-white/15 bg-[#0A0A0A] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Create Plan</h2>
        <p className="mt-1 text-sm text-[#C7CCD6]">
          Create subscription plans that define workspace limits and pricing.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="plantype" className="text-sm text-[#C7CCD6]">
            Plan type
          </label>
          <select
            id="plantype"
            name="plantype"
            defaultValue="FREE"
            className="h-11 w-full rounded-md border border-[rgba(255,255,255,0.18)] bg-black px-3 text-sm text-white"
          >
            <option value="FREE">FREE</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="PRO">PRO</option>
          </select>
          {state.errors && (
            <DisplayErrors errors={state.errors} fieldName="plantype" />
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="maxProjects" className="text-sm text-[#C7CCD6]">
              Max projects
            </label>
            <Input
              id="maxProjects"
              name="maxProjects"
              type="number"
              min={1}
              required
              className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white"
            />
            {state.errors && (
              <DisplayErrors errors={state.errors} fieldName="maxProjects" />
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="maxFeatures" className="text-sm text-[#C7CCD6]">
              Max features
            </label>
            <Input
              id="maxFeatures"
              name="maxFeatures"
              type="number"
              min={1}
              required
              className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white"
            />
            {state.errors && (
              <DisplayErrors errors={state.errors} fieldName="maxFeatures" />
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="maxDocuments" className="text-sm text-[#C7CCD6]">
              Max documents
            </label>
            <Input
              id="maxDocuments"
              name="maxDocuments"
              type="number"
              min={1}
              required
              className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white"
            />
            {state.errors && (
              <DisplayErrors errors={state.errors} fieldName="maxDocuments" />
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm text-[#C7CCD6]">
              Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              step="0.01"
              required
              className="h-11 border-[rgba(255,255,255,0.18)] bg-black text-white"
            />
            {state.errors && <DisplayErrors errors={state.errors} fieldName="price" />}
          </div>
        </div>

        {state.errors && (
          <DisplayErrors errors={state.errors} fieldName="internalServerError" />
        )}

        {state.success && (
          <p className="text-sm text-green-300">Plan created successfully.</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create plan"}
          </Button>
        </div>
      </form>
    </article>
  );
}
