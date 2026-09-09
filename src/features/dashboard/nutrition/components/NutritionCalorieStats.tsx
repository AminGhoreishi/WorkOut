import { memo } from "react";
import { BeatLoader } from "react-spinners";
import type { NutritionCalorieStatsProps } from "@/types/nutrition";

function NutritionCalorieStats({
  consumedCalories,
  caloriesRemaining,
  calPercent,
  targetsLoaded,
  isOverCalorie = false,
  caloriesSurplus = 0,
}: NutritionCalorieStatsProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center rounded-full border-4 ${
            isOverCalorie
              ? "bg-rose-500/5 border-rose-500/20"
              : "bg-amber-500/5 border-amber-500/20"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-full border-4 transition-all duration-500 ${
              isOverCalorie ? "border-rose-400" : "border-amber-400"
            }`}
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${calPercent >= 25 ? "100% 0%" : "50% 0%"}, ${calPercent >= 50 ? "100% 100%" : "50% 0%"}, ${calPercent >= 75 ? "0% 100%" : "50% 0%"}, ${calPercent >= 100 ? "0% 0%" : "50% 0%"}, 50% 0%)`,
              transform: "rotate(-90deg)",
            }}
          />
          <div className="text-center z-10">
            <span
              className={`block text-2xl sm:text-3xl font-extrabold ss02 ${
                isOverCalorie ? "text-rose-400" : "text-amber-400"
              }`}
            >
              {consumedCalories}
            </span>
            <span className="text-neutral-400 text-[10px] sm:text-xs mt-0.5 block">
              مصرف شده
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-neutral-400 text-xs sm:text-sm">
            {isOverCalorie ? "مازاد کالری:" : "باقی‌مانده:"}
          </span>
          {targetsLoaded ? (
            <span
              className={`font-bold text-sm sm:text-lg ss02 ${
                isOverCalorie ? "text-rose-400" : "text-white"
              }`}
            >
              {isOverCalorie
                ? `+${caloriesSurplus} kcal`
                : `${caloriesRemaining} kcal`}
            </span>
          ) : (
            <BeatLoader color="#eab308" size={5} />
          )}
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-neutral-400 text-xs sm:text-sm">
            درصد تکمیل:
          </span>
          {targetsLoaded ? (
            <span
              className={`font-bold text-xs sm:text-base ss02 ${
                isOverCalorie ? "text-rose-400" : "text-amber-400"
              }`}
            >
              {calPercent}%
            </span>
          ) : (
            <BeatLoader color="#eab308" size={4} />
          )}
        </div>
        <div className="flex justify-between items-center pb-2">
          <span className="text-neutral-400 text-xs sm:text-sm">
            رعایت رژیم:
          </span>
          {targetsLoaded ? (
            <span
              className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-semibold ${
                isOverCalorie
                  ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  : calPercent >= 90
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {isOverCalorie
                ? "فراتر از هدف (مازاد)"
                : calPercent >= 90
                  ? "عالی و متعادل"
                  : "کمتر از کالری مورد نیاز"}
            </span>
          ) : (
            <BeatLoader color="#eab308" size={4} />
          )}
        </div>
      </div>
    </>
  );
}

export default memo(NutritionCalorieStats);
