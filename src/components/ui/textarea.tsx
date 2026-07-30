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
    {
      className,
      error,
      isInvalid,
      errorMessage,
      classNames,
      label,
      isRequired,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const activeErrorMsg =
      error || (typeof errorMessage === "string" ? errorMessage : undefined);

    return (
      <div className={cn("w-full flex flex-col gap-1.5", className)}>
        {label && (
          <label className="text-xs font-mono-label font-bold text-black dark:text-white uppercase tracking-wider">
            {label}
            {isRequired && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        <HeroTextarea
          ref={ref}
          isInvalid={isInvalid || hasError}
          classNames={{
            ...classNames,
            inputWrapper: cn(
              "transition-all duration-300 border border-whisper-border bg-pure-surface/50 dark:bg-zinc-900/50 hover:bg-pure-surface dark:hover:bg-zinc-900 focus-within:border-accent-red! outline-none! focus:outline-none! focus-within:outline-none! ring-0! focus-within:ring-0! shadow-none! data-[focus=true]:border-accent-red! data-[focus-visible=true]:outline-none! data-[focus-visible=true]:ring-0!",
              hasError && "border-danger! focus-within:border-danger!",
              classNames?.inputWrapper,
            ),
            input: cn(
              "text-body-md font-body-md outline-none! focus:outline-none! focus:ring-0! focus-visible:outline-none! shadow-none!",
              classNames?.input,
            ),
          }}
          {...props}
        />
        {hasError && activeErrorMsg && (
          <span className="text-xs font-medium text-danger">
            {activeErrorMsg}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
