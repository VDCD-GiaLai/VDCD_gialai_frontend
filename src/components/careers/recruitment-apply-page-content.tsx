"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { OPEN_POSITIONS } from "@/data/careers.data";
import { RecruitmentApplyForm } from "./recruitment-apply-form";
import type { JobPosition } from "@/types";

export function RecruitmentApplyPageContent() {
  const searchParams = useSearchParams();
  const positionId = searchParams.get("position");

  const job: JobPosition | null = React.useMemo(() => {
    if (!positionId) return null;
    return OPEN_POSITIONS.find((p) => p.id === positionId) ?? null;
  }, [positionId]);

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <RecruitmentApplyForm job={job} />
    </div>
  );
}
