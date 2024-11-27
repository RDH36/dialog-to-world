"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, HelpCircle, Lightbulb, Loader, Send } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createFeedback } from "./feedback.action";
import { feedbackSchema } from "./feedback.schema";

type FeedbackInput = z.infer<typeof feedbackSchema>;

interface FeedbackPopoverProps {
  onSubmit?: (data: FeedbackInput) => void;
  triggerClassName?: string;
}

export function FeedbackPopover({
  onSubmit,
  triggerClassName,
}: FeedbackPopoverProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: "suggestion",
      message: "",
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async (input: FeedbackInput) => {
      const result: any = await createFeedback(input);
      if (result.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: (data) => {
      toast.success("Feedback submitted!", {
        description: "Thank you for your feedback!",
      });
    },
    onError: (error) => {
      toast.error("Error submitting feedback", {
        description: error.message,
        className: "bg-red-500",
      });
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full flex justify-start">
        <Button variant="ghost" className={triggerClassName}>
          <Send className="mr-2 h-4 w-4" />
          Give Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              feedbackMutation.mutate(form.getValues());
              form.reset();
            })}
            className="space-y-6"
          >
            <h4 className="font-semibold text-lg leading-none mb-4">
              Feedback
            </h4>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          value: "suggestion",
                          label: "Suggestion",
                          icon: Lightbulb,
                        },
                        { value: "issue", label: "Issue", icon: AlertCircle },
                        {
                          value: "question",
                          label: "Question",
                          icon: HelpCircle,
                        },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all w-full aspect-square ${
                            field.value === item.value
                              ? "border-primary bg-primary/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            value={item.value}
                            onChange={() => field.onChange(item.value)}
                            checked={field.value === item.value}
                          />
                          <item.icon className="w-8 h-8 mb-2" />
                          <span className="text-xs font-medium text-center">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={feedbackMutation.isPending}
            >
              {feedbackMutation.isPending ? (
                <Loader className="mr-2 animate-spin" />
              ) : null}
              Submit Feedback
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
