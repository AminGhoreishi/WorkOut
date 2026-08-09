"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  Wallet,
} from "lucide-react";
import type {
  CheckoutPageClientProps,
  VerifyPaymentClientResponse,
} from "@/types/checkout";
import CheckoutPaymentForm from "./CheckoutPaymentForm";
import CheckoutPendingVerification from "./CheckoutPendingVerification";

export default function CheckoutPage({ order }: CheckoutPageClientProps) {
  const router = useRouter();
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentRefInput, setPaymentRefInput] = useState<string>(
    order.paymentRef || ""
  );
  const [submittedRef, setSubmittedRef] = useState<string | null>(
    order.paymentRef || null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cardNumber = "6219861864032759";
  const formattedCardNumber = "6219  8618  6403  2759";

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fa-IR").format(num || 0);
  };

  const handleCopyCard = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const ref = paymentRefInput.trim();
    if (!ref) {
      setErrorMessage("لطفاً کد پیگیری یا شماره ارجاع واریز را وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id,
          paymentRef: ref,
        }),
      });

      const result: VerifyPaymentClientResponse = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(result.message || "خطا در ثبت و تایید کد پیگیری");
        setIsSubmitting(false);
        return;
      }

      setSubmittedRef(ref);
      setIsSubmitting(false);
    } catch {
      setErrorMessage("خطای غیرمنتظره در ثبت واریزی. لطفاً دوباره تلاش کنید.");
      setIsSubmitting(false);
    }
  };

  const isPendingVerification = Boolean(submittedRef);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-950 text-amber-50 py-8 sm:py-12 px-3 sm:px-4 relative overflow-hidden font-danamed"
      dir="rtl"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center pb-4 border-b border-amber-500/20">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به پکیج‌ها</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>پرداخت امن استار فیت</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent font-morabbaReg">
            {isPendingVerification
              ? "در انتظار تایید پرداخت"
              : "صفحه پرداخت کارت به کارت"}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            {isPendingVerification
              ? "شناسه واریز شما ثبت شده و توسط پشتیبانی در حال بررسی است."
              : "جهت فعال‌سازی اشتراک، مبلغ مورد نظر را واریز کرده و کد پیگیری را ثبت کنید."}
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl text-xs sm:text-sm text-center">
            {errorMessage}
          </div>
        )}

        {isPendingVerification ? (
          <CheckoutPendingVerification
            order={order}
            submittedRef={submittedRef || ""}
            formatNumber={formatNumber}
          />
        ) : (
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
                      <span dir="ltr" className="text-base sm:text-xl font-extrabold tracking-widest font-mono text-amber-200  select-all">
                        {formattedCardNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCard}
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
              onPaymentRefChange={setPaymentRefInput}
              onSubmit={handleConfirmPayment}
              isSubmitting={isSubmitting}
              formatNumber={formatNumber}
            />
          </div>
        )}
      </div>
    </div>
  );
}
