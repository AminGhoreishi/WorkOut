"use client";

import Link from "next/link";
import {
  BsStarFill,
  BsQuote,
  BsPatchCheckFill,
  BsChatQuoteFill,
  BsTrophyFill,
  BsArrowLeft,
  BsChatDots,
} from "react-icons/bs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import type { TestimonialsListProps } from "@/types/components";

export default function TestimonialsList({
  testimonials,
}: TestimonialsListProps) {
  const latestTestimonials = testimonials.slice(0, 3);

  if (!latestTestimonials || latestTestimonials.length === 0) {
    return null;
  }

  return (
    <section
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden font-danaMed"
      dir="rtl"
    >
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <ScrollReveal direction="down" duration={0.6}>
          <div className="text-center mb-10 sm:mb-12 md:mb-14 max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <BsChatQuoteFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>داستان‌های تحول و موفقیت همراهان</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-morabbaReg text-white tracking-tight">
              تجربه واقعی شاگردان{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                استارفیت
              </span>
            </h2>

            <p className="text-neutral-300 text-xs sm:text-base md:text-lg leading-relaxed">
              نظرات و تجربیات اخیر ورزشکارانی که با برنامه‌های علمی و مربیگری اختصاصی تمرین می‌کنند.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer
          staggerChildren={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {latestTestimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id} direction="up" distance={20}>
              <div className="relative group bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-md hover:shadow-[0_12px_35px_rgba(234,179,8,0.12)] flex flex-col justify-between h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < testimonial.rating
                              ? "text-amber-400"
                              : "text-neutral-700"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800/90 text-amber-400 border border-amber-500/20">
                        {testimonial.badge}
                      </span>
                      <BsQuote className="text-amber-400/25 group-hover:text-amber-400/50 w-6 h-6 transition-colors shrink-0" />
                    </div>
                  </div>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5 group-hover:text-neutral-100 transition-colors">
                    {testimonial.comment}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-neutral-800/80">
                  {testimonial.achievement && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/15">
                      <BsTrophyFill className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-amber-300 font-medium line-clamp-1">
                        {testimonial.achievement}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-amber-400/20 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-amber-400/20 shrink-0">
                        {testimonial.name.slice(0, 1)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {testimonial.name}
                        </span>
                        <BsPatchCheckFill className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      </div>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal direction="up" duration={0.6} delay={0.2}>
          <div className="mt-12 sm:mt-16 relative bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-amber-500/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden">
            <div className="absolute -top-16 -left-16 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-morabbaReg text-white">
                  آماده‌اید داستان موفقیت بعدی{" "}
                  <span className="text-amber-400">استارفیت</span> شما باشید؟
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  برنامه تمرینی اختصاصی و رژیم هدفمند خود را همین امروز از مربیان مجرب دریافت کنید و تغییر را حس کنید.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                <Link
                  href="/packages"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2 justify-center w-full sm:w-auto"
                >
                  <span>شروع مسیر تحول</span>
                  <BsArrowLeft className="w-4 h-4" />
                </Link>

                <Link
                  href="/dashboard/testimonials"
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 hover:border-amber-500/30 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 justify-center w-full sm:w-auto"
                >
                  <BsChatDots className="w-4 h-4 text-amber-400" />
                  <span>ثبت تجربه شما</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
