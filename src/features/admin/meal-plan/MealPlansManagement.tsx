"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Plus, Utensils } from "lucide-react";
import { showAlert, showConfirm } from "@/utils/alert";
import type { FoodItem, PackageItem, MealPlanData, UserItem } from "@/types/meal-plan";
import MealPlanForm from "./MealPlanForm";
import MealPlanList from "./MealPlanList";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در برقراری ارتباط");
  }
  return res.json();
};

export default function MealPlansManagement() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("user") || searchParams.get("userId") || searchParams.get("search") || "";

  const {
    data: plansData,
    isLoading: loadingPlans,
    mutate: mutatePlans,
  } = useSWR<{ plans: MealPlanData[] }>("/api/admin/meal-plan", fetcher);

  const { data: packagesData } = useSWR<{ packages: PackageItem[] }>("/api/admin/package", fetcher);
  const { data: usersData } = useSWR<{ users: UserItem[] }>("/api/admin/subscription/users", fetcher);
  const { data: foodsData } = useSWR<FoodItem[]>("/api/food?all=true", fetcher);

  const plans: MealPlanData[] = plansData?.plans || [];
  const packages: PackageItem[] = packagesData?.packages || [];
  const users: UserItem[] = usersData?.users || [];
  const foods: FoodItem[] = Array.isArray(foodsData) ? foodsData : (foodsData as any)?.foods || [];

  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const currentSearch =
      searchParams.get("user") ||
      searchParams.get("userId") ||
      searchParams.get("search") ||
      "";
    setSearch(currentSearch);
  }, [searchParams]);
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
        showAlert({
          title: "موفقیت",
          text: "وضعیت فعال بودن برنامه تغییر یافت.",
          icon: "success",
        });
        mutatePlans();
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
          mutatePlans();
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
    <div className="min-h-screen bg-black/30 text-white font-danaMed p-4 md:p-8" dir="rtl">
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
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer text-sm"
            >
              <Plus className="w-5 h-5" />
              ایجاد برنامه غذایی جدید
            </button>
          )}
        </div>

        {showForm && (
          <MealPlanForm
            packages={packages}
            users={users}
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
