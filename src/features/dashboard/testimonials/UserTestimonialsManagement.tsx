"use client";

import { useState } from "react";
import useSWR from "swr";
import { MessageSquare, Star, Plus, Award, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import type { UserTestimonialRecord } from "@/types/testimonial";
import AddTestimonialModal from "./AddTestimonialModal";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }
  return res.json();
};

export default function UserTestimonialsManagement() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/user/testimonials", fetcher);

  const testimonials: UserTestimonialRecord[] = data?.testimonials || [];

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-amber-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-center gap-3 font-danaMed text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>در دریافت لیست نظرات خطایی رخ داد.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-danaMed" dir="rtl">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-morabbaReg">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            ثبت نظرات و تجربیات شما در استارفیت
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            تجربه خود از تمرینات و برنامه‌های استارفیت را ثبت کنید تا در بخش نظرات صفحه اصلی نمایش داده شود.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت نظر جدید</span>
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl text-neutral-400 flex flex-col items-center justify-center space-y-3 bg-neutral-900/40">
          <MessageSquare className="w-12 h-12 text-white/20" />
          <p className="text-sm">هنوز هیچ نظری ثبت نکرده‌اید.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ثبت اولین نظر</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="bg-neutral-900/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <p className="text-neutral-200 text-sm leading-relaxed">
                  &quot;{item.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">ثبت و تایید شده</span>
                </div>

                {item.achievement && (
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Award className="w-4 h-4" />
                    <span>{item.achievement}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => mutate()}
      />
    </div>
  );
}
