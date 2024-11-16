import { requireAuth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import { dialogueInputSchema } from "./dialog.schema";
import { generateDialog } from "./generate-dilaogue";
import { generateTitle } from "./generate-title";
import { generateVocabulary } from "./generate-vocabulaire";
import { formattedTitle } from "./id-title-unique";

export async function POST(req: Request) {
  const response = await req.json();
  const user = await requireAuth();
  const body = dialogueInputSchema.parse(response);

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

  if (!dialogue || !vocabulary || !title) {
    return NextResponse.json({ error: "Error generation" }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const dialog = await prisma.dialog.create({
    data: {
      id: formattedTitle(title),
      title: title,
      content: JSON.stringify(dialogue),
      vocabulary: JSON.stringify(vocabulary),
      level: body.level,
      language: body.language,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  if (!dialog) {
    return NextResponse.json(
      { error: "dialogue can't saved" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      dialog,
    },
    { status: 200 }
  );
}
