import { Badge } from "@/components/ui/badge";
import { Globe, Lock } from "lucide-react";

export function BadgeAccess({ access }: { access: string }) {
  return (
    <Badge
      className={`absolute top-2 right-2 ${
        access === "public" ? "bg-green-500" : "bg-yellow-500"
      } text-white`}
    >
      {access === "public" ? (
        <Globe className="w-3 h-3 mr-1" />
      ) : (
        <Lock className="w-3 h-3 mr-1" />
      )}
      {access === "public" ? "Public" : "Private"}
    </Badge>
  );
}
