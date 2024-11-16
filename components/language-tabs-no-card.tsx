"use client";

import { Dialogue, Vocabulary } from "@/app/api/dialogue/dialog.schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type languageTabsProps = {
  dialogueData: Dialogue;
  vocabularyData: Vocabulary;
};

export function LanguageTabs({
  dialogueData,
  vocabularyData,
}: languageTabsProps) {
  const { dialogue } = dialogueData;
  const { vocabulaire } = vocabularyData;
  return (
    <div className="w-full  p-4">
      <Tabs defaultValue="dialogue" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="dialogue">Dialogue</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
        </TabsList>
        <TabsContent
          value="dialogue"
          className="border rounded-lg p-6  shadow-sm"
        >
          <ScrollArea className="h-screen w-full pr-4">
            {dialogue.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "mb-4 flex",
                  index % 2 === 0
                    ? "justify-center lg:justify-start"
                    : "justify-center lg:justify-end"
                )}
              >
                <div
                  className={cn(
                    index % 2 === 0
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100",
                    "w-full lg:max-w-[70%] rounded-lg p-3 "
                  )}
                >
                  <p className="font-semibold mb-1">{message.personnage}</p>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent
          value="vocabulary"
          className="border rounded-lg p-6 shadow-sm"
        >
          <ScrollArea className="h-[400px] w-full pr-4">
            <ul className="space-y-4">
              {vocabulaire.map((item, index) => (
                <li key={index} className="border-b border-border pb-4">
                  <p className="font-bold text-lg text-primary">{item.word}</p>
                  <p className="text-sm text-foreground">{item.definition}</p>
                  <p className="text-sm text-foreground italic">
                    {item.example}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
