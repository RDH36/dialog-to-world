"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import {
  ArrowDown,
  Bot,
  CircleStop,
  Clipboard,
  RefreshCcw,
  Send,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export function AiChatPopover() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { slug } = params;
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    setMessages,
    isLoading,
    stop,
  } = useChat({
    api: `/api/${slug}/chat`,
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hey! I am your dialogue assistant. How can I help you today?",
      },
    ],
  });
  console.log(params);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollArea;
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 20);
      };
      scrollArea.addEventListener("scroll", handleScroll);
      return () => scrollArea.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const reloadChat = () => {
    reload();
  };

  const reset = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hey! I am your dialogue assistant. How can I help you today?",
      },
    ]);
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
        className="p-0"
        side="top"
        align="end"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Assistant IA</h2>
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <Button variant="ghost" size="icon" onClick={reset}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Réinitialiser le chat</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            </div>
          </div>

          <div
            className="flex-1 p-4 h-[384px] relative overflow-auto custom-scrollbar"
            ref={scrollAreaRef}
          >
            <div className="space-y-6 max-w-full">
              {messages.map((m) => (
                <div key={m.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    {m.role === "assistant" ? (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className=" bg-gradient-to-r from-primary to-blue-500"></AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gray-500"></AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-2 max-w-[calc(100%-2rem)]">
                    <div className="font-medium">
                      {m.role === "assistant" ? "Assistant" : "Vous"}
                    </div>
                    <div className="text-sm text-muted-foreground break-words">
                      {m.role === "assistant" ? (
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      ) : (
                        m.content
                      )}
                    </div>
                    {m.role === "assistant" && (
                      <div className="flex gap-2 mt-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Clipboard className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={reloadChat}
                        >
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {showScrollButton && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-2 right-2 rounded-full opacity-70 hover:opacity-100"
                onClick={scrollToBottom}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message..."
                className="flex-1 min-h-[40px] max-h-[200px] resize-none"
                rows={1}
              />
              {isLoading ? (
                <Button type="button" size="icon" onClick={stop}>
                  <CircleStop className="h-4 w-4" />
                  <span className="sr-only">Arrêter</span>
                </Button>
              ) : (
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Envoyer</span>
                </Button>
              )}
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
