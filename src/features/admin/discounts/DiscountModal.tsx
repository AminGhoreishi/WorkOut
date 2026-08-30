"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import { Tag, Calendar, X, Loader2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { showToast, showAlert } from "@/utils/alert";
import type { DiscountModalProps, DiscountFormData } from "@/types/discount";
import type { PackageOption } from "@/types/package";

const packageOptionsFetcher = async (url: string): Promise<PackageOption[]> => {
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json();
};

export default function DiscountModal({
  isOpen,
  onClose,
  onSuccess,
}: DiscountModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormData>({
    defaultValues: {
      code: "",
      percent: 0,
      packageId: "all",
      maxUsage: null,
      startsAt: "",
      expiresAt: "",
      isActive: true,
    },
  });

  const { data: packages = [] } = useSWR<PackageOption[]>(
    isOpen ? "/api/admin/package/options" : null,
    packageOptionsFetcher,
  );

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: DiscountFormData) => {
    try {
      const formattedCode = data.code?.trim() ? data.code.trim().toUpperCase() : null;

      const res = await fetch("/api/admin/discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formattedCode,
          percent: Number(data.percent) || 0,
          packages: data.packageId === "all" ? [] : [data.packageId],
          maxUsage: data.maxUsage ? Number(data.maxUsage) : null,
          startsAt: data.startsAt || undefined,
          expiresAt: data.expiresAt || null,
          isActive: data.isActive,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "خطا در ثبت تخفیف");
      }

      showToast({
        title: formattedCode
          ? "کد تخفیف با موفقیت ایجاد شد"
          : "تخفیف مستقیم پکیج با موفقیت ایجاد شد",
        icon: "success",
      });
      onSuccess?.();
      onClose();
      reset();
    } catch (err: any) {
      showAlert({
        title: "خطا",
        text: err.message || "خطایی در ثبت تخفیف رخ داد",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-danaMed"
      dir="rtl"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Tag className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white font-morabbaReg">
              تعریف تخفیف جدید
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-white/70">
                کد تخفیف (اختیاری)
              </label>
              <span className="text-[11px] text-amber-400/80">
                خالی بگذارید تا تخفیف مستقیم اعمال شود
              </span>
            </div>
            <input
              type="text"
              placeholder="مثال: STARFIT100 (یا خالی برای تخفیف خودکار)"
              {...register("code", {
                validate: (value) => {
                  if (!value || !value.trim()) return true;
                  if (value.trim().length < 3) {
                    return "کد تخفیف باید حداقل ۳ کاراکتر باشد";
                  }
                  if (!/^[A-Za-z0-9_-]+$/.test(value.trim())) {
                    return "کد تخفیف فقط می‌تواند شامل حروف انگلیسی و اعداد باشد";
                  }
                  return true;
                },
              })}
              className={`w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none uppercase font-mono transition-colors ${
                errors.code
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-neutral-800 focus:border-amber-500/50"
              }`}
            />
            {errors.code && (
              <span className="text-xs text-rose-400 mt-1.5 block font-medium">
                {errors.code.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              درصد تخفیف (٪)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              placeholder="مثال: ۲۰"
              {...register("percent", {
                required: "وارد کردن درصد تخفیف الزامی است",
                min: { value: 1, message: "درصد تخفیف باید حداقل ۱٪ باشد" },
                max: { value: 100, message: "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰٪ باشد" },
              })}
              className={`w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors ss02 ${
                errors.percent
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-neutral-800 focus:border-amber-500/50"
              }`}
            />
            {errors.percent && (
              <span className="text-xs text-rose-400 mt-1.5 block font-medium">
                {errors.percent.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              حداکثر سقف استفاده (تعداد)
            </label>
            <input
              type="number"
              min="1"
              placeholder="برای نامحدود خالی بگذارید"
              {...register("maxUsage", {
                min: { value: 1, message: "حداقل سقف استفاده ۱ است" },
              })}
              className={`w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors ss02 ${
                errors.maxUsage
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-neutral-800 focus:border-amber-500/50"
              }`}
            />
            {errors.maxUsage && (
              <span className="text-xs text-rose-400 mt-1.5 block font-medium">
                {errors.maxUsage.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                تاریخ شروع (شمسی)
              </label>
              <div className="relative">
                <Controller
                  control={control}
                  name="startsAt"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value ? new Date(value) : ""}
                      onChange={(date) => {
                        if (date) {
                          const jsDate = date.toDate();
                          onChange(jsDate.toISOString());
                        } else {
                          onChange("");
                        }
                      }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      portal
                      className="bg-dark"
                      placeholder="انتخاب تاریخ شروع"
                      inputClass="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 text-right cursor-pointer ss02"
                      containerClassName="w-full"
                    />
                  )}
                />
                <Calendar className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
              {errors.startsAt && (
                <span className="text-xs text-rose-400 mt-1.5 block font-medium">
                  {errors.startsAt.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                تاریخ انقضا (شمسی)
              </label>
              <div className="relative">
                <Controller
                  control={control}
                  name="expiresAt"
                  rules={{
                    validate: (value, formValues) => {
                      if (value && formValues.startsAt) {
                        if (new Date(value).getTime() < new Date(formValues.startsAt).getTime()) {
                          return "تاریخ انقضا باید بعد از تاریخ شروع باشد";
                        }
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value ? new Date(value) : ""}
                      onChange={(date) => {
                        if (date) {
                          const jsDate = date.toDate();
                          onChange(jsDate.toISOString());
                        } else {
                          onChange("");
                        }
                      }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      portal
                      className="bg-dark"
                      placeholder="انتخاب تاریخ انقضا"
                      inputClass="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 text-right cursor-pointer ss02"
                      containerClassName="w-full"
                    />
                  )}
                />
                <Calendar className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
              {errors.expiresAt && (
                <span className="text-xs text-rose-400 mt-1.5 block font-medium">
                  {errors.expiresAt.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              اعمال روی پکیج‌ها
            </label>
            <select
              {...register("packageId")}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">همه پکیج‌ها (عمومی)</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isActiveDiscount"
              {...register("isActive")}
              className="w-4 h-4 rounded border-neutral-800 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <label
              htmlFor="isActiveDiscount"
              className="text-sm text-white/80 select-none cursor-pointer"
            >
              این کد تخفیف از هم‌اکنون فعال باشد
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-sm text-white/70 hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                "ثبت کد تخفیف"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
