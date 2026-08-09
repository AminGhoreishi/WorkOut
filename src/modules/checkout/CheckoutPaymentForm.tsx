"use client";

import { CreditCard, FileText, Loader2 } from "lucide-react";
import type { CheckoutPaymentFormProps } from "@/types/checkout";

export default function CheckoutPaymentForm({
  order,
  paymentRefInput,
  onPaymentRefChange,
  onSubmit,
  isSubmitting,
  formatNumber,
}: CheckoutPaymentFormProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <form
        onSubmit={onSubmit}
        className="bg-zinc-900/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5"
      >
        <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent pb-3 border-b border-amber-500/20 font-morabbaReg">
          خلاصه صورت‌حساب و ثبت واریزی
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>نام پکیج:</span>
            <span className="font-semibold text-zinc-200">
              {order.packageName}
            </span>
          </div>

          <div className="flex justify-between text-zinc-400">
            <span>شناسه سفارش:</span>
            <span className="font-mono text-zinc-300 dir-ltr text-xs">
              #{order._id.slice(-8)}
            </span>
          </div>

          {order.originalAmount > order.amountPaid && (
            <div className="flex justify-between text-amber-400 font-semibold bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              <span>مبلغ اصلی:</span>
              <span>{formatNumber(order.originalAmount)} تومان</span>
            </div>
          )}

          <div className="pt-3 border-t border-amber-500/20 flex justify-between items-center">
            <span className="font-bold text-amber-100 text-xs sm:text-sm">
              مبلغ قابل واریز:
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-400 font-morabbaReg">
              {formatNumber(order.amountPaid)} تومان
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-amber-500/20">
          <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>کد پیگیری یا شماره ارجاع واریز</span>
          </label>
          <input
            type="text"
            value={paymentRefInput}
            onChange={(e) => onPaymentRefChange(e.target.value)}
            placeholder="مثال: ۱۲۳۴۵۶۷۸ یا شماره ارجاع تراکنش"
            className="w-full bg-black/60 border border-amber-500/30 rounded-xl px-3.5 py-3 text-amber-100 placeholder:text-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>در حال ثبت کد پیگیری...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>ثبت کد پیگیری و ارسال جهت تایید</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
