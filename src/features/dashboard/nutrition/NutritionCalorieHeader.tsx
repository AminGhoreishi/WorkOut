import { memo } from "react";
import { Flame, Edit2 } from "lucide-react";
import { BeatLoader } from "react-spinners";
import type { NutritionCalorieHeaderProps } from "@/types/nutrition";

function NutritionCalorieHeader({
  targetCalories,
  targetsLoaded,
  onEditTarget,
}: NutritionCalorieHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-base sm:text-lg text-white font-bold flex items-center gap-2 font-morabbaReg">
          <Flame className="w-5 h-5 text-amber-400" />
          وضعیت کالری روزانه
        </h3>
        <p className="text-neutral-400 text-[10px] sm:text-xs mt-1">
          ترازو و تحلیل کالری‌های وارد شده
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          if (targetsLoaded) onEditTarget();
        }}
        disabled={!targetsLoaded}
        className="text-left flex flex-col items-end group hover:opacity-85 transition-all cursor-pointer border-none bg-transparent p-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-1">
          {targetsLoaded ? (
            <span className="text-xl sm:text-2xl font-extrabold text-amber-400 ss02">
              {targetCalories > 0 ? targetCalories : "وارد نشده"}
            </span>
          ) : (
            <BeatLoader color="#eab308" size={6} />
          )}
          <Edit2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
        </div>
        <span className="text-neutral-400 text-[10px] sm:text-xs">
          کالری هدف (کلیک برای ویرایش)
        </span>
      </button>
    </div>
  );
}

export default memo(NutritionCalorieHeader);
