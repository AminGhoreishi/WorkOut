"use client";

import { Activity, ShieldAlert, User, X } from "lucide-react";
import type { MealPlanListProps } from "@/types/meal-plan";
import MealPlanItem from "./MealPlanItem";

export default function MealPlanList({
  plans = [],
  loading = false,
  search = "",
  setSearch,
  expandedPlanId,
  setExpandedPlanId,
  onEdit,
  onToggleActive,
  onDelete,
}: MealPlanListProps) {
  const matchingPlans = plans.filter(
    (plan) =>
      (plan.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (plan.packageId?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredPlans = search && matchingPlans.length > 0 ? matchingPlans : plans;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden font-danaMed" dir="rtl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-morabbaReg">
            <Activity className="w-5 h-5 text-emerald-400" />
            لیست برنامه‌های غذایی ثبت شده
          </h2>
          <p className="text-gray-400 text-xs mt-1 ss02">
            تعداد کل برنامه‌ها: {filteredPlans.length} مورد
          </p>
        </div>

        {search ? (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-emerald-400 text-xs sm:text-sm font-danaMed">
            <User className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white/70 font-danaMed">کاربر:</span>
            <span className="font-bold text-emerald-300 truncate max-w-[200px]">{search}</span>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mr-1 p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white cursor-pointer"
              aria-label="پاک کردن فیلتر"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-neutral-400 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
            نمایش تمامی برنامه‌های غذایی
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          در حال دریافت لیست برنامه‌های غذایی...
        </div>
      ) : filteredPlans.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border border-dashed border-white/10 rounded-2xl text-sm">
          <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-gray-500" />
          هیچ برنامه غذایی یافت نشد.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <MealPlanItem
              key={plan._id}
              plan={plan}
              isExpanded={expandedPlanId === plan._id}
              onToggleExpand={() =>
                setExpandedPlanId(expandedPlanId === plan._id ? null : plan._id)
              }
              onEdit={onEdit}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
