import { memo } from "react";
import Link from "next/link";
import {
  Ruler,
  Weight,
  Target,
  ChevronLeft,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { BeatLoader } from "react-spinners";
import { goalLabels } from "@/utils/fitnessProfile";
import type { FitnessProfileNutritionCardProps } from "@/types/nutrition";

function FitnessProfileNutritionCard({
  profile,
  isLoading,
}: FitnessProfileNutritionCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white/[0.03] border border-amber-500/15 rounded-3xl p-5 mb-8 shadow-xl flex items-center justify-center min-h-[90px]">
        <div className="flex items-center gap-3 text-amber-400 text-xs">
          <span>در حال دریافت اطلاعات پروفایل ورزشی...</span>
          <BeatLoader color="#eab308" size={6} />
        </div>
      </div>
    );
  }

  if (!profile || !profile.heightCm || !profile.weightKg) {
    return (
      <div className="bg-white/[0.03] border border-amber-500/15 rounded-3xl p-5 mb-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white text-sm font-bold font-morabbaReg">
              پروفایل ورزشی شما تکمیل نشده است
            </h4>
            <p className="text-neutral-400 text-xs mt-0.5">
              برای محاسبه دقیق کالری، قد، وزن و هدف تمرینی خود را ثبت کنید.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/fitness-profile"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-lg"
        >
          <span>تکمیل پروفایل ورزشی</span>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const goalText = profile.goal ? goalLabels[profile.goal] || profile.goal : "مشخص نشده";

  return (
    <div className="bg-white/[0.03] border border-amber-500/15 rounded-3xl p-5 mb-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-white text-sm sm:text-base font-bold font-morabbaReg">
              مشخصات ورزشی و بدنی شما
            </h3>
            <p className="text-neutral-400 text-[11px]">
              مشخصات ثبت‌شده در پروفایل ورزشی
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/fitness-profile"
          className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors self-end sm:self-center"
        >
          <span>ویرایش مشخصات</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-neutral-400 block">قد</span>
            <span className="text-sm sm:text-base font-bold text-white ss02">
              {profile.heightCm} <span className="text-[10px] text-neutral-400 font-normal">cm</span>
            </span>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Weight className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-neutral-400 block">وزن</span>
            <span className="text-sm sm:text-base font-bold text-white ss02">
              {profile.weightKg} <span className="text-[10px] text-neutral-400 font-normal">kg</span>
            </span>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Target className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-neutral-400 block">هدف تمرینی</span>
            <span className="text-xs sm:text-sm font-bold text-white truncate block">
              {goalText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FitnessProfileNutritionCard);
