"use client";

import { Tag, CheckCircle2, Sparkles, Clock } from "lucide-react";
import type { DiscountStatsProps } from "@/types/discount";

export default function DiscountStats({ discounts }: DiscountStatsProps) {
  const totalCount = discounts.length;
  const activeCount = discounts.filter((d) => d.isActive).length;
  const totalUsage = discounts.reduce((sum, d) => sum + (d.usageCount || 0), 0);
  const inactiveCount = discounts.filter((d) => !d.isActive).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">کل کدهای تخفیف</span>
          <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Tag className="w-5 h-5" />
          </span>
        </div>
        <div className="text-2xl font-bold text-white font-morabbaReg">
          {totalCount.toLocaleString("fa-IR")} کد
        </div>
        <div className="text-xs text-white/40 mt-1">کدهای ثبت شده در سیستم</div>
      </div>

      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">کدهای فعال</span>
          <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>
        <div className="text-2xl font-bold text-emerald-400 font-morabbaReg">
          {activeCount.toLocaleString("fa-IR")} فعال
        </div>
        <div className="text-xs text-white/40 mt-1">آماده استفاده توسط کاربران</div>
      </div>

      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">مجموع استفاده</span>
          <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </span>
        </div>
        <div className="text-2xl font-bold text-amber-400 font-morabbaReg">
          {totalUsage.toLocaleString("fa-IR")} بار
        </div>
        <div className="text-xs text-white/40 mt-1">اعمال موفق روی خریدها</div>
      </div>

      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-sm">تکمیل ظرفیت / منقضی</span>
          <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
            <Clock className="w-5 h-5" />
          </span>
        </div>
        <div className="text-2xl font-bold text-rose-400 font-morabbaReg">
          {inactiveCount.toLocaleString("fa-IR")} کد
        </div>
        <div className="text-xs text-white/40 mt-1">غیرقابل استفاده در حال حاضر</div>
      </div>
    </div>
  );
}
