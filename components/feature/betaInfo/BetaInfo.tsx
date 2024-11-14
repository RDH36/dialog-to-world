import { Bot } from "lucide-react";

export default function BetaInfo() {
  return (
    <div className="inline-flex text-white items-center gap-2 px-3 py-1  bg-gradient-to-r from-primary to-blue-500 rounded-full text-sm font-medium">
      <Bot className="w-4 h-4" />
      <span>Beta v0.2.1</span>
    </div>
  );
}
