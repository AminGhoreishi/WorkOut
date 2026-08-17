"use client";

import { useState } from "react";
import { X, Star, PlusCircle, AlertCircle, Loader2 } from "lucide-react";
import type { AddTestimonialModalProps, NewTestimonialInput } from "@/types/testimonial";

export default function AddTestimonialModal({
  isOpen,
  onClose,
  onSuccess,
}: AddTestimonialModalProps) {
  const [formData, setFormData] = useState<NewTestimonialInput>({
    badge: "",
    rating: 5,
    comment: "",
    achievement: "",
  });
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.comment.trim()) {
      setErrorMessage("لطفا متن نظر یا تجربه خود را وارد کنید.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/user/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "خطا در ثبت نظر جدید");
      }

      setFormData({
        badge: "",
        rating: 5,
        comment: "",
        achievement: "",
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
        className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl font-danaMed"
        dir="rtl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-white">
            <PlusCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold font-morabbaReg">
              ثبت نظر و تجربه جدید
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
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
            <label className="block text-xs text-white/70 mb-2 font-medium">
              امتیاز شما به استارفیت <span className="text-amber-400">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-amber-400 transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || formData.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              عنوان/دستاور اصلی (مثلا: کاهش ۱۰ کیلوگرم وزن، افزایش حجم عضلانی)
            </label>
            <input
              type="text"
              placeholder="مثلا: کاهش ۸ کیلو چربی در ۳ ماه..."
              value={formData.badge}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, badge: e.target.value }))
              }
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              متن کامل نظر یا تجربه تمرینی <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="تجربه خود از کیفیت برنامه‌ها، پشتیبانی مربی و روند تغییرات بدنی..."
              value={formData.comment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1.5 font-medium">
              دستاوردهای اختصاصی (اختیاری)
            </label>
            <input
              type="text"
              placeholder="مثلا: افزایش ۳۰ کیلو رکورد اسکات..."
              value={formData.achievement}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, achievement: e.target.value }))
              }
              className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
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
              className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال ثبت...</span>
                </>
              ) : (
                <span>ذخیره و ارسال نظر</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
