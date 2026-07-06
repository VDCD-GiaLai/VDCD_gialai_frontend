"use client";

import * as React from "react";
import {
  Select as HeroSelect,
  SelectProps as HeroSelectProps,
  SelectItem,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export { SelectItem };

export interface SelectProps extends Omit<HeroSelectProps, "children"> {
  error?: string;
  children: any;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      error,
      isInvalid,
      errorMessage,
      classNames,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;

    return (
      <HeroSelect
        ref={ref}
        isInvalid={isInvalid || hasError}
        errorMessage={errorMessage || error}
        classNames={{
          ...classNames,
          trigger: cn(
            "transition-all duration-300 border border-whisper-border bg-pure-surface/50 dark:bg-zinc-900/50 hover:bg-pure-surface dark:hover:bg-zinc-900 focus-within:border-accent-red!",
            hasError && "border-danger focus-within:border-danger!",
            classNames?.trigger,
          ),
        }}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </HeroSelect>
    );
  },
);

Select.displayName = "Select";
