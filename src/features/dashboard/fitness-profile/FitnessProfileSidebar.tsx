import { Activity, Scale } from "lucide-react";
import {
  GOAL_OPTIONS,
  EXPERIENCE_OPTIONS,
  EQUIPMENT_OPTIONS,
} from "@/constants/onboarding";
import type { FitnessProfileSidebarProps } from "@/types/fitness-profile";

export default function FitnessProfileSidebar({
  profile,
}: FitnessProfileSidebarProps) {
  const height = profile?.heightCm ?? 0;
  const weight = profile?.weightKg ?? 0;
  const age = profile?.ageYears ?? 0;

  const bmi =
    height >= 100 && weight >= 30
      ? parseFloat((weight / ((height / 100) * (height / 100))).toFixed(1))
      : 0;

  const getBmiBadge = (val: number) => {
    if (val === 0) {
      return {
        label: "ثبت نشده",
        className:
          "text-neutral-400 bg-neutral-500/20 border-neutral-500/30",
      };
    }
    if (val < 18.5) {
      return {
        label: "کم‌وزنی",
        className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
    }
    if (val < 25) {
      return {
        label: "نرمال",
        className: "text-amber-300 bg-amber-500/20 border-amber-500/30",
      };
    }
    if (val < 30) {
      return {
        label: "اضافه‌وزن",
        className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
    }
    return {
      label: "چاقی",
      className: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    };
  };

  const bmiBadge = getBmiBadge(bmi);
  const goalLabel =
    GOAL_OPTIONS.find((g) => g.val === profile?.goal)?.label ?? "ثبت نشده";
  const experienceLabel =
    EXPERIENCE_OPTIONS.find((e) => e.val === profile?.trainingExperience)?.label ??
    "ثبت نشده";
  const equipmentLabel =
    EQUIPMENT_OPTIONS.find((eq) => eq.val === profile?.equipment)?.label ??
    "ثبت نشده";

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 flex flex-col items-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -z-10" />

        <div className="w-20 h-20 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-neutral-950">
          <Activity className="w-10 h-10" />
        </div>
        <h2 className="text-xs sm:text-xl font-bold font-morabbaReg text-white">
          پروفایل ورزشی شما
        </h2>
        <p className="text-neutral-400 text-xs mt-1 text-center">
          مشخصات بدنی و ورزشی جهت تنظیم برنامه تمرین
        </p>

        <hr className="border-white/10 w-full my-6" />

        <div className="w-full space-y-4">
          <div className="bg-white/5 border border-amber-500/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm text-neutral-300">شاخص BMI:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-lg font-bold ss02">
                {bmi > 0 ? bmi : "—"}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${bmiBadge.className}`}
              >
                {bmiBadge.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/5 border border-amber-500/10 rounded-xl p-3 text-center">
              <span className="block text-[10px] text-neutral-400">
                قد (CM)
              </span>
              <span className="text-xs sm:text-base font-bold mt-1 block ss02">
                {height > 0 ? height : "—"}
              </span>
            </div>
            <div className="bg-white/5 border border-amber-500/10 rounded-xl p-3 text-center">
              <span className="block text-[10px] text-neutral-400">
                وزن (KG)
              </span>
              <span className="text-xs sm:text-base font-bold mt-1 block ss02">
                {weight > 0 ? weight : "—"}
              </span>
            </div>
            <div className="bg-white/5 border border-amber-500/10 rounded-xl p-3 text-center">
              <span className="block text-[10px] text-neutral-400">
                سن (سال)
              </span>
              <span className="text-xs sm:text-base font-bold mt-1 block ss02">
                {age > 0 ? age : "—"}
              </span>
            </div>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400">هدف ورزشی:</span>
              <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                {goalLabel}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400">سابقه ورزشی:</span>
              <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                {experienceLabel}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400">تجهیزات در دسترس:</span>
              <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                {equipmentLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
