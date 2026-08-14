"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import type { WhyChooseUsItem } from "@/types/components";

const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "personalized-program",
    icon: "🎯",
    title: "برنامه شخصی‌سازی‌شده",
    description: "برنامه بر اساس هدف، سطح تمرین، شرایط بدنی و امکانات شما طراحی می‌شود.",
  },
  {
    id: "measurable-progress",
    icon: "📊",
    title: "پیشرفت قابل اندازه‌گیری",
    description: "روند تمرین، رکوردها و اطلاعات پیشرفت شما در طول مسیر ثبت و بررسی می‌شود.",
  },
  {
    id: "video-tutorials",
    icon: "🎥",
    title: "آموزش و بازخورد",
    description: "ویدیوهای آموزشی حرکات در اختیار شماست و در پکیج‌های مربوطه، اجرای حرکات نیز بررسی می‌شود.",
  },
  {
    id: "coach-support",
    icon: "💬",
    title: "پشتیبانی مربی",
    description: "سؤالات و مشکلات خود را با مربی در میان می‌گذارید و در طول مسیر بازخورد دریافت می‌کنید.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-neutral-950/80 font-danaMed relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            چرا{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              استارفیت؟
            </span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            یک برنامه آماده دریافت نمی‌کنید؛ مسیر تمرینی شما بر اساس شرایط و هدف خودتان طراحی و پیگیری می‌شود.
          </p>
        </div>
        <StaggerContainer staggerChildren={0.15} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsData.map((item) => (
            <StaggerItem key={item.id} direction="up">
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative h-full bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/60 shadow-[0_0_20px_rgba(234,179,8,0.05)] flex flex-col">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mt-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
