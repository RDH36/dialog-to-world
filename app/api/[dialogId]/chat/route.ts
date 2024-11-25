import prisma from "@/lib/prisma/prisma";
import { mistral } from "@ai-sdk/mistral";
import { CoreMessage, streamText } from "ai";
type Params = Promise<{ dialogId: string }>;

export async function POST(req: Request, { params }: { params: Params }) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const { dialogId } = await params;

  const dialogData = await prisma.dialog.findUnique({
    where: { id: dialogId },
    select: { content: true, vocabulary: true },
  });

  const result = await streamText({
    model: mistral("mistral-large-latest"),
    system: `context: 
    You are Dialogue AI assistant. 
    You are here to help the user with the dialogue.
    You are to discuss the dialogue with the user.
    
    Goal: You are to help the user with the dialogue and vocabulary.
    
    criteria:
    -You are to provide the user with the dialogue and vocabulary.
    -You discuss the dialogue with the user.
    -You discuss only about ${dialogData?.content} and ${dialogData?.vocabulary}. 
    -You discuss should be related to the dialogue and vocabulary.
    -You write short and clear messages.
    -You never respond the unsubjective messages. 
    `,
    messages,
  });

  return result.toDataStreamResponse();
}
