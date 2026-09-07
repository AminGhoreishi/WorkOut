"use client";

import useSWR from "swr";
import {
  Utensils,
  Coffee,
  Salad,
  Apple,
  Package,
} from "lucide-react";
import type { UserMealPlanResponse, MealPlanData } from "@/types/meal-plan";
import MealSection from "./MealSection";
import MealPlansSkeleton from "./MealPlansSkeleton";
import MealPlansError from "./MealPlansError";
import MealPlansEmpty from "./MealPlansEmpty";

const fetcher = async (url: string): Promise<UserMealPlanResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات برنامه غذایی");
  }
  return res.json();
};

export default function UserMealPlansManagement() {
  const { data, isLoading, error } = useSWR<UserMealPlanResponse>(
    "/api/user/meal-plan",
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return <MealPlansSkeleton />;
  }

  if (error) {
    return <MealPlansError message={error.message} />;
  }

  const plan: MealPlanData | null = data?.plan || null;

  if (!plan) {
    return (
      <MealPlansEmpty
        hasSubscription={data?.hasSubscription}
        message={data?.message}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed text-xs sm:text-base" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                <Utensils className="w-3.5 h-3.5" />
                برنامه تغذیه اختصاصی
              </span>
              <h1 className="text-xl sm:text-3xl font-bold font-morabbaReg text-white">{plan.title}</h1>
              {plan.description && (
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">{plan.description}</p>
              )}
            </div>

            {plan.packageId && (
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-amber-400">
                <Package className="w-4 h-4" />
                <span>پکیج: {plan.packageId.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MealSection
            title="صبحانه"
            icon={Coffee}
            items={plan.breakfast || []}
            badgeColor="text-yellow-400"
          />
          <MealSection
            title="ناهار"
            icon={Utensils}
            items={plan.lunch || []}
            badgeColor="text-orange-400"
          />
          <MealSection
            title="شام"
            icon={Salad}
            items={plan.dinner || []}
            badgeColor="text-emerald-400"
          />
          <MealSection
            title="میان‌وعده"
            icon={Apple}
            items={plan.snack || []}
            badgeColor="text-pink-400"
          />
        </div>
      </div>
    </div>
  );
}
