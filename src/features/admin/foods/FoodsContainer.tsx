"use client";

import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Apple } from "lucide-react";
import { mutate } from "swr";
import { showAlert } from "@/utils/alert";
import type { FoodFormData, FoodsTableRef } from "@/types/nutrition";
import FoodForm from "./FoodForm";
import FoodsTable from "./FoodsTable";

export default function FoodsContainer() {
  const tableRef = useRef<FoodsTableRef>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FoodFormData>({
    defaultValues: {
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      type: "all",
      isActive: true,
    },
  });

  const onSubmit: SubmitHandler<FoodFormData> = async (data) => {
    try {
      const response = await fetch("/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showAlert({
          title: "موفقیت",
          text: "غذای جدید با موفقیت ثبت شد.",
          icon: "success",
        });
        reset();
        mutate((key) => typeof key === "string" && key.startsWith("/api/food"));
        tableRef.current?.refresh();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: errorData.message || errorData.error || "خطا در ثبت غذا",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطایی در برقراری ارتباط با سرور رخ داد.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black/30 text-white font-danaMed p-4 md:p-8" dir="rtl">
      <div className="container mx-auto pt-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-morabbaReg text-white flex items-center gap-3">
              <Apple className="w-8 h-8 text-emerald-400" />
              مدیریت و ایجاد غذاها
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              ایجاد، دسته‌بندی و تعریف ارزش غذایی اقلام غذایی برای بخش کالری‌شمار روزانه کاربران
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <FoodsTable ref={tableRef} />
          </div>

          <FoodForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
}
