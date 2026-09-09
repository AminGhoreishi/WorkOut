"use client";

import { memo } from "react";
import type { UserWorkoutDaysGridProps } from "@/types/workout";

function UserWorkoutDaysGrid({
  workoutDays,
  activeDayId,
  onSelectDayId,
}: UserWorkoutDaysGridProps) {
  return (
    <>
      {workoutDays.map((day) => {
        const isActive = day._id === activeDayId;
        const isRest = !day.exercises || day.exercises.length === 0;
        return (
          <button
            key={day._id}
            type="button"
            onClick={() => onSelectDayId(day._id)}
            title={day.muscleGroup || day.dayName}
            className={`group shrink-0 min-w-[110px] sm:min-w-0 sm:w-full snap-start flex flex-col items-center justify-center py-3 px-2.5 rounded-xl transition-all duration-200 border text-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
              isActive
                ? "bg-gradient-to-b from-amber-500/20 to-amber-500/10 border-amber-500 text-amber-300 font-bold shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
                : "bg-neutral-900/60 hover:bg-neutral-800/80 border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
            }`}
          >
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              {day.dayName}
            </span>
            <span className="text-[11px] sm:text-xs mt-1 opacity-80 truncate max-w-full block">
              {isRest ? "ریکاوری" : day.muscleGroup}
            </span>
          </button>
        );
      })}
    </>
  );
}

function areUserWorkoutDaysGridPropsEqual(
  prevProps: UserWorkoutDaysGridProps,
  nextProps: UserWorkoutDaysGridProps
) {
  if (prevProps.activeDayId !== nextProps.activeDayId) {
    return false;
  }
  if (prevProps.workoutDays.length !== nextProps.workoutDays.length) {
    return false;
  }
  for (let i = 0; i < prevProps.workoutDays.length; i++) {
    if (
      prevProps.workoutDays[i]._id !== nextProps.workoutDays[i]._id ||
      prevProps.workoutDays[i].dayName !== nextProps.workoutDays[i].dayName ||
      prevProps.workoutDays[i].muscleGroup !== nextProps.workoutDays[i].muscleGroup
    ) {
      return false;
    }
  }
  return true;
}

export default memo(UserWorkoutDaysGrid, areUserWorkoutDaysGridPropsEqual);
