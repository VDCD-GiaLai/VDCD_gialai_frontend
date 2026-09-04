"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { OPEN_POSITIONS } from "@/data/careers.data";
import { fetchJobBySlugFromApi } from "@/services/job.service";
import { RecruitmentApplyForm } from "./recruitment-apply-form";
import type { JobPosition } from "@/types";

export function RecruitmentApplyPageContent() {
  const searchParams = useSearchParams();
  const positionId = searchParams.get("position");

  const [job, setJob] = React.useState<JobPosition | null>(() => {
    if (!positionId) return null;
    return OPEN_POSITIONS.find((p) => p.id === positionId) ?? null;
  });

  React.useEffect(() => {
    if (!positionId) return;
    fetchJobBySlugFromApi(positionId).then((data) => {
      if (data) setJob(data);
    });
  }, [positionId]);

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <RecruitmentApplyForm job={job} />
    </div>
  );
}
