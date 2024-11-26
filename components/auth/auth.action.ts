"use server";

import { signIn, signOut } from "@/auth";

export const signInAuth = async () => {
  await signIn("google", { callbackUrl: "/dashboard/create" });
};

export const OutAuth = async () => {
  await signOut();
};
