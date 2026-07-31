"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FiSend, FiPaperclip, FiX, FiCheck } from "react-icons/fi";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/schemas/contact.schema";
import { ContactService } from "@/services/contact.service";
import type { CreateContactPayload } from "@/types/contact";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ContactForm() {
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = React.useState("");
  const [attachedFile, setAttachedFile] = React.useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "", // honeypot
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setServerMessage("Chỉ chấp nhận tệp PDF, DOC hoặc DOCX.");
      setStatus("error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setServerMessage("Tệp đính kèm không được vượt quá 10MB.");
      setStatus("error");
      return;
    }

    setAttachedFile(file);
    setStatus("idle");
    setServerMessage("");
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (data: ContactFormInput) => {
    setStatus("submitting");
    setServerMessage("");

    try {
      let attachmentUrl: string | undefined;

      // Upload file first if attached
      if (attachedFile) {
        setUploadingFile(true);
        try {
          const uploadResult = await ContactService.uploadFile(attachedFile);
          attachmentUrl = uploadResult.url;
        } catch {
          setServerMessage("Không thể tải tệp đính kèm. Vui lòng thử lại.");
          setStatus("error");
          setUploadingFile(false);
          return;
        }
        setUploadingFile(false);
      }

      const payload: CreateContactPayload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        subject: data.subject || undefined,
        message: data.message || undefined,
        attachment: attachmentUrl,
        website: data.website || undefined,
      };

      const result = await ContactService.submitContact(payload);
      setServerMessage(
        result?.message || "Gửi thành công. Chúng tôi sẽ liên hệ sớm nhất!",
      );
      setStatus("success");
      reset();
      handleRemoveFile();
    } catch (err: any) {
      const errorData = err?.response?.data;

      if (Array.isArray(errorData?.message)) {
        setServerMessage(errorData.message.join(". "));
      } else if (typeof errorData?.message === "string") {
        setServerMessage(errorData.message);
      } else {
        setServerMessage(
          "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.",
        );
      }
      setStatus("error");
    }
  };

  const isLoading = status === "submitting" || isSubmitting;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(handleFormSubmit)(e);
  };

  return (
    <section
      id="contact-form"
      className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/20"
      aria-labelledby="contact-form-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — heading */}
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <span className="font-mono-label text-[10px] font-bold text-accent-red uppercase tracking-widest block mb-3">
              Gửi tin nhắn
            </span>
            <h2
              id="contact-form-heading"
              className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white font-heading mb-4"
            >
              Liên hệ hợp tác
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
              Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong thời gian
              sớm nhất. Các trường có dấu (*) là bắt buộc.
            </p>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-6 md:p-8">
                {/* Success state */}
                {status === "success" && (
                  <motion.div
                    className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-800/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    role="alert"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      {serverMessage}
                    </p>
                  </motion.div>
                )}

                {/* Error state */}
                {status === "error" && serverMessage && (
                  <motion.div
                    className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    role="alert"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                      <FiX className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      {serverMessage}
                    </p>
                  </motion.div>
                )}

                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  {/* Honeypot — hidden from human users & Chrome autofill */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="new-password"
                    aria-hidden="true"
                    style={{ display: "none" }}
                    {...register("website")}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      name="fullName"
                      control={control}
                      label="Họ và tên"
                      placeholder="Nguyễn Văn A"
                      isRequired
                      isDisabled={isLoading}
                    />
                    <FormField
                      name="email"
                      control={control}
                      label="Email"
                      placeholder="email@example.com"
                      type="email"
                      isRequired
                      isDisabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      name="phone"
                      control={control}
                      label="Số điện thoại"
                      placeholder="0912 345 678"
                      isDisabled={isLoading}
                    />
                    <FormField
                      name="subject"
                      control={control}
                      label="Chủ đề"
                      placeholder="Tư vấn giải pháp chuyển đổi số"
                      isDisabled={isLoading}
                    />
                  </div>

                  <FormField
                    name="message"
                    control={control}
                    label="Nội dung tin nhắn"
                    placeholder="Mô tả chi tiết nhu cầu của bạn..."
                    type="textarea"
                    minRows={4}
                    isDisabled={isLoading}
                  />

                  {/* File attachment */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="contact-attachment"
                      disabled={isLoading}
                      aria-label="Đính kèm tệp"
                    />

                    {attachedFile ? (
                      <div className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40">
                        <FiPaperclip className="w-4 h-4 text-secondary dark:text-zinc-400 shrink-0" />
                        <span className="text-sm text-black dark:text-white truncate flex-1">
                          {attachedFile.name}
                        </span>
                        <span className="text-xs text-secondary dark:text-zinc-500 shrink-0">
                          {(attachedFile.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-secondary hover:text-red-500 transition-colors duration-200"
                          aria-label="Xóa tệp đính kèm"
                          disabled={isLoading}
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
                        disabled={isLoading}
                        aria-label="Đính kèm tệp PDF, DOC hoặc DOCX"
                      >
                        <FiPaperclip className="w-3.5 h-3.5" />
                        Đính kèm tệp (PDF, DOC, DOCX — tối đa 10MB)
                      </button>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white disabled:opacity-50"
                      aria-label="Gửi tin nhắn liên hệ"
                    >
                      {uploadingFile ? (
                        "Đang tải tệp..."
                      ) : isLoading ? (
                        "Đang gửi..."
                      ) : (
                        <>
                          Gửi tin nhắn
                          <FiSend className="w-3.5 h-3.5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
