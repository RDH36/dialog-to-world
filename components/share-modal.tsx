"use client";

import { updateAceess } from "@/app/dashboard/dialogue/dialog.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Check, ChevronDown, Copy, Globe, Lock } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

type ShareModalProps = {
  access: string;
  slug: string;
};

export function ShareModal({ access, slug }: ShareModalProps) {
  const [open, setOpen] = React.useState(false);
  const [visibility, setVisibility] = React.useState(access);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/eplore/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisibility = async (access: string) => {
    const update = await updateAceess(slug, access);
    if (update.error) {
      toast("An error occured, please try again", {
        description: update.error.message,
        position: "top-center",
        className: "bg-red-500",
      });
    }
    if (update.dialog) setVisibility(update.dialog.access);
    toast("Acces has updated", {
      position: "top-center",
      className: "bg-green-500",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Badge
          className={`absolute top-2 right-2 ${
            visibility === "public" ? "bg-green-500" : "bg-yellow-500"
          } text-white`}
        >
          {visibility === "public" ? (
            <Globe className="w-3 h-3 mr-1" />
          ) : (
            <Lock className="w-3 h-3 mr-1" />
          )}
          {visibility === "public" ? "Public" : "Private"}
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Share Dialogue
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-10">
                <div className="flex items-center w-full">
                  {visibility === "public" ? (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Public
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Private
                    </>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-full bg-zinc-900 text-white border-zinc-800"
            >
              <DropdownMenuItem
                onClick={() => handleVisibility("private")}
                className="flex items-start py-3 px-4 focus:bg-zinc-800 focus:text-white"
              >
                <div className="flex flex-1">
                  <Lock className="mr-2 h-4 w-4 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-medium">Private</span>
                    <span className="text-sm text-zinc-400">
                      Only you can view this dialogue
                    </span>
                  </div>
                </div>
                {visibility === "private" && (
                  <Check className="h-4 w-4 ml-2 mt-0.5" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleVisibility("public")}
                className="flex items-start py-3 px-4 focus:bg-zinc-800 focus:text-white"
              >
                <div className="flex flex-1">
                  <Globe className="mr-2 h-4 w-4 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-medium">Public</span>
                    <span className="text-sm text-zinc-400">
                      Everyone can view this dialogue
                    </span>
                  </div>
                </div>
                {visibility === "public" && (
                  <Check className="h-4 w-4 ml-2 mt-0.5" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            className="px-3 border-gray-300 h-10"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            Copy Link
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="bg-black text-white hover:bg-gray-800 h-10"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
