import { DialogueMessage } from "@/app/page";
import { cn } from "@/lib/utils";
import CopyButton from "../copyButton/CopyButton";

type DialogueGeneretedProps = {
  dialogue: DialogueMessage[];
};

export default function DialogueGenereted({
  dialogue,
}: DialogueGeneretedProps) {
  const textToCopy = dialogue
    .map((dialog) => `${dialog.personnage}: ${dialog.message}`)
    .join("\n");

  return (
    <div
      className={cn(
        "w-full lg:w-[600px] flex flex-col gap-1 p-3 border border-gray-500/30 bg-gray-500/10 rounded-sm my-4",
        dialogue.length === 0 && "hidden"
      )}
    >
      <div className="flex justify-end">
        <CopyButton textToCopy={textToCopy} />
      </div>
      {dialogue?.map((dialog, index) => (
        <div key={index} className="mt-4">
          <p className="text-white">
            <span className="font-bold">{dialog.personnage}:</span>{" "}
            <span className="font-extralight">{dialog.message}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
