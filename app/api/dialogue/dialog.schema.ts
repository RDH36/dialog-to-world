import { Level } from "@prisma/client";
import { z } from "zod";
import { LANGUAGES } from "./dialog.const";

export const dialogueSchema = z.object({
  dialogue: z.array(
    z.object({
      message: z
        .string()
        .describe("you write a long response for the conversation."),
      personnage: z.string().describe("Name of a fictional person."),
    })
  ),
});

export const vocabularySchema = z.object({
  vocabulaire: z.array(
    z.object({
      word: z.string().describe("take the complicated word."),
      definition: z
        .string()
        .describe("Give good and comprehensible definition of word."),
      example: z.string().describe("Give exemple of the word in a sentence."),
    })
  ),
});

export const dialogueInputSchema = z.object({
  theme: z.string().min(2, {
    message: "Theme must be at least 2 characters.",
  }),
  language: z.enum(Object.keys(LANGUAGES) as [keyof typeof LANGUAGES], {
    required_error: "Please select a language.",
  }),
  level: z.nativeEnum(Level, {
    required_error: "Please select a language level.",
  }),
  character1Personality: z.string({
    required_error: "Please select a personality for Character 1.",
  }),
  character2Personality: z.string({
    required_error: "Please select a personality for Character 2.",
  }),
});

export type DialogueInput = z.infer<typeof dialogueInputSchema>;
export type Dialogue = z.infer<typeof dialogueSchema>;
export type Vocabulary = z.infer<typeof vocabularySchema>;
