"use client";

import useSWR from "swr";
import {
  Utensils,
  Coffee,
  Salad,
  Apple,
  Flame,
  Dumbbell,
  Wheat,
  PieChart,
  Calendar,
  AlertCircle,
  Package,
} from "lucide-react";
import type { UserMealPlanResponse, PlanMealItem, MealPlanData } from "@/types/meal-plan";

const fetcher = async (url: string): Promise<UserMealPlanResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات برنامه غذایی");
  }
  return res.json();
};

import MealSection from "./MealSection";
import { calculateMealTotals } from "./mealPlanHelpers";

function MealPlansSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed animate-pulse" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-32 bg-white/5 border border-white/10 rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white/5 border border-white/10 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UserMealPlansManagement() {
  const { data, isLoading, error } = useSWR<UserMealPlanResponse>(
    "/api/user/meal-plan",
    fetcher
  );

  if (isLoading) {
    return <MealPlansSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-8 font-danaMed flex items-center justify-center" dir="rtl">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-md text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
          <h3 className="text-base font-bold mb-1">خطا در دریافت برنامه غذایی</h3>
          <p className="text-xs opacity-80">{error.message}</p>
        </div>
      </div>
    );
  }

  const plan: MealPlanData | null = data?.plan || null;

  if (!plan) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed flex items-center justify-center" dir="rtl">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Utensils className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-morabbaReg text-white">برنامه غذایی فعال یافت نشد</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            در حال حاضر برنامه غذایی اختصاصی برای شما ثبت نشده است. پس از ارسال برنامه توسط مربی، جزئیات وعده‌های غذایی در این بخش قرار می‌گیرد.
          </p>
        </div>
      </div>
    );
  }

  const breakfastTotals = calculateMealTotals(plan.breakfast || []);
  const lunchTotals = calculateMealTotals(plan.lunch || []);
  const dinnerTotals = calculateMealTotals(plan.dinner || []);
  const snackTotals = calculateMealTotals(plan.snack || []);

  const totalDailyCalories =
    breakfastTotals.calories + lunchTotals.calories + dinnerTotals.calories + snackTotals.calories;
  const totalDailyProtein =
    breakfastTotals.protein + lunchTotals.protein + dinnerTotals.protein + snackTotals.protein;
  const totalDailyCarbs =
    breakfastTotals.carbs + lunchTotals.carbs + dinnerTotals.carbs + snackTotals.carbs;
  const totalDailyFat =
    breakfastTotals.fat + lunchTotals.fat + dinnerTotals.fat + snackTotals.fat;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed text-xs sm:text-base" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">کالری کل روزانه</p>
                <p className="text-base sm:text-xl font-bold text-white ss02 mt-0.5">{totalDailyCalories} kcal</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">پروتئین کل</p>
                <p className="text-base sm:text-xl font-bold text-white ss02 mt-0.5">{totalDailyProtein} g</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">کربوهیدرات کل</p>
                <p className="text-base sm:text-xl font-bold text-white ss02 mt-0.5">{totalDailyCarbs} g</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">چربی کل</p>
                <p className="text-base sm:text-xl font-bold text-white ss02 mt-0.5">{totalDailyFat} g</p>
              </div>
            </div>
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
