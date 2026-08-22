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
            className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-xl transition-all duration-200 border text-center cursor-pointer ${
              isActive
                ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-lg"
                : "bg-white/5 hover:bg-white/10 border-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            <span className="text-sm font-bold">{day.dayName}</span>
            <span className="text-sm sm:text-[10px] mt-1 opacity-70 truncate max-w-full">
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
