"use client";

import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import WorkoutPdfDocument from "./WorkoutPdfDocument";
import { Download } from "lucide-react";
import type { DownloadButtonProps } from "@/types/workout";

export default function WorkoutDownloadButton({
  workoutPlan,
  workoutDays,
}: DownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 0);
  }, []);

  if (!isClient) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-2 bg-amber-500/20 text-neutral-400 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg"
      >
        <Download className="w-4 h-4 animate-pulse" />
        <span>دانلود فایل PDF برنامه</span>
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <WorkoutPdfDocument
          workoutPlan={workoutPlan}
          workoutDays={workoutDays}
        />
      }
      fileName={`workout-plan-${workoutPlan._id}.pdf`}
    >
      {({ loading }) => (
        <span
          className={`flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg cursor-pointer ${
            loading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <Download className="w-4 h-4 text-neutral-950" />
          <span>
            {loading ? "در حال آماده‌سازی..." : "دانلود فایل PDF برنامه"}
          </span>
        </span>
      )}
    </PDFDownloadLink>
  );
}
