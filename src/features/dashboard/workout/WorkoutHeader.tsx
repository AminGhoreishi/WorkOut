import Link from "next/link";
import { Sparkles, Utensils } from "lucide-react";
import type { WorkoutHeaderProps } from "@/types/workout";

export default function WorkoutHeader({
  workoutPlan,
  workoutDays,
}: WorkoutHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-white/[0.03] p-6 md:p-8 shadow-2xl font-danaMed" dir="rtl">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-amber-500 to-yellow-500 rounded-full blur-2xl opacity-10" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm sm:text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            برنامه فعال شما
          </span>
          <h1 className="text-2xl md:text-3xl font-bold font-morabbaReg text-white">
            {workoutPlan.title}
          </h1>
          {workoutPlan.description && (
            <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
              {workoutPlan.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-xs text-neutral-300 pt-2">
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
              <span className="text-neutral-400">وضعیت برنامه:</span>
              <span className="font-semibold text-amber-400">
                فعال و در حال اجرا
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
              <span className="text-neutral-400">تعداد روزهای تمرین:</span>
              <span className="font-semibold text-amber-400 ss02">
                {workoutDays.length} روز در هفته
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-4 self-stretch md:self-auto justify-between md:justify-center">
          <Link
            href="/dashboard/meal-plans"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
          >
            <Utensils className="w-4 h-4 text-neutral-950" />
            <span>برنامه غذایی</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
