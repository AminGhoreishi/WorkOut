"use client";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { BiDumbbell, BiUser, BiPhone } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  LoginFormData,
  RegisterFormData,
  AuthApiResponse,
} from "@/types/auth";
import { toEnglishDigits } from "@/utils/numbers";

function LoginFormContent() {
  const [isRegister, setIsRegister] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCallbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const callbackUrl =
    rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/dashboard";

  const loginForm = useForm<LoginFormData>({
    mode: "onTouched",
  });
  const registerForm = useForm<RegisterFormData>({
    mode: "onTouched",
  });

  const handleTabChange = (registerMode: boolean) => {
    setIsRegister(registerMode);
    setServerError("");
    loginForm.reset();
    registerForm.reset();
  };

  const onLogin = async (data: LoginFormData) => {
    setServerError("");
    const cleanPhone = toEnglishDigits(data.phone);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, type: "login" }),
      });

      const resData: AuthApiResponse = await res.json().catch(() => ({
        message: "خطا در دریافت پاسخ از سرور",
      }));

      if (!res.ok) {
        setServerError(resData.message || "خطایی رخ داده است");
        return;
      }

      router.push(
        `/otp?phone=${encodeURIComponent(cleanPhone)}&callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
    } catch {
      setServerError("خطا در ارتباط با سرور، لطفاً اتصال اینترنت خود را بررسی کنید");
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setServerError("");
    const cleanPhone = toEnglishDigits(data.phone);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username.trim(),
          phone: cleanPhone,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const resData: AuthApiResponse = await res.json().catch(() => ({
        message: "خطا در دریافت پاسخ از سرور",
      }));

      if (!res.ok) {
        setServerError(resData.message || "خطایی رخ داده است");
        return;
      }

      const signInRes = await signIn("credentials", {
        phone: cleanPhone,
        password: data.password,
        redirect: false,
      });

      if (signInRes?.error) {
        setServerError("ثبت‌نام انجام شد، لطفاً از بخش ورود وارد شوید");
        setIsRegister(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setServerError("خطا در ارتباط با سرور، لطفاً دوباره تلاش کنید");
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full bg-zinc-900/60 border ${
      hasError
        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
        : "border-amber-500/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
    } rounded-xl pl-12 pr-4 py-3 text-amber-100 placeholder:text-zinc-500 focus:outline-none transition-all`;

  return (
    <div
      className="min-h-screen bg-black font-danaMed flex items-center justify-center p-4 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <BiDumbbell className="w-12 h-12 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110" />
            <span className="font-bold text-3xl font-morabbaReg text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              استارفیت
            </span>
          </Link>
          <p className="text-amber-100/60 text-sm">
            به جامعه فیتنس ما بپیوندید
          </p>
        </div>

        <div className="bg-zinc-950/80 backdrop-blur-xl border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.05)] rounded-2xl p-8">
          <div className="flex gap-2 mb-8 bg-zinc-900/90 p-1.5 rounded-xl border border-amber-500/10">
            <button
              type="button"
              onClick={() => handleTabChange(false)}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                !isRegister
                  ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "text-zinc-400 hover:text-amber-300"
              }`}
            >
              ورود
            </button>
            <button
              type="button"
              onClick={() => handleTabChange(true)}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                isRegister
                  ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "text-zinc-400 hover:text-amber-300"
              }`}
            >
              ثبت نام
            </button>
          </div>

          {serverError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
              {serverError}
            </div>
          )}

          {!isRegister && (
            <form
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="space-y-5"
            >
              <div>
                <label className="block text-amber-100/90 mb-2 text-sm font-medium">
                  شماره تلفن
                </label>
                <div className="relative">
                  <BiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
                  <input
                    type="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className={inputClass(!!loginForm.formState.errors.phone)}
                    {...loginForm.register("phone", {
                      required: "شماره تلفن الزامی است",
                      validate: (val) => {
                        const clean = toEnglishDigits(val);
                        return (
                          /^09\d{9}$/.test(clean) ||
                          "شماره تلفن معتبر نیست (مثال: 09123456789)"
                        );
                      },
                    })}
                  />
                </div>
                {loginForm.formState.errors.phone && (
                  <p className="text-red-400 text-xs mt-1">
                    {loginForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 cursor-pointer"
              >
                {loginForm.formState.isSubmitting
                  ? "در حال ارسال کد..."
                  : "ورود به حساب"}
              </button>
            </form>
          )}

          {isRegister && (
            <form
              onSubmit={registerForm.handleSubmit(onRegister)}
              className="space-y-5"
            >
              <div>
                <label className="block text-amber-100/90 mb-2 text-sm font-medium">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
                  <input
                    type="text"
                    placeholder="نام خانوادگی خود را وارد کنید"
                    className={inputClass(
                      !!registerForm.formState.errors.username,
                    )}
                    {...registerForm.register("username", {
                      required: "نام خانوادگی الزامی است",
                      minLength: {
                        value: 2,
                        message: "نام خانوادگی حداقل ۲ کاراکتر باشد",
                      },
                    })}
                  />
                </div>
                {registerForm.formState.errors.username && (
                  <p className="text-red-400 text-xs mt-1">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-amber-100/90 mb-2 text-sm font-medium">
                  شماره تلفن
                </label>
                <div className="relative">
                  <BiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/60" />
                  <input
                    type="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className={inputClass(
                      !!registerForm.formState.errors.phone,
                    )}
                    {...registerForm.register("phone", {
                      required: "شماره تلفن الزامی است",
                      validate: (val) => {
                        const clean = toEnglishDigits(val);
                        return (
                          /^09\d{9}$/.test(clean) ||
                          "شماره تلفن معتبر نیست (مثال: 09123456789)"
                        );
                      },
                    })}
                  />
                </div>
                {registerForm.formState.errors.phone && (
                  <p className="text-red-400 text-xs mt-1">
                    {registerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-amber-100/90 mb-2 text-sm font-medium">
                  رمز عبور
                </label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    className={inputClass(
                      !!registerForm.formState.errors.password,
                    )}
                    {...registerForm.register("password", {
                      required: "رمز عبور الزامی است",
                      minLength: {
                        value: 6,
                        message: "رمز عبور حداقل ۶ کاراکتر باشد",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {showRegisterPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-amber-100/90 mb-2 text-sm font-medium">
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <input
                    type={showRegisterConfirmPassword ? "text" : "password"}
                    placeholder="رمز عبور را دوباره وارد کنید"
                    className={inputClass(
                      !!registerForm.formState.errors.confirmPassword,
                    )}
                    {...registerForm.register("confirmPassword", {
                      required: "تکرار رمز عبور الزامی است",
                      validate: (val) =>
                        val === registerForm.getValues("password") ||
                        "رمز عبور و تکرار آن یکسان نیستند",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterConfirmPassword(
                        !showRegisterConfirmPassword,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {showRegisterConfirmPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={registerForm.formState.isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 cursor-pointer"
              >
                {registerForm.formState.isSubmitting
                  ? "در حال ثبت نام..."
                  : "ایجاد حساب کاربری"}
              </button>
            </form>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-500/15"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-950 text-amber-200/50">
                  یا ورود با
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl })}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800/80 border border-amber-500/20 hover:border-amber-500/40 text-amber-100 py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                ورود با گوگل
              </button>
            </div>
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

export default function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-amber-400 font-danaMed">
          بارگذاری...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
