import Link from "next/link";
import { Utensils, Clock, ArrowLeft, PackageCheck } from "lucide-react";
import type { MealPlansEmptyProps } from "@/types/meal-plan";

export default function MealPlansEmpty({
  hasSubscription = false,
  message,
}: MealPlansEmptyProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed flex items-center justify-center" dir="rtl">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {hasSubscription ? (
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400 relative">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-neutral-400">
            <Utensils className="w-8 h-8" />
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-xl font-bold font-morabbaReg text-white">
            {hasSubscription
              ? "مربی در حال ایجاد برنامه غذایی است"
              : "برنامه غذایی فعال یافت نشد"}
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {message ||
              (hasSubscription
                ? "مربی شما در حال بررسی اطلاعات و تدوین برنامه اختصاصی است. پس از آماده‌سازی، وعده‌های غذایی در این صفحه نمایش داده خواهد شد."
                : "برای دریافت برنامه غذایی اختصاصی متناسب با اهداف خود، لطفاً یکی از پکیج‌های فعال را تهیه نمایید.")}
          </p>
        </div>

        {!hasSubscription && (
          <div className="pt-2">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold rounded-xl shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>مشاهده و خرید پکیج‌ها</span>
              <ArrowLeft className="w-4 h-4 mr-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
