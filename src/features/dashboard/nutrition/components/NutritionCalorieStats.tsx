import { memo } from "react";
import { BeatLoader } from "react-spinners";
import type { NutritionCalorieStatsProps } from "@/types/nutrition";

function NutritionCalorieStats({
  consumedCalories,
  caloriesRemaining,
  calPercent,
  targetsLoaded,
}: NutritionCalorieStatsProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center rounded-full bg-amber-500/5 border-4 border-amber-500/20">
          <div
            className="absolute inset-0 rounded-full border-4 border-amber-400 transition-all duration-500"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${calPercent >= 25 ? "100% 0%" : "50% 0%"}, ${calPercent >= 50 ? "100% 100%" : "50% 0%"}, ${calPercent >= 75 ? "0% 100%" : "50% 0%"}, ${calPercent >= 100 ? "0% 0%" : "50% 0%"}, 50% 0%)`,
              transform: "rotate(-90deg)",
            }}
          />
          <div className="text-center z-10">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 ss02">
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
            باقی‌مانده:
          </span>
          {targetsLoaded ? (
            <span className="text-white font-bold text-sm sm:text-lg ss02">
              {caloriesRemaining} kcal
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
            <span className="text-amber-400 font-bold text-xs sm:text-base ss02">
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
                calPercent > 105
                  ? "bg-amber-500/20 text-amber-400"
                  : calPercent >= 90
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {calPercent > 105
                ? "فراتر از حد مجاز"
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
