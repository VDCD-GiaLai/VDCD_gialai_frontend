"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiArrowUpRight,
} from "react-icons/fi";
import { EmptyState } from "@/components/ui/empty-state";
import {
  OPEN_POSITIONS,
  DEPARTMENTS,
  LOCATIONS,
  EMPLOYMENT_TYPES,
} from "@/data/careers.data";
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

const JobCard = ({ job }: { job: JobPosition }) => (
  <motion.article
    className="job-card rounded-xl p-6 md:p-8"
    variants={fadeInUp}
    role="article"
    aria-label={`Vị trí ${job.title}`}
  >
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-bold text-black dark:text-white font-heading tracking-tight mb-2 group-hover:text-accent-red transition-colors duration-300">
          {job.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 font-mono-label font-bold uppercase tracking-wider text-accent-red">
            <FiBriefcase className="w-3.5 h-3.5" />
            {job.department}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin className="w-3.5 h-3.5" />
            {job.location}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-secondary dark:text-zinc-400 shrink-0">
        <span className="inline-flex items-center gap-1.5">
          <FiCalendar className="w-3.5 h-3.5" />
          {formatDate(job.postedDate)}
        </span>
      </div>
    </div>

    <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
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
    <div className="flex flex-wrap gap-2 mb-6">
      {job.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-[11px] font-mono-label font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
      <button
        type="button"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300 rounded-lg cursor-pointer"
        aria-label={`Ứng tuyển vị trí ${job.title}`}
      >
        Ứng tuyển ngay
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 rounded-lg cursor-pointer"
        aria-label={`Xem chi tiết vị trí ${job.title}`}
      >
        Xem chi tiết
        <FiArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </motion.article>
);

export function CareersPositions() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeDepartment, setActiveDepartment] = React.useState("Tất cả");
  const [activeLocation, setActiveLocation] = React.useState("Tất cả");
  const [activeType, setActiveType] = React.useState("Tất cả");

  const filteredPositions = React.useMemo(() => {
    return OPEN_POSITIONS.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesDepartment =
        activeDepartment === "Tất cả" || job.department === activeDepartment;

      const matchesLocation =
        activeLocation === "Tất cả" || job.location === activeLocation;

      const matchesType =
        activeType === "Tất cả" || job.employmentType === activeType;

      return (
        matchesSearch && matchesDepartment && matchesLocation && matchesType
      );
    });
  }, [searchQuery, activeDepartment, activeLocation, activeType]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveDepartment("Tất cả");
    setActiveLocation("Tất cả");
    setActiveType("Tất cả");
  };

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

        {/* Search and Filters */}
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
              {DEPARTMENTS.map((dept) => (
                <FilterChip
                  key={dept}
                  label={dept}
                  isActive={activeDepartment === dept}
                  onClick={() => setActiveDepartment(dept)}
                />
              ))}
            </div>
          </div>

          {/* Location & Type filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest mb-3">
                Địa điểm
              </p>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <FilterChip
                    key={loc}
                    label={loc}
                    isActive={activeLocation === loc}
                    onClick={() => setActiveLocation(loc)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest mb-3">
                Hình thức
              </p>
              <div className="flex flex-wrap gap-2">
                {EMPLOYMENT_TYPES.map((type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    isActive={activeType === type}
                    onClick={() => setActiveType(type)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono-label text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
            {filteredPositions.length} vị trí
          </p>
          {(searchQuery ||
            activeDepartment !== "Tất cả" ||
            activeLocation !== "Tất cả" ||
            activeType !== "Tất cả") && (
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
        {filteredPositions.length > 0 ? (
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {filteredPositions.map((job) => (
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
      </div>
    </section>
  );
}
