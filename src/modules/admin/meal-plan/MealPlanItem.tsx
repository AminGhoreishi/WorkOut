"use client";

import { Utensils, Eye, EyeOff, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { MealPlanItemProps } from "@/types/meal-plan";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fa-IR");
  } catch {
    return dateStr;
  }
};

export default function MealPlanItem({
  plan,
  isExpanded,
  onToggleExpand,
  onEdit,
  onToggleActive,
  onDelete,
}: MealPlanItemProps) {
  const totalBreakfastFoods = (plan.breakfast || []).length;
  const totalLunchFoods = (plan.lunch || []).length;
  const totalDinnerFoods = (plan.dinner || []).length;
  const totalSnackFoods = (plan.snack || []).length;

  return (
    <div className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl p-5 transition-all space-y-4 font-danaMed">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-morabbaReg">{plan.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">
                پکیج: {plan.packageId?.name || "بدون پکیج"}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[10px] text-gray-400 ss02 font-sans">
                {formatDate(plan.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleActive(plan)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              plan.isActive
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
            }`}
            title={plan.isActive ? "غیرفعال کردن" : "فعال کردن"}
          >
            {plan.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onEdit(plan)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold rounded-xl text-white transition-all cursor-pointer"
          >
            ویرایش برنامه
          </button>
          <button
            type="button"
            onClick={() => onDelete(plan._id)}
            className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onToggleExpand}
            className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 pt-4 space-y-4">
          {plan.description && (
            <p className="text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed">
              <span className="font-semibold text-white block mb-1">توضیحات و توصیه‌های عمومی:</span>
              {plan.description}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "صبحانه", count: totalBreakfastFoods, items: plan.breakfast },
              { name: "ناهار", count: totalLunchFoods, items: plan.lunch },
              { name: "شام", count: totalDinnerFoods, items: plan.dinner },
              { name: "میان وعده", count: totalSnackFoods, items: plan.snack },
            ].map((meal, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center justify-between border-b border-white/10 pb-2">
                  <span>{meal.name}</span>
                  <span className="text-[10px] text-gray-400 ss02 font-sans">({meal.count} غذا)</span>
                </h4>
                {meal.count === 0 ? (
                  <p className="text-[10px] text-gray-500 py-2">غذایی ثبت نشده است.</p>
                ) : (
                  <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-0.5">
                    {meal.items
                      ?.filter((item) => item && item.foodId !== null)
                      .map((item, foodIndex) => (
                        <li key={foodIndex} className="text-xs text-gray-300 flex justify-between gap-2">
                          <span className="truncate">{item.foodId?.name || "غذا"}</span>
                          <span className="text-emerald-400 font-semibold ss02 font-sans text-[11px] shrink-0">
                            {item.quantity} {item.unit || item.foodId?.unit || "گرم"}
                          </span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
