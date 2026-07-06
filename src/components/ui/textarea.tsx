"use client";

import * as React from "react";
import {
  Textarea as HeroTextarea,
  TextAreaProps as HeroTextareaProps,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends HeroTextareaProps {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, error, isInvalid, errorMessage, classNames, ...props },
    ref,
  ) => {
    const hasError = !!error;

    return (
      <HeroTextarea
        ref={ref}
        isInvalid={isInvalid || hasError}
        errorMessage={errorMessage || error}
        classNames={{
          ...classNames,
          inputWrapper: cn(
            "transition-all duration-300 border border-whisper-border bg-pure-surface/50 dark:bg-zinc-900/50 hover:bg-pure-surface dark:hover:bg-zinc-900 focus-within:border-accent-red!",
            hasError && "border-danger focus-within:border-danger!",
            classNames?.inputWrapper,
          ),
          input: cn("text-body-md font-body-md", classNames?.input),
        }}
        className={cn("w-full", className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
