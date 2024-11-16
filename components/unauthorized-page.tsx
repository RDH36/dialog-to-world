"use client";

import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";
import AuthButton from "./auth/AuthButton";

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <ShieldX className="h-24 w-24 text-red-500" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold mb-4">403 - Unauthorized Access</h1>
        <p className="text-xl mb-8 ">
          Sorry, you don&apos;t have permission to access this page.
        </p>
        <div className="flex gap-2 justify-center">
          <Button asChild>
            <Link href="/">Return to Home Page</Link>
          </Button>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
