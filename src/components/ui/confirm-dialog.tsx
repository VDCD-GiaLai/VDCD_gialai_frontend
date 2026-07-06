"use client";

import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Button } from "./button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  isDangerous?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  title = "Xác nhận hành động",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  onConfirm,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  isLoading = false,
  isDangerous = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      classNames={{
        backdrop: "backdrop-blur-md bg-black/40",
        base: "border border-whisper-border bg-pure-surface dark:bg-zinc-950 rounded-2xl",
        header: "border-b border-whisper-border/50 font-bold",
        footer: "border-t border-whisper-border/50",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-xl">{title}</ModalHeader>
            <ModalBody className="py-6">
              <p className="text-secondary text-body-md leading-relaxed">
                {message}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onClick={onClose} isDisabled={isLoading}>
                {cancelLabel}
              </Button>
              <Button
                color={isDangerous ? "danger" : "success"}
                isLoading={isLoading}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
