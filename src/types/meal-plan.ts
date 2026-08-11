import type mongoose from "mongoose";
import type { Document } from "mongoose";

export interface FoodItem {
  _id: string;
  name: string;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type?: string;
  isActive?: boolean;
}

export interface PackageItem {
  _id: string;
  name: string;
  slug?: string;
}

export interface PlanMealItem {
  foodId: FoodItem | null;
  quantity: number;
  unit?: string;
}

export interface MealPlanData {
  _id: string;
  title: string;
  description?: string;
  userId?: string | any | null;
  packageId?: PackageItem | null;
  isActive: boolean;
  breakfast?: PlanMealItem[];
  lunch?: PlanMealItem[];
  dinner?: PlanMealItem[];
  snack?: PlanMealItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface IMealPlan extends Document {
  title: string;
  description?: string;
  userId?: mongoose.Types.ObjectId;
  packageId?: mongoose.Types.ObjectId;
  isActive: boolean;
  breakfast?: {
    foodId: mongoose.Types.ObjectId;
    quantity: number;
    unit?: string;
  }[];
  lunch?: {
    foodId: mongoose.Types.ObjectId;
    quantity: number;
    unit?: string;
  }[];
  dinner?: {
    foodId: mongoose.Types.ObjectId;
    quantity: number;
    unit?: string;
  }[];
  snack?: {
    foodId: mongoose.Types.ObjectId;
    quantity: number;
    unit?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserItem {
  _id: string;
  fullName?: string;
  username?: string;
  email?: string;
}

export interface MealPlanFormItemInput {
  foodId: string;
  name?: string;
  quantity: number | string;
  unit: string;
}

export interface MealPlanFormInputs {
  title: string;
  description?: string;
  userId?: string;
  packageId?: string;
  isActive: boolean;
  breakfast: MealPlanFormItemInput[];
  lunch: MealPlanFormItemInput[];
  dinner: MealPlanFormItemInput[];
  snack: MealPlanFormItemInput[];
}

export interface MealPlanFormProps {
  packages: PackageItem[];
  users?: UserItem[];
  foods: FoodItem[];
  editingPlan: MealPlanData | null;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export interface MealPlanListProps {
  plans: MealPlanData[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  expandedPlanId: string | null;
  setExpandedPlanId: (id: string | null) => void;
  onEdit: (plan: MealPlanData) => void;
  onToggleActive: (plan: MealPlanData) => void;
  onDelete: (id: string) => void;
}

export interface MealPlanItemProps {
  plan: MealPlanData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: (plan: MealPlanData) => void;
  onToggleActive: (plan: MealPlanData) => void;
  onDelete: (id: string) => void;
}

export interface MealPlanFormFieldsProps {
  register: any;
  errors: any;
  control: any;
  watch: any;
  packages: PackageItem[];
  users?: UserItem[];
  foods: FoodItem[];
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}
