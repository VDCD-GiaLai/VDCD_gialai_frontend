"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiChevronDown,
  FiUploadCloud,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
} from "react-icons/fi";
import { EmptyState } from "@/components/ui/empty-state";
import { OPEN_POSITIONS, DEPARTMENTS } from "@/data/careers.data";
import { formatDate } from "@/lib/utils";
import type { JobPosition } from "@/types";

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
  visible: { transition: { staggerChildren: 0.06 } },
};

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, isActive, onClick }: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-xs font-mono-label font-bold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
      isActive
        ? "filter-chip-active"
        : "border-zinc-200 dark:border-zinc-800 text-secondary dark:text-zinc-400 hover:border-accent-red hover:text-accent-red bg-white dark:bg-zinc-950"
    }`}
    aria-pressed={isActive}
  >
    {label}
  </button>
);

/* ── Form Ứng Tuyển Đầy Đủ Component ──────────────────────── */

interface ApplyFormProps {
  jobTitle: string;
}

function PositionApplyForm({ jobTitle }: ApplyFormProps) {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    experienceYears: "1-3 năm",
    expectedSalary: "",
    portfolioUrl: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("Dung lượng CV phải nhỏ hơn 10MB");
        return;
      }
      setCvFile(file);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }
    if (!cvFile) {
      setErrorMessage("Vui lòng tải lên tập tin CV (PDF hoặc DOCX)");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

      // Step 1: Upload CV file
      const uploadForm = new FormData();
      uploadForm.append("file", cvFile);
      const uploadRes = await fetch(`${API_BASE}/upload/file`, {
        method: "POST",
        body: uploadForm,
      });
      if (!uploadRes.ok) {
        throw new Error("Tải lên CV thất bại. Vui lòng thử lại.");
      }
      const uploadData = await uploadRes.json();
      const attachmentUrl = uploadData.url || uploadData.filePath || "";

      // Step 2: Create Lead (triggers email notification)
      const extraInfo = [
        formData.dob ? `Ngày sinh: ${formData.dob}` : "",
        formData.address ? `Địa chỉ: ${formData.address}` : "",
        formData.experienceYears
          ? `Kinh nghiệm: ${formData.experienceYears}`
          : "",
        formData.expectedSalary
          ? `Mức lương mong muốn: ${formData.expectedSalary}`
          : "",
        formData.portfolioUrl ? `Portfolio: ${formData.portfolioUrl}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const messageBody = [
        formData.coverLetter || "",
        extraInfo ? `\n---\n${extraInfo}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const leadRes = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: `[Ứng tuyển] ${jobTitle}`,
          message: messageBody,
          attachment: attachmentUrl,
        }),
      });

      if (!leadRes.ok) {
        throw new Error("Gửi hồ sơ thất bại. Vui lòng thử lại sau.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <FiCheckCircle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200 font-heading">
          Nộp hồ sơ ứng tuyển thành công!
        </h4>
        <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed max-w-lg mx-auto">
          Cảm ơn bạn đã ứng tuyển vào vị trí{" "}
          <strong className="font-bold">{jobTitle}</strong> tại VDCD Gia Lai.
          Đội ngũ HR của chúng tôi sẽ liên hệ lại với bạn qua Email/SĐT trong
          vòng 3-5 ngày làm việc.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white font-heading">
          Form Ứng Tuyển — {jobTitle}
        </h4>
        <span className="text-[11px] font-mono-label text-zinc-500">
          (*) Thông tin bắt buộc
        </span>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs rounded-lg flex items-center gap-2">
          <FiAlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Họ tên + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Họ và tên <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Email liên hệ <span className="text-accent-red">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="nguyenvana@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
      </div>

      {/* Row 2: SĐT + Ngày sinh + Địa chỉ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Số điện thoại <span className="text-accent-red">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="0912 345 678"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Ngày sinh
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Địa chỉ hiện tại
          </label>
          <input
            type="text"
            placeholder="TP. Pleiku, Gia Lai"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
      </div>

      {/* Row 3: Kinh nghiệm + Mức lương + Link Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Kinh nghiệm làm việc
          </label>
          <select
            value={formData.experienceYears}
            onChange={(e) =>
              setFormData({ ...formData, experienceYears: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          >
            <option value="Sinh viên mới ra trường">
              Sinh viên mới ra trường
            </option>
            <option value="Dưới 1 năm">Dưới 1 năm</option>
            <option value="1 - 3 năm">1 - 3 năm</option>
            <option value="3 - 5 năm">3 - 5 năm</option>
            <option value="Trên 5 năm">Trên 5 năm</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Mức lương mong muốn
          </label>
          <input
            type="text"
            placeholder="VD: 15 - 20 triệu"
            value={formData.expectedSalary}
            onChange={(e) =>
              setFormData({ ...formData, expectedSalary: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
            Link Portfolio / LinkedIn / GitHub
          </label>
          <input
            type="url"
            placeholder="https://github.com/username"
            value={formData.portfolioUrl}
            onChange={(e) =>
              setFormData({ ...formData, portfolioUrl: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
          />
        </div>
      </div>

      {/* File Upload CV */}
      <div>
        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
          Tải lên CV / Resume (PDF, DOCX max 10MB){" "}
          <span className="text-accent-red">*</span>
        </label>
        <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-5 text-center hover:border-accent-red transition-colors duration-300 bg-zinc-50/50 dark:bg-zinc-900/40">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <FiUploadCloud className="w-6 h-6 text-accent-red mx-auto mb-2" />
          {cvFile ? (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Đã chọn: {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
            </p>
          ) : (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Kéo thả tập tin CV vào đây hoặc{" "}
              <span className="text-accent-red font-bold underline">
                bấm để chọn file
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Cover letter / Intro */}
      <div>
        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 font-sans">
          Giới thiệu bản thân / Thư ứng tuyển
        </label>
        <textarea
          rows={3}
          placeholder="Chia sẻ lý do bạn muốn gia nhập VDCD Gia Lai..."
          value={formData.coverLetter}
          onChange={(e) =>
            setFormData({ ...formData, coverLetter: e.target.value })
          }
          className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-white focus:outline-none focus:border-accent-red"
        />
      </div>

      {/* ── [Phần Vàng] Thông Tin Bổ Sung (Sẽ bổ sung thông tin sau) ── */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-xl p-4 flex items-start gap-3">
        <FiInfo className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider font-heading">
            Thông tin bổ sung (Đánh giá hồ sơ & Phỏng vấn)
          </h5>
          <p className="text-[11px] text-amber-800 dark:text-amber-300/90 leading-relaxed font-sans">
            Phần thông tin bổ sung, lịch phỏng vấn và bài test năng lực thực
            chiến sẽ được bộ phận Nhân sự VDCD tổng hợp và bổ sung trực tiếp sau
            khi tiếp nhận hồ sơ.
          </p>
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 bg-accent-red hover:bg-accent-red-hover text-white font-mono-label text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {status === "submitting"
            ? "Đang gửi hồ sơ..."
            : "Nộp hồ sơ ứng tuyển ngay"}
        </button>
      </div>
    </form>
  );
}

/* ── Interactive Expandable Job Card ──────────────────────── */

const JobCard = ({ job }: { job: JobPosition }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.article
      className="job-card rounded-xl p-6 md:p-8 cursor-pointer transition-all duration-300"
      variants={fadeInUp}
      role="article"
      aria-label={`Vị trí ${job.title}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-black dark:text-white font-heading tracking-tight mb-2 group-hover:text-accent-red transition-colors duration-300">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-mono-label font-bold text-accent-red shrink-0 md:hidden">
              <span>{isExpanded ? "Thu gọn" : "Xem chi tiết"}</span>
              <FiChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-secondary dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 font-mono-label font-bold uppercase tracking-wider text-accent-red">
              <FiBriefcase className="w-3.5 h-3.5" />
              {job.department}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs text-secondary dark:text-zinc-400 shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5" />
            {formatDate(job.postedDate)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono-label font-bold text-accent-red ml-4">
            <span>{isExpanded ? "Thu gọn" : "Xem chi tiết"}</span>
            <FiChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>
      </div>

      <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed mb-4">
        {job.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-secondary dark:text-zinc-400 mb-5">
        <span className="inline-flex items-center gap-1.5">
          <FiClock className="w-3.5 h-3.5" />
          {job.employmentType}
        </span>
        {job.salary && (
          <span className="inline-flex items-center gap-1.5">
            <FiDollarSign className="w-3.5 h-3.5" />
            {job.salary}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <FiBriefcase className="w-3.5 h-3.5" />
          {job.experience}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[11px] font-mono-label font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable Panel: Detailed Breakdown + Form Ứng Tuyển */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80 pt-6 mt-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Job detail sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <div>
                <h4 className="text-xs font-bold font-mono-label uppercase tracking-wider text-accent-red mb-3">
                  Mô tả & Trách nhiệm công việc
                </h4>
                <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
                    <span>
                      Trực tiếp tham gia thiết kế, phát triển và triển khai sản
                      phẩm/dự án số hóa của công ty.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
                    <span>
                      Phối hợp cùng đội ngũ Product, Design và QA để đảm bảo
                      tiến độ và chất lượng bàn giao.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
                    <span>
                      Tối ưu hiệu năng ứng dụng, bảo mật dữ liệu và sẵn sàng
                      giải quyết sự cố kỹ thuật.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold font-mono-label uppercase tracking-wider text-accent-red mb-3">
                  Yêu cầu & Quyền lợi ứng viên
                </h4>
                <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
                    <span>
                      Kinh nghiệm thực chiến tương đương vị trí tuyển dụng (
                      {job.experience}).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
                    <span>Thành thạo công nghệ: {job.tags.join(", ")}.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
                    <span>
                      Hưởng đầy đủ chế độ BHXH, BHYT, thưởng KPI, hỗ trợ đào tạo
                      chuyên sâu.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Inline Application Form */}
            <div className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <PositionApplyForm jobTitle={job.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export function CareersPositions() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [activeDepartment, setActiveDepartment] = React.useState("Tất cả");
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 5;

  // API state
  const [jobs, setJobs] = React.useState<JobPosition[]>([]);
  const [totalJobs, setTotalJobs] = React.useState(0);
  const [departments, setDepartments] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [useMock, setUseMock] = React.useState(false);

  // Debounce search input (400ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // reset page on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch jobs from API
  React.useEffect(() => {
    let cancelled = false;

    async function fetchJobs() {
      setIsLoading(true);
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
        const params = new URLSearchParams();
        params.set("page", String(currentPage));
        params.set("limit", String(ITEMS_PER_PAGE));
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (activeDepartment !== "Tất cả")
          params.set("department", activeDepartment);

        const res = await fetch(`${API_BASE}/jobs?${params.toString()}`);
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        const apiData = json.data ?? json;

        if (cancelled) return;

        // Map backend Job entity → frontend JobPosition shape
        const mapped: JobPosition[] = (apiData.data || []).map(
          (j: Record<string, unknown>) => ({
            id: j.id as string,
            title: j.title as string,
            department: (j.department as string) || "",
            location: (j.location as string) || "",
            employmentType: mapType((j.type as string) || "full-time"),
            salary: (j.salaryRange as string) || undefined,
            postedDate: (j.createdAt as string) || "",
            description: stripMarkdown((j.description as string) || ""),
            experience: "",
            tags: [],
            // Keep raw backend fields for expanded detail
            _requirements: (j.requirements as string) || "",
            _benefits: (j.benefits as string) || "",
            _isUrgent: j.isUrgent as boolean,
            _deadline: (j.deadline as string) || "",
          }),
        );

        setJobs(mapped);
        setTotalJobs(apiData.total || 0);
        if (apiData.departments && apiData.departments.length > 0) {
          setDepartments(apiData.departments);
        }
        setUseMock(false);
      } catch {
        // Fallback to mock data
        if (cancelled) return;
        setUseMock(true);
        const filtered = OPEN_POSITIONS.filter((job) => {
          const matchesSearch =
            !debouncedSearch ||
            job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            job.description
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            job.tags.some((tag) =>
              tag.toLowerCase().includes(debouncedSearch.toLowerCase()),
            );
          const matchesDepartment =
            activeDepartment === "Tất cả" ||
            job.department === activeDepartment;
          return matchesSearch && matchesDepartment;
        });
        setTotalJobs(filtered.length);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        setJobs(filtered.slice(start, start + ITEMS_PER_PAGE));
        setDepartments(DEPARTMENTS.filter((d) => d !== "Tất cả"));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, activeDepartment, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalJobs / ITEMS_PER_PAGE));

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setActiveDepartment("Tất cả");
    setCurrentPage(1);
  };

  const allDepartments = ["Tất cả", ...departments];

  return (
    <section
      id="positions"
      className="py-16 md:py-24 scroll-mt-28"
      aria-labelledby="positions-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Cơ hội nghề nghiệp
          </span>
          <h2
            id="positions-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Vị trí đang tuyển
          </h2>
        </motion.div>

        {/* Search and Department Filter */}
        <motion.div
          className="mb-8 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Search */}
          <div className="relative max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Tìm kiếm vị trí, kỹ năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-accent-red transition-colors duration-300"
              aria-label="Tìm kiếm vị trí tuyển dụng"
            />
          </div>

          {/* Department filter */}
          <div>
            <p className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest mb-3">
              Phòng ban
            </p>
            <div className="flex flex-wrap gap-2">
              {allDepartments.map((dept) => (
                <FilterChip
                  key={dept}
                  label={dept}
                  isActive={activeDepartment === dept}
                  onClick={() => {
                    setActiveDepartment(dept);
                    setCurrentPage(1);
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono-label text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
            {isLoading ? "Đang tải..." : `${totalJobs} vị trí`}
          </p>
          {(searchQuery || activeDepartment !== "Tất cả") && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-mono-label font-bold text-accent-red uppercase tracking-widest hover:underline cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Job list */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-6 md:p-8 bg-zinc-100 dark:bg-zinc-900/50 animate-pulse h-48"
              />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <motion.div
            key={`page-${currentPage}-${debouncedSearch}-${activeDepartment}`}
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            title="Không tìm thấy vị trí phù hợp"
            description="Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm cơ hội nghề nghiệp."
            actionLabel="Xóa bộ lọc"
            onAction={handleClearFilters}
          />
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 text-xs font-mono-label font-bold uppercase tracking-wider rounded-lg border border-zinc-200 dark:border-zinc-800 text-secondary dark:text-zinc-400 hover:border-accent-red hover:text-accent-red disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 text-xs font-mono-label font-bold rounded-lg border transition-all duration-300 cursor-pointer ${
                    currentPage === page
                      ? "filter-chip-active"
                      : "border-zinc-200 dark:border-zinc-800 text-secondary dark:text-zinc-400 hover:border-accent-red hover:text-accent-red"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 text-xs font-mono-label font-bold uppercase tracking-wider rounded-lg border border-zinc-200 dark:border-zinc-800 text-secondary dark:text-zinc-400 hover:border-accent-red hover:text-accent-red disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Tiếp
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

/** Map backend type slug to Vietnamese display name */
function mapType(type: string): string {
  const map: Record<string, string> = {
    "full-time": "Toàn thời gian",
    "part-time": "Bán thời gian",
    intern: "Thực tập",
    contract: "Hợp đồng",
  };
  return map[type] || type;
}

/** Strip markdown headers/symbols for card preview */
function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/[-*]\s+/g, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim()
    .slice(0, 200);
}
