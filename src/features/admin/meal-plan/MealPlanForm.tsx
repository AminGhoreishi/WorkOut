"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { X, Utensils } from "lucide-react";
import { showAlert } from "@/utils/alert";
import type {
  MealPlanFormInputs,
  PlanMealItem,
  MealPlanFormProps,
  MealPlanFormItemInput,
} from "@/types/meal-plan";
import MealPlanFormFields from "./MealPlanFormFields";

export default function MealPlanForm({
  packages = [],
  users = [],
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
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      userId: "",
      packageId: "",
      isActive: true,
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  });

  const editingPlanId = editingPlan?._id;

  useEffect(() => {
    if (editingPlan) {
      const mapMealItems = (items: PlanMealItem[]) => {
        return (items || [])
          .filter((item) => item && item.foodId)
          .map((item) => {
            const foodIdStr = typeof item.foodId === "object" ? item.foodId?._id : item.foodId;
            const foodNameStr = typeof item.foodId === "object" ? item.foodId?.name : "";
            const matchedFood = foods.find((f) => String(f._id) === String(foodIdStr));
            return {
              foodId: String(foodIdStr || ""),
              name: foodNameStr || matchedFood?.name || "غذا",
              quantity: item.quantity !== undefined && item.quantity !== null ? String(item.quantity) : "100 گرم",
              unit: item.unit || matchedFood?.unit || "",
            };
          })
          .filter((item) => item.foodId.trim() !== "");
      };

      reset({
        title: editingPlan.title || "",
        description: editingPlan.description || "",
        userId: typeof editingPlan.userId === "object" ? editingPlan.userId?._id : (editingPlan.userId || ""),
        packageId: typeof editingPlan.packageId === "object" ? editingPlan.packageId?._id : (editingPlan.packageId || ""),
        isActive: editingPlan.isActive !== false,
        breakfast: mapMealItems(editingPlan.breakfast || []),
        lunch: mapMealItems(editingPlan.lunch || []),
        dinner: mapMealItems(editingPlan.dinner || []),
        snack: mapMealItems(editingPlan.snack || []),
      });
    }
  }, [editingPlanId]);

  const onSubmit: SubmitHandler<MealPlanFormInputs> = async (data) => {
    try {
      const sanitizeMeal = (items: MealPlanFormItemInput[]) =>
        (items || [])
          .filter((item) => item && item.foodId && String(item.foodId).trim() !== "")
          .map((item) => {
            const rawQty = item.quantity !== undefined && item.quantity !== null ? String(item.quantity).trim() : "100 گرم";
            return {
              foodId: String(item.foodId).trim(),
              quantity: rawQty || "100 گرم",
              unit: item.unit ? String(item.unit).trim() : "",
            };
          });

      const trimmedTitle = data.title ? data.title.trim() : "";
      if (!trimmedTitle || trimmedTitle.length < 2) {
        showAlert({
          title: "خطا",
          text: "عنوان برنامه الزامی است و باید حداقل ۲ کاراکتر باشد.",
          icon: "error",
        });
        return;
      }

      const payload = {
        title: trimmedTitle,
        description: data.description?.trim() || "",
        userId: data.userId && data.userId.trim() !== "" ? data.userId.trim() : null,
        packageId: data.packageId && data.packageId.trim() !== "" ? data.packageId.trim() : null,
        isActive: data.isActive,
        breakfast: sanitizeMeal(data.breakfast),
        lunch: sanitizeMeal(data.lunch),
        dinner: sanitizeMeal(data.dinner),
        snack: sanitizeMeal(data.snack),
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
        users={users}
        foods={foods}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
