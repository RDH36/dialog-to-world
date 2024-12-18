"use client";

import { ThemeProvider } from "@/components/themeMode/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = (props: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ProgressBar
            height="4px"
            color="#773CBF"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Toaster />
          {props.children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
