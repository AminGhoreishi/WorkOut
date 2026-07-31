import type { WorkoutSummaryProps } from "@/types/workout";

export default function WorkoutSummary({
  totalExercises,
}: WorkoutSummaryProps) {
  return (
    <div className="rounded-2xl border border-amber-500/15 bg-white/[0.03] p-5 space-y-4 font-danaMed">
      <h3 className="font-bold font-morabbaReg text-white text-base">
        خلاصه تمرین امروز
      </h3>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-sm sm:text-[10px] text-neutral-400 block">
            مدت تمرین تقریبی
          </span>
          <span className="text-sm font-bold ss02 text-amber-400 mt-1 block font-sans">
            {totalExercises * 10 || 30} دقیقه
          </span>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-sm sm:text-[10px] text-neutral-400 block">تعداد حرکات</span>
          <span className="text-sm font-bold ss02 text-yellow-400 mt-1 block font-sans">
            {totalExercises} حرکت
          </span>
        </div>
      </div>

      <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between items-center text-sm sm:text-xs">
        <span className="text-neutral-400">شدت تمرین امروز:</span>
        <span className="font-bold text-amber-400">
          {totalExercises > 0 ? "متوسط مایل به بالا" : "ریکاوری"}
        </span>
      </div>
    </div>
  );
}
