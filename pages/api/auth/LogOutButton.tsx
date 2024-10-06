"use client";

import LoadButton from "@/components/loading/LoadButton";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

type LogOutButtonProps = {
  keepDropdownOpen?: boolean;
};

export default function LogOutButton({ keepDropdownOpen }: LogOutButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (event: React.MouseEvent) => {
    if (keepDropdownOpen) {
      event.stopPropagation();
    }
    setIsPending(true);
    await signOut();
    setIsPending(false);
  };

  return (
    <div
      className="text-white flex items-center gap-2 cursor-pointer w-full px-2"
      onClick={handleClick}
    >
      {isPending ? (
        <LoadButton type="normal" />
      ) : (
        <LogOut width={16} height={16} />
      )}
      Logout
    </div>
  );
}
