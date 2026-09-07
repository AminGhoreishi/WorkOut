import Link from "next/link";
import { AlertCircle, LogIn, RotateCcw } from "lucide-react";
import type { NutritionErrorProps } from "@/types/nutrition";

export default function NutritionError({
  message,
  isUnauthorized,
  onRetry,
}: NutritionErrorProps) {
  if (isUnauthorized) {
    return (
      <div
        className="font-danaMed pt-16 bg-neutral-950 min-h-screen text-white flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-6 rounded-2xl max-w-md w-full text-center shadow-xl">
          <LogIn className="w-10 h-10 mx-auto mb-3 text-amber-400" />
          <h3 className="text-base font-bold mb-1">نشست کاربری منقضی شده است</h3>
          <p className="text-xs opacity-80 mb-4">
            برای مشاهده و ثبت کالری‌های روزانه، لطفاً مجدداً وارد حساب کاربری خود شوید.
          </p>
          <Link
            href="/login?callbackUrl=/dashboard/nutrition"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            ورود مجدد به حساب
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="font-danaMed pt-16 bg-neutral-950 min-h-screen text-white flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-md w-full text-center shadow-xl">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
        <h3 className="text-base font-bold mb-1">خطا در دریافت اطلاعات تغذیه</h3>
        <p className="text-xs opacity-80 mb-5 leading-relaxed">
          {message || "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید."}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            تلاش مجدد
          </button>
        )}
      </div>
    </div>
  );
}
