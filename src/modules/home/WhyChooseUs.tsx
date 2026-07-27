"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-neutral-950/80 font-danaMed relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            چرا{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              استارفیت
            </span>{" "}
            را انتخاب کنیم؟
          </h2>
          <p className="text-neutral-400 text-lg">تفاوت‌های کلیدی ما با رقبا</p>
        </div>
        <StaggerContainer staggerChildren={0.15} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem direction="up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/60 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  برنامه شخصی‌سازی شده
                </h3>
                <p className="text-neutral-400 text-sm">
                  برنامه‌ای کاملاً اختصاصی بر اساس سطح، هدف و زمان‌بندی شما
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem direction="up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/60 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  پشتیبانی ۲۴/۷
                </h3>
                <p className="text-neutral-400 text-sm">
                  مربیان ما همیشه در دسترس شما هستند برای پاسخگویی
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem direction="up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/60 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  پیگیری دقیق
                </h3>
                <p className="text-neutral-400 text-sm">
                  نمودارها و گزارش‌های کامل از پیشرفت روزانه شما
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem direction="up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/60 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
                <div className="text-5xl mb-4">👑</div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  کیفیت پریمیوم
                </h3>
                <p className="text-neutral-400 text-sm">
                  بهترین کیفیت خدمات با استانداردهای بین‌المللی
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
