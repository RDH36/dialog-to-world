"use client";

import { cn } from "@/lib/utils";
import { useDialogStore } from "@/store/dialog.store";
import React, { useEffect } from "react";
import CopyButton from "../copyButton/CopyButton";

type DialogueGeneretedProps = {
  saveButton?: React.ReactNode;
};

export default function DialogueGenereted({
  saveButton,
}: DialogueGeneretedProps) {
  const { dialogue, setDialogue } = useDialogStore();
  useEffect(() => {
    setDialogue(JSON.parse(localStorage.getItem("dialogue") as string));
  }, [setDialogue]);
  const textToCopy = dialogue
    .map((dialog) => `${dialog.personnage}: ${dialog.message}`)
    .join("\n");
  return (
    <div
      className={cn(
        "w-full lg:w-[750px] flex flex-col gap-1 p-3 border border-gray-500/30 bg-gray-500/10 rounded-sm my-4",
        dialogue.length === 0 && "hidden"
      )}
    >
      <div className="flex gap-2 justify-end">
        <CopyButton textToCopy={textToCopy} />
        {saveButton}
      </div>
      {dialogue?.map((dialog, index) => (
        <div key={index} className="mt-4">
          <p className="text-white">
            <span className="font-bold">{dialog.personnage}:</span>{" "}
            <span className="font-thin text-sm">{dialog.message}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
