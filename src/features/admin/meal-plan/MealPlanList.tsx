"use client";

import { Activity, ShieldAlert } from "lucide-react";
import { showAlert, showConfirm } from "@/utils/alert";
import type { MealPlanData, MealPlanListProps } from "@/types/meal-plan";
import MealPlanItem from "./MealPlanItem";

export default function MealPlanList({
  plans = [],
  loading = false,
  expandedPlanId,
  setExpandedPlanId,
  onEdit,
  mutate,
}: MealPlanListProps) {
  const handleToggleActive = async (plan: MealPlanData) => {
    try {
      const response = await fetch(`/api/admin/meal-plan/${plan._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !plan.isActive }),
      });

      if (response.ok) {
        showAlert({
          title: "موفقیت",
          text: "وضعیت فعال بودن برنامه تغییر یافت.",
          icon: "success",
        });
        mutate?.();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: errorData.error || errorData.message || "خطا در تغییر وضعیت برنامه",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطایی در ارتباط رخ داد.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      title: "آیا مطمئن هستید؟",
      text: "این برنامه غذایی به طور کامل از سیستم حذف خواهد شد!",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });

    if (confirmed) {
      try {
        const response = await fetch(`/api/admin/meal-plan/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showAlert({
            title: "موفقیت",
            text: "برنامه غذایی با موفقیت حذف شد.",
            icon: "success",
          });
          mutate?.();
        } else {
          const errorData = await response.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: errorData.error || errorData.message || "خطا در حذف برنامه غذایی",
            icon: "error",
          });
        }
      } catch {
        showAlert({
          title: "خطا",
          text: "خطایی در برقراری ارتباط با سرور رخ داد.",
          icon: "error",
        });
      }
    }
  };

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
            تعداد کل برنامه‌ها: {plans.length} مورد
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          در حال دریافت لیست برنامه‌های غذایی...
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border border-dashed border-white/10 rounded-2xl text-sm">
          <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-gray-500" />
          هیچ برنامه غذایی یافت نشد.
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <MealPlanItem
              key={plan._id}
              plan={plan}
              isExpanded={expandedPlanId === plan._id}
              onToggleExpand={() =>
                setExpandedPlanId(expandedPlanId === plan._id ? null : plan._id)
              }
              onEdit={onEdit}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
