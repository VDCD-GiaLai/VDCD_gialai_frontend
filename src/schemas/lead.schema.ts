import { z } from "zod";

/* ── Recruitment form schema ─────────────────────────── */

export const recruitmentFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng nhập họ và tên")
    .max(255, "Họ và tên không quá 255 ký tự"),
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  phone: z
    .string()
    .max(20, "Số điện thoại không quá 20 ký tự")
    .optional()
    .or(z.literal("")),
  dob: z.string().optional().or(z.literal("")),
  address: z
    .string()
    .max(255, "Địa chỉ không quá 255 ký tự")
    .optional()
    .or(z.literal("")),
  experienceYears: z
    .string()
    .max(100, "Không quá 100 ký tự")
    .optional()
    .or(z.literal("")),
  expectedSalary: z
    .string()
    .max(100, "Không quá 100 ký tự")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .max(500, "URL không quá 500 ký tự")
    .optional()
    .or(z.literal("")),
  coverLetter: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")), // honeypot — hidden
});

export type RecruitmentFormInput = z.infer<typeof recruitmentFormSchema>;
