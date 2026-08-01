"use client";

import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import {
  Scale,
  Ruler,
  User,
  Activity,
  Info,
  HelpCircle,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toEnglishDigits } from "@/utils/numbers";
import type { FitnessProfileApiResponse } from "@/types/fitness-profile";
import type {
  BMIGender,
  BMIResult,
  BMIFormInputs,
  BMICategory,
} from "@/types/bmi";

const fetcher = async (url: string): Promise<FitnessProfileApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات");
  }
  return res.json();
};

function calculateBMI(
  weightNum: number,
  heightNum: number,
  gender: BMIGender,
): BMIResult | null {
  if (
    isNaN(weightNum) ||
    isNaN(heightNum) ||
    weightNum <= 20 ||
    weightNum >= 300 ||
    heightNum <= 50 ||
    heightNum >= 260
  ) {
    return null;
  }

  const heightMeters = heightNum / 100;
  const bmi = weightNum / (heightMeters * heightMeters);
  const bmiFormatted = bmi.toFixed(1);

  const idealWeightMin = Math.round(18.5 * heightMeters * heightMeters);
  const idealWeightMax = Math.round(24.9 * heightMeters * heightMeters);

  let category: BMICategory = "normal";
  let categoryTitle = "وزن نرمال (سالم)";
  let categoryDescription =
    "شاخص توده بدنی شما در محدوده ایده آل و سالم قرار دارد. با حفظ رژیم غذایی متوازن و فعالیت بدنی منظم این شرایط مطلوب را نگه دارید.";
  let badgeClass =
    "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 ring-2 ring-emerald-500/30";
  let badgeText = "ایده‌آل";
  let nutritionAdvice =
    "مصرف کالری متعادل با پروتئین کافی و فیبر بالا را ادامه دهید.";
  let activityAdvice =
    "حداقل ۱۵۰ دقیقه فعالیت ورزشی هوازی و ۲ جلسه تمرین قدرتی در هفته.";

  if (bmi < 18.5) {
    category = "underweight";
    categoryTitle = "کم‌وزنی";
    categoryDescription =
      "شاخص توده بدنی شما کمتر از حد استاندارد است. پیشنهاد می‌شود با برنامه تغذیه‌ای مناسب و افزایش دریافت کالری سالم، به وزن ایده آل برسید.";
    badgeClass =
      "bg-amber-500/20 border-amber-500/40 text-amber-300 ring-2 ring-amber-500/30";
    badgeText = "کمتر از حد نرمال";
    nutritionAdvice =
      "افزایش دریافت کالری روزانه از منابع مغذی مانند آجیل، آووکادو و پروتئین‌ها.";
    activityAdvice =
      "تمرینات قدرتی و هایپرتروفی جهت افزایش حجم عضلانی مفید و توصیه می‌شود.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "overweight";
    categoryTitle = "اضافه‌وزن";
    categoryDescription =
      "شاخص توده بدنی شما کمی بالاتر از حد نرمال است. با کنترل ریزه‌خواری و افزایش سوزاندن کالری می‌توانید به محدوده ایده آل بازگردید.";
    badgeClass =
      "bg-amber-500/20 border-amber-500/40 text-amber-300 ring-2 ring-amber-500/30";
    badgeText = "بالاتر از حد نرمال";
    nutritionAdvice =
      "کاهش مصرف قندهای مصنوعی، کربوهیدرات ساده و غذاهای پرچرب.";
    activityAdvice =
      "افزایش فعالیت هوازی (کاردیو) و اینتروال هیپ (HIIT) به همراه تمرین با وزنه.";
  } else if (bmi >= 30) {
    category = "obese";
    categoryTitle = "چاقی (نیاز به مدیریت وزن)";
    categoryDescription =
      "شاخص توده بدنی شما در محدوده چاقی قرار دارد. شروع یک برنامه تمرینی و تغذیه‌ای اصولی زیر نظر متخصص برای حفظ سلامت حیاتی است.";
    badgeClass =
      "bg-rose-500/20 border-rose-500/40 text-rose-300 ring-2 ring-rose-500/30";
    badgeText = "نیازمند اصلاح رژیم و ورزش";
    nutritionAdvice =
      "ایجاد نقص کالری کنترل‌شده و مصرف پرحجم غذاهای کم‌کالری مانند سبزیجات.";
    activityAdvice =
      "پیاده‌روی روزانه، شنا و تمرینات کم‌برخورد جهت حفظ سلامت مفاصل.";
  }

  const positionPercent = Math.min(
    100,
    Math.max(0, ((bmi - 15) / (35 - 15)) * 100),
  );

  return {
    bmi,
    bmiFormatted,
    category,
    categoryTitle,
    categoryDescription,
    badgeClass,
    badgeText,
    idealWeightMin,
    idealWeightMax,
    idealWeightText: `بین ${idealWeightMin} الی ${idealWeightMax} کیلوگرم`,
    nutritionAdvice,
    activityAdvice,
    positionPercent,
  };
}

export default function BMICalculator() {
  const { data: profileData, isLoading: isProfileLoading } =
    useSWR<FitnessProfileApiResponse>("/api/user/fitness-profile", fetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 15000,
    });

  const [formInputs, setFormInputs] = useState<BMIFormInputs>({
    weight: "70",
    height: "175",
    age: "25",
    gender: "male",
  });

  const [isAutoFilled, setIsAutoFilled] = useState<boolean>(false);

  useEffect(() => {
    if (profileData?.profile && !isAutoFilled) {
      const p = profileData.profile;
      setFormInputs((prev) => ({
        ...prev,
        weight: p.weightKg ? String(p.weightKg) : prev.weight,
        height: p.heightCm ? String(p.heightCm) : prev.height,
        age: p.ageYears ? String(p.ageYears) : prev.age,
      }));
      setIsAutoFilled(true);
    }
  }, [profileData, isAutoFilled]);

  const weightNum = parseFloat(toEnglishDigits(formInputs.weight));
  const heightNum = parseFloat(toEnglishDigits(formInputs.height));

  const result = useMemo(() => {
    return calculateBMI(weightNum, heightNum, formInputs.gender);
  }, [weightNum, heightNum, formInputs.gender]);

  const handleInputChange = (field: keyof BMIFormInputs, val: string) => {
    setFormInputs((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <div
      className="min-h-screen bg-neutral-950 p-4 md:p-8 text-white font-danaMed"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl text-white font-bold font-morabbaReg">
                محاسبه شاخص توده بدنی (BMI)
              </h1>
              <p className="text-neutral-400 text-sm mt-0.5">
                محاسبه هوشمند و تحلیل اختصاصی وضعیت تناسب اندام
              </p>
            </div>
          </div>

          {isProfileLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-400/80 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 self-start sm:self-auto">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              در حال دریافت پروفایل...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl text-white font-semibold mb-6 flex items-center gap-2 font-morabbaReg">
                <Sparkles className="w-5 h-5 text-amber-400" />
                اطلاعات فیزیکی
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-neutral-300 mb-2 text-sm font-medium">
                    جنسیت
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange("gender", "male")}
                      className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                        formInputs.gender === "male"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      آقا
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("gender", "female")}
                      className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                        formInputs.gender === "female"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10"
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
                    min={20}
                    max={300}
                    value={formInputs.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                    placeholder="مثال: ۷۰"
                    className="w-full bg-white/5 border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 text-left font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2 flex items-center gap-2 text-sm font-medium">
                    <Ruler className="w-4 h-4 text-amber-400" />
                    قد (سانتی‌متر)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={260}
                    value={formInputs.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    placeholder="مثال: ۱۷۵"
                    className="w-full bg-white/5 border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 text-left font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2 text-sm font-medium">
                    سن (سال)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={120}
                    value={formInputs.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="مثال: ۲۵"
                    className="w-full bg-white/5 border border-white/10 focus:border-amber-500/50 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 text-left font-sans transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-400" />
                شاخص توده بدنی (BMI) چیست؟
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                BMI نسبتی استاندارد میان وزن و توان محاسباتی قد شماست که توسط
                سازمان جهانی بهداشت (WHO) برای دسته‌بندی وزن سالم استفاده می‌شود.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {result ? (
              <div className="space-y-6">
                <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -z-10" />

                  <h2 className="text-xl sm:text-2xl text-white font-bold mb-6 font-morabbaReg">
                    تحلیل تناسب اندام شما
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/10">
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center rounded-full bg-amber-500/10 border-2 border-amber-500/40 shadow-inner">
                      <div className="text-center">
                        <span className="block text-4xl sm:text-5xl font-extrabold text-amber-400 font-sans tracking-tight">
                          {result.bmiFormatted}
                        </span>
                        <span className="text-neutral-400 text-xs mt-1 block font-medium">
                          شاخص BMI
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-right">
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-3 border ${result.badgeClass}`}
                      >
                        {result.categoryTitle} - {result.badgeText}
                      </span>
                      <h3 className="text-lg text-white font-semibold mb-2">
                        {result.category === "normal"
                          ? "وضعیت تناسب اندام شما ایده آل است!"
                          : `تحلیل: وضعیت ${result.categoryTitle}`}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">
                        {result.categoryDescription}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-300 mb-2">
                      <span>نمودار محدوده BMI</span>
                      <span className="text-amber-400">
                        {result.bmiFormatted}
                      </span>
                    </div>

                    <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-amber-400/40 border-r border-black/20"
                        style={{ width: "17.5%" }}
                      />
                      <div
                        className="h-full bg-emerald-500/60 border-r border-black/20"
                        style={{ width: "32%" }}
                      />
                      <div
                        className="h-full bg-amber-500/60 border-r border-black/20"
                        style={{ width: "25%" }}
                      />
                      <div
                        className="h-full bg-rose-500/60"
                        style={{ width: "25.5%" }}
                      />

                      <div
                        className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,1)] transition-all duration-500"
                        style={{ left: `${100 - result.positionPercent}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
                      <div
                        className={`p-2.5 rounded-xl border transition-all ${
                          result.category === "underweight"
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400"
                        }`}
                      >
                        <span className="block font-bold font-sans">
                          کمتر از ۱۸.۵
                        </span>
                        <span className="text-[11px]">کم‌وزنی</span>
                      </div>

                      <div
                        className={`p-2.5 rounded-xl border transition-all ${
                          result.category === "normal"
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400"
                        }`}
                      >
                        <span className="block font-bold font-sans">
                          ۱۸.۵ - ۲۴.۹
                        </span>
                        <span className="text-[11px]">نرمال</span>
                      </div>

                      <div
                        className={`p-2.5 rounded-xl border transition-all ${
                          result.category === "overweight"
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400"
                        }`}
                      >
                        <span className="block font-bold font-sans">
                          ۲۵ - ۲۹.۹
                        </span>
                        <span className="text-[11px]">اضافه‌وزن</span>
                      </div>

                      <div
                        className={`p-2.5 rounded-xl border transition-all ${
                          result.category === "obese"
                            ? "bg-rose-500/20 border-rose-500 text-rose-300 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400"
                        }`}
                      >
                        <span className="block font-bold font-sans">
                          ۳۰ به بالا
                        </span>
                        <span className="text-[11px]">چاق</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-lg text-white font-medium mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    توصیه‌های سلامتی اختصاصی
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-amber-500/10 rounded-xl p-4">
                      <h4 className="text-amber-300 font-semibold mb-1 text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        وزن ایده آل شما
                      </h4>
                      <p className="text-neutral-300 text-xs leading-relaxed">
                        برای قد {formInputs.height} سانتی‌متر، محدوده وزن ایده
                        آل شما {result.idealWeightText} است.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-amber-500/10 rounded-xl p-4">
                      <h4 className="text-amber-300 font-semibold mb-1 text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        توصیه تغذیه‌ای
                      </h4>
                      <p className="text-neutral-300 text-xs leading-relaxed">
                        {result.nutritionAdvice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-12 text-center shadow-2xl h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 text-amber-400 border border-amber-500/20">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <h3 className="text-xl text-white font-medium mb-2">
                  اطلاعات فیزیکی نامعتبر است
                </h3>
                <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                  لطفاً مقادیر معتبر برای قد (بین ۵۰ تا ۲۶۰ سانتی‌متر) و وزن (بین
                  ۲۰ تا ۳۰۰ کیلوگرم) وارد کنید.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
