"use client";
import DialogueGenereted from "@/components/dialogGenereted/DialogueGenereted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateDialogByMistral } from "@/lib/actions/dialog-actions";
import { useState } from "react";

export interface DialogueMessage {
  personnage: string;
  message: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loaging, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [arrayDialogue, setArrayDialogue] = useState<DialogueMessage[]>([]);

  const generateDialogue = async () => {
    setLoading(true);
    try {
      const dialog = await generateDialogByMistral(prompt);
      const jsonMatch = dialog?.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : null;
      setArrayDialogue(JSON.parse(jsonString!));
      setLoading(false);
    } catch (error) {
      setError(`An error occurred while generating the dialogue ${error}`);
      setLoading(false);
      return;
    }
  };
  return (
    <div className="h-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="h-full">
        <h1 className="text-3xl font-sans">Generate dialog</h1>
        <Input
          type="text"
          placeholder="Tape (ex: hobby, humain beavior)"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          onClick={generateDialogue}
          disabled={loaging || !prompt}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          {loaging ? "Generating..." : "Generate"}
        </Button>
        <DialogueGenereted dialogue={arrayDialogue} />
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
