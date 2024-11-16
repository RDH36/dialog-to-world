import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getAuthSession = () => {
  return getServerSession(authConfig);
};

export const requireAuth = async () => {
  try {
    const session = await getAuthSession();
    if (session?.user) {
      return session.user;
    }
  } catch (error) {
    throw new Error("need to be authenticated");
  }
};
