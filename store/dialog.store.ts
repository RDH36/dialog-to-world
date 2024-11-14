import { create } from "zustand";

export type DialogueMessage = {
  personnage: string;
  message: string;
};

type dialogueStore = {
  dialogue: DialogueMessage[];
  setDialogue: (dialogue: DialogueMessage[]) => void;
  addDialogue: (dialogue: DialogueMessage) => void;
};

export const useDialogStore = create<dialogueStore>((set) => ({
  dialogue: [],
  setDialogue: (dialogue: DialogueMessage[]) => set({ dialogue }),
  addDialogue: (dialogue: DialogueMessage) =>
    set((state) => ({ dialogue: [...state.dialogue, dialogue] })),
  clearDialogue: () => set({ dialogue: [] }),
}));
