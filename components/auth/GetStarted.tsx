"use client";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export default function GetStarted() {
  return (
    <Link href="/login">
      <button className="px-8 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center">
        <RocketIcon className="w-5 h-5 mr-2" />
        Get Started
      </button>
    </Link>
  );
}
