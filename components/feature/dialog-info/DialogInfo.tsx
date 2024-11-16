import { formatDateFromNow } from "@/lib/dateFormat";
import { BarChart, Calendar, Globe, User } from "lucide-react";
type dialogInfoProps = {
  name: string | null;
  level: string;
  language: string;
  createdAt: Date;
};

export default function DialogInfo({
  name,
  level,
  language,
  createdAt,
}: dialogInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4 p-3">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        {formatDateFromNow(createdAt)}
      </div>
      <div className="flex items-center">
        <User className="w-4 h-4 mr-1" />
        {name}
      </div>
      <div className="flex items-center">
        <Globe className="w-4 h-4 mr-1" />
        {language}
      </div>
      <div className="flex items-center">
        <BarChart className="w-4 h-4 mr-1" />
        {level}
      </div>
    </div>
  );
}
