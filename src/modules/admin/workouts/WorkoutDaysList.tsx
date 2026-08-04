"use client";

import { Edit, Trash2 } from "lucide-react";
import type { WorkoutDaysListProps } from "@/types/workout";

export default function WorkoutDaysList({
  workoutDays,
  selectedDay,
  onSelectDay,
  onEditDay,
  onDeleteDay,
}: WorkoutDaysListProps) {
  if (workoutDays.length === 0) {
    return (
      <div className="text-white/40 text-center text-xs p-8 border border-dashed border-white/10 rounded-xl font-danaMed" dir="rtl">
        هیچ روز تمرینی تعریف نشده است
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-[400px] font-danaMed" dir="rtl">
      {workoutDays.map((day) => {
        const isSelected = selectedDay?._id === day._id;
        return (
          <div
            key={day._id}
            onClick={() => onSelectDay(day)}
            className={`p-4 rounded-xl border text-right cursor-pointer transition-all flex items-center justify-between ${
              isSelected
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold border-amber-400 text-white shadow-lg shadow-amber-500/20"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <div>
              <div className="font-bold text-xs">{day.dayName}</div>
              <div
                className={`text-[10px] mt-1 ${
                  isSelected ? "text-neutral-900 font-semibold" : "text-white/50"
                }`}
              >
                عضله هدف: {day.muscleGroup}
              </div>
            </div>
            <div
              className="flex gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => onEditDay(day)}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  isSelected
                    ? "hover:bg-black/10 text-neutral-900"
                    : "hover:bg-white/5 text-blue-400"
                }`}
                title="ویرایش روز"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteDay(day._id)}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  isSelected
                    ? "hover:bg-black/10 text-neutral-900"
                    : "hover:bg-white/5 text-red-400"
                }`}
                title="حذف روز"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
