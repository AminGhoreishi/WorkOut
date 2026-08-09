"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Gift,
  ShieldCheck,
  Zap,
  Loader2,
  Sparkles,
} from "lucide-react";
import type {
  BillingCycle,
  OrderFormData,
  OrderPageProps,
  CreateOrderResponse,
  VerifyPaymentResponse,
} from "@/types/order";
import type { UserProfileResponse } from "@/types/user-profile";

const fetcher = async (url: string): Promise<UserProfileResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات کاربری");
  }
  return res.json();
};

export default function OrderPage({ packageData, email }: OrderPageProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: profileData } = useSWR<UserProfileResponse>(
    "/api/user/profile",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    mode: "onBlur",
    defaultValues: {
      selectedPackage: packageData._id,
      billingCycle: "monthly",
      paymentMethod: "gateway",
      selectedBank: "mellat",
      discountCode: "",
      agreedToTerms: false,
      fullName: "",
      email: email || "",
      phone: "",
    },
  });

  useEffect(() => {
    if (profileData?.user) {
      const u = profileData.user;
      if (u.fullName) setValue("fullName", u.fullName);
      if (u.email) setValue("email", u.email);
      if (u.phone) setValue("phone", u.phone);
    }
  }, [profileData, setValue]);

  const selectedPackage = watch("selectedPackage");
  const billingCycle = watch("billingCycle");
  const discountCode = watch("discountCode");
  const agreedToTerms = watch("agreedToTerms");

  const getPrice = (): number => {
    switch (billingCycle) {
      case "monthly":
        return packageData.price?.monthly || 0;
      case "quarterly":
        return packageData.price?.quarterly || 0;
      case "biannual":
        return packageData.price?.biannual || 0;
      default:
        return packageData.price?.monthly || 0;
    }
  };

  const discountApplied = discountCode?.trim().toUpperCase() === "FIT2024";

  const getDiscount = (): number => {
    if (!discountApplied) return 0;
    return Math.floor(getPrice() * 0.15);
  };

  const getFinalPrice = (): number => getPrice() - getDiscount();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fa-IR").format(num || 0);
  };

  const onSubmit = async (formData: OrderFormData) => {
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("لطفاً تمام اطلاعات کاربر را به درستی وارد کنید");
      return;
    }

    if (!formData.agreedToTerms) {
      setErrorMessage("لطفاً قوانین و مقررات را تایید کنید");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        packageId: formData.selectedPackage,
        billingCycle: formData.billingCycle,
        discountCode: formData.discountCode ? formData.discountCode.trim() : null,
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: CreateOrderResponse = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(result.message || "خطا در ثبت سفارش");
        setIsSubmitting(false);
        return;
      }

      const orderId = result.orderId;
      if (!orderId) {
        setErrorMessage("شناسه سفارش دریافت نشد");
        setIsSubmitting(false);
        return;
      }

      router.push(`/checkout?orderId=${orderId}`);
    } catch (error) {
      setErrorMessage("خطای غیرمنتظره در ثبت سفارش. لطفاً دوباره تلاش کنید");
      setIsSubmitting(false);
    }
  };

  const availableCycles: BillingCycle[] = ["monthly"];
  const cyclesToDisplay = availableCycles;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-950 text-amber-50 py-6 sm:py-10 px-3 sm:px-4 relative overflow-hidden"
      style={{ fontFamily: "Dana, sans-serif" }}
      dir="rtl"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-400/70 hover:text-amber-300 transition-colors mb-3 sm:mb-4 text-xs sm:text-sm font-medium"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            بازگشت به پکیج‌ها
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
            <h1
              className="text-lg sm:text-3xl lg:text-4xl bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-extrabold leading-tight"
              style={{ fontFamily: "Marbeh, sans-serif" }}
            >
              تکمیل سفارش اشتراک VIP
            </h1>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            اطلاعات خود را وارد کنید و اشتراک ویژه خود را فعال نمایید
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 sm:p-4 bg-red-950/40 border border-red-500/50 rounded-2xl text-red-300 text-xs sm:text-sm text-center shadow-lg backdrop-blur-md">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <h2
                className="text-sm sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4 flex items-center gap-2"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                پکیج انتخابی
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => setValue("selectedPackage", packageData._id)}
                  className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all text-right cursor-pointer flex justify-between items-center gap-3 ${
                    selectedPackage === packageData._id
                      ? "border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                      : "border-amber-500/15 bg-zinc-900/40 hover:border-amber-500/30"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-amber-100 font-bold text-xs sm:text-base mb-1 truncate">
                      {packageData.name}
                    </div>
                    {packageData.tagline && (
                      <div className="text-zinc-400 text-[10px] sm:text-xs leading-relaxed">
                        {packageData.tagline}
                      </div>
                    )}
                  </div>

                  <div className="text-amber-400 font-extrabold text-xs sm:text-sm whitespace-nowrap shrink-0">
                    از {formatNumber(packageData.price?.monthly || 0)} تومان
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <h2
                className="text-sm sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4 flex items-center gap-2"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                انتخاب دوره پرداخت
              </h2>

              <div className="space-y-3">
                {cyclesToDisplay.map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setValue("billingCycle", cycle)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border-2 transition-all flex justify-between items-center gap-3 cursor-pointer ${
                      billingCycle === cycle
                        ? "border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                        : "border-amber-500/15 bg-zinc-900/40 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="text-right min-w-0">
                      <div className="text-amber-100 font-semibold text-xs sm:text-sm">
                        {cycle === "monthly" && "یک ماهه (عادی)"}
                        {cycle === "quarterly" && "سه ماهه (تخفیف ویژه)"}
                        {cycle === "biannual" && "شش ماهه (بهترین ارزش)"}
                      </div>
                    </div>

                    <div
                      className="text-amber-400 font-bold text-xs sm:text-base whitespace-nowrap shrink-0"
                      style={{ fontFamily: "Marbeh, sans-serif" }}
                    >
                      {formatNumber(packageData.price?.[cycle] || 0)} تومان
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <h2
                className="text-sm sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4 flex items-center gap-2"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                اطلاعات خریدار
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] sm:text-xs text-amber-200/70 mb-1.5 font-medium">
                    نام و نام خانوادگی
                  </label>
                  <input
                    {...register("fullName", {
                      required: "وارد کردن نام و نام خانوادگی الزامی است",
                      minLength: {
                        value: 3,
                        message: "نام باید حداقل ۳ کاراکتر باشد",
                      },
                    })}
                    placeholder="مثال: علی کریمی"
                    className="w-full bg-black/40 border border-amber-500/20 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-amber-50 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-xs sm:text-sm"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-[10px] sm:text-xs mt-1.5 font-medium">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs text-amber-200/70 mb-1.5 font-medium">
                    آدرس ایمیل
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "وارد کردن آدرس ایمیل الزامی است",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "آدرس ایمیل وارد شده معتبر نیست",
                      },
                    })}
                    placeholder="email@example.com"
                    className="w-full bg-black/40 border border-amber-500/20 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-amber-50 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-xs sm:text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[10px] sm:text-xs mt-1.5 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs text-amber-200/70 mb-1.5 font-medium">
                    شماره همراه
                  </label>
                  <input
                    type="text"
                    {...register("phone", {
                      required: "وارد کردن شماره همراه الزامی است",
                      pattern: {
                        value: /^09\d{9}$/,
                        message: "شماره همراه باید ۱۱ رقم و با ۰۹ شروع شود",
                      },
                    })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-black/40 border border-amber-500/20 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-amber-50 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-xs sm:text-sm"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-[10px] sm:text-xs mt-1.5 font-medium">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-6 sticky top-8 shadow-2xl">
              <h2
                className="text-sm sm:text-lg font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent mb-4 sm:mb-6 pb-3 border-b border-amber-500/20"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                خلاصه صورت‌حساب
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">قیمت پایه:</span>
                  <span className="font-semibold">{formatNumber(getPrice())} تومان</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-amber-400 font-semibold bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                    <span>تخفیف ویژه (۱۵٪):</span>
                    <span>-{formatNumber(getDiscount())} تومان</span>
                  </div>
                )}
              </div>

              <div className="my-4 sm:my-6 pt-4 border-t border-amber-500/20 flex justify-between items-center text-amber-100">
                <span className="text-xs sm:text-sm font-bold">مبلغ قابل پرداخت:</span>
                <span
                  className="text-lg sm:text-2xl font-extrabold text-amber-400"
                  style={{ fontFamily: "Marbeh, sans-serif" }}
                >
                  {formatNumber(getFinalPrice())} تومان
                </span>
              </div>

              <div className="mb-4">
                <input
                  {...register("discountCode")}
                  placeholder="کد تخفیف (مثال: FIT2024)"
                  className="w-full bg-black/50 border border-amber-500/20 rounded-xl px-3 py-2.5 text-amber-50 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs transition-colors"
                />
              </div>

              <label className="flex items-start gap-2.5 sm:gap-3 mb-6 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("agreedToTerms")}
                  className="w-4 h-4 rounded border-amber-500/30 bg-black text-amber-500 focus:ring-amber-400 accent-amber-500 mt-0.5 shrink-0"
                />
                <span className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                  شرایط و قوانین استفاده از خدمات استار فیت را مطالعه کرده و می‌پذیرم.
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreedToTerms || isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-bold py-3 sm:py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>در حال انتقال به صفحه پرداخت...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>پرداخت و فعال‌سازی فوری</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-amber-500/10">
                <div className="bg-black/40 rounded-xl p-2 sm:p-2.5 text-center border border-amber-500/10">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-zinc-400 text-[9px] sm:text-[10px]">پرداخت امن</div>
                </div>

                <div className="bg-black/40 rounded-xl p-2 sm:p-2.5 text-center border border-amber-500/10">
                  <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-zinc-400 text-[9px] sm:text-[10px]">۷ روز آزمایشی</div>
                </div>

                <div className="bg-black/40 rounded-xl p-2 sm:p-2.5 text-center border border-amber-500/10">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-zinc-400 text-[9px] sm:text-[10px]">فعال‌سازی آنی</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
