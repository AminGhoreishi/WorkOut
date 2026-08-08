import { Award, Scale, Dumbbell } from "lucide-react";
import type { ProgressStatsOverviewProps } from "@/types/progress";

export default function ProgressStatsOverview({
  totalRecordsCount,
  weightKg,
  completedWorkoutsCount,
}: ProgressStatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-danaMed">
      <div className="bg-white/5 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs font-medium">کل رکوردهای ثبت شده</span>
          <Award className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-2xl font-extrabold text-white font-morabbaReg mt-2 ss02">
          {totalRecordsCount} <span className="text-xs text-white/50">مورد</span>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs font-medium">وزن ثبت‌شده</span>
          <Scale className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-2xl font-extrabold text-white font-morabbaReg mt-2 ss02">
          {weightKg ? `${weightKg} کیلوگرم` : "ثبت نشده"}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs font-medium">تمرینات کامل‌شده</span>
          <Dumbbell className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-2xl font-extrabold text-white font-morabbaReg mt-2 ss02">
          {completedWorkoutsCount} <span className="text-xs text-white/50">حرکت</span>
        </div>
      </div>
    </div>
  );
}
