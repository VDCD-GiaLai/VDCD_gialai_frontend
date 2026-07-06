"use client";

import * as React from "react";
import {
  Drawer as HeroDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerProps as HeroDrawerProps,
} from "@heroui/react";

export { DrawerContent, DrawerHeader, DrawerBody, DrawerFooter };

export interface DrawerProps extends HeroDrawerProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({
  title,
  isOpen,
  onClose,
  children,
  footer,
  placement = "right",
  backdrop = "blur",
  ...props
}: DrawerProps) {
  return (
    <HeroDrawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      backdrop={backdrop}
      classNames={{
        backdrop: "backdrop-blur-md bg-black/40",
        base: "bg-pure-surface dark:bg-zinc-950 border-l border-whisper-border/50",
        header: "border-b border-whisper-border/50 font-bold",
        footer: "border-t border-whisper-border/50",
      }}
      {...props}
    >
      <DrawerContent>
        {() => (
          <>
            {title && <DrawerHeader className="text-xl">{title}</DrawerHeader>}
            <DrawerBody className="py-6">{children}</DrawerBody>
            {footer && <DrawerFooter>{footer}</DrawerFooter>}
          </>
        )}
      </DrawerContent>
    </HeroDrawer>
  );
}
