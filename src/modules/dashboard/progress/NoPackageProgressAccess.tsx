import Link from "next/link";
import { Lock, ShoppingBag, Award, TrendingUp, ShieldCheck, Dumbbell } from "lucide-react";
import type { NoPackageProgressAccessProps } from "@/types/progress";

export default function NoPackageProgressAccess({
  customMessage,
}: NoPackageProgressAccessProps) {
  return (
    <div
      className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed flex items-center justify-center"
      dir="rtl"
    >
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/5">
            <Lock className="w-10 h-10 text-amber-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-morabbaReg">
            دسترسی به نمودار پیشرفت فعال نیست
          </h1>

          <p className="text-sm text-neutral-400 leading-relaxed max-w-lg">
            {customMessage ||
              "برای ثبت رکوردهای ورزشی، آنالیز روند تغییرات وزن و مشاهده نمودارهای تخصصی پیشرفت، نیاز به فعال‌سازی یکی از پکیج‌های ورزشی استار فیت دارید."}
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-right">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">آنالیز پیشرفت</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">نمودارهای دقیق عملکرد</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">ثبت رکوردهای PR</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">پیگیری شخصی رکوردها</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <Dumbbell className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">برنامه اختصاصی</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">همراهی مربی حرفه‌ای</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/packages"
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-2xl transition-all shadow-xl shadow-amber-400/10 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>مشاهده و تهیه پکیج ورزشی</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-2xl transition-colors flex items-center justify-center gap-2 border border-white/10"
          >
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>بازگشت به داشبورد</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
