"use client";
import React, { useState } from "react";
import {
  Scale,
  Ruler,
  User,
  Activity,
  Info,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showResult, setShowResult] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-950 p-4 md:p-8 text-white" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl text-white font-bold font-morabbaReg">
              محاسبه شاخص توده بدنی (BMI)
            </h1>
            <p className="text-neutral-400">اندازه‌گیری و تحلیل تناسب اندام شما</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl text-white font-semibold mb-6 flex items-center gap-2 font-morabbaReg">
                <Sparkles className="w-5 h-5 text-amber-400" />
                ورود اطلاعات فیزیکی
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-neutral-300 mb-2 text-sm font-medium">جنسیت</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setGender("male")}
                      className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                        gender === "male"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      آقا
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("female")}
                      className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                        gender === "female"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      خانم
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2 flex items-center gap-2 text-sm font-medium">
                    <Scale className="w-4 h-4 text-amber-400" />
                    وزن (کیلوگرم)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="مثال: ۷۰"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 text-left font-sans"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2 flex items-center gap-2 text-sm font-medium">
                    <Ruler className="w-4 h-4 text-amber-400" />
                    قد (سانتی‌متر)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="مثال: ۱۷۵"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 text-left font-sans"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2 text-sm font-medium">سن (سال)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="مثال: ۲۵"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 text-left font-sans"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowResult(true)}
                  className="w-full mt-6 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold py-4 rounded-xl shadow-lg shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Activity className="w-5 h-5" />
                  محاسبه شاخص توده بدنی
                </button>
              </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-400" />
                شاخص توده بدنی (BMI) چیست؟
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                شاخص توده بدنی یا BMI ابزاری برای سنجش میزان چربی بدن بر اساس نسبت وزن به قد است. این شاخص به شما کمک می‌کند تا بدانید در کدام محدوده وزنی قرار دارید (کم‌وزنی، نرمال، اضافه‌وزن یا چاقی).
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {showResult ? (
              <div className="space-y-6">
                <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -z-10" />

                  <h2 className="text-2xl text-white font-bold mb-6 font-morabbaReg">گزارش وضعیت تناسب اندام شما</h2>

                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-white/10">
                    <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-amber-500/10 border-2 border-amber-500/30">
                      <div className="text-center">
                        <span className="block text-4xl font-extrabold text-amber-400 font-sans">
                          ۲۲.۹
                        </span>
                        <span className="text-neutral-400 text-xs mt-1 block">شاخص BMI</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-right">
                      <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                        وزن نرمال (سالم)
                      </span>
                      <h3 className="text-xl text-white font-medium mb-2">وضعیت شما کاملاً ایده آل است!</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        شاخص توده بدنی شما بین ۱۸.۵ و ۲۴.۹ قرار دارد. با حفظ رژیم غذایی مناسب و ورزش منظم، این وضعیت مطلوب را حفظ کنید.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-neutral-300 font-medium mb-3">محدوده‌های استاندارد BMI:</h4>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                        <span className="block text-amber-400 font-bold mb-1 font-sans">زیر ۱۸.۵</span>
                        <span className="text-neutral-400">کم‌وزنی</span>
                      </div>
                      <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-3 ring-2 ring-amber-500/50">
                        <span className="block text-amber-300 font-bold mb-1 font-sans">۱۸.۵ - ۲۴.۹</span>
                        <span className="text-white font-bold">نرمال</span>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                        <span className="block text-amber-400 font-bold mb-1 font-sans">۲۵ - ۲۹.۹</span>
                        <span className="text-neutral-400">اضافه‌وزن</span>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                        <span className="block text-amber-400 font-bold mb-1 font-sans">۳۰ و بالاتر</span>
                        <span className="text-neutral-400">چاق</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg text-white font-medium mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    توصیه‌های سلامت اختصاصی
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-amber-500/10 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-1 text-sm">وزن مناسب شما</h4>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        محدوده وزن ایده آل برای قد شما بین ۵۷ الی ۷۶ کیلوگرم است.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-amber-500/10 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-1 text-sm">فعالیت بدنی</h4>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        حداقل ۱۵۰ دقیقه در هفته فعالیت هوازی متوسط یا ۷۵ دقیقه فعالیت شدید توصیه می‌شود.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-12 text-center shadow-xl h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 text-amber-400 border border-amber-500/20">
                  <Scale className="w-10 h-10" />
                </div>
                <h3 className="text-xl text-white font-medium mb-2">آماده محاسبه شاخص توده بدنی</h3>
                <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                  لطفاً اطلاعات فیزیکی خود را در فرم سمت راست وارد نمایید و دکمه محاسبه را بزنید تا گزارش تحلیل برای شما نمایش داده شود.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
