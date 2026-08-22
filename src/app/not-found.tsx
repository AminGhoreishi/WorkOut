"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell, ArrowRight, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black font-danaMed flex items-center justify-center overflow-hidden px-4 py-12" dir="rtl">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        <div className="bg-zinc-950/85 backdrop-blur-2xl border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(234,179,8,0.1)]">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8 shadow-[0_0_20px_rgba(234,179,8,0.2)] animate-bounce" style={{ animationDuration: "3s" }}>
            <Dumbbell className="w-12 h-12 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          </div>

          <h1 className="font-morabbaReg text-7xl md:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_5px_15px_rgba(234,179,8,0.3)] mb-4 select-none">
            404
          </h1>

          <h2 className="font-morabbaReg text-2xl md:text-3xl font-bold text-white mb-4">
            از مسیر تمرین خارج شدی قهرمان! 🏋️‍♂️
          </h2>

          <p className="font-danaMed text-neutral-300 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
            صفحه‌ای که به دنبال آن بودید پیدا نشد. شاید وزنه بیش از حد سنگین بوده یا مسیر حرکت را اشتباه رفته‌اید! نگران نباشید، با دکمه‌های زیر می‌توانید به مسیر اصلی برگردید.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-danaMed">
            <Link
              href="/"
              id="notfound-home-btn"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:shadow-[0_0_35px_rgba(234,179,8,0.5)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>بازگشت به خانه</span>
            </Link>

            <button
              onClick={() => router.back()}
              id="notfound-back-btn"
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-amber-100 hover:text-white font-semibold rounded-2xl border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 transform rotate-180" />
              <span>صفحه قبلی</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-danaMed text-neutral-400">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>پشتیبانی سیستم ورزشی و تناسب اندام استارفیت</span>
        </div>
      </div>
    </div>
  );
}
