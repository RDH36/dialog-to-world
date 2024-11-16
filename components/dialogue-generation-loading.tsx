"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookHeadphones,
  BookOpen,
  Headphones,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";

export function DialogueGenerationLoading() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const phases = [
    {
      title: "Creating dialogue",
      description: "We are generating the content of your conversation",
      icon: MessageSquare,
    },
    {
      title: "Generating title",
      description: "We are creating a catchy title for your dialogue",
      icon: BookOpen,
    },
    {
      title: "Elaborating vocabulary",
      description: "We are selecting the appropriate vocabulary",
      icon: BookHeadphones,
    },
    {
      title: "Producing audio",
      description: "We are generating the audio for your dialogue",
      icon: Headphones,
    },
  ];

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
      setProgress(0);
    }, 5000); // Change phase every 5 seconds

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 100); // Update progress every 100ms

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const CurrentIcon = phases[currentPhase].icon;

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Dialogue Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <CurrentIcon className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 animate-icon-shine"></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {phases[currentPhase].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {phases[currentPhase].description}
              </p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Phase {currentPhase + 1} of {phases.length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
