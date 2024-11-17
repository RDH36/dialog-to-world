"use client";
import { Loader2, RocketIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function GetStarted() {
  const [isPending, setIsPending] = useState(false);
  return (
    <button
      className="px-8 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center"
      onClick={async () => {
        setIsPending(true);
        await signIn();
        setIsPending(false);
      }}
    >
      {isPending ? (
        <Loader2 className="animate-spin mr-2" size={24} />
      ) : (
        <RocketIcon className="w-5 h-5 mr-2" />
      )}
      Get Started
    </button>
  );
}
