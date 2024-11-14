"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const [isPending, setIsPending] = useState(false);
  return (
    <div>
      <Button
        className="bg-primary text-white rounded-sm font-medium"
        onClick={async () => {
          setIsPending(true);
          await signIn();
          setIsPending(false);
        }}
      >
        {isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
        Login
      </Button>
    </div>
  );
}
