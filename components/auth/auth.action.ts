"use server";

import { signIn, signOut } from "@/auth";

export const signInAuth = async () => {
  await signIn("google");
};

export const OutAuth = async () => {
  await signOut();
};
