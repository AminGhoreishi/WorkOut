import type { MealSectionProps } from "@/types/meal-plan";
import { calculateItemNutrients, calculateMealTotals } from "./mealPlanHelpers";

export default function MealSection({
  title,
  icon: Icon,
  items = [],
  badgeColor,
}: MealSectionProps) {
  const totals = calculateMealTotals(items);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between font-danaMed" dir="rtl">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${badgeColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-morabbaReg">{title}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{items.length} آیتم غذایی</p>
            </div>
          </div>
          <div className="text-left">
            <span className="text-sm font-bold text-amber-400 ss02">{totals.calories}</span>
            <span className="text-xs text-neutral-400 mr-1">کالری</span>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-xs text-neutral-500 py-6 text-center">آیتمی برای این وعده ثبت نشده است.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const nutrients = calculateItemNutrients(item);
              const foodName = item.foodId?.name || "ماده غذایی نامشخص";
              const unit = item.unit || item.foodId?.unit || "";

              return (
                <div
                  key={index}
                  className="bg-white/[0.03] border border-white/5 hover:border-amber-500/20 p-3.5 rounded-xl flex items-center justify-between transition-all"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">{foodName}</h4>
                    <p className="text-xs text-neutral-400 ss02">
                      مقدار: {item.quantity} {unit}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs ss02">
                    <span className="text-neutral-300 font-semibold">{nutrients.calories} کالری</span>
                    <div className="hidden sm:flex items-center gap-2 text-neutral-400 border-r border-white/10 pr-3">
                      <span>P: {nutrients.protein}g</span>
                      <span>C: {nutrients.carbs}g</span>
                      <span>F: {nutrients.fat}g</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-around text-xs text-neutral-400 ss02">
          <span>پروتئین: <strong className="text-amber-400">{totals.protein}g</strong></span>
          <span>کربوهیدرات: <strong className="text-amber-400">{totals.carbs}g</strong></span>
          <span>چربی: <strong className="text-amber-400">{totals.fat}g</strong></span>
        </div>
      )}
    </div>
  );
}
