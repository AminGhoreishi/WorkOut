"use client";

import { useState } from "react";
import { X, PlusCircle, AlertCircle, Loader2 } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import type { AddProgressRecordModalProps, NewPRRecordInput } from "@/types/progress";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_UNITS,
  validateProgressRecordInput,
} from "@/validators/progress";

export default function AddProgressRecordModal({
  isOpen,
  onClose,
  onSuccess,
}: AddProgressRecordModalProps) {
  const [formData, setFormData] = useState<NewPRRecordInput>({
    testName: "",
    category: "قدرتی",
    value: "",
    unit: "کیلوگرم",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateProgressRecordInput(formData);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const finalTestName = formData.testName.trim();

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/user/pr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          testName: finalTestName,
          value: Number(formData.value),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "خطا در ثبت رکورد جدید");
      }

      setFormData({
        testName: "",
        category: "قدرتی",
        value: "",
        unit: "کیلوگرم",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setErrorMessage(
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
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              نام حرکت یا تست ورزشی <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              placeholder="مثلا: پرس سینه، اسکات، پلانک..."
              value={formData.testName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, testName: e.target.value }))
              }
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/70 mb-1.5 font-medium">
                دسته‌بندی
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
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
                value={formData.unit}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, unit: e.target.value }))
                }
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
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
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
              />
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1.5 font-medium">
                تاریخ ثبت (شمسی)
              </label>
              <DatePicker
                value={formData.date ? new Date(formData.date) : new Date()}
                onChange={(date) => {
                  if (date) {
                    const jsDate = date.toDate();
                    const year = jsDate.getFullYear();
                    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
                    const day = String(jsDate.getDate()).padStart(2, "0");
                    setFormData((prev) => ({ ...prev, date: `${year}-${month}-${day}` }));
                  } else {
                    setFormData((prev) => ({ ...prev, date: "" }));
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
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              توضیحات یا یادداشت (اختیاری)
            </label>
            <textarea
              rows={2}
              placeholder="مثلا: احساس انرژی خوب، ۳ تکرار آخر با کمک..."
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-2"
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
