import mongoose, { Document } from "mongoose";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import type { KeyedMutator } from "swr";

export interface Food {
  _id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  unit?: string;
  isActive: boolean;
  type?: "breakfast" | "lunch" | "dinner" | "snack" | "all";
  createdAt?: string;
  updatedAt?: string;
}

export interface MealItem {
  id?: string;
  _id?: string;
  foodId?: string | null;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionLog {
  _id: string;
  userId: string;
  date: string;
  meals: {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
    snack: MealItem[];
  };
  waterIntake: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  targetWater: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFood extends Omit<Food, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IMealItem extends Omit<MealItem, "foodId"> {
  foodId?: mongoose.Types.ObjectId | null;
}

export interface INutritionLog extends Omit<NutritionLog, "_id" | "userId" | "meals" | "createdAt" | "updatedAt">, Document {
  userId: mongoose.Types.ObjectId;
  meals: {
    breakfast: IMealItem[];
    lunch: IMealItem[];
    dinner: IMealItem[];
    snack: IMealItem[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealData {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snack: FoodItem[];
}

export interface NutritionTrackerProps {
  userId: string;
}

export interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMealType: keyof MealData;
  onSaveFood: (newItem: FoodItem) => void;
  userId: string;
  selectedDate: string;
  currentMeals: MealData;
}

export interface MealPlanItem {
  foodId: string | mongoose.Types.ObjectId;
  quantity: string | number;
  unit?: string;
}

export interface MealPlan {
  _id: string;
  userId?: string | mongoose.Types.ObjectId;
  packageId?: string | mongoose.Types.ObjectId;
  title: string;
  description?: string;
  breakfast: MealPlanItem[];
  lunch: MealPlanItem[];
  dinner: MealPlanItem[];
  snack: MealPlanItem[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMealPlan extends Omit<MealPlan, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type ActivityLevel = "low" | "light" | "moderate" | "high" | "extra";
export type CalcGender = "male" | "female";

export interface TargetMacros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface FitnessCalorieCalculatorProps {
  isOpen: boolean;
  onApplyCalorie: (calorie: number, macros?: TargetMacros) => void;
}

export interface EditTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  selectedDate?: string;
  targetCalories: number;
  requiredCalories?: number;
  targetMacros: TargetMacros;
  targetWater: number;
  onSaveTargets: (
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    water: number,
    requiredCalories?: number,
  ) => void;
}

export interface NutritionDateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface NutritionMacrosCardProps {
  dailyTotals: {
    protein: number;
    carbs: number;
    fat: number;
  };
  targetMacros: TargetMacros;
  targetsLoaded: boolean;
}

export interface NutritionCalorieStatsProps {
  consumedCalories: number;
  caloriesRemaining: number;
  calPercent: number;
  targetsLoaded: boolean;
}

export interface NutritionCalorieHeaderProps {
  targetCalories: number;
  targetsLoaded: boolean;
  onEditTarget: () => void;
}

export interface MealsGridProps {
  currentMeals: MealData;
  isLoadingMeals: boolean;
  onDeleteFood: (mealType: keyof MealData, itemId: string) => void;
  onAddFoodClick: (mealType: keyof MealData) => void;
}

export interface WaterTrackerProps {
  selectedDate: string;
  targetWater: number;
  userId: string;
  waterIntake: number;
  onWaterChange: (newAmount: number) => void;
  isLoading: boolean;
}

export interface FoodFormValues {
  manualName: string;
  manualCalories: string;
  foodQuantity: string;
  manualProtein: string;
  manualCarbs: string;
  manualFat: string;
}

export interface FoodFormData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  unit?: string;
  type: "breakfast" | "lunch" | "dinner" | "snack" | "all";
  isActive: boolean;
}

export interface FoodFormProps {
  register: UseFormRegister<FoodFormData>;
  errors: FieldErrors<FoodFormData>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<unknown>;
}

export interface FoodsTableRef {
  refresh: () => void;
}

export interface FoodsTableProps {}

export interface FoodsResponse {
  foods: Food[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface FoodsPaginationProps extends PaginationProps {}

export interface UseNutritionActionsParams {
  userId: string;
  selectedDate: string;
  logData: NutritionLog | null | undefined;
  currentMeals: MealData;
  currentWater: number;
  targetCalories: number;
  targetMacros: TargetMacros;
  targetWater: number;
  activeMealType: keyof MealData;
  mutate: KeyedMutator<NutritionLog | null>;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface UseNutritionActionsReturn {
  handleDeleteFood: (mealType: keyof MealData, itemId: string) => Promise<void>;
  handleSaveFood: (newItem: FoodItem) => void;
  handleWaterChange: (newAmount: number) => void;
}

