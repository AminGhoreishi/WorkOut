import { memo } from "react";
import { BeatLoader } from "react-spinners";
import type { NutritionMacrosCardProps } from "@/types/nutrition";

function NutritionMacrosCard({
  dailyTotals,
  targetMacros,
  targetsLoaded,
}: NutritionMacrosCardProps) {
  return (
    <div className="space-y-3 bg-white/5 border border-amber-500/10 rounded-2xl p-4">
      <h4 className="text-neutral-300 text-[10px] sm:text-xs font-semibold mb-2">
        درشت‌مغذی‌ها (Macros)
      </h4>

      <div>
        <div className="flex justify-between text-[10px] sm:text-xs mb-1">
          <span className="text-amber-300">پروتئین (عضله‌ساز)</span>
          <span className="text-neutral-400 flex items-center gap-1 ss02">
            {dailyTotals.protein} /{" "}
            {targetsLoaded ? (
              `${targetMacros.protein}g`
            ) : (
              <BeatLoader color="#eab308" size={4} />
            )}
          </span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
            style={{
              width: `${targetMacros.protein > 0 ? Math.min(100, (dailyTotals.protein / targetMacros.protein) * 100) : 0}%`,
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] sm:text-xs mb-1">
          <span className="text-amber-400">کربوهیدرات (انرژی)</span>
          <span className="text-neutral-400 flex items-center gap-1 ss02">
            {dailyTotals.carbs} /{" "}
            {targetsLoaded ? (
              `${targetMacros.carbs}g`
            ) : (
              <BeatLoader color="#eab308" size={4} />
            )}
          </span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
            style={{
              width: `${targetMacros.carbs > 0 ? Math.min(100, (dailyTotals.carbs / targetMacros.carbs) * 100) : 0}%`,
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] sm:text-xs mb-1">
          <span className="text-yellow-400">چربی (هورمون‌ساز)</span>
          <span className="text-neutral-400 flex items-center gap-1 ss02">
            {dailyTotals.fat} /{" "}
            {targetsLoaded ? (
              `${targetMacros.fat}g`
            ) : (
              <BeatLoader color="#eab308" size={4} />
            )}
          </span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-300"
            style={{
              width: `${targetMacros.fat > 0 ? Math.min(100, (dailyTotals.fat / targetMacros.fat) * 100) : 0}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(NutritionMacrosCard);
