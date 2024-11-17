import { auth } from "@/auth";

export const requireAuth = async () => {
  const session = await auth();
  if (session?.user) {
    return session.user;
  }
};
