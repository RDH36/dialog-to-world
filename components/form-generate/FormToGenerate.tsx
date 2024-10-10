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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { generateDialogByMistral } from "@/lib/actions/dialog-actions";
import { languages } from "@/lib/language/Language";
import { cn } from "@/lib/utils";
import { useDialogStore } from "@/store/dialog.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, CircleHelp, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadButton from "../loading/LoadButton";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const formSchema = z.object({
  prompt: z.string(),
  model: z.string(),
  language: z.string(),
});

export function FormToGenerate() {
  const [loaging, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { addDialogue } = useDialogStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "mistral-large-latest",
      language: "English",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const dialog = await generateDialogByMistral(
        values.prompt,
        values.model,
        values.language
      );
      const jsonMatch = dialog?.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : null;
      const creator = JSON.stringify({ ...values });
      if (jsonString) {
        const arrayDialogue = JSON.parse(jsonString);
        localStorage.setItem("dialogue", jsonString);
        localStorage.setItem("creator", creator);
        addDialogue(arrayDialogue);
      }
      setLoading(false);
      router.push("/dialog");
    } catch (error) {
      setError(`An error occurred while generating the dialogue ${error}`);
      setLoading(false);
      return;
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-screen flex flex-col justify-center"
        >
          <div className="self-center flex gap-2">
            <FormField
              name="model"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1">
                    <p>AI Model</p> <CircleHelp width={14} height={14} />
                  </FormLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px] hover:bg-accent-foreground/15 focus:ring-0">
                      <SelectValue placeholder="Model IA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mistral-large-latest">
                        Mistral large latest
                      </SelectItem>
                      <SelectItem disabled value="GPT-3">
                        GPT-3 (coming soon)
                      </SelectItem>
                      <SelectItem disabled value="GPT-4">
                        GPT-4 (coming soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex gap-1">
                    <p>Language</p> <CircleHelp width={14} height={14} />
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] h-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("language", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative lg:w-[600px] w-full self-center px-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ex: Hobby, Humain behavior, etc."
                      className="bg-accent rounded-full h-12 w-full ring-2 ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loaging ? (
              <LoadButton type="normal" className="absolute top-3 right-5" />
            ) : (
              <Button
                type="submit"
                className="border-none bg-transparent absolute top-[6px] right-5 hover:bg-transparent"
              >
                <Send className="hover:text-primary" />
              </Button>
            )}
          </div>
        </form>
      </Form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
