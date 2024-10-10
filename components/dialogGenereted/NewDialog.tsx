"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoginButton from "@/pages/api/auth/LoginButton";
import { FilePlus } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

type NewDialogProps = {
  session: Session | null;
};

export default function NewDialog({ session }: NewDialogProps) {
  if (session?.user) {
    return (
      <Button variant="outline">
        <Link href="/" className="flex gap-1 items-center justify-center">
          <FilePlus className="h-4 w-4" /> new{" "}
        </Link>
      </Button>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <FilePlus className="mr-2 h-4 w-4" /> New{" "}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are not connected!</AlertDialogTitle>
          <AlertDialogDescription>
            This dialog will not be saved if you click on continue, otherwise
            you can log in and click to button save
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Link
              href="/"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Continue
            </Link>
          </AlertDialogCancel>
          <LoginButton />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
