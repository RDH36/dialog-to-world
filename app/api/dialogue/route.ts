import { NextResponse } from "next/server";
import { DialogueInput } from "./dialog.schema";
import { generateDialog } from "./generate-dilaogue";
import { generateTitle } from "./generate-title";
import { generateVocabulary } from "./generate-vocabulaire";

export async function POST(req: Request) {
  const body: DialogueInput = await req.json();

  const dialogue = await generateDialog({ ...body });
  const dialogString = JSON.stringify(dialogue);
  const vocabulary = await generateVocabulary({
    dialogue: dialogString,
    language: body.language,
  });
  const title = await generateTitle({
    language: body.language,
    dialogue: dialogString,
  });

  console.log(dialogue);
  console.log(vocabulary);
  console.log(title);

  return NextResponse.json("ok");
}
