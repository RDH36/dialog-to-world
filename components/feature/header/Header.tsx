import { Badge } from "@/components/ui/badge";
import { Lock, Unlock } from "lucide-react";
import Image from "next/image";

type headerProps = {
  title: string;
  imageCover: string;
  access: string;
};

export function DialogHeader({ title, imageCover, access }: headerProps) {
  return (
    <div className="aspect-video relative h-[200px] w-full">
      <Image src={imageCover} alt={title} objectFit="cover" fill sizes="100%" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
        Dialogue
      </Badge>
      <Badge
        className={`absolute top-2 right-2 ${
          access === "public" ? "bg-green-500" : "bg-yellow-500"
        } text-white`}
      >
        {access === "public" ? (
          <Unlock className="w-3 h-3 mr-1" />
        ) : (
          <Lock className="w-3 h-3 mr-1" />
        )}
        {access === "public" ? "Public" : "Privé"}
      </Badge>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-center font-bold text-secondary">
          {title}
        </h1>
      </div>
    </div>
  );
}
