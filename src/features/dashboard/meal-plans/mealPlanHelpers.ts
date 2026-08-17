import type { PlanMealItem } from "@/types/meal-plan";

export function calculateItemNutrients(item: PlanMealItem) {
  if (!item.foodId) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  }

  const food = item.foodId;
  const unit = item.unit || food.unit || "گرم";
  const multiplier = unit === "گرم" ? item.quantity / 100 : item.quantity;

  return {
    calories: Math.round((food.calories || 0) * multiplier),
    protein: Math.round((food.protein || 0) * multiplier),
    carbs: Math.round((food.carbs || 0) * multiplier),
    fat: Math.round((food.fat || 0) * multiplier),
  };
}

export function calculateMealTotals(items: PlanMealItem[] = []) {
  return items.reduce(
    (acc, item) => {
      const nutrients = calculateItemNutrients(item);
      return {
        calories: acc.calories + nutrients.calories,
        protein: acc.protein + nutrients.protein,
        carbs: acc.carbs + nutrients.carbs,
        fat: acc.fat + nutrients.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
