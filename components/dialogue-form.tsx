"use client";

import { LANGUAGES, level } from "@/app/api/dialogue/dialog.const";
import {
  DialogueInput,
  dialogueInputSchema,
} from "@/app/api/dialogue/dialog.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DialogueGenerationLoading } from "./dialogue-generation-loading";

export function DialogueForm() {
  const form = useForm<z.infer<typeof dialogueInputSchema>>({
    resolver: zodResolver(dialogueInputSchema),
    defaultValues: {
      theme: "",
      language: "English",
      level: "B1",
      character1Personality: undefined,
      character2Personality: undefined,
    },
  });

  const dialogMutation = useMutation({
    mutationFn: async (input: DialogueInput) => {
      const result = await fetch("/api/dialogue", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (!result.ok) {
        const errorResponse = await result.json();
        throw new Error(errorResponse.error);
      }
      const json = await result.json();
      return json;
    },
  });

  return (
    <>
      {dialogMutation.isPending && <DialogueGenerationLoading />}
      <div
        className={cn(
          "border shadow-lg rounded-lg p-8",
          dialogMutation.isPending && "hidden"
        )}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              dialogMutation.mutate(form.getValues());
            })}
            className={cn("space-y-6")}
          >
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dialogue theme" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(LANGUAGES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value} {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Language Level</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2  justify-start"
                    >
                      {level.map((languageLevel) => (
                        <ToggleGroupItem
                          key={languageLevel.value}
                          value={languageLevel.value}
                          aria-label={`Toggle ${languageLevel.value}`}
                          className="border border-gray-500/50 rounded-md px-4 py-2"
                        >
                          {languageLevel.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="character1Personality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character 1 Personality</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select personality for Character 1" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="friendly">🤗 Friendly</SelectItem>
                      <SelectItem value="formal">🧐 Formal</SelectItem>
                      <SelectItem value="humorous">🤣 Humorous</SelectItem>
                      <SelectItem value="serious">🤨 Serious</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="character2Personality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character 2 Personality</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select personality for Character 2" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="friendly">🤗 Friendly</SelectItem>
                      <SelectItem value="formal">🧐 Formal</SelectItem>
                      <SelectItem value="humorous">🤣 Humorous</SelectItem>
                      <SelectItem value="serious">🤨 Serious</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={dialogMutation.isPending}
              type="submit"
              className="w-full"
            >
              {dialogMutation.isPending
                ? "Generating Dialogue..."
                : "Generate Dialogue"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
