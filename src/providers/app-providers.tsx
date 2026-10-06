"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";

const emptySubscribe = () => () => {};

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <HeroUIProvider>
          {children}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </HeroUIProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
