import { useCallback } from "react";
import type {
  FoodItem,
  MealData,
  NutritionLog,
  UseNutritionActionsParams,
  UseNutritionActionsReturn,
} from "@/types/nutrition";

export default function useNutritionActions({
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
}: UseNutritionActionsParams): UseNutritionActionsReturn {
  const handleDeleteFood = useCallback(
    async (mealType: keyof MealData, itemId: string) => {
      const updatedMeal = (currentMeals[mealType] || []).filter(
        (item) => item.id !== itemId,
      );

      const updatedMealsForDate = {
        ...currentMeals,
        [mealType]: updatedMeal,
      };

      const updatedLog: NutritionLog = {
        _id: logData?._id || "",
        userId,
        date: selectedDate,
        meals: updatedMealsForDate,
        waterIntake: currentWater,
        targetCalories,
        targetProtein: targetMacros.protein,
        targetCarbs: targetMacros.carbs,
        targetFat: targetMacros.fat,
        targetWater,
      };

      mutate(updatedLog, false);

      try {
        const response = await fetch("/api/nutrition", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedDate,
            meals: updatedMealsForDate,
          }),
        });
        if (!response.ok) {
          mutate();
        } else {
          mutate();
        }
      } catch {
        mutate();
      }
    },
    [
      currentMeals,
      currentWater,
      targetCalories,
      targetMacros,
      targetWater,
      logData?._id,
      selectedDate,
      userId,
      mutate,
    ],
  );

  const handleSaveFood = useCallback(
    (newItem: FoodItem) => {
      const updatedMeals = {
        ...currentMeals,
        [activeMealType]: [...(currentMeals[activeMealType] || []), newItem],
      };

      const updatedLog: NutritionLog = {
        _id: logData?._id || "",
        userId,
        date: selectedDate,
        meals: updatedMeals,
        waterIntake: currentWater,
        targetCalories,
        targetProtein: targetMacros.protein,
        targetCarbs: targetMacros.carbs,
        targetFat: targetMacros.fat,
        targetWater,
      };

      mutate(updatedLog, false);
      setIsModalOpen(false);
    },
    [
      currentMeals,
      activeMealType,
      logData?._id,
      userId,
      selectedDate,
      currentWater,
      targetCalories,
      targetMacros,
      targetWater,
      mutate,
      setIsModalOpen,
    ],
  );

  const handleWaterChange = useCallback(
    (newAmount: number) => {
      if (logData) {
        mutate({ ...logData, waterIntake: newAmount }, false);
      } else {
        mutate();
      }
    },
    [logData, mutate],
  );

  return {
    handleDeleteFood,
    handleSaveFood,
    handleWaterChange,
  };
}
