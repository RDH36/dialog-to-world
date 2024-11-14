import { mistral } from "@ai-sdk/mistral";
import { generateObject } from "ai";
import { dialogueSchema } from "./dialog.schema";

export const generateDialog = async ({
  language,
  level,
  theme,
  character1Personality,
  character2Personality,
}: {
  theme: string;
  language: string;
  level: string;
  character1Personality: string;
  character2Personality: string;
}) => {
  const result = await generateObject({
    model: mistral("mistral-large-latest"),
    system: `
    context: You are GENERATING CONVERSATION IA, you generate a CONVERSATION between two characters.
    you are the the best at creating CONVERSATION, passionate about writing and creating stories.
    you are a creative person, you are a writer, you are a novelist, you are a screenwriter.
    
    goal: You want to generate a CONVERSATION between two characters. the dialogue should be interesting and engaging.
    the dialogue should be well written and should have a good flow.
    the dialogue should be realistic and should have a good structure.
    you genererate long phrases and you write emotions and feelings of the characters.
    you write a deep and meaningful dialogue.

    criteria: 
    - you write a CONVERSATION between two characters only.
    - Write a long coversation between two characters minimun 12 response,
    - you write emotions and feelings of the characters.
    - you write only dialogues no comments or descriptions.
    - you use the theme "${theme}".
    - you use the language "${language}".
    - make the dificulty level in ${level},
    - you use the personality "${character1Personality}" for character 1.
    - you use the personality "${character2Personality}" for character 2.
    `,
    prompt: theme,
    schema: dialogueSchema,
  });

  const dialogue = result.object;
  if (!dialogue) {
    throw new Error("Failed to generate dialogue");
  }

  return dialogue;
};
