"use client";

import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { OutAuth } from "./auth.action";

type LogOutButtonProps = {
  keepDropdownOpen?: boolean;
};

export default function LogOutAuth({ keepDropdownOpen }: LogOutButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (event: React.MouseEvent) => {
    if (keepDropdownOpen) {
      event.stopPropagation();
    }
    setIsPending(true);
    await OutAuth();
    setIsPending(false);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer w-full px-2"
      onClick={handleClick}
    >
      {isPending && <Loader2 className="animate-spin" size={16} />}
      <LogOut size={16} /> <span>Logout</span>
    </div>
  );
}
