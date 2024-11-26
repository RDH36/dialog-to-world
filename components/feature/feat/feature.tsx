import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bot, Brain, Languages } from "lucide-react";

export function Feature() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold">Why Choose DW?</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-100 dark:bg-gray-800">
          <CardHeader>
            <Brain className="mb-2 h-8 w-8 text-purple-500" />
            <CardTitle>AI-Powered Learning</CardTitle>
            <CardDescription>
              Advanced language models create natural conversations
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800">
          <CardHeader>
            <Languages className="mb-2 h-8 w-8 text-purple-500" />
            <CardTitle>Multiple Languages</CardTitle>
            <CardDescription>
              Learn any language with personalized dialogues
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800">
          <CardHeader>
            <Bot className="mb-2 h-8 w-8 text-purple-500" />
            <CardTitle>Ai assistant</CardTitle>
            <CardDescription>
              Get instant feedback and improve your language skills
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
