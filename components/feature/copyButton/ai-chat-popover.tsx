"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useChat } from "ai/react";
import { Bot, Send, Trash2, User2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

export function AiChatPopover() {
  const [open, setOpen] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full fixed bottom-4 right-4"
        >
          <Bot className="h-4 w-4" />
          <span className="sr-only">Ouvrir le chat IA</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          height: "min(80vh, 600px)",
          width: "min(90vw, 400px)",
        }}
        className="divide-y divide-border p-0 mx-0"
        side="top"
        align="end"
      >
        <div className="flex justify-between items-center p-3">
          <h2 className="text-lg font-semibold">Chat with AI</h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Button>
        </div>
        <div
          className="h-[384px] overflow-auto mb-4 relative custom-scrollbar"
          ref={scrollAreaRef}
        >
          {messages.map((m) => (
            <div key={m.id} className="p-3">
              <div className="flex items-center justify-start text-xs mb-2">
                {m.role === "user" ? (
                  <User2 className="mr-2" size={12} />
                ) : (
                  <Bot className="h-4 w-4 mr-2" size={12} />
                )}
                <span>{m.role}</span>
              </div>
              <Markdown>{m.content}</Markdown>
            </div>
          ))}
        </div>
        {messages.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-20 right-2 rounded-full opacity-70 hover:opacity-100"
            onClick={() => {
              setMessages([
                {
                  role: "assistant",
                  content: "Hello, how can I help you today?",
                  id: Math.random().toString(36).substr(2, 9),
                },
              ]);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2 p-3">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Tapez votre message..."
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
