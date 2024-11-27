"use server";

import { requireAuth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import { Feedback } from "@prisma/client";
import { FeedbackInput } from "./feedback.schema";

export async function createFeedback(
  data: FeedbackInput
): Promise<Feedback | { error: string }> {
  const user = await requireAuth();

  if (!user) {
    return {
      error: "You must be logged in to submit feedback.",
    };
  }
  const feedback = await prisma.feedback.create({
    data: {
      type: data.type,
      message: data.message,
      userId: user.id as string,
    },
  });
  return feedback;
}
