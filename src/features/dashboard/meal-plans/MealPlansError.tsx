import Link from "next/link";
import { AlertCircle, LogIn } from "lucide-react";
import type { MealPlansErrorProps } from "@/types/meal-plan";

export default function MealPlansError({ message, isUnauthorized }: MealPlansErrorProps) {
  if (isUnauthorized) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-8 font-danaMed flex items-center justify-center" dir="rtl">
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-6 rounded-2xl max-w-md text-center">
          <LogIn className="w-10 h-10 mx-auto mb-3 text-amber-400" />
          <h3 className="text-base font-bold mb-1">نشست کاربری منقضی شده است</h3>
          <p className="text-xs opacity-80 mb-4">برای مشاهده برنامه غذایی، لطفاً مجدداً وارد حساب کاربری خود شوید.</p>
          <Link
            href="/login?callbackUrl=/dashboard/meal-plans"
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
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-danaMed flex items-center justify-center" dir="rtl">
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-md text-center">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
        <h3 className="text-base font-bold mb-1">خطا در دریافت برنامه غذایی</h3>
        <p className="text-xs opacity-80">{message || "خطایی در دریافت اطلاعات رخ داد."}</p>
      </div>
    </div>
  );
}
