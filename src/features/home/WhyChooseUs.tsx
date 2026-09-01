"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  BsBullseye,
  BsBarChartLine,
  BsPlayCircle,
  BsChatDots,
  BsArrowLeft,
  BsLightningChargeFill,
  BsTrophyFill,
} from "react-icons/bs";
import Link from "next/link";

const featureItems = [
  {
    id: "personalized",
    icon: <BsBullseye className="w-6 h-6" />,
    title: "برنامه‌ریزی ۱۰۰٪ اختصاصی",
    subtitle: "تنظیم‌شده بر اساس آنالیز دقیق بدن، امکانات و هدف شما",
    badge: "اختصاصی",
  },
  {
    id: "progress",
    icon: <BsBarChartLine className="w-6 h-6" />,
    title: "آنالیز و ثبت هوشمند پیشرفت",
    subtitle: "پایش مداوم رکوردها، وزن و تغییرات ساختار بدنی",
    badge: "هوشمند",
  },
  {
    id: "tutorials",
    icon: <BsPlayCircle className="w-6 h-6" />,
    title: "آموزش ویدیویی و بررسی فرم حرکات",
    subtitle: "دسترسی به بانک ویدیوهای آموزشی و اصلاح خطای اجرایی",
    badge: "آموزشی",
  },
  {
    id: "coaching",
    icon: <BsChatDots className="w-6 h-6" />,
    title: "ارتباط و پشتیبانی مستقیم مربی",
    subtitle: "پاسخ به سؤالات و بازخورد هفتگی در طول مسیر تمرین",
    badge: "پشتیبانی",
  },
];

const transformationSteps = [
  { step: "۱", title: "ثبت‌نام و تکمیل فرم آنالیز بدنی" },
  { step: "۲", title: "دریافت برنامه اختصاصی تمرین و تغذیه" },
  { step: "۳", title: "تمرین، پایش پیشرفت و بازخورد مربی" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden font-danaMed">
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <ScrollReveal direction="down" duration={0.6}>
          <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <BsLightningChargeFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>تفاوت استارفیت با روش‌های سنتی</span>
            </div>

            <h2 className="text-2xl sm:text-3xl mt-3 md:text-5xl font-bold font-morabbaReg text-white tracking-tight">
              چرا مربیگری و پکیج‌های{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                استارفیت؟
              </span>
            </h2>

            <p className="text-neutral-300 mt-3 text-xs sm:text-base md:text-lg leading-relaxed">
              در استارفیت یک فایل آماده دریافت نمی‌کنید؛ بلکه یک سیستم حرفه‌ای تمرین، تغذیه و مربیگری اختصاصی برای تحول بدنی شما همراهتان است.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7">
            <StaggerContainer staggerChildren={0.12} className="space-y-3.5 sm:space-y-4">
              {featureItems.map((item) => (
                <StaggerItem key={item.id} direction="up" distance={20}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 to-yellow-500/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 group-hover:border-amber-500/40 p-4 sm:p-6 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-[0_10px_30px_rgba(234,179,8,0.1)] flex items-start gap-3.5 sm:gap-4">
                      <div className="w-13 h-13 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-yellow-400 group-hover:text-neutral-950 transition-all duration-300 shadow-sm text-sm sm:text-base">
                        {item.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-md bg-neutral-800 text-amber-400 border border-amber-500/20 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-neutral-400 mt-2 text-xs sm:text-sm leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="lg:col-span-5 flex">
            <ScrollReveal direction="left" delay={0.2} duration={0.6} className="w-full flex">
              <div className="relative w-full bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-amber-500/30 rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-5 sm:space-y-6 relative z-10">
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <BsTrophyFill className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-white font-morabbaReg">
                        مسیر تحول ۳ گامه
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-400">از شروع تا نتیجه قطعی</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {transformationSteps.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-3 sm:gap-3.5 bg-neutral-950/60 border border-neutral-800/80 p-3 sm:p-3.5 rounded-2xl backdrop-blur-sm">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 font-bold flex items-center justify-center text-xs sm:text-sm shrink-0 shadow-md">
                          {s.step}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                          {s.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 sm:pt-6 relative z-10">
                  <Link
                    href="/packages"
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold py-3.5 sm:py-4 rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:shadow-[0_0_35px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center gap-2 text-xs sm:text-base"
                  >
                    <span>شروع مسیر تحول بدنی</span>
                    <BsArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
