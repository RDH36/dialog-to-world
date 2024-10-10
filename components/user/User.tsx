import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOutButton from "@/pages/api/auth/LogOutButton";
import { Wallet } from "lucide-react";
import Image from "next/image";

type UserProps = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function User({ name, image }: UserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring focus:ring-primary/10">
        <div className="flex gap-2 items-center border border-gray-500/50 rounded-md p-1 px-2">
          <p className="text-sm text-white">{name}</p>
          <Avatar className="w-6 h-6">
            <Image
              src={image!}
              width={64}
              height={64}
              alt={name!}
              className="rounded-full"
            />
            <AvatarFallback className="text-xs">
              {name?.split(" ")[0].charAt(0).toLocaleUpperCase()}
              {name?.split(" ")[1].charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex text-white items-center gap-1 cursor-pointer px-4">
          <Wallet width={16} height={16} />
          <p className="ml-2">Billing</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutButton keepDropdownOpen />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
