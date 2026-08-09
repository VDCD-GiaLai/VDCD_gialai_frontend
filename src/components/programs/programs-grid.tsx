"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@heroui/react";
import { ProgramCard } from "./program-card";
import {
  fetchProgramsFromApi,
  fetchOperationFieldsFromApi,
} from "@/services/program.service";
import type { Program, OperationField } from "@/types";

const ITEMS_PER_PAGE = 9;

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
        ? "filter-chip-active bg-accent-red text-white border-accent-red"
        : "border-zinc-200 dark:border-zinc-800 text-secondary dark:text-zinc-400 hover:border-accent-red hover:text-accent-red bg-white dark:bg-zinc-950"
    }`}
    aria-pressed={isActive}
  >
    {label}
  </button>
);

const ProgramSkeletonCard = () => (
  <div className="program-card">
    <Skeleton className="aspect-[16/10] w-full rounded-none" />
    <div className="p-5 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="rounded-md w-20 h-5" />
      </div>
      <Skeleton className="rounded-md w-full h-5" />
      <Skeleton className="rounded-md w-3/4 h-5" />
      <Skeleton className="rounded-md w-full h-12" />
      <Skeleton className="rounded-md w-24 h-4" />
    </div>
  </div>
);

export const ProgramsGrid = () => {
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [operationFields, setOperationFields] = React.useState<
    OperationField[]
  >([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeFieldId, setActiveFieldId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  /* ── Load operation fields once ──────────────────────── */
  React.useEffect(() => {
    const loadFields = async () => {
      try {
        const fields = await fetchOperationFieldsFromApi();
        setOperationFields(fields);
      } catch {
        setOperationFields([]);
      }
    };
    loadFields();
  }, []);

  /* ── Fetch programs when filters change ─────────────── */
  const handleFetch = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchProgramsFromApi({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        fieldId: activeFieldId || undefined,
      });
      let items = result.items;

      // Client-side search filter (backend doesn't support text search)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        items = items.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.shortDescription?.toLowerCase().includes(q),
        );
      }

      setPrograms(items);
      setTotalPages(result.totalPages);
    } catch {
      setPrograms([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, activeFieldId, searchQuery]);

  React.useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  const handleFieldChange = (fieldId: string | null) => {
    setActiveFieldId(fieldId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFieldId(null);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== "" || activeFieldId !== null;

  return (
    <section
      id="programs-list"
      className="py-16 md:py-24 scroll-mt-28"
      aria-labelledby="programs-heading"
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
            Tất cả chương trình
          </span>
          <h2
            id="programs-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Chương trình đang triển khai
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
            <MagnifyingGlass weight="thin" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Tìm kiếm chương trình..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-accent-red transition-colors duration-300"
              aria-label="Tìm kiếm chương trình"
            />
          </div>

          {/* Field filter */}
          {operationFields.length > 0 && (
            <div>
              <p className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest mb-3">
                Lĩnh vực hoạt động
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  label="Tất cả"
                  isActive={activeFieldId === null}
                  onClick={() => handleFieldChange(null)}
                />
                {operationFields.map((field) => (
                  <FilterChip
                    key={field.id}
                    label={field.name}
                    isActive={activeFieldId === field.id}
                    onClick={() => handleFieldChange(field.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono-label text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
            {isLoading ? "Đang tải..." : `${programs.length} chương trình`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-mono-label font-bold text-accent-red uppercase tracking-widest hover:underline cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Program grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProgramSkeletonCard key={i} />
            ))}
          </div>
        ) : programs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            title="Không tìm thấy chương trình"
            description="Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm chương trình."
            actionLabel="Xóa bộ lọc"
            onAction={handleClearFilters}
          />
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
            />
          </div>
        )}
      </div>
    </section>
  );
};
