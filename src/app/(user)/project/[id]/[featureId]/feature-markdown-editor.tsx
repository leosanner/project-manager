"use client";

import { updateFeatureMarkdownAction } from "@/app/actions/feature";
import DisplayErrors from "@/components/display-errors";
import { Button } from "@/components/ui/button";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  ListsToggle,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useActionState, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type FeatureMarkdownEditorProps = {
  projectId: string;
  featureId: number;
  initialMarkdown: string;
};

export default function FeatureMarkdownEditor({
  projectId,
  featureId,
  initialMarkdown,
}: FeatureMarkdownEditorProps) {
  const [state, formAction, isPending] = useActionState(
    updateFeatureMarkdownAction,
    { success: true },
  );
  const [isEditing, setIsEditing] = useState(false);
  const [savedMarkdown, setSavedMarkdown] = useState(initialMarkdown);
  const [draftMarkdown, setDraftMarkdown] = useState(initialMarkdown);
  const [editorSessionKey, setEditorSessionKey] = useState(0);
  const latestDraftRef = useRef(draftMarkdown);

  useEffect(() => {
    latestDraftRef.current = draftMarkdown;
  }, [draftMarkdown]);

  useEffect(() => {
    setSavedMarkdown(initialMarkdown);
    setDraftMarkdown(initialMarkdown);
  }, [initialMarkdown]);

  useEffect(() => {
    if (!state.success || !state.submittedAt) {
      return;
    }
    setSavedMarkdown(latestDraftRef.current);
    setIsEditing(false);
  }, [state.submittedAt, state.success]);

  if (!isEditing) {
    return (
      <section className="space-y-4 rounded-xl border border-white/20 bg-[#0A0A0A] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">Feature Content</h2>
          <Button
            type="button"
            onClick={() => {
              setDraftMarkdown(savedMarkdown);
              setEditorSessionKey((prev) => prev + 1);
              setIsEditing(true);
            }}
          >
            Edit markdown
          </Button>
        </div>
        <div className="feature-markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {savedMarkdown}
          </ReactMarkdown>
        </div>
      </section>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-xl border border-white/20 bg-[#0A0A0A] p-5"
    >
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="featureId" value={featureId} />
      <input type="hidden" name="markdownContent" value={draftMarkdown} />

      <div className="space-y-2">
        <label
          htmlFor="markdown-editor"
          className="block text-sm font-medium text-[#C7CCD6]"
        >
          Markdown content
        </label>
        <textarea
          id="markdown-editor"
          hidden
          readOnly
          value={draftMarkdown}
        />
        <div className="rounded-md border border-[rgba(255,255,255,0.18)] bg-black p-2">
          <MDXEditor
            key={editorSessionKey}
            markdown={savedMarkdown}
            onChange={setDraftMarkdown}
            contentEditableClassName="feature-markdown-content min-h-[300px] px-2 py-1 text-sm text-white"
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              tablePlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarClassName: "mdx-toolbar-row",
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <ListsToggle options={["bullet", "number", "check"]} />
                    <BlockTypeSelect />
                    <CreateLink />
                  </>
                ),
              }),
            ]}
          />
        </div>
      </div>

      {state.errors && (
        <>
          <DisplayErrors errors={state.errors} fieldName="markdownContent" />
          <DisplayErrors errors={state.errors} fieldName="featureId" />
          <DisplayErrors errors={state.errors} fieldName="projectId" />
          <DisplayErrors errors={state.errors} fieldName="internalServerError" />
        </>
      )}

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
