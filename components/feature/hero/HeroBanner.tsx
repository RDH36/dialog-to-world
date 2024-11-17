import GetStarted from "@/components/auth/GetStarted";
import { CompassIcon } from "lucide-react";
import Link from "next/link";
import TypewriterEffect from "../TypewriterEffect/TypewriterEffect";

export default function HeroBanner() {
  return (
    <div className="flex flex-col justify-center gap-5">
      <TypewriterEffect />
      <p className="text-center font-thin text-gray-400 px-4">
        Discover a new language through realistic and captivating dialogues with
        AI.
      </p>
      <div className="flex flex-row gap-4 pt-4 justify-center">
        <GetStarted />
        <Link
          href="/explore"
          className="px-8 py-3 text-base font-medium  bg-gray-400/20 border  rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-flex items-center justify-center"
        >
          <CompassIcon className="w-5 h-5 mr-2" />
          Explore
        </Link>
      </div>
    </div>
  );
}
