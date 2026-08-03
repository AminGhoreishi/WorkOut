"use client";

import { Activity, Search, ShieldAlert } from "lucide-react";
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
  const filteredPlans = plans.filter((plan) =>
    (plan.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (plan.packageId?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden font-danaMed" dir="rtl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-morabbaReg">
            <Activity className="w-5 h-5 text-emerald-400" />
            لیست برنامه‌های غذایی ثبت شده
          </h2>
          <p className="text-gray-400 text-xs mt-1 ss02 font-sans">
            تعداد کل برنامه‌ها: {filteredPlans.length} مورد
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو بر اساس عنوان یا پکیج..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
          />
          <Search className="w-4 h-4 text-gray-500 absolute top-1/2 right-3.5 -translate-y-1/2" />
        </div>
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
