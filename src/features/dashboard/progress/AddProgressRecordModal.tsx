"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, PlusCircle, AlertCircle, Loader2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import type { AddProgressRecordModalProps, NewPRRecordInput } from "@/types/progress";
import { DEFAULT_CATEGORIES, DEFAULT_UNITS } from "@/validators/progress";

export default function AddProgressRecordModal({
  isOpen,
  onClose,
  onSuccess,
  activeTest,
}: AddProgressRecordModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewPRRecordInput>({
    defaultValues: {
      testName: activeTest || "",
      category: "قدرتی",
      value: "",
      unit: "کیلوگرم",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        testName: activeTest || "",
        category: "قدرتی",
        value: "",
        unit: "کیلوگرم",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
      setServerError("");
    }
  }, [isOpen, activeTest, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: NewPRRecordInput) => {
    setServerError("");

    const finalTestName = data.testName.trim();
    if (!finalTestName) {
      setServerError("نام حرکت یا تست ورزشی نمی‌تواند خالی باشد.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/user/pr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          testName: finalTestName,
          value: Number(data.value),
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "خطا در ثبت رکورد جدید");
      }

      reset({
        testName: activeTest || "",
        category: "قدرتی",
        value: "",
        unit: "کیلوگرم",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "خطای غیرمنتظره‌ای رخ داد."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity">
      <div
        className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        dir="rtl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-white">
            <PlusCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold font-morabbaReg">
              ثبت رکورد یا مقدار جدید
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 font-danaMed">
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              نام حرکت یا تست ورزشی <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              placeholder="مثلا: پرس سینه، اسکات، پلانک..."
              {...register("testName", {
                required: "نام حرکت یا تست ورزشی الزامی است.",
              })}
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
            />
            {errors.testName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.testName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1.5 font-medium">
                دسته‌بندی
              </label>
              <select
                {...register("category")}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1.5 font-medium">
                واحد اندازه‌گیری <span className="text-amber-400">*</span>
              </label>
              <select
                {...register("unit")}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {DEFAULT_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1.5 font-medium">
                مقدار ثبت‌شده <span className="text-amber-400">*</span>
              </label>
              <input
                type="number"
                step="any"
                placeholder="مثلا: 80"
                {...register("value", {
                  required: "مقدار رکورد الزامی است.",
                  validate: (val) =>
                    !isNaN(Number(val)) && Number(val) > 0
                      ? true
                      : "مقدار باید یک عدد مثبت باشد.",
                })}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
              />
              {errors.value && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.value.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1.5 font-medium">
                تاریخ ثبت (شمسی) <span className="text-amber-400">*</span>
              </label>
              <Controller
                control={control}
                name="date"
                rules={{ required: "انتخاب تاریخ الزامی است." }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    value={value ? new Date(value) : new Date()}
                    onChange={(date) => {
                      if (date) {
                        const jsDate = date.toDate();
                        const year = jsDate.getFullYear();
                        const month = String(jsDate.getMonth() + 1).padStart(2, "0");
                        const day = String(jsDate.getDate()).padStart(2, "0");
                        onChange(`${year}-${month}-${day}`);
                      } else {
                        onChange("");
                      }
                    }}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    portal
                    className="bg-dark"
                    inputClass="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 text-right cursor-pointer"
                    containerClassName="w-full"
                  />
                )}
              />
              {errors.date && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              توضیحات یا یادداشت (اختیاری)
            </label>
            <textarea
              rows={2}
              placeholder="مثلا: احساس انرژی خوب، ۳ تکرار آخر با کمک..."
              {...register("notes")}
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال ثبت...</span>
                </>
              ) : (
                <span>ذخیره رکورد</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
