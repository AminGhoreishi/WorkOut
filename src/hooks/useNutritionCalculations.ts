import { useMemo } from "react";
import { calculateNutritionTargets } from "@/utils/fitnessProfile";
import type {
  FoodItem,
  MealData,
  MealItem,
  UseNutritionCalculationsParams,
  UseNutritionCalculationsReturn,
} from "@/types/nutrition";

export default function useNutritionCalculations({
  logData,
  profile,
  isLoadingMeals,
}: UseNutritionCalculationsParams): UseNutritionCalculationsReturn {
  const calculatedNutrition = useMemo(() => {
    if (profile?.weightKg && profile?.heightCm && profile?.ageYears) {
      return calculateNutritionTargets(
        Number(profile.weightKg),
        Number(profile.heightCm),
        Number(profile.ageYears),
        profile.sessionsPerWeek || 4,
        profile.goal || "muscle_gain",
        profile.gender || "male",
      );
    }
    return null;
  }, [profile]);

  const targetCalories =
    logData?.targetCalories && logData.targetCalories > 0
      ? logData.targetCalories
      : (calculatedNutrition?.targetCalories ?? 0);

  const targetMacros = useMemo(
    () => ({
      protein:
        logData?.targetProtein ||
        calculatedNutrition?.proteinGrams ||
        140,
      carbs:
        logData?.targetCarbs ||
        calculatedNutrition?.carbsGrams ||
        240,
      fat:
        logData?.targetFat ||
        calculatedNutrition?.fatGrams ||
        70,
    }),
    [
      logData?.targetProtein,
      logData?.targetCarbs,
      logData?.targetFat,
      calculatedNutrition,
    ],
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

  const isOverCalorie =
    targetCalories > 0 && dailyTotals.calories > targetCalories;
  const caloriesSurplus = isOverCalorie
    ? dailyTotals.calories - targetCalories
    : 0;
  const caloriesRemaining = Math.max(0, targetCalories - dailyTotals.calories);
  const calPercent =
    targetCalories > 0
      ? Math.round((dailyTotals.calories / targetCalories) * 100)
      : 0;

  return {
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
    calculatedNutrition,
  };
}
