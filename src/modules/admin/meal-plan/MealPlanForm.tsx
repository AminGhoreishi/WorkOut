"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { X, Utensils } from "lucide-react";
import { showAlert } from "@/utils/alert";
import type { MealPlanFormInputs, PlanMealItem, MealPlanFormProps } from "@/types/meal-plan";
import MealPlanFormFields from "./MealPlanFormFields";

export default function MealPlanForm({
  packages = [],
  foods = [],
  editingPlan,
  onCancel,
  onSubmitSuccess,
}: MealPlanFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MealPlanFormInputs>({
    defaultValues: {
      title: "",
      description: "",
      packageId: "",
      isActive: true,
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  });

  useEffect(() => {
    if (editingPlan) {
      const mapMealItems = (items: PlanMealItem[]) => {
        return items
          .filter((item) => item && item.foodId !== null && item.foodId !== undefined)
          .map((item) => ({
            foodId: item.foodId!._id,
            name: item.foodId!.name,
            quantity: item.quantity,
            unit: item.unit || item.foodId!.unit || "گرم",
          }));
      };

      reset({
        title: editingPlan.title || "",
        description: editingPlan.description || "",
        packageId: editingPlan.packageId?._id || "",
        isActive: editingPlan.isActive !== false,
        breakfast: mapMealItems(editingPlan.breakfast || []),
        lunch: mapMealItems(editingPlan.lunch || []),
        dinner: mapMealItems(editingPlan.dinner || []),
        snack: mapMealItems(editingPlan.snack || []),
      });
    } else {
      reset({
        title: "",
        description: "",
        packageId: "",
        isActive: true,
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      });
    }
  }, [editingPlan, reset]);

  const onSubmit: SubmitHandler<MealPlanFormInputs> = async (data) => {
    try {
      const sanitizeMeal = (items: { foodId: string; quantity: number | string; unit: string }[]) =>
        items.map((item) => ({
          foodId: item.foodId,
          quantity: Number(item.quantity) || 0,
          unit: item.unit,
        }));

      const payload = {
        title: data.title.trim(),
        description: data.description?.trim(),
        packageId: data.packageId,
        isActive: data.isActive,
        breakfast: sanitizeMeal(data.breakfast || []),
        lunch: sanitizeMeal(data.lunch || []),
        dinner: sanitizeMeal(data.dinner || []),
        snack: sanitizeMeal(data.snack || []),
      };

      const url = editingPlan ? `/api/admin/meal-plan/${editingPlan._id}` : "/api/admin/meal-plan";
      const method = editingPlan ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showAlert({
          title: "موفقیت",
          text: editingPlan ? "برنامه غذایی با موفقیت ویرایش شد." : "برنامه غذایی جدید با موفقیت ثبت شد.",
          icon: "success",
        });
        onSubmitSuccess();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: errorData.error || errorData.message || "خطا در ثبت اطلاعات",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطایی در برقراری ارتباط رخ داد.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden font-danaMed" dir="rtl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-morabbaReg">
          <Utensils className="w-5 h-5 text-emerald-400" />
          {editingPlan ? "ویرایش برنامه غذایی" : "ثبت برنامه غذایی جدید"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <MealPlanFormFields
        register={register}
        errors={errors}
        control={control}
        watch={watch}
        packages={packages}
        foods={foods}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
