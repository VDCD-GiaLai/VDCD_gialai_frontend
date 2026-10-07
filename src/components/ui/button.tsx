"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "solid" | "bordered" | "light" | "flat" | "ghost" | "shadow";
  color?:
    "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  isIconOnly?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  solid: "bg-accent-red text-white hover:bg-accent-red/90",
  bordered: "border border-current bg-transparent",
  light: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
  flat: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700",
  ghost:
    "border border-current bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
  shadow: "shadow-lg bg-accent-red text-white",
};

const radiusStyles: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as: Component = "button",
      href,
      target,
      rel,
      children,
      className,
      variant = "solid",
      radius,
      size,
      isIconOnly = false,
      isLoading = false,
      isDisabled = false,
      disabled,
      startContent,
      endContent,
      trailingIcon,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isActuallyDisabled = isDisabled || disabled || isLoading;
    const EffectiveComponent = href && Component === "button" ? "a" : Component;

    return (
      <EffectiveComponent
        ref={ref as any}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        type={EffectiveComponent === "button" ? type : undefined}
        disabled={
          EffectiveComponent === "button" ? isActuallyDisabled : undefined
        }
        aria-disabled={isActuallyDisabled ? true : undefined}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] outline-none select-none",
          variant && variantStyles[variant],
          radius && radiusStyles[radius],
          size && !isIconOnly && sizeStyles[size],
          isIconOnly && "p-2 aspect-square",
          isActuallyDisabled &&
            "opacity-50 pointer-events-none cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && startContent && (
          <span className="mr-2 inline-flex items-center justify-center shrink-0">
            {startContent}
          </span>
        )}
        {children}
        {endContent && (
          <span className="ml-2 inline-flex items-center justify-center shrink-0">
            {endContent}
          </span>
        )}
        {trailingIcon && (
          <span className="ml-2 w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-inherit select-none shrink-0">
            {trailingIcon}
          </span>
        )}
      </EffectiveComponent>
    );
  },
);

Button.displayName = "Button";
