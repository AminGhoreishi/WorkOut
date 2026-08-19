import Link from "next/link";
import { Flame, ClipboardList } from "lucide-react";
import type { NoWorkoutPlanProps } from "@/types/workout";

export default function NoWorkoutPlan({ hasFitnessProfile = false }: NoWorkoutPlanProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-danaMed p-4" dir="rtl">
      <div className="text-center space-y-4 bg-white/[0.03] border border-amber-500/15 p-8 rounded-2xl max-w-md shadow-xl">
        <Flame className="w-12 h-12 text-amber-400/40 mx-auto" />
        <h3 className="text-lg font-bold font-morabbaReg text-white">
          برنامه تمرینی ثبت نشده است
        </h3>
        {hasFitnessProfile ? (
          <p className="text-sm sm:text-xs text-neutral-400">
            مربی در حال حاضر برنامه تمرینی جدیدی برای شما تنظیم نکرده است
          </p>
        ) : (
          <>
            <p className="text-sm sm:text-xs text-neutral-400">
              هنوز برنامه‌ای برای این دوره سرفصل‌بندی یا فعال نشده است.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard/fitness-profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-amber-500/10"
              >
                <ClipboardList className="w-4 h-4" />
                <span>تکمیل یا مشاهده آنالیز ورزشی</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
