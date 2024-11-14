"use server";
import { promtDialog } from "@/promptAI/prompt";
import { mistral } from "@ai-sdk/mistral";
import { generateObject } from "ai";
import { OpenAI } from "openai";
import { z } from "zod";

const openAiKey = process.env.OPENAI_API_KEY;
if (!openAiKey) {
  throw new Error("API_KEY environment variable is required");
}
const openAi = new OpenAI({ apiKey: openAiKey });

export const generateDialog = async (prompt: string) => {
  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a screenwriter who creates a dialogue between two people.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 150,
  });

  return response.choices[0].message.content;
};

export async function mistralDialog(
  prompt: string,
  model: string,
  language: string,
  level: string
) {
  const content = promtDialog(prompt, language, level);
  const {
    object: dialogue,
    finishReason,
    usage,
  } = await generateObject({
    model: mistral("mistral-large-latest"),
    system: "You are a great screenwriter who has writting multiple dialogue.",
    prompt: content,
    schema: z.object({
      dialogue: z.array(
        z.object({
          message: z.string().describe("write long phrase."),
          personnage: z.string().describe("Name of a fictional person."),
        })
      ),
    }),
  });

  return { dialogue, finishReason, usage };
}
