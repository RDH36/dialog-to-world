import React from "react";
type MiniInfoProps = {
  icon: React.ReactNode;
  title: string;
};

export default function MiniInfo({ icon, title }: MiniInfoProps) {
  return (
    <div className="flex gap-1 text-xs border rounded-sm p-1 px-2">
      {icon} {title}
    </div>
  );
}
