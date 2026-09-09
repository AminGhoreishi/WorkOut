import { useCallback } from "react";
import type {
  FoodItem,
  MealData,
  UseNutritionActionsParams,
  UseNutritionActionsReturn,
} from "@/types/nutrition";

export default function useNutritionActions({
  userId,
  selectedDate,
  currentMeals,
  currentWater,
  targetCalories,
  targetMacros,
  targetWater,
  activeMealType,
  mutate,
  setIsModalOpen,
  setIsEditingTarget,
}: UseNutritionActionsParams): UseNutritionActionsReturn {
  const handleDeleteFood = useCallback(
    async (mealType: keyof MealData, itemId: string) => {
      await mutate(
        async (currentCache) => {
          const baseMeals = currentCache?.meals || currentMeals;
          const currentList = baseMeals[mealType] || [];
          const updatedMeal = currentList.filter((item) => {
            const currentId = item.id || (item as { _id?: string })._id;
            return currentId !== itemId;
          });
          const updatedMealsForDate = {
            ...baseMeals,
            [mealType]: updatedMeal,
          };

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
            throw new Error("خطا در حذف غذا");
          }
          return response.json();
        },
        {
          optimisticData: (current) => {
            if (!current) return null;
            const baseMeals = current.meals || currentMeals;
            const currentList = baseMeals[mealType] || [];
            const updatedMeal = currentList.filter((item) => {
              const currentId = item.id || (item as { _id?: string })._id;
              return currentId !== itemId;
            });
            return {
              ...current,
              meals: {
                ...baseMeals,
                [mealType]: updatedMeal,
              },
            };
          },
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      );
    },
    [currentMeals, selectedDate, mutate],
  );

  const handleSaveFood = useCallback(
    async (newItem: FoodItem) => {
      setIsModalOpen(false);

      await mutate(
        async (currentCache) => {
          const baseMeals = currentCache?.meals || currentMeals;
          const updatedMeals = {
            ...baseMeals,
            [activeMealType]: [...(baseMeals[activeMealType] || []), newItem],
          };

          const response = await fetch("/api/nutrition", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: selectedDate,
              meals: updatedMeals,
            }),
          });
          if (!response.ok) {
            throw new Error("خطا در ذخیره غذا");
          }
          return response.json();
        },
        {
          optimisticData: (current) => {
            const baseMeals = current?.meals || currentMeals;
            const updatedMeals = {
              ...baseMeals,
              [activeMealType]: [...(baseMeals[activeMealType] || []), newItem],
            };
            return {
              _id: current?._id || "",
              userId,
              date: selectedDate,
              meals: updatedMeals,
              waterIntake: current?.waterIntake ?? currentWater,
              targetCalories: current?.targetCalories ?? targetCalories,
              targetProtein: current?.targetProtein ?? targetMacros.protein,
              targetCarbs: current?.targetCarbs ?? targetMacros.carbs,
              targetFat: current?.targetFat ?? targetMacros.fat,
              targetWater: current?.targetWater ?? targetWater,
            };
          },
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      );
    },
    [
      currentMeals,
      activeMealType,
      selectedDate,
      userId,
      currentWater,
      targetCalories,
      targetMacros,
      targetWater,
      mutate,
      setIsModalOpen,
    ],
  );

  const handleWaterChange = useCallback(
    async (newAmount: number) => {
      await mutate(
        async () => {
          const response = await fetch("/api/nutrition", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: selectedDate,
              waterIntake: newAmount,
            }),
          });
          if (!response.ok) {
            throw new Error("خطا در ثبت آب");
          }
          return response.json();
        },
        {
          optimisticData: (current) => {
            return {
              _id: current?._id || "",
              userId,
              date: selectedDate,
              meals: current?.meals || currentMeals,
              waterIntake: newAmount,
              targetCalories: current?.targetCalories ?? targetCalories,
              targetProtein: current?.targetProtein ?? targetMacros.protein,
              targetCarbs: current?.targetCarbs ?? targetMacros.carbs,
              targetFat: current?.targetFat ?? targetMacros.fat,
              targetWater: current?.targetWater ?? targetWater,
            };
          },
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      );
    },
    [
      selectedDate,
      userId,
      currentMeals,
      targetCalories,
      targetMacros,
      targetWater,
      mutate,
    ],
  );

  const handleSaveTargets = useCallback(
    async (
      calories: number,
      protein: number,
      carbs: number,
      fat: number,
      water: number,
      reqCalories?: number,
    ) => {
      setIsEditingTarget?.(false);

      await mutate(
        async () => {
          const response = await fetch("/api/nutrition", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tempTargetCalories: calories,
              tempRequiredCalories: reqCalories ?? calories,
              tempTargetProtein: protein,
              tempTargetCarbs: carbs,
              tempTargetFat: fat,
              tempTargetWater: water,
              date: selectedDate,
            }),
          });
          if (!response.ok) {
            throw new Error("خطا در ذخیره اهداف");
          }
          return response.json();
        },
        {
          optimisticData: (current) => {
            return {
              _id: current?._id || "",
              userId,
              date: selectedDate,
              meals: current?.meals || currentMeals,
              waterIntake: current?.waterIntake ?? currentWater,
              targetCalories: calories,
              targetProtein: protein,
              targetCarbs: carbs,
              targetFat: fat,
              targetWater: water,
            };
          },
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      );
    },
    [
      selectedDate,
      userId,
      currentMeals,
      currentWater,
      mutate,
      setIsEditingTarget,
    ],
  );

  return {
    handleDeleteFood,
    handleSaveFood,
    handleWaterChange,
    handleSaveTargets,
  };
}
