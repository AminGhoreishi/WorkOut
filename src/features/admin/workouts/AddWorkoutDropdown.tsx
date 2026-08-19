"use client";

import { memo, useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { showAlert } from "@/utils/alert";
import type { AddWorkoutDropdownProps } from "@/types/workout";

function AddWorkoutDropdown({
  packageId,
  workoutPlanId,
  userId,
  hasActiveWeek,
  onWeekCreated,
  onAddNewDay,
}: AddWorkoutDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateWeek = async () => {
    if (!packageId || !workoutPlanId) return;
    try {
      const res = await fetch("/api/admin/subscription/workout-week", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          planId: workoutPlanId,
          userId,
        }),
      });
      if (res.ok) {
        showAlert({
          title: "موفقیت",
          text: "هفته جدید با موفقیت ایجاد شد",
          icon: "success",
        });
        onWeekCreated();
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ایجاد هفته جدید",
        icon: "error",
      });
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-amber-500/10 hover:bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>افزودن جدید</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
        />
      </button>

      {showDropdown && (
        <div className="absolute left-0 mt-2 w-36 bg-neutral-900 border border-white/10 rounded-lg shadow-xl py-1.5 z-20">
          <button
            type="button"
            onClick={() => {
              handleCreateWeek();
              setShowDropdown(false);
            }}
            className="w-full text-right px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            <span>هفته ی جدید</span>
          </button>
          <button
            type="button"
            disabled={!hasActiveWeek}
            onClick={() => {
              onAddNewDay();
              setShowDropdown(false);
            }}
            className="w-full text-right px-4 py-2 text-xs text-white/80 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>روز جدید</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(AddWorkoutDropdown);
