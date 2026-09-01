import type { WorkoutDayHeaderProps } from "@/types/workout";

export default function WorkoutDayHeader({
  dayName,
  muscleGroup,
  totalExercises,
}: WorkoutDayHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.03] border border-amber-500/15 p-5 rounded-2xl">
      <div>
        <span className="text-sm sm:text-xs text-amber-400 font-semibold">
          {dayName} - تمرین امروز
        </span>
        <h3 className="text-xl font-bold font-morabbaReg text-white mt-1">
          {muscleGroup}
        </h3>
      </div>

      {totalExercises > 0 && (
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none text-right">
            <div className="text-sm sm:text-[10px] text-neutral-400">
              تعداد حرکات
            </div>
            <div className="text-sm font-bold text-white ss02">
              {totalExercises} حرکت
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
