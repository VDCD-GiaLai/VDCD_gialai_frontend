"use client";

import * as React from "react";
import {
  Input as HeroInput,
  InputProps as HeroInputProps,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export interface InputProps extends HeroInputProps {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, isInvalid, errorMessage, classNames, ...props },
    ref,
  ) => {
    const hasError = !!error;

    return (
      <HeroInput
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

Input.displayName = "Input";
