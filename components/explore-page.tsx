"use client";

import { Dialogues } from "@/app/dashboard/dialogue/dialog.type";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DialogueThumbnailCard } from "./dialogue-thumbnail-card";

type exploreDilaogue = {
  dialogues: Dialogues;
};
export function Explore({ dialogues }: exploreDilaogue) {
  const [currentPage, setCurrentPage] = useState(1);
  const dialoguesPerPage = 6;
  const totalPages = Math.ceil(dialogues.length / dialoguesPerPage);

  const indexOfLastDialogue = currentPage * dialoguesPerPage;
  const indexOfFirstDialogue = indexOfLastDialogue - dialoguesPerPage;
  const currentDialogues = dialogues.slice(
    indexOfFirstDialogue,
    indexOfLastDialogue
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard/dialogue">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Explore Public Dialogues
          </h1>
        </div>

        <div className="flex flex-wrap gap-10 justify-around">
          {currentDialogues.map((dialogue) => (
            <DialogueThumbnailCard key={dialogue.id} {...dialogue} isPublic />
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-4">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
