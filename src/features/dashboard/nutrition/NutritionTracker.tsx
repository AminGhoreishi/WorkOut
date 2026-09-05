"use client";

import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import {
  Salad,
  Utensils,
} from "lucide-react";
import type {
  FoodItem,
  MealData,
  MealItem,
  NutritionLog,
  NutritionTrackerProps,
} from "@/types/nutrition";
import WaterTracker from "./components/WaterTracker";
import AddFoodModal from "./components/AddFoodModal";
import EditTargetModal from "./components/EditTargetModal";
import MealsGrid from "./components/MealsGrid";
import NutritionDateSelector from "./components/NutritionDateSelector";
import NutritionMacrosCard from "./components/NutritionMacrosCard";
import NutritionCalorieStats from "./components/NutritionCalorieStats";
import NutritionCalorieHeader from "./NutritionCalorieHeader";
import useNutritionActions from "@/hooks/useNutritionActions";
import { getLocalDateString } from "@/utils/date";

const fetcher = async (url: string): Promise<NutritionLog | null> => {
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export default function NutritionTracker({ userId }: NutritionTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    getLocalDateString(0),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMealType, setActiveMealType] =
    useState<keyof MealData>("breakfast");
  const [isEditingTarget, setIsEditingTarget] = useState(false);

  const {
    data: logData,
    isLoading: isLoadingMeals,
    mutate,
  } = useSWR<NutritionLog | null>(
    `/api/nutrition?date=${selectedDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  const targetCalories = logData?.targetCalories ?? 0;
  const targetMacros = useMemo(
    () => ({
      protein: logData?.targetProtein ?? 140,
      carbs: logData?.targetCarbs ?? 240,
      fat: logData?.targetFat ?? 70,
    }),
    [logData?.targetProtein, logData?.targetCarbs, logData?.targetFat],
  );
  const targetWater = logData?.targetWater ?? 2500;

  const currentMeals = useMemo<MealData>(() => {
    if (!logData || !logData.meals) {
      return {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      };
    }

    const mapItems = (items: MealItem[] = []): FoodItem[] =>
      items.map((item, idx) => ({
        id: item.id || item._id || `item-${idx}`,
        name: item.name || "",
        quantity: item.quantity || 1,
        unit: item.unit || "واحد",
        calories: item.calories || 0,
        protein: item.protein || 0,
        carbs: item.carbs || 0,
        fat: item.fat || 0,
      }));

    return {
      breakfast: mapItems(logData.meals.breakfast),
      lunch: mapItems(logData.meals.lunch),
      dinner: mapItems(logData.meals.dinner),
      snack: mapItems(logData.meals.snack),
    };
  }, [logData]);

  const currentWater = logData?.waterIntake ?? 0;
  const targetsLoaded = !isLoadingMeals;

  const dailyTotals = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    Object.values(currentMeals).forEach((mealItems) => {
      (mealItems || []).forEach((item: FoodItem) => {
        calories += item.calories || 0;
        protein += item.protein || 0;
        carbs += item.carbs || 0;
        fat += item.fat || 0;
      });
    });

    return {
      calories: Math.round(calories),
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10,
    };
  }, [currentMeals]);

  const caloriesRemaining = Math.max(0, targetCalories - dailyTotals.calories);
  const calPercent =
    targetCalories > 0
      ? Math.min(100, Math.round((dailyTotals.calories / targetCalories) * 100))
      : 0;

  const { handleDeleteFood, handleSaveFood, handleWaterChange } =
    useNutritionActions({
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
            onDateChange={setSelectedDate}
          />
        </div>

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
      </div>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeMealType={activeMealType}
        onSaveFood={handleSaveFood}
        userId={userId}
        selectedDate={selectedDate}
        currentMeals={currentMeals}
      />

      <EditTargetModal
        isOpen={isEditingTarget}
        onClose={() => setIsEditingTarget(false)}
        userId={userId}
        selectedDate={selectedDate}
        targetCalories={targetCalories > 0 ? targetCalories : 2200}
        targetMacros={targetMacros}
        targetWater={targetWater}
        onSaveTargets={(calories, protein, carbs, fat, water) => {
          mutate(
            (prev) => ({
              _id: prev?._id || "",
              userId,
              date: selectedDate,
              meals: prev?.meals || {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: [],
              },
              waterIntake: prev?.waterIntake || 0,
              targetCalories: calories,
              targetProtein: protein,
              targetCarbs: carbs,
              targetFat: fat,
              targetWater: water,
            }),
            false,
          );
          setIsEditingTarget(false);
        }}
      />
    </div>
  );
}
