"use client";

import * as React from "react";
import {
  Button as HeroButton,
  ButtonProps as HeroButtonProps,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HeroButtonProps {
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, trailingIcon, ...props }, ref) => {
    return (
      <HeroButton
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]",
          className,
        )}
        {...props}
      >
        {children}
        {trailingIcon && (
          <span className="ml-2 w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-inherit select-none">
            {trailingIcon}
          </span>
        )}
      </HeroButton>
    );
  },
);

Button.displayName = "Button";
