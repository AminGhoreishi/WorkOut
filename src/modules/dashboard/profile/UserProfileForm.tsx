import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, Save } from "lucide-react";
import type { UserProfileFormProps } from "@/types/user-profile";

export default function UserProfileForm({
  register,
  errors,
  saving,
  onSubmit,
}: UserProfileFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { onChange: onUsernameChange, ...registerUsername } = register(
    "username",
    {
      required: "وارد کردن نام کاربری الزامی است",
      minLength: {
        value: 3,
        message: "نام کاربری باید حداقل ۳ کاراکتر باشد",
      },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message:
          "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و خط تیره (_) باشد",
      },
    },
  );

  return (
    <div className="md:col-span-2 bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 md:p-8 shadow-xl">
      <h3 className="text-xl font-bold font-morabbaReg text-white mb-6">
        ویرایش حساب کاربری
      </h3>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 text-xs mb-2 font-medium">
              نام و نام خانوادگی
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="مثال: علی کریمی"
                {...register("fullName", {
                  required: "وارد کردن نام و نام خانوادگی الزامی است",
                })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            {errors.fullName && (
              <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-neutral-300 text-xs mb-2 font-medium">
              نام کاربری (انگلیسی)
            </label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-semibold">
                @
              </span>
              <input
                type="text"
                placeholder="username"
                {...registerUsername}
                onChange={(e) => {
                  e.target.value = e.target.value.toLowerCase().trim();
                  onUsernameChange(e);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-9 pl-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-left"
                dir="ltr"
              />
            </div>
            {errors.username && (
              <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 text-xs mb-2 font-medium">
              شماره تلفن همراه
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="tel"
                placeholder="مثال: 09123456789"
                {...register("phone")}
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-left"
              />
            </div>
          </div>
          <div>
            <label className="block text-neutral-300 text-xs mb-2 font-medium">
              آدرس ایمیل
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                placeholder="example@mail.com"
                {...register("email", {
                  required: "وارد کردن ایمیل الزامی است",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "آدرس ایمیل نامعتبر است",
                  },
                })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-left"
              />
            </div>
            {errors.email && (
              <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <hr className="border-white/5 my-6" />

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
          <span className="text-[10px] text-amber-300 font-bold block mb-1">
            تغییر رمز عبور (اختیاری)
          </span>
          <span className="text-[10px] text-neutral-400 leading-relaxed block">
            در صورتی که نمی‌خواهید رمز عبور خود را تغییر دهید، فیلدهای زیر را
            خالی بگذارید.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 text-xs mb-2 font-medium">
              رمز عبور جدید
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                  },
                })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-11 pl-10 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-left"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-neutral-300 text-xs mb-2 font-medium">
              تکرار رمز عبور جدید
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="******"
                {...register("confirmPassword", {
                  validate: (val, formValues) => {
                    if (formValues.password && val !== formValues.password) {
                      return "رمز عبور جدید و تکرار آن یکسان نیستند.";
                    }
                    return true;
                  },
                })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pr-11 pl-10 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors text-left"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                <span>در حال ذخیره...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-neutral-950" />
                <span>ذخیره تغییرات</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
