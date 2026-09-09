"use client";

import { useState, useCallback, useTransition } from "react";
import useSWR from "swr";
import {
  Salad,
  Utensils,
} from "lucide-react";
import type {
  MealData,
  NutritionLog,
  NutritionTrackerProps,
  NutritionApiError,
} from "@/types/nutrition";
import type { FitnessProfileApiResponse } from "@/types/fitness-profile";
import WaterTracker from "./components/WaterTracker";
import AddFoodModal from "./components/AddFoodModal";
import EditTargetModal from "./components/EditTargetModal";
import MealsGrid from "./components/MealsGrid";
import NutritionDateSelector from "./components/NutritionDateSelector";
import NutritionMacrosCard from "./components/NutritionMacrosCard";
import NutritionCalorieStats from "./components/NutritionCalorieStats";
import NutritionCalorieHeader from "./NutritionCalorieHeader";
import NutritionError from "./components/NutritionError";
import FitnessProfileNutritionCard from "./components/FitnessProfileNutritionCard";
import useNutritionActions from "@/hooks/useNutritionActions";
import useMidnightDateSync from "@/hooks/useMidnightDateSync";
import useNutritionCalculations from "@/hooks/useNutritionCalculations";
import { getLocalDateString } from "@/utils/date";

const fetcher = async (url: string): Promise<NutritionLog | null> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error: NutritionApiError = new Error(
      errorData.message || "خطا در دریافت اطلاعات تغذیه و کالری‌شمار",
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
};

const profileFetcher = async (
  url: string,
): Promise<FitnessProfileApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) return {};
  return res.json();
};

export default function NutritionTracker({ userId }: NutritionTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    getLocalDateString(0),
  );
  const [isPendingDate, startTransition] = useTransition();

  const handleDateChange = useCallback((newDate: string) => {
    startTransition(() => {
      setSelectedDate(newDate);
    });
  }, []);

  useMidnightDateSync(setSelectedDate);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMealType, setActiveMealType] =
    useState<keyof MealData>("breakfast");
  const [isEditingTarget, setIsEditingTarget] = useState(false);

  const {
    data: logData,
    isLoading: isLoadingMeals,
    error,
    mutate,
  } = useSWR<NutritionLog | null, NutritionApiError>(
    `/api/nutrition?date=${selectedDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      shouldRetryOnError: (err) => err?.status !== 401,
    },
  );

  const { data: profileData, isLoading: isLoadingProfile } =
    useSWR<FitnessProfileApiResponse>(
      "/api/user/fitness-profile",
      profileFetcher,
      { revalidateOnFocus: false },
    );

  const profile = profileData?.profile;

  const {
    targetCalories,
    targetMacros,
    targetWater,
    currentMeals,
    currentWater,
    targetsLoaded,
    dailyTotals,
    isOverCalorie,
    caloriesSurplus,
    caloriesRemaining,
    calPercent,
  } = useNutritionCalculations({
    logData,
    profile,
    isLoadingMeals,
  });

  const {
    handleDeleteFood,
    handleSaveFood,
    handleWaterChange,
    handleSaveTargets,
  } = useNutritionActions({
    userId,
    selectedDate,
    logData,
    currentMeals,
    currentWater,
    targetCalories,
    targetMacros,
    targetWater,
    activeMealType,
    mutate,
    setIsModalOpen,
    setIsEditingTarget,
  });

  const handleAddFoodClick = useCallback((mealType: keyof MealData) => {
    setActiveMealType(mealType);
    setIsModalOpen(true);
  }, []);

  return (
    <div
      className="font-danaMed  pt-4 md:pt-8 bg-neutral-950 min-h-screen text-white"
      dir="rtl"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Salad className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl text-white font-bold font-morabbaReg">
                تغذیه و کالری‌شمار روزانه
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                رهگیری دقیق کالری، درشت‌مغذی‌ها و آب مصرفی
              </p>
            </div>
          </div>

          <NutritionDateSelector
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            isPending={isPendingDate}
          />
        </div>

        <div className={`transition-opacity duration-200 ${isPendingDate ? "opacity-60" : "opacity-100"}`}>
          {error ? (
            <div className="mb-8">
              <NutritionError
                message={error.message}
                isUnauthorized={error.status === 401}
                onRetry={() => mutate()}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                <div className="lg:col-span-8 bg-white/[0.03] border border-amber-500/15 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10" />

                  <NutritionCalorieHeader
                    targetCalories={targetCalories}
                    targetsLoaded={targetsLoaded}
                    onEditTarget={() => setIsEditingTarget(true)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <NutritionCalorieStats
                      consumedCalories={dailyTotals.calories}
                      caloriesRemaining={caloriesRemaining}
                      calPercent={calPercent}
                      targetsLoaded={targetsLoaded}
                      isOverCalorie={isOverCalorie}
                      caloriesSurplus={caloriesSurplus}
                    />

                    <NutritionMacrosCard
                      dailyTotals={dailyTotals}
                      targetMacros={targetMacros}
                      targetsLoaded={targetsLoaded}
                    />
                  </div>
                </div>

                <WaterTracker
                  selectedDate={selectedDate}
                  targetWater={targetWater}
                  userId={userId}
                  waterIntake={currentWater}
                  onWaterChange={handleWaterChange}
                  isLoading={isLoadingMeals}
                />
              </div>

              <h3 className="text-lg sm:text-xl text-white font-bold mb-6 flex items-center gap-2 font-morabbaReg">
                <Utensils className="w-5 h-5 text-amber-400" />
                وعده‌های غذایی امروز
              </h3>

              <MealsGrid
                currentMeals={currentMeals}
                isLoadingMeals={isLoadingMeals}
                onDeleteFood={handleDeleteFood}
                onAddFoodClick={handleAddFoodClick}
              />
            </>
          )}

          <div className="mt-8">
            <FitnessProfileNutritionCard
              profile={profile}
              isLoading={isLoadingProfile}
            />
          </div>
        </div>
      </div>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeMealType={activeMealType}
        onSaveFood={handleSaveFood}
      />

      <EditTargetModal
        isOpen={isEditingTarget}
        onClose={() => setIsEditingTarget(false)}
        userId={userId}
        selectedDate={selectedDate}
        targetCalories={targetCalories > 0 ? targetCalories : 2200}
        targetMacros={targetMacros}
        targetWater={targetWater}
        onSaveTargets={handleSaveTargets}
      />
    </div>
  );
}
