"use server";

import { requireAuth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { Dialogues } from "./dialog.type";

type UserDialoguesResponse = {
  error?: {
    message: string;
    status: number;
  };
  dialogues?: Dialogues;
};
export const getUserDialogues = async (): Promise<UserDialoguesResponse> => {
  const user = await requireAuth();
  if (!user) {
    return {
      error: {
        message: "Not authorized",
        status: 401,
      },
    };
  }
  const dialogues = await prisma.dialog.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!dialogues) {
    return {
      error: {
        message: "No dialogues found",
        status: 404,
      },
    };
  }

  return {
    dialogues,
  };
};

export const getDialog = async (slug: string) => {
  const dialog = await prisma.dialog.findUnique({
    where: {
      id: slug,
    },
    include: {
      user: true,
    },
  });

  if (!dialog) {
    return {
      error: {
        message: "No dialog found",
        status: 404,
      },
    };
  }

  return {
    dialog,
  };
};

export const updateAceess = async (slug: string, access: string) => {
  const dialog = await prisma.dialog.update({
    where: {
      id: slug,
    },
    data: {
      access,
    },
  });

  if (!dialog) {
    return {
      error: {
        message: "No dialog found",
        status: 404,
      },
    };
  }
  revalidatePath("/dashboard/dialogue");
  return {
    dialog,
  };
};
