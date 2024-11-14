import { Dialog } from "@/components/dialogGenereted/DialogueGenereted";
import { useMemo } from "react";

export const useParty = (dialogue: Dialog[]) => {
  const participants = useMemo(() => {
    const uniqueParticipants = Array.from(
      new Set(dialogue.map((msg) => msg.personnage))
    );
    return uniqueParticipants.reduce((acc, participant, index) => {
      acc[participant] = {
        color:
          index % 2 === 0
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        alignment: index % 2 === 0 ? "items-start" : "items-end",
        messageAlignment: index % 2 === 0 ? "order-2" : "order-1",
      };
      return acc;
    }, {} as Record<string, { color: string; alignment: string; messageAlignment: string }>);
  }, [dialogue]);
  return { participants };
};
