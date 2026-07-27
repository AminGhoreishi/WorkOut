"use client";

import { useState } from "react";
import useSWR from "swr";
import { Plus, Utensils } from "lucide-react";
import { showAlert, showConfirm } from "@/utils/alert";
import type { FoodItem, PackageItem, MealPlanData } from "@/types/meal-plan";
import MealPlanForm from "./MealPlanForm";
import MealPlanList from "./MealPlanList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MealPlansManagement() {
  const {
    data: plansData,
    isLoading: loadingPlans,
    mutate: mutatePlans,
  } = useSWR("/api/admin/meal-plan", fetcher);

  const { data: packagesData } = useSWR("/api/admin/package", fetcher);
  const { data: foodsData } = useSWR("/api/food?all=true", fetcher);

  const plans: MealPlanData[] = plansData?.plans || [];
  const packages: PackageItem[] = packagesData?.packages || [];
  const foods: FoodItem[] = Array.isArray(foodsData) ? foodsData : [];

  const [search, setSearch] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("search") || "";
    }
    return "";
  });
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MealPlanData | null>(null);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const handleEditClick = (plan: MealPlanData) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPlan(null);
  };

  const handleSubmitSuccess = () => {
    setShowForm(false);
    setEditingPlan(null);
    mutatePlans();
  };

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
        showAlert("موفقیت", "وضعیت فعال بودن برنامه تغییر یافت.", "success");
        mutatePlans();
      } else {
        const errorData = await response.json();
        showAlert("خطا", errorData.error || "خطا در تغییر وضعیت برنامه", "error");
      }
    } catch {
      showAlert("خطا", "خطایی در ارتباط رخ داد.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm(
      "آیا مطمئن هستید؟",
      "این برنامه غذایی به طور کامل از سیستم حذف خواهد شد!",
      "بله، حذف شود"
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/admin/meal-plan/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showAlert("موفقیت", "برنامه غذایی با موفقیت حذف شد.", "success");
          mutatePlans();
        } else {
          const errorData = await response.json();
          showAlert("خطا", errorData.error || "خطا در حذف برنامه غذایی", "error");
        }
      } catch {
        showAlert("خطا", "خطایی در برقراری ارتباط با سرور رخ داد.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-danaMed p-4 md:p-8" dir="rtl">
      <div className="container mx-auto pt-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-morabbaReg text-white flex items-center gap-3">
              <Utensils className="w-8 h-8 text-emerald-400" />
              برنامه‌ریزی غذایی پکیج‌ها
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              تعریف برنامه غذایی روزانه (صبحانه، ناهار، شام، میان وعده) برای هر پکیج آموزشی و مربیگری
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={() => {
                setShowForm(true);
                setEditingPlan(null);
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer font-semibold text-sm"
            >
              <Plus className="w-5 h-5" />
              ایجاد برنامه غذایی جدید
            </button>
          )}
        </div>

        {showForm && (
          <MealPlanForm
            packages={packages}
            foods={foods}
            editingPlan={editingPlan}
            onCancel={handleCancelForm}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}

        <MealPlanList
          plans={plans}
          loading={loadingPlans}
          search={search}
          setSearch={setSearch}
          expandedPlanId={expandedPlanId}
          setExpandedPlanId={setExpandedPlanId}
          onEdit={handleEditClick}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
