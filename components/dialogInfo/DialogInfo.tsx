"use client";
import { BookType, BotMessageSquare, ChartSpline } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import MiniInfo from "./MiniInfo";

type DialogInfoProps = {
  session: Session | null;
};

export default function DialogInfo({ session }: DialogInfoProps) {
  const [creator, setCreator] = useState<{
    prompt: string;
    model: string;
    language: string;
  } | null>(null);
  const [image, setImage] = useState<string>(
    session?.user?.image ?? "https://www.gravatar.com/avatar/"
  );
  const [name, setName] = useState<string>(session?.user?.name ?? "Uk known");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCreator = localStorage.getItem("creator");
      if (storedCreator) {
        setCreator(JSON.parse(storedCreator));
      }
      setImage(session?.user?.image ?? "https://www.gravatar.com/avatar/");
      setName(session?.user?.name ?? "Uk known");
    }
  }, [session]);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center p-1 px-2">
        <Avatar className="w-6 h-6">
          <Image
            src={image}
            width={70}
            height={70}
            alt={name}
            className="rounded-full border bg-white"
          />
          <AvatarFallback className="text-xs">
            {name?.split(" ")[0].charAt(0).toLocaleUpperCase()}
            {name?.split(" ")[1].charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-xs text-white bg-blue-500 rounded-lg p-1 px-3">
          {creator?.prompt
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
      </div>
      <div>
        {creator && (
          <div className="flex flex-row gap-2 p-2">
            <MiniInfo
              title={creator.model}
              icon={<BotMessageSquare width={16} height={16} />}
            />
            <MiniInfo
              title={creator.language}
              icon={<BookType width={16} height={16} />}
            />
            <MiniInfo
              title={creator.prompt}
              icon={<ChartSpline width={16} height={16} />}
            />
          </div>
        )}
      </div>
    </div>
  );
}
