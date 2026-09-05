"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import type { CheckoutPendingVerificationProps } from "@/types/checkout";

export default function CheckoutPendingVerification({
  order,
  submittedRef,
  formatNumber,
}: CheckoutPendingVerificationProps) {
  return (
    <div className="bg-zinc-900/90 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_-12px_rgba(245,158,11,0.2)] text-center space-y-6 max-w-xl mx-auto">
      <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <Clock className="w-10 h-10 text-amber-400 animate-pulse" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          در انتظار تایید پرداخت
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-amber-100 pt-2 font-morabbaReg">
          شناسه واریزی شما ثبت گردید
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          اطلاعات پرداخت کارت به کارت شما دریافت شد. همکاران ما در سریع‌ترین
          زمان ممکن واریزی شما را بررسی کرده و اشتراک را فعال می‌کنند.
        </p>
      </div>

      <div className="bg-black/50 border border-amber-500/20 rounded-2xl p-4 text-right space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between items-center border-b border-amber-500/10 pb-2">
          <span className="text-zinc-400">شناسه پیگیری ثبت شده:</span>
          <span className="font-mono font-bold text-amber-300 text-sm">
            {submittedRef}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-amber-500/10 pb-2">
          <span className="text-zinc-400">نام پکیج:</span>
          <span className="font-semibold text-zinc-200">
            {order.packageName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">مبلغ واریزی:</span>
          <span className="font-bold text-amber-400">
            {formatNumber(order.amountPaid)} تومان
          </span>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/dashboard/fitness-profile"
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium py-3.5 rounded-xl transition-all text-center text-xs sm:text-sm flex items-center justify-center gap-2 block"
        >
          <span>ورود به پروفایل ورزشی</span>
        </Link>
      </div>
    </div>
  );
}
