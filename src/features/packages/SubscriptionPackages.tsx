import type { SubscriptionPackagesProps } from "@/types/package";
import PackagesGrid from "./PackagesGrid";
import { BsTrophyFill, BsHeadset, BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

export default function SubscriptionPackages({
  children,
  packages,
}: SubscriptionPackagesProps) {
  return (
    <div className="min-h-screen bg-black font-danaMed relative overflow-hidden" dir="rtl">
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      <section className="pt-12 pb-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <BsTrophyFill className="w-4 h-4 text-amber-400" />
            <span>تعرفه پکیج‌های تخصصی استارفیت</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-morabbaReg tracking-tight">
            پکیج‌های{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              اشتراک اختصاصی
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            مناسب‌ترین پکیج تمرین و تغذیه را برای دستیابی سریع و اصولی به هدف تناسب اندام خود انتخاب کنید.
          </p>
        </div>
      </section>

      <section className="pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children ? children : packages ? <PackagesGrid packages={packages} /> : null}
        </div>
      </section>

      <section className="pb-20 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/90 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-md">
                <BsHeadset className="w-6 h-6" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white font-morabbaReg">
                مطمئن نیستید کدام پکیج مناسب شرایط شماست؟
              </h2>

              <p className="text-neutral-300 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
                با مشاوران و تیم مربیگری استارفیت گفتگو کنید تا بهترین برنامه تمرینی و تغذیه‌ای را متناسب با شرایط بدنی‌تان پیشنهاد دهیم.
              </p>

              <div className="pt-4">
                <Link
                  href="/dashboard/tickets"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <span>درخواست مشاوره رایگان</span>
                  <BsArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
