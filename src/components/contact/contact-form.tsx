"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  FiSend,
  FiPaperclip,
  FiX,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiExternalLink,
  FiMessageCircle,
} from "react-icons/fi";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/schemas/contact.schema";
import { ContactService } from "@/services/contact.service";
import type { CreateContactPayload } from "@/types/contact";
import {
  OrganizationInfo,
  DEFAULT_ORGANIZATION_INFO,
} from "@/services/hero.service";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
}

const ContactInfoItem = ({
  icon,
  label,
  value,
  href,
  isExternal = false,
}: ContactInfoItemProps) => {
  const content = (
    <div className="group flex items-start gap-3.5 p-3.5 md:p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/40 hover:border-accent-red/30 hover:bg-white dark:hover:bg-zinc-900/70 transition-all duration-300 shadow-xs">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-secondary dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-mono-label text-[10px] font-bold text-secondary/60 dark:text-zinc-500 uppercase tracking-widest block mb-0.5">
          {label}
        </span>
        <span className="text-xs md:text-sm font-semibold text-black dark:text-white leading-relaxed block truncate">
          {value}
        </span>
      </div>
      {href && isExternal && (
        <FiExternalLink className="w-3.5 h-3.5 text-secondary/40 dark:text-zinc-600 group-hover:text-accent-red transition-colors duration-300 shrink-0 mt-1" />
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block"
        aria-label={`${label}: ${value}`}
      >
        {content}
      </a>
    );
  }

  return content;
};

export function ContactForm({
  orgInfo,
}: {
  orgInfo?: OrganizationInfo | null;
}) {
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = React.useState("");
  const [attachedFile, setAttachedFile] = React.useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const address = orgInfo?.address || DEFAULT_ORGANIZATION_INFO.address || "";
  const hotline =
    orgInfo?.socialLinks?.hotline ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.hotline ||
    "";
  const email =
    orgInfo?.socialLinks?.email ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.email ||
    "";

  const facebookUrl =
    orgInfo?.socialLinks?.facebook ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.facebook;
  const zaloUrl =
    orgInfo?.socialLinks?.zalo || DEFAULT_ORGANIZATION_INFO.socialLinks.zalo;
  const tiktokUrl =
    orgInfo?.socialLinks?.tiktok ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.tiktok;
  const messengerUrl =
    orgInfo?.socialLinks?.messenger ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.messenger;

  const SOCIAL_LINKS = [
    {
      name: "Facebook",
      url: facebookUrl,
      icon: <FaFacebookF className="w-4 h-4" />,
      colorClass:
        "border-[#1877F2]/30 text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "TikTok",
      url: tiktokUrl,
      icon: <FaTiktok className="w-4 h-4" />,
      colorClass:
        "border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black",
    },
    {
      name: "Zalo",
      url: zaloUrl,
      icon: <SiZalo className="w-4 h-4" />,
      colorClass:
        "border-[#0068FF]/30 text-[#0068FF] bg-[#0068FF]/10 hover:bg-[#0068FF] hover:text-white",
    },
    {
      name: "Messenger",
      url: messengerUrl,
      icon: <FiMessageCircle className="w-4 h-4" />,
      colorClass:
        "border-[#00B2FF]/30 text-[#00B2FF] bg-[#00B2FF]/10 hover:bg-[#00B2FF] hover:text-white",
    },
  ];

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
      setServerMessage(
        "Chỉ chấp nhận tệp PDF, DOC, DOCX hoặc ảnh (JPG, PNG, WEBP, GIF).",
      );
      setStatus("error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setServerMessage("Tệp đính kèm không được vượt quá 5MB.");
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
      const errorCode = errorData?.code;

      if (errorCode === "EMAIL_RATE_LIMITED") {
        setServerMessage(
          "Bạn đã gửi quá nhiều email. Vui lòng thử lại sau 24 giờ.",
        );
      } else if (errorCode === "DISPOSABLE_EMAIL") {
        setServerMessage("Email tạm thời không được chấp nhận.");
      } else if (errorCode === "INVALID_EMAIL") {
        setServerMessage("Địa chỉ email không hợp lệ.");
      } else if (Array.isArray(errorData?.message)) {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-stretch">
          {/* Left column — heading + contact info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono-label text-[10px] font-bold text-accent-red uppercase tracking-widest block mb-2">
                Thông tin & Gửi tin nhắn
              </span>
              <h2
                id="contact-form-heading"
                className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white font-heading mb-3"
              >
                Liên hệ hợp tác
              </h2>
              <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed mb-5">
                Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong thời gian
                sớm nhất. Hoặc liên hệ trực tiếp với VDCD qua các kênh bên dưới.
              </p>

              {/* Contact Info Cards */}
              <div className="flex flex-col gap-3">
                <ContactInfoItem
                  icon={<FiMapPin className="w-4 h-4" />}
                  label="Địa chỉ văn phòng"
                  value={address}
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  isExternal
                />
                <ContactInfoItem
                  icon={<FiPhone className="w-4 h-4" />}
                  label="Hotline"
                  value={hotline}
                  href={`tel:${hotline.replace(/\s+/g, "")}`}
                />
                <ContactInfoItem
                  icon={<FiMail className="w-4 h-4" />}
                  label="Email"
                  value={email}
                  href={`mailto:${email}`}
                />
                <ContactInfoItem
                  icon={<FiClock className="w-4 h-4" />}
                  label="Giờ làm việc"
                  value="Thứ 2 — Thứ 6 · 08:00 — 17:30"
                />
              </div>
            </div>

            {/* Social links */}
            <div className="pt-4 flex items-center gap-3">
              <span className="font-mono-label text-[10px] font-bold text-secondary/60 dark:text-zinc-500 uppercase tracking-widest mr-1">
                Mạng xã hội
              </span>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-300 shadow-xs ${social.colorClass}`}
                  aria-label={`Truy cập trang ${social.name} của VDCD`}
                  tabIndex={0}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="double-bezel-outer h-full flex flex-col">
              <div className="double-bezel-inner p-6 md:p-7 h-full flex flex-col justify-between">
                {/* Success state */}
                {status === "success" && (
                  <motion.div
                    className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-800/30"
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
                    className="flex items-start gap-3 p-4 mb-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/30"
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

                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="flex-1 flex flex-col justify-between space-y-4"
                >
                  {/* Honeypot — hidden from human users & Chrome autofill */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="new-password"
                    aria-hidden="true"
                    style={{ display: "none" }}
                    {...register("website")}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    minRows={3}
                    isDisabled={isLoading}
                  />

                  {/* File attachment */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif"
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
                        Đính kèm tệp (PDF, DOC, DOCX, JPG, PNG — tối đa 5MB)
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
          </div>
        </div>
      </div>
    </section>
  );
}
