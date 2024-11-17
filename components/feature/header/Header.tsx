import { ShareModal } from "@/components/share-modal";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BadgeAccess } from "../badge-acces/BadgeAccess";

type headerProps = {
  title: string;
  imageCover: string;
  access: string;
  slug: string;
  isPublic?: boolean;
};

export function DialogHeader({
  title,
  imageCover,
  access,
  slug,
  isPublic,
}: headerProps) {
  return (
    <div className="aspect-video relative h-[200px] w-full">
      <Image src={imageCover} alt={title} objectFit="cover" fill sizes="100%" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
        Dialogue
      </Badge>

      {isPublic ? (
        <BadgeAccess access={access} />
      ) : (
        <div className="absolute top-2 right-2 z-50">
          <ShareModal access={access} slug={slug} />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-center font-bold text-secondary">
          {title}
        </h1>
      </div>
    </div>
  );
}
