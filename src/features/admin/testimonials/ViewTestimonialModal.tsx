"use client";

import {
  X,
  Star,
  Trophy,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Tag,
} from "lucide-react";
import type {
  ViewTestimonialModalProps,
  PopulatedTestimonialUser,
} from "@/types/testimonial";

export default function ViewTestimonialModal({
  isOpen,
  onClose,
  testimonial,
}: ViewTestimonialModalProps) {
  if (!isOpen || !testimonial) return null;

  const populatedUser =
    typeof testimonial.userId === "object"
      ? (testimonial.userId as PopulatedTestimonialUser)
      : null;

  const displayName =
    populatedUser?.fullName ||
    populatedUser?.username ||
    testimonial.name ||
    "ورزشکار";

  const displayAvatar = populatedUser?.avatar || testimonial.avatar;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("fa-IR");
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-danaMed"
      dir="rtl"
    >
      <div className="relative w-full max-w-xl bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-amber-500/10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <h3 className="text-lg font-bold font-morabbaReg text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>جزئیات کامل نظر ورزشکار</span>
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400/30 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 font-bold flex items-center justify-center text-lg shrink-0">
                  {displayName.slice(0, 1)}
                </div>
              )}

              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-400" />
                  {displayName}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {populatedUser?.email || testimonial.role}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-neutral-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-amber-300 font-semibold">
                {testimonial.rating} از ۵
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>دسته‌بندی و برچسب</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {testimonial.badge}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>تاریخ ثبت</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {formatDate(testimonial.createdAt)}
              </p>
            </div>
          </div>

          {testimonial.achievement && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-amber-400 font-bold block mb-0.5">
                  دستاورد ثبت‌شده:
                </span>
                <span className="text-sm text-neutral-200">
                  {testimonial.achievement}
                </span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-neutral-400 block mb-2 font-semibold">
              متن کامل نظر:
            </span>
            <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
              {testimonial.comment}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">وضعیت نمایش:</span>
              {testimonial.isVisible ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle className="w-3.5 h-3.5" />
                  فعال در صفحه اصلی
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                  <XCircle className="w-3.5 h-3.5" />
                  مخفی
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
