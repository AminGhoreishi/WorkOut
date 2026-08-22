"use client";

import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BiDumbbell, BiArrowBack } from "react-icons/bi";
import { BsShieldCheck, BsPencilSquare, BsArrowClockwise } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toEnglishDigits } from "@/utils/numbers";
import type { AuthApiResponse, OtpFormInputs } from "@/types/auth";

function OtpFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawPhone = searchParams.get("phone") || searchParams.get("email") || "";
  const phone = toEnglishDigits(rawPhone);

  const rawCallbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const callbackUrl =
    rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/dashboard";

  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpFormInputs>({
    defaultValues: {
      code: "",
    },
  });

  const codeValue = watch("code") || "";

  useEffect(() => {
    if (!phone || !/^09\d{9}$/.test(phone)) {
      router.replace("/login");
    }
  }, [phone, router]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDigitChange = (index: number, val: string) => {
    setServerError("");
    setSuccessMessage("");
    const cleanVal = toEnglishDigits(val).replace(/\D/g, "");
    if (!cleanVal && val !== "") return;

    const digit = cleanVal.slice(-1);
    const codeArr = ["", "", "", "", ""];
    for (let i = 0; i < 5; i++) {
      codeArr[i] = codeValue[i] || "";
    }
    codeArr[index] = digit;
    const newCode = codeArr.join("");
    setValue("code", newCode, { shouldValidate: true });

    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!codeValue[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    const rawPasted = e.clipboardData.getData("text");
    const cleanDigits = toEnglishDigits(rawPasted).replace(/\D/g, "").slice(0, 5);

    if (!cleanDigits) return;

    setValue("code", cleanDigits, { shouldValidate: true });
    const targetIndex = Math.min(cleanDigits.length, 4);
    inputRefs.current[targetIndex]?.focus();
  };

  const onSubmit: SubmitHandler<OtpFormInputs> = async (data) => {
    setServerError("");
    setSuccessMessage("");

    if (data.code.length < 5) {
      setServerError("لطفاً کد ۵ رقمی را کامل وارد کنید");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          code: data.code,
        }),
      });

      const resData: AuthApiResponse = await res.json().catch(() => ({
        message: "خطا در دریافت پاسخ از سرور",
      }));

      if (!res.ok) {
        setIsSubmitting(false);
        setServerError(resData.message || "کد تایید اشتباه یا منقضی شده است");
        return;
      }

      const signInRes = await signIn("credentials", {
        phone,
        isOtpLogin: "true",
        redirect: false,
      });

      if (signInRes?.error) {
        setIsSubmitting(false);
        setServerError("ایجاد نشست کاربر با مشکل مواجه شد");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setIsSubmitting(false);
      setServerError("خطایی در تایید کد رخ داد، لطفاً دوباره تلاش کنید");
    }
  };

  const handleResendCode = async () => {
    if (timeLeft > 0 || isResending) return;

    setServerError("");
    setSuccessMessage("");
    setIsResending(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "login" }),
      });
      const resData: AuthApiResponse = await res.json().catch(() => ({
        message: "خطا در دریافت پاسخ از سرور",
      }));
      setIsResending(false);

      if (res.ok) {
        setTimeLeft(120);
        setValue("code", "", { shouldValidate: true });
        inputRefs.current[0]?.focus();
        setSuccessMessage("کد تایید جدید ارسال شد");
      } else {
        setServerError(resData.message || "خطا در ارسال کد");
      }
    } catch {
      setIsResending(false);
      setServerError("خطایی در ارتباط با سرور رخ داد");
    }
  };

  return (
    <div
      className="min-h-screen bg-black font-danaMed flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <BiDumbbell className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110" />
            <span className="font-bold text-2xl sm:text-3xl font-morabbaReg text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wide">
              استارفیت
            </span>
          </Link>
          <p className="text-amber-100/60 text-xs sm:text-sm">ورود امن و سریع به حساب کاربری</p>
        </div>

        <div className="bg-zinc-950/85 backdrop-blur-2xl border border-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.08)] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800/80">
            <Link
              href="/login"
              className="w-9 h-9 bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-xl flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-all cursor-pointer"
            >
              <BiArrowBack className="w-5 h-5 transform scale-x-[-1]" />
            </Link>

            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                <BsShieldCheck className="w-5 h-5 text-amber-400" />
                <span>کد تایید ورود</span>
              </h2>
            </div>

            <Link
              href="/login"
              className="w-9 h-9 bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-xl flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-all cursor-pointer"
              title="ویرایش شماره"
            >
              <BsPencilSquare className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-center mb-6">
            <p className="text-zinc-400 text-xs sm:text-sm">
              کد ۵ رقمی پیامک‌شده به شماره زیر را وارد کنید:
            </p>
            <span className="inline-block mt-2 font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-sm sm:text-base dir-ltr">
              {phone || "---"}
            </span>
          </div>

          {serverError && (
            <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs sm:text-sm text-center">
              {serverError}
            </div>
          )}

          {errors.code && (
            <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs sm:text-sm text-center">
              {errors.code.message}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs sm:text-sm text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="hidden"
              {...register("code", {
                required: "لطفاً کد ۵ رقمی را کامل وارد کنید",
                minLength: {
                  value: 5,
                  message: "کد ۵ رقمی ناقص است",
                },
              })}
            />

            <div>
              <div className="flex justify-center gap-2.5 sm:gap-3" dir="ltr">
                {[0, 1, 2, 3, 4].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={codeValue[index] || ""}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-11 h-14 sm:w-13 sm:h-16 bg-zinc-900/80 border border-amber-500/25 rounded-2xl text-center text-amber-300 font-bold text-xl sm:text-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:scale-105 transition-all shadow-inner"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 pt-2 border-t border-zinc-800/60">
              {timeLeft > 0 ? (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span>ارسال مجدد کد تا</span>
                  <span className="font-mono font-bold text-amber-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition-colors disabled:opacity-50"
                >
                  <BsArrowClockwise className="w-4 h-4" />
                  <span>{isResending ? "در حال ارسال..." : "ارسال مجدد کد"}</span>
                </button>
              )}

              <Link
                href="/login"
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                ویرایش شماره
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || codeValue.length < 5}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 sm:py-4 rounded-2xl transition-all text-sm sm:text-base cursor-pointer shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:shadow-[0_0_35px_rgba(234,179,8,0.5)] transform hover:-translate-y-0.5"
            >
              {isSubmitting ? "در حال تایید..." : "تایید و ورود به سیستم"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-zinc-400 text-xs sm:text-sm">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OtpForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-amber-400 font-danaMed text-xs sm:text-sm">
          بارگذاری...
        </div>
      }
    >
      <OtpFormContent />
    </Suspense>
  );
}
