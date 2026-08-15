import { BsInstagram } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { CgMail } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-amber-500/20 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 sm:gap-8 mb-12">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/android-chrome-192x192.png"
                alt="لوگوی استار فیت"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-xl text-white font-morabbaReg">
                استار فیت
              </span>
            </div>
            <p className="text-neutral-400 font-danaMed max-sm:text-sm mb-6 leading-relaxed">
              استار فیت؛ پلتفرم تخصصی برنامه‌ریزی هوشمند تمرینی، تغذیه و مربیگری اختصاصی. همراه حرفه‌ای شما برای دستیابی به تناسب اندام، افزایش قدرت و تحول بدنی.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-neutral-900 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-400 rounded-lg flex items-center justify-center transition-all group"
              >
                <BsInstagram className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-900 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-400 rounded-lg flex items-center justify-center transition-all group"
              >
                <FiMessageCircle className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-900 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-400 rounded-lg flex items-center justify-center transition-all group"
              >
                <CgMail className="w-5 h-5 text-neutral-300 group-hover:text-neutral-950 transition-colors" />
              </a>
            </div>
          </div>
          <div className="col-span-1 font-danaMed">
            <h4 className="font-bold text-white mb-4">دسترسی سریع</h4>
            <div className="space-y-3 text-neutral-400 text-sm">
              <div>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors"
                >
                  صفحه اصلی
                </Link>
              </div>
              <div>
                <Link
                  href="/packages"
                  className="hover:text-amber-400 transition-colors"
                >
                  پکیج‌های اشتراک
                </Link>
              </div>
              <div>
                <Link
                  href="/articles"
                  className="hover:text-amber-400 transition-colors"
                >
                  مقالات آموزشی
                </Link>
              </div>
              <div>
                <a href="/introduce" className="hover:text-amber-400 transition-colors">
                  درباره ما
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-4">خدمات</h4>
            <div className="space-y-3 text-neutral-400 text-sm font-danaMed">
              <div>
                <a href="/dashboard/meal-plans" className="hover:text-amber-400 transition-colors">
                  برنامه غذایی
                </a>
              </div>
               <div>
                <a href="/dashboard/workouts" className="hover:text-amber-400 transition-colors">
                  برنامه تمرینی
                </a>
              </div>
              <div>
                <Link
                  href="/dashboard/tickets"
                  className="hover:text-amber-400 transition-colors"
                >
                  پشتیبانی
                </Link>
              </div>
              <div>
                <a href="/dashboard/tickets" className="hover:text-amber-400 transition-colors">
                  مشاوره رایگان
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-500/20 pt-8 font-danaMed">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-500 ss02 text-sm text-center md:text-right">
              © 1405 استار فیت. تمامی حقوق محفوظ است.
            </div>
            <div
              className="text-neutral-500 text-sm text-center md:text-left"
              dir="ltr"
            >
              Built pixel by pixel by{" "}
              <a
                href="https://www.linkedin.com/in/amin-ghoreishi-399a26395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
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
