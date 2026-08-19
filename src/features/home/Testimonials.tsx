"use client";

import { Star, Quote, Award, ThumbsUp, Users } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import type { TestimonialItem } from "@/types/components";

const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "امیرحسین رضایی",
    role: "شاگرد پکیج ویژه VIP",
    avatar: "AR",
    badge: "کاهش ۱۴ کیلوگرم چربی",
    rating: 5,
    comment:
      "با برنامه تمرینی و تغذیه‌ای استارفیت توی ۴ ماه تونستم ۱۴ کیلو وزن کم کنم بدون اینکه عضلاتم تحلیل بره. پشتیبانی منظم مربی و پیگیری رکوردهام توی پنل کاربری انگیزه فوق‌العاده‌ای بهم داد.",
    achievement: "ثبت بیش از ۴۰ رکورد پیشرفت",
  },
  {
    id: "2",
    name: "سارا حسینی",
    role: "شاگرد برنامه تمرین در منزل",
    avatar: "SH",
    badge: "افزایش حجم عضلانی و فرم‌دهی",
    rating: 5,
    comment:
      "چون وقت رفتن به باشگاه نداشتم، برنامه تمرین در منزل استارفیت رو گرفتم. ویدیوهای آموزشی حرکات خیلی دقیق بودن و آنالیز تغییرات بدنم باعث شد دقیقاً به هدفی که داشتم برسم.",
    achievement: "تمرین منظم بدون غیبتی",
  },
  {
    id: "3",
    name: "محمدامین کاظمی",
    role: "شاگرد پکیج قدرتی و هایپرتروفی",
    avatar: "MK",
    badge: "افزایش ۴۵ کیلو در رکورد اسکات",
    rating: 5,
    comment:
      "اصول برنامه‌ریزی استارفیت کاملاً علمی و تخصصی هست. سیستم ثبت PR و نمودار پیشرفت وب‌سایت باعث شد نقاط ضعف حرکاتم رو بشناسم و رکوردهام به طرز چشمگیری رشد کنه.",
    achievement: "کسب تندیس شاگرد برتر ماه",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-neutral-950 font-danaMed relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
            <Quote className="w-3.5 h-3.5" />
            <span>نظرات و تجربیات واقعی شاگردان</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-morabbaReg">
            اعتماد ورزشکاران و{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              نتایج واقعی
            </span>{" "}
            در استارفیت
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
            داستان موفقیت شاگردانی که با برنامه‌ریزی تخصصی و پشتیبانی مستمر به اهداف ورزشی خود دست یافتند.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16">
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">۴.۹ از ۵</div>
              <div className="text-xs text-neutral-400">میانگین رضایت شاگردان</div>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">+۱,۵۰۰</div>
              <div className="text-xs text-neutral-400">ورزشکار و شاگرد فعال</div>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">۹۸٪</div>
              <div className="text-xs text-neutral-400">میزان رضایت از پشتیبانی</div>
            </div>
          </div>
        </div>

        <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((item) => (
            <StaggerItem key={item.id} direction="up">
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 to-yellow-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative h-full bg-neutral-900/80 backdrop-blur-lg border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                      &quot;{item.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-neutral-950 font-bold text-xs flex items-center justify-center shadow-md shrink-0">
                        {item.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate">{item.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 shrink-0" title={item.achievement}>
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
