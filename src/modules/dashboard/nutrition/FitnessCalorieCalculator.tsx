import { useState } from "react";
import useSWR from "swr";
import { Calculator, RefreshCw } from "lucide-react";
import type {
  FitnessCalorieCalculatorProps,
  ActivityLevel,
  CalcGender,
} from "@/types/nutrition";
import type { FitnessProfileApiResponse } from "@/types/fitness-profile";

const activityMultipliers: Record<ActivityLevel, number> = {
  low: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  extra: 1.9,
};

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
  const [calcActivity, setCalcActivity] = useState<ActivityLevel>("light");

  const { data: profileData, isLoading: isLoadingProfile } =
    useSWR<FitnessProfileApiResponse>(
      isOpen ? "/api/user/fitness-profile" : null,
      profileFetcher,
      { revalidateOnFocus: false },
    );

  const profile = profileData?.profile;
  const weight = profile?.weightKg;
  const height = profile?.heightCm;
  const age = profile?.ageYears;

  let bmr = 0;
  let calculatedCalories = 0;

  if (weight && height && age) {
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    if (w > 0 && h > 0 && a > 0) {
      if (calcGender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      calculatedCalories = Math.round(bmr * activityMultipliers[calcActivity]);
    }
  }

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

      {weight && height && age ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
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
                ضریب فعالیت:
              </label>
              <select
                value={calcActivity}
                onChange={(e) =>
                  setCalcActivity(e.target.value as ActivityLevel)
                }
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none focus:border-amber-500/50"
              >
                <option value="low">کم (1.2)</option>
                <option value="light">سبک (1.375)</option>
                <option value="moderate">متوسط (1.55)</option>
                <option value="high">زیاد (1.725)</option>
                <option value="extra">خیلی زیاد (1.9)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] bg-white/5 p-2 rounded-xl border border-white/5">
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

          {calculatedCalories > 0 && (
            <div className="flex items-center justify-between bg-amber-500/15 p-2.5 rounded-xl border border-amber-500/30">
              <div>
                <div className="text-neutral-300 text-[10px]">
                  کالری روزانه محاسباتی:
                </div>
                <div className="text-amber-400 font-extrabold text-sm ss02">
                  {calculatedCalories} kcal
                </div>
              </div>
              <button
                type="button"
                onClick={() => onApplyCalorie(calculatedCalories)}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer shadow-md"
              >
                اعمال در کالری مورد نیاز
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-neutral-400 text-[11px]">
          اطلاعات قد و وزن در پروفایل ورزشی یافت نشد.
        </div>
      )}
    </div>
  );
}
