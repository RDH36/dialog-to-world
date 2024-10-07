import { getAuthSession } from "@/lib/auth/auth";
import LoginButton from "@/pages/api/auth/LoginButton";
import { CircleHelp, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import User from "../user/User";

export default async function Menu() {
  const session = await getAuthSession();
  return (
    <div className="max-w-6xl m-auto py-2 px-4 flex items-center">
      <div className="flex gap-1 items-center">
        <div className="border border-primary p-1 rounded-lg">
          <Link href="/">
            <MessageCircleMore width={20} height={20} />
          </Link>
        </div>
        <p className="text-sm hidden lg:block">Yours generations</p>
        <p className="hover:underline text-xs text-muted-foreground ml-2 mt- hidden lg:block">
          Legacy
        </p>
      </div>
      <div className="flex items-center ml-auto gap-3 flex-wrap">
        <div className=" lg:flex hidden items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground gap-2 align-baseline">
          <CircleHelp width={14} height={14} />
          <p>feedback</p>
        </div>
        {session?.user ? <User {...session.user} /> : <LoginButton />}
      </div>
    </div>
  );
}
