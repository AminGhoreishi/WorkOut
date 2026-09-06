"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import { X, Loader2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { showAlert } from "@/utils/alert";
import type { CreatePRModalProps, PRFormInput, TestMetricItem } from "@/types/pr";
import { DEFAULT_CATEGORIES, DEFAULT_UNITS } from "@/validators/progress";
import { CATEGORY_MAP, UNIT_MAP } from "@/constants/pr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CreatePRModal({
  isOpen,
  onClose,
  onSuccess,
  userId,
  selectedTest,
}: CreatePRModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<PRFormInput>({
    defaultValues: {
      category: "قدرتی",
      testName: selectedTest || "",
      unit: "کیلوگرم",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const { data: metricsData } = useSWR(
    isOpen ? "/api/admin/metric" : null,
    fetcher
  );
  const metrics: TestMetricItem[] = useMemo(
    () => metricsData?.metrics || [],
    [metricsData?.metrics]
  );

  const handleClose = useCallback(() => {
    reset({
      category: "قدرتی",
      testName: selectedTest || "",
      unit: "کیلوگرم",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
    onClose();
  }, [reset, selectedTest, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    if (selectedTest) {
      setValue("testName", selectedTest);
      const matched = metrics.find((m) => m.name === selectedTest);
      if (matched) {
        setValue("metricId", matched._id);
        if (matched.category) {
          setValue("category", CATEGORY_MAP[matched.category] || matched.category);
        }
        if (matched.unit) {
          setValue("unit", UNIT_MAP[matched.unit] || matched.unit);
        }
      } else {
        setValue("metricId", "");
      }
    } else if (metrics.length > 0) {
      const first = metrics[0];
      setValue("metricId", first._id);
      setValue("testName", first.name);
      if (first.category) {
        setValue("category", CATEGORY_MAP[first.category] || first.category);
      }
      if (first.unit) {
        setValue("unit", UNIT_MAP[first.unit] || first.unit);
      }
    }
  }, [metrics, isOpen, selectedTest, setValue]);

  const handleMetricSelect = useCallback(
    (metricId: string) => {
      if (!metricId) {
        setValue("metricId", "");
        return;
      }
      const selected = metrics.find((m) => m._id === metricId);
      if (selected) {
        setValue("metricId", selected._id);
        setValue("testName", selected.name);
        if (selected.category) {
          setValue("category", CATEGORY_MAP[selected.category] || selected.category);
        }
        if (selected.unit) {
          setValue("unit", UNIT_MAP[selected.unit] || selected.unit);
        }
      }
    },
    [metrics, setValue]
  );

  const onSubmit = async (data: PRFormInput) => {
    if (!userId) {
      showAlert("خطا", "شناسه کاربر یافت نشد. امکان ثبت رکورد وجود ندارد.", "error");
      return;
    }

    if (!data.testName?.trim() && !data.metricId) {
      showAlert("خطا", "لطفاً نام حرکت یا یک متس ارزیابی را وارد کنید.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/user/pr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });

      if (res.ok) {
        showAlert("موفقیت", "رکورد شخصی با موفقیت ثبت شد", "success");
        reset({
          category: "قدرتی",
          testName: selectedTest || "",
          unit: "کیلوگرم",
          date: new Date().toISOString().split("T")[0],
          notes: "",
        });
        if (onSuccess) onSuccess();
        onClose();
      } else {
        const errData = await res.json();
        showAlert("خطا", errData.message || "خطا در ثبت رکورد", "error");
      }
    } catch {
      showAlert("خطا", "خطا در برقراری ارتباط با سرور", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl z-10 min-h-[580px] max-h-[92vh] flex flex-col font-danaMed">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl text-white font-bold font-morabbaReg">
            ثبت رکورد شخصی جدید (PR)
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 pb-8 space-y-5 overflow-y-auto flex-1"
          dir="rtl"
        >
          <div>
            <label className="block text-white/80 text-sm mb-2">
              انتخاب متس ارزیابی (Metric)
            </label>
            <select
              value={watch("metricId") || ""}
              onChange={(e) => handleMetricSelect(e.target.value)}
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
            >
              {metrics.length === 0 ? (
                <option value="">در حال بارگذاری یا هیچ متسی ثبت نشده است...</option>
              ) : (
                <>
                  <option value="">انتخاب از لیست متس‌ها...</option>
                  {metrics.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} ({UNIT_MAP[m.unit] || m.unit})
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">
              نام حرکت یا تست ورزشی <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              {...register("testName", { required: true })}
              placeholder="مثلا: پرس سینه، اسکات، دوی ۴۰ متر..."
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 text-sm"
            />
            {errors.testName && (
              <p className="text-red-400 text-xs mt-1">
                وارد کردن نام تست الزامی است.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">
                دسته‌بندی <span className="text-amber-400">*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">
                واحد اندازه‌گیری <span className="text-amber-400">*</span>
              </label>
              <select
                {...register("unit", { required: true })}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
              >
                {DEFAULT_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">
              مقدار رکورد <span className="text-amber-400">*</span>
            </label>
            <input
              type="number"
              step="any"
              {...register("value", { required: true, valueAsNumber: true })}
              placeholder="مثال: ۱۰۰ یا ۲.۹۵"
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 text-left text-sm ss02"
            />
            {errors.value && (
              <p className="text-red-400 text-xs mt-1">
                وارد کردن مقدار رکورد الزامی است.
              </p>
            )}
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">
              تاریخ ثبت (شمسی) <span className="text-amber-400">*</span>
            </label>
            <Controller
              control={control}
              name="date"
              rules={{ required: true }}
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
                  inputClass="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-right text-sm cursor-pointer"
                  containerClassName="w-full"
                />
              )}
            />
            {errors.date && (
              <p className="text-red-400 text-xs mt-1">
                انتخاب تاریخ الزامی است.
              </p>
            )}
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">
              توضیحات / یادداشت
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="یادداشت مربی (اختیاری)..."
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-sm transition-all duration-200 cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              ثبت رکورد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
