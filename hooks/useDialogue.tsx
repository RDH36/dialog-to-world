"use client";
import { Dialog } from "@/components/dialogGenereted/DialogueGenereted";
import { useEffect, useState } from "react";
import { concatenateAudioFiles, synthesizeSpeech } from "../lib/googleTTS";

export const useDialogue = (dialogue: Dialog[]) => {
  const [audioPath, setAudioPath] = useState<string | null>(null);

  useEffect(() => {
    const generateSpeech = async () => {
      const paths = await Promise.all(
        dialogue.map(async (msg, index) => {
          const voiceName =
            index % 2 === 0 ? "en-US-Wavenet-D" : "en-US-Wavenet-F";
          return await synthesizeSpeech(msg.message, voiceName);
        })
      );

      const outputFilePath = `./public/audio/dialogue-${Date.now()}.mp3`;
      await concatenateAudioFiles(paths, outputFilePath);
      setAudioPath(outputFilePath.replace("./public", ""));
    };

    generateSpeech();
  }, [dialogue]);

  return audioPath;
};
