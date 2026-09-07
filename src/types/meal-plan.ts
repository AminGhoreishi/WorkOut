import type mongoose from "mongoose";
import type { Document } from "mongoose";
import type { UseFormRegister, FieldErrors, Control, UseFormWatch, UseFormSetValue } from "react-hook-form";

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
  foodId?: FoodItem | string | null;
  name?: string;
  quantity: string | number;
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
    foodId?: mongoose.Types.ObjectId;
    name?: string;
    quantity: string | number;
    unit?: string;
  }[];
  lunch?: {
    foodId?: mongoose.Types.ObjectId;
    name?: string;
    quantity: string | number;
    unit?: string;
  }[];
  dinner?: {
    foodId?: mongoose.Types.ObjectId;
    name?: string;
    quantity: string | number;
    unit?: string;
  }[];
  snack?: {
    foodId?: mongoose.Types.ObjectId;
    name?: string;
    quantity: string | number;
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
  foodId?: string;
  name: string;
  quantity: string | number;
  unit?: string;
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
  foods?: FoodItem[];
  editingPlan: MealPlanData | null;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export interface MealPlanListProps {
  plans: MealPlanData[];
  loading: boolean;
  search?: string;
  setSearch?: (value: string) => void;
  expandedPlanId: string | null;
  setExpandedPlanId: (id: string | null) => void;
  onEdit: (plan: MealPlanData) => void;
  onToggleActive?: (plan: MealPlanData) => void;
  onDelete?: (id: string) => void;
  mutate?: () => void | Promise<any>;
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
  register: UseFormRegister<MealPlanFormInputs>;
  errors: FieldErrors<MealPlanFormInputs>;
  control: Control<MealPlanFormInputs>;
  setValue?: UseFormSetValue<MealPlanFormInputs>;
  initialUser?: { _id: string; fullName?: string; username?: string } | null;
  watch?: UseFormWatch<MealPlanFormInputs>;
  packages?: PackageItem[];
  users?: UserItem[];
  foods?: FoodItem[];
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface MealPlansApiResponse {
  plans: MealPlanData[];
  total?: number;
  totalPages?: number;
  page?: number;
}

export interface UserMealPlanResponse {
  success: boolean;
  plan: MealPlanData | null;
  hasSubscription?: boolean;
  message?: string;
}

export interface MealSectionProps {
  title: string;
  icon: React.ElementType;
  items: PlanMealItem[];
  badgeColor: string;
}

export interface MealPlanApiError extends Error {
  status?: number;
}

export interface MealPlansErrorProps {
  message?: string;
  isUnauthorized?: boolean;
}

export interface MealPlansEmptyProps {
  hasSubscription?: boolean;
  message?: string;
}
