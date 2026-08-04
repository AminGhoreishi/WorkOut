"use client";

import Link from "next/link";
import { UserCheck, ArrowRight, Loader2 } from "lucide-react";
import type { PRErrorStateProps } from "@/types/pr";

export function PRNoUserSelected() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center text-white/40 flex flex-col items-center justify-center max-w-2xl mx-auto shadow-2xl">
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4 text-amber-400">
        <UserCheck className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-morabbaReg">
        هیچ کاربری انتخاب نشده است
      </h3>
      <p className="text-sm text-white/60 mb-6 leading-relaxed">
        جهت مشاهده، افزودن و مدیریت رکوردهای شخصی (PR)، لطفاً به صفحه مدیریت اشتراک‌ها مراجعه کرده و کاربر مورد نظر را انتخاب نمایید.
      </p>
      <Link
        href="/admin/subscriptions"
        className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 text-sm flex items-center gap-2"
      >
        <span>مشاهده لیست اشتراک‌ها و انتخاب کاربر</span>
        <ArrowRight className="w-4 h-4 rotate-180" />
      </Link>
    </div>
  );
}

export function PRLoadingState() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-16 text-center text-white/60 flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
      <span>در حال بارگذاری اطلاعات کاربر و رکوردهای شخصی...</span>
    </div>
  );
}

export function PRErrorState({ message = "خطا در بارگذاری اطلاعات رکوردهای کاربر" }: PRErrorStateProps) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center text-red-400">
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
