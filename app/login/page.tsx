import { auth } from "@/auth";
import { LoginPage } from "@/components/auth/login-page";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard/create");
  }
  return <LoginPage />;
}
