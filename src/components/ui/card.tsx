import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  innerClassName?: string;
  hasBezel?: boolean;
}

export function Card({
  children,
  className,
  innerClassName,
  hasBezel = true,
  ...props
}: CardProps) {
  if (!hasBezel) {
    return (
      <div
        className={cn(
          "bg-pure-surface dark:bg-zinc-900 border border-whisper-border rounded-xl p-6 shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "double-bezel-outer transition-all duration-500 hover:scale-[1.01]",
        className,
      )}
      {...props}
    >
      <div className={cn("double-bezel-inner p-6 h-full", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
