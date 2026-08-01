"use client";
import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BiDumbbell, BiArrowBack } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { toEnglishDigits } from "@/utils/numbers";
import type { AuthApiResponse } from "@/types/auth";

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

  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleOtpChange = (index: number, value: string) => {
    setServerError("");
    setSuccessMessage("");
    const cleanVal = toEnglishDigits(value).replace(/\D/g, "");
    if (!cleanVal && value !== "") return;

    const digit = cleanVal.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
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

    const newOtp = ["", "", "", "", ""];
    for (let i = 0; i < cleanDigits.length; i++) {
      newOtp[i] = cleanDigits[i];
    }
    setOtp(newOtp);

    const targetIndex = Math.min(cleanDigits.length, 4);
    inputRefs.current[targetIndex]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    const code = otp.join("");

    if (code.length < 5) {
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
          code,
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
        setOtp(["", "", "", "", ""]);
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
      className="min-h-screen bg-black font-danaMed flex items-center justify-center p-4 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-in fade-in duration-300 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <BiDumbbell className="w-12 h-12 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110" />
            <span className="font-bold text-3xl font-morabbaReg text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              استارفیت
            </span>
          </Link>
          <p className="text-amber-100/60 text-sm">به جامعه فیتنس ما بپیوندید</p>
        </div>

        <div className="bg-zinc-950/80 backdrop-blur-xl border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.05)] rounded-2xl p-8 relative overflow-hidden">
          <div className="animate-in slide-in-from-left-4 duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/login"
                className="text-zinc-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                <BiArrowBack className="w-5 h-5 transform scale-x-[-1]" />
              </Link>
              <div className="flex-1 text-center pr-6">
                <h2 className="text-xl font-bold text-amber-100 mb-1">
                  تایید شماره تلفن
                </h2>
                <p className="text-amber-200/60 text-xs leading-relaxed truncate max-w-[280px]">
                  کد تایید ۵ رقمی به {phone || "شماره تلفن شما"} ارسال گردید
                </p>
              </div>
            </div>

            {serverError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {serverError}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-amber-100/90 mb-4 text-xs font-semibold text-center">
                  کد تایید ۵ رقمی را وارد کنید
                </label>
                <div className="flex justify-center gap-3" dir="ltr">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-14 bg-zinc-900/80 border border-amber-500/20 rounded-xl text-center text-amber-300 font-bold text-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 focus:bg-zinc-800/90 transition-all"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400">
                {timeLeft > 0 ? (
                  <span>ارسال مجدد کد پس از {formatTime(timeLeft)}</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition-colors disabled:opacity-50"
                  >
                    {isResending ? "در حال ارسال..." : "ارسال مجدد کد تایید"}
                  </button>
                )}
                <Link
                  href="/login"
                  className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition-colors"
                >
                  ویرایش شماره تلفن
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.join("").length < 5}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 rounded-xl transition-all text-sm cursor-pointer shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35"
              >
                {isSubmitting ? "در حال تایید..." : "ورود به حساب کاربری"}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-6 text-zinc-400 text-sm">
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
        <div className="min-h-screen bg-black flex items-center justify-center text-amber-400 font-danaMed">
          بارگذاری...
        </div>
      }
    >
      <OtpFormContent />
    </Suspense>
  );
}
