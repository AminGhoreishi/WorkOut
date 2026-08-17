"use client";

import { Trash2 } from "lucide-react";
import type { WorkoutWeeksListProps } from "@/types/workout";

export default function WorkoutWeeksList({
  workoutWeeks,
  selectedWeek,
  onSelectWeek,
  onDeleteWeek,
}: WorkoutWeeksListProps) {
  if (workoutWeeks.length === 0) {
    return (
      <div className="text-white/40 text-center text-xs p-6 border border-dashed border-white/10 rounded-xl bg-white/5 font-danaMed" dir="rtl">
        هیچ هفته تمرینی تعریف نشده است
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-[200px] font-danaMed" dir="rtl">
      {workoutWeeks.map((week) => {
        const isSelected = selectedWeek?._id === week._id;
        return (
          <div
            key={week._id}
            onClick={() => onSelectWeek(week)}
            className={`p-4 rounded-xl border text-right cursor-pointer transition-all flex items-center justify-between ${
              isSelected
                ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <span className="font-bold text-xs font-morabbaReg">{week.title}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteWeek(week._id);
              }}
              className="p-1 rounded hover:bg-white/10 text-red-400 cursor-pointer"
              title="حذف هفته"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
