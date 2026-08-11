"use client";

import { Wallet, Sparkles, Check, Copy, ShieldCheck } from "lucide-react";
import type { CheckoutCardSectionProps } from "@/types/checkout";
import CheckoutPaymentForm from "./CheckoutPaymentForm";

export default function CheckoutCardSection({
  order,
  formattedCardNumber,
  copied,
  onCopyCard,
  paymentRefInput,
  onPaymentRefChange,
  onSubmit,
  isSubmitting,
  formatNumber,
}: CheckoutCardSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
      <div className="lg:col-span-7 space-y-6">
        <div className="relative group">
          <div className="bg-gradient-to-tr from-zinc-950 via-neutral-900 to-amber-950/80 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_-12px_rgba(245,158,11,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-500/20 rounded-xl border border-amber-500/30 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs text-amber-300/80 font-medium block">
                    کارت به کارت شتاب
                  </span>
                  <span className="text-sm font-bold text-amber-100">
                    استار فیت
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono font-semibold tracking-wider text-amber-400/90 border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  STARFIT
                </span>
              </div>
            </div>

            <div className="my-6 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-8 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-md border border-amber-200/50 shadow-inner flex items-center justify-center">
                  <div className="w-7 h-5 border border-amber-800/40 rounded grid grid-cols-2 gap-0.5 p-0.5">
                    <div className="bg-amber-700/30 rounded-sm" />
                    <div className="bg-amber-700/30 rounded-sm" />
                    <div className="bg-amber-700/30 rounded-sm" />
                    <div className="bg-amber-700/30 rounded-sm" />
                  </div>
                </div>
                <span className="text-[11px] text-zinc-400">
                  شماره کارت بانکی
                </span>
              </div>

              <div className="flex items-center justify-between bg-black/60 border border-amber-500/30 rounded-2xl px-4 py-3.5 backdrop-blur-md">
                <span dir="ltr" className="text-base sm:text-xl font-extrabold tracking-widest font-mono text-amber-200 select-all">
                  {formattedCardNumber}
                </span>
                <button
                  type="button"
                  onClick={onCopyCard}
                  className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-amber-500/20 relative z-10 text-xs sm:text-sm">
              <div>
                <span className="text-zinc-500 text-[11px] block mb-0.5">
                  نام صاحب حساب
                </span>
                <span className="font-bold text-amber-100">استار فیت</span>
              </div>
              <div className="text-left dir-ltr">
                <span className="text-zinc-500 text-[11px] block mb-0.5 text-right">
                  وضعیت
                </span>
                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  فعال جهت دریافت
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-zinc-300">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>راهنمای ثبت تراکنش:</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs leading-relaxed">
            <li>شماره کارت فوق را کپی کرده و دقیقاً مبلغ سفارش را واریز کنید.</li>
            <li>
              پس از واریز، شماره پیگیری یا شماره ارجاع فیش بانکی را در فرم روبرو وارد کنید.
            </li>
            <li>سفارش شما بلافاصله وارد وضعیت «در انتظار تایید پرداخت» می‌شود.</li>
          </ul>
        </div>
      </div>

      <CheckoutPaymentForm
        order={order}
        paymentRefInput={paymentRefInput}
        onPaymentRefChange={onPaymentRefChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        formatNumber={formatNumber}
      />
    </div>
  );
}
