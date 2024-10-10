"use server";
import { Mistral } from "@mistralai/mistralai";
import { OpenAI } from "openai";
import prisma from "../prisma/prisma";

const openAiKey = process.env.OPENAI_API_KEY;
const apiKey = process.env.MISTRAL_API_KEY;
if (!openAiKey) {
  throw new Error("API_KEY environment variable is required");
}
const openAi = new OpenAI({ apiKey: openAiKey });
const client = new Mistral({ apiKey: apiKey });

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

export const generateDialogByMistral = async (
  prompt: string,
  model: string,
  language: string
) => {
  const response = await client.chat.complete({
    model: model,
    messages: [
      {
        role: "system",
        content: `You are a screenwriter who writes a long dialogue between two people. 
        dialog is about ${prompt} and the language is ${language},
        generate the content in JSON format. 
        follow this interface : interface DialogueMessage {personnage: string;message: string;}`,
      },
    ],
  });

  return response?.choices?.[0].message.content;
};

export const saveDialog = async (
  userId: string,
  title: string,
  iAModel: string,
  language: string,
  content: string
) => {
  console.log("helo");
  const dialog = await prisma.dialog.create({
    data: {
      title,
      iAModel,
      content,
      language,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return dialog;
};
