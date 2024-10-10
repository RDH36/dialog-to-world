"use client";

import { useToast } from "@/hooks/use-toast";
import { saveDialog } from "@/lib/actions/dialog-actions";
import { Session } from "next-auth";
import { useState } from "react";
import LoadButton from "../loading/LoadButton";
import { Button } from "../ui/button";

type NewDialogProps = {
  session: Session | null;
  title?: string;
  icon?: React.ReactNode;
};

export default function SaveButton({ session, title, icon }: NewDialogProps) {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  async function handleNewDialog() {
    const content = localStorage.getItem("dialogue") as string;
    const creator = JSON.parse(localStorage.getItem("creator") as string);
    const userId = session?.user.id as string;
    setPending(true);
    try {
      await saveDialog(
        userId,
        creator.prompt,
        creator.model,
        creator.language,
        content
      );
      toast({
        description: "Dialog saved.",
      });
      setPending(false);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  }
  return (
    <Button onClick={handleNewDialog} variant="outline">
      {pending ? (
        <div className="flex gap-1 items-center justify-center">
          <LoadButton type="normal" /> <span className="text-xs">Saving</span>
        </div>
      ) : (
        <div className="flex gap-1 items-center justify-center">
          {icon} <span className="text-xs">{title}</span>
        </div>
      )}
    </Button>
  );
}
