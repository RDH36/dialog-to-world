import { mistral } from "@ai-sdk/mistral";
import { generateText } from "ai";

export const generateTitle = async ({
  language,
  dialogue,
}: {
  language: string;
  dialogue: string;
}) => {
  const result = await generateText({
    model: mistral("mistral-large-latest"),
    system: `context:
        You are Title Generator, an application that takes a conversation and generates a perfect title.
        You are an expert of SEO to create a title that will be clicked by the reader and perfect for the conversation.
        
        Goal: 
        You need to create the perfect title for the conversation.
        
        Criteria: 
        - The title must be catchy and SEO friendly.
        - The title must be related to the content of the converstion.
        - The title must be short and easy to read 60 caractere maximun.
        - The title MUST include the main points of the conversation.
        - you never add the word "summary" in the title.
        - you never add " or ' in the title, you only return the title in plain text.
        - you never add " around the title you ONLY return the title in plain text.
        - The title dont include any ascii characters like : or " or ', ONLY PLAIN TEXT.
        - you never add : in the title.
        - the title must be in ${language} language.`,
    prompt: dialogue,
  });

  const title = result.text;
  if (!title) {
    throw new Error("Failed to generate the title");
  }

  return title;
};
