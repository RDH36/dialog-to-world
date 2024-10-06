"use client";

import LoadButton from "@/components/loading/LoadButton";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginButton() {
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
        {isPending ? <LoadButton type="normal" /> : null}
        Login
      </Button>
    </div>
  );
}
