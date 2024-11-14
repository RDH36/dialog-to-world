"use client";
import AuthButton from "@/components/auth/AuthButton";
import ThemeMode from "@/components/themeMode/ThemeMode";
import { CircleHelp, MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="w-full flex  m-auto py-2 px-4  items-center">
      <div>
        <Link href="/" className="flex gap-2 items-center">
          <div className="p-1 rounded-lg  bg-gradient-to-r from-primary to-blue-500">
            <MessagesSquare width={20} height={20} className="text-white" />
          </div>
          <p className="text-xl hidden lg:block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            DW
          </p>
        </Link>
      </div>
      <div className="flex items-center ml-auto gap-3 flex-wrap">
        <div className=" lg:flex hidden items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground gap-2 align-baseline">
          <CircleHelp width={14} height={14} />
          <p>feedback</p>
        </div>
        <AuthButton />
        <ThemeMode />
      </div>
    </div>
  );
}
