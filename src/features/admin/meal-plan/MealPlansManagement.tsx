"use client";

import { useState } from "react";
import useSWR from "swr";
import { Plus, Utensils } from "lucide-react";
import AppPagination from "@/components/common/AppPagination";
import type { FoodItem, PackageItem, MealPlanData, UserItem, MealPlansApiResponse } from "@/types/meal-plan";
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

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [editingPlan, setEditingPlan] = useState<MealPlanData | null>(null);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const {
    data: plansData,
    isLoading: loadingPlans,
    mutate: mutatePlans,
  } = useSWR<MealPlansApiResponse>(`/api/admin/meal-plan?page=${currentPage}`, fetcher);

  const { data: packagesData } = useSWR<{ packages: PackageItem[] }>("/api/admin/package", fetcher);
  const { data: users = [] } = useSWR<UserItem[]>("/api/admin/subscription/users", fetcher);
  const { data: foods = [] } = useSWR<FoodItem[]>("/api/food?all=true", fetcher);

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
            packages={packagesData?.packages || []}
            users={users}
            foods={foods}
            editingPlan={editingPlan}
            onCancel={handleCancelForm}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}

        <MealPlanList
          plans={plansData?.plans || []}
          loading={loadingPlans}
          expandedPlanId={expandedPlanId}
          setExpandedPlanId={setExpandedPlanId}
          onEdit={handleEditClick}
          mutate={mutatePlans}
        />

        <AppPagination
          currentPage={currentPage}
          totalPages={plansData?.totalPages || 1}
          totalItems={plansData?.total}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
