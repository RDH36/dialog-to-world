"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Facebook,
  Chrome as Google,
  Loader2,
  MessagesSquare,
} from "lucide-react";
import { useState } from "react";
import { signInAuth } from "./auth.action";

export function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg  bg-gradient-to-r from-primary to-blue-500">
              <MessagesSquare width={20} height={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold">Dialogue to World</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            Connect to your account
          </h2>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              setIsPending(true);
              await signInAuth();
              setIsPending(false);
            }}
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2" size={24} />
            ) : (
              <Google className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled
            onClick={() => console.log("Sign in with Facebook")}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Sign in with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
