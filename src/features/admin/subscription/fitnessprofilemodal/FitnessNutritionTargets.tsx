import { Flame } from "lucide-react";
import type { FitnessNutritionTargetsProps } from "@/types/fitness-profile";

export default function FitnessNutritionTargets({
  nutrition,
}: FitnessNutritionTargetsProps) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/5 to-white/5 border border-amber-500/20 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-morabbaReg">
              کالری و درشت‌مغذی‌های پیشنهادی شاگرد
            </h3>
            <p className="text-[11px] text-white/50 ss02">
              فرمول میفلین سنت ژور بر اساس سطح فعالیت و هدف تمرینی
            </p>
          </div>
        </div>
        <div className="text-right sm:text-left bg-black/20 sm:bg-transparent p-2 sm:p-0 rounded-xl">
          <span className="text-xs text-white/50 block">کالری پیشنهادی روزانه</span>
          <span className="text-xl font-bold text-amber-400 ss02">
            {nutrition.targetCalories.toLocaleString("fa-IR")}{" "}
            <span className="text-xs font-normal text-white/60">kcal</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-black/30 border border-white/5">
          <span className="text-[11px] text-white/50 block">متابولیسم پایه (BMR)</span>
          <span className="text-sm font-bold text-white ss02">
            {nutrition.bmr.toLocaleString("fa-IR")}{" "}
            <span className="text-[10px] text-white/40">kcal</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-black/30 border border-white/5">
          <span className="text-[11px] text-white/50 block">کالری مصرف روزانه (TDEE)</span>
          <span className="text-sm font-bold text-white ss02">
            {nutrition.tdee.toLocaleString("fa-IR")}{" "}
            <span className="text-[10px] text-white/40">kcal</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-black/30 border border-white/5 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-white/50 block">تعدیل هدف</span>
          <span
            className={`text-sm font-bold ss02 ${
              nutrition.surplusOrDeficit > 0
                ? "text-emerald-400"
                : nutrition.surplusOrDeficit < 0
                ? "text-rose-400"
                : "text-white"
            }`}
          >
            {nutrition.surplusOrDeficit > 0
              ? `+${nutrition.surplusOrDeficit} مازاد (عضله‌سازی)`
              : nutrition.surplusOrDeficit < 0
              ? `${nutrition.surplusOrDeficit} کسری (کاهش وزن)`
              : "تثبیت وزن"}
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>تفکیک درشت‌مغذی‌ها (Macronutrients)</span>
          <span className="text-[11px] text-white/40 ss02">
            پروتئین {nutrition.proteinPercent}٪ | کربوهیدرات {nutrition.carbsPercent}٪ | چربی {nutrition.fatPercent}٪
          </span>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${nutrition.proteinPercent}%` }}
            className="bg-emerald-500 h-full"
            title={`پروتئین ${nutrition.proteinPercent}%`}
          />
          <div
            style={{ width: `${nutrition.carbsPercent}%` }}
            className="bg-amber-400 h-full"
            title={`کربوهیدرات ${nutrition.carbsPercent}%`}
          />
          <div
            style={{ width: `${nutrition.fatPercent}%` }}
            className="bg-sky-400 h-full"
            title={`چربی ${nutrition.fatPercent}%`}
          />
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="text-[11px] text-emerald-400 block font-semibold">پروتئین (۲g/kg)</span>
            <span className="text-base font-bold text-white ss02 block">
              {nutrition.proteinGrams} <span className="text-[10px] text-white/60">گرم</span>
            </span>
            <span className="text-[10px] text-white/40 ss02 block">
              {nutrition.proteinKcal} kcal
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <span className="text-[11px] text-amber-400 block font-semibold">کربوهیدرات</span>
            <span className="text-base font-bold text-white ss02 block">
              {nutrition.carbsGrams} <span className="text-[10px] text-white/60">گرم</span>
            </span>
            <span className="text-[10px] text-white/40 ss02 block">
              {nutrition.carbsKcal} kcal
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
            <span className="text-[11px] text-sky-400 block font-semibold">چربی (۱g/kg)</span>
            <span className="text-base font-bold text-white ss02 block">
              {nutrition.fatGrams} <span className="text-[10px] text-white/60">گرم</span>
            </span>
            <span className="text-[10px] text-white/40 ss02 block">
              {nutrition.fatKcal} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
