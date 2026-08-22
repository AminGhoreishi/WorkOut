import { BsInstagram, BsChevronLeft, BsHeadset } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { CgMail } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className=" relative bg-neutral-950 border-t border-amber-500/20 pt-16 pb-8 overflow-hidden font-danaMed">
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-neutral-900 border border-amber-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="لوگوی استار فیت"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <span className="font-bold text-2xl text-white font-morabbaReg tracking-wide">
                استار فیت
              </span>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              استار فیت؛ پلتفرم تخصصی برنامه‌ریزی هوشمند تمرینی، تغذیه و مربیگری اختصاصی. همراه حرفه‌ای شما برای دستیابی به تناسب اندام، افزایش قدرت و تحول بدنی.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="اینستاگرام استارفیت"
                className="w-10 h-10 bg-neutral-900/90 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-yellow-400 border border-neutral-800 hover:border-amber-400/50 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:-translate-y-1 group"
              >
                <BsInstagram className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
              </a>
              <a
                href="#"
                aria-label="تلگرام استارفیت"
                className="w-10 h-10 bg-neutral-900/90 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-yellow-400 border border-neutral-800 hover:border-amber-400/50 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:-translate-y-1 group"
              >
                <FiMessageCircle className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
              </a>
              <a
                href="#"
                aria-label="ایمیل پشتیبانی استارفیت"
                className="w-10 h-10 bg-neutral-900/90 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-yellow-400 border border-neutral-800 hover:border-amber-400/50 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:-translate-y-1 group"
              >
                <CgMail className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 font-danaMed">
            <h4 className="font-bold text-white text-base mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>دسترسی سریع</span>
            </h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                  <span>صفحه اصلی</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                  <span>پکیج‌های اشتراک</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                  <span>مقالات آموزشی</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                  <span>درباره استارفیت</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 font-danaMed">
            <h4 className="font-bold text-white text-base mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>خدمات & مشاوره</span>
            </h4>
            <div className="space-y-4">
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li>
                  <Link
                    href="/dashboard/meal-plans"
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                    <span>برنامه غذایی اختصاصی</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/workouts"
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                    <span>برنامه تمرینی اختصاصی</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/tickets"
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <BsChevronLeft className="w-3 h-3 text-amber-500/50 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                    <span>پشتیبانی و تیکت آنلاین</span>
                  </Link>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/dashboard/tickets"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-amber-500/30 hover:border-amber-400 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-all shadow-sm hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                >
                  <BsHeadset className="w-4 h-4" />
                  <span>درخواست مشاوره رایگان</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800/80 pt-8 text-xs sm:text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-400 text-center md:text-right">
              © ۱۴۰۵ استار فیت. تمامی حقوق محفوظ است.
            </div>
            <div
              className="text-neutral-400 text-center md:text-left"
              dir="ltr"
            >
              Crafted with passion by{" "}
              <a
                href="https://www.linkedin.com/in/amin-ghoreishi-399a26395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors font-bold underline decoration-amber-500/40 underline-offset-4"
              >
                Amin Ghoreishi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
