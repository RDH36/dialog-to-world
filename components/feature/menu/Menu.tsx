"use client";
import AuthButton from "@/components/auth/AuthButton";
import ThemeMode from "@/components/themeMode/ThemeMode";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="max-w-6xl m-auto py-2 px-4 flex items-center">
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
        <AuthButton />
        <ThemeMode />
      </div>
    </div>
  );
}
