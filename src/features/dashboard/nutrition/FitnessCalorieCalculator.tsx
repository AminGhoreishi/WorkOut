import { useState, useEffect } from "react";
import useSWR from "swr";
import { Calculator, RefreshCw } from "lucide-react";
import { calculateNutritionTargets, goalLabels } from "@/utils/fitnessProfile";
import type {
  FitnessCalorieCalculatorProps,
  CalcGender,
} from "@/types/nutrition";
import type {
  FitnessGoal,
  FitnessProfileApiResponse,
} from "@/types/fitness-profile";

const profileFetcher = async (
  url: string,
): Promise<FitnessProfileApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) return {};
  return res.json();
};

export default function FitnessCalorieCalculator({
  isOpen,
  onApplyCalorie,
}: FitnessCalorieCalculatorProps) {
  const [calcGender, setCalcGender] = useState<CalcGender>("male");
  const [calcGoal, setCalcGoal] = useState<FitnessGoal>("muscle_gain");
  const [calcSessions, setCalcSessions] = useState<number>(4);

  const { data: profileData, isLoading: isLoadingProfile } =
    useSWR<FitnessProfileApiResponse>(
      isOpen ? "/api/user/fitness-profile" : null,
      profileFetcher,
      { revalidateOnFocus: false },
    );

  const profile = profileData?.profile;

  useEffect(() => {
    if (profile) {
      if (profile.goal) {
        setCalcGoal(profile.goal);
      }
      if (profile.sessionsPerWeek) {
        setCalcSessions(profile.sessionsPerWeek);
      }
    }
  }, [profile]);

  const weight = profile?.weightKg ? Number(profile.weightKg) : 0;
  const height = profile?.heightCm ? Number(profile.heightCm) : 0;
  const age = profile?.ageYears ? Number(profile.ageYears) : 0;

  const nutrition =
    weight > 0 && height > 0 && age > 0
      ? calculateNutritionTargets(
          weight,
          height,
          age,
          calcSessions,
          calcGoal,
          calcGender,
        )
      : null;

  return (
    <div className="bg-white/5 border border-amber-500/15 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-amber-400 text-xs font-bold flex items-center gap-1.5 font-morabbaReg">
          <Calculator className="w-4 h-4" />
          محاسبه کالری بر اساس پروفایل ورزشی
        </span>
        {isLoadingProfile && (
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
        )}
      </div>

      {nutrition ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-neutral-400 mb-1 text-[10px]">
                جنسیت:
              </label>
              <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setCalcGender("male")}
                  className={`flex-1 py-1 text-[11px] rounded-md transition-all cursor-pointer ${
                    calcGender === "male"
                      ? "bg-amber-500 text-neutral-950 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  مرد
                </button>
                <button
                  type="button"
                  onClick={() => setCalcGender("female")}
                  className={`flex-1 py-1 text-[11px] rounded-md transition-all cursor-pointer ${
                    calcGender === "female"
                      ? "bg-amber-500 text-neutral-950 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  زن
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 text-[10px]">
                هدف تمرینی:
              </label>
              <select
                value={calcGoal}
                onChange={(e) => setCalcGoal(e.target.value as FitnessGoal)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none focus:border-amber-500/50"
              >
                {Object.entries(goalLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-neutral-400 mb-1 text-[10px]">
                جلسات تمرین در هفته:
              </label>
              <select
                value={calcSessions}
                onChange={(e) => setCalcSessions(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none focus:border-amber-500/50"
              >
                <option value={1}>۱ جلسه در هفته (سبک)</option>
                <option value={2}>۲ جلسه در هفته (سبک)</option>
                <option value={3}>۳ جلسه در هفته (متوسط)</option>
                <option value={4}>۴ جلسه در هفته (متوسط)</option>
                <option value={5}>۵ جلسه در هفته (متوسط)</option>
                <option value={6}>۶ جلسه در هفته (سنگین)</option>
                <option value={7}>۷ جلسه در هفته (سنگین)</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-[11px] bg-white/5 px-2.5 py-2 rounded-xl border border-white/5 mt-auto">
              <span className="text-neutral-400">
                قد: <strong className="text-white ss02">{height} cm</strong>
              </span>
              <span className="text-neutral-400">
                وزن: <strong className="text-white ss02">{weight} kg</strong>
              </span>
              <span className="text-neutral-400">
                سن: <strong className="text-white ss02">{age} سال</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center bg-white/5 p-2 rounded-xl border border-white/5 text-[11px]">
            <div>
              <span className="text-neutral-400 block text-[10px]">پروتئین</span>
              <strong className="text-amber-400 ss02">{nutrition.proteinGrams}g</strong>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">کربوهیدرات</span>
              <strong className="text-amber-400 ss02">{nutrition.carbsGrams}g</strong>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">چربی</span>
              <strong className="text-amber-400 ss02">{nutrition.fatGrams}g</strong>
            </div>
          </div>

          <div className="flex items-center justify-between bg-amber-500/15 p-2.5 rounded-xl border border-amber-500/30">
            <div>
              <div className="text-neutral-300 text-[10px]">
                کالری روزانه پیشنهادی:
              </div>
              <div className="text-amber-400 font-extrabold text-sm ss02">
                {nutrition.targetCalories} kcal
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                onApplyCalorie(nutrition.targetCalories, {
                  protein: nutrition.proteinGrams,
                  carbs: nutrition.carbsGrams,
                  fat: nutrition.fatGrams,
                })
              }
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer shadow-md"
            >
              اعمال در اهداف کالری
            </button>
          </div>
        </div>
      ) : (
        <div className="text-neutral-400 text-[11px]">
          اطلاعات قد و وزن در پروفایل ورزشی یافت نشد.
        </div>
      )}
    </div>
  );
}
