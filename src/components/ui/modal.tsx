"use client";

import * as React from "react";
import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalProps as HeroModalProps,
} from "@heroui/react";

export { ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure };

export interface ModalProps extends HeroModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  title,
  isOpen,
  onClose,
  children,
  footer,
  scrollBehavior = "inside",
  backdrop = "blur",
  ...props
}: ModalProps) {
  return (
    <HeroModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={scrollBehavior}
      backdrop={backdrop}
      classNames={{
        backdrop: "backdrop-blur-md bg-black/40",
        base: "border border-whisper-border bg-pure-surface dark:bg-zinc-950 rounded-2xl",
        header: "border-b border-whisper-border/50 font-bold",
        footer: "border-t border-whisper-border/50",
      }}
      {...props}
    >
      <ModalContent>
        {() => (
          <>
            {title && <ModalHeader className="text-xl">{title}</ModalHeader>}
            <ModalBody className="py-6">{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
}
