import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function HeroSection() {
  return (
    <div className="container mx-auto relative overflow-hidden">
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <section className="relative overflow-hidden">
        <div className="py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-danaMed">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>باشگاه آنلاین استارفیت</span>
              </div>
              <h1 className="text-4xl font-morabbaReg md:text-6xl font-bold leading-tight text-white">
                تمرین کن. پیشرفتت را ببین.{" "}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  بهتر شو.
                </span>
              </h1>
              <p className="text-xl text-neutral-300 font-danaMed leading-relaxed">
                برنامه‌های تمرینی و تغذیه‌ای اختصاصی‌سازی‌شده، متناسب با هدف، شرایط
                بدنی و امکانات شما؛ همراه با پشتیبانی و پایش روند پیشرفت.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 font-danaMed">
                <Link
                  href="/packages"
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.35)] transition-all hover:shadow-[0_0_35px_rgba(234,179,8,0.5)] flex items-center justify-center gap-2"
                >
                  <span>مشاهده پکیج‌ها</span>
                  <BsArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-yellow-400/10 rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative w-full max-w-md h-[400px] sm:h-[460px] flex items-center justify-center">
                <div className="absolute top-0 right-4 w-[68%] h-[80%] rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 bg-neutral-900">
                  <Image
                    src="/images/hero/hero-1.jpg"
                    alt="تمرینات دویدن و هوازی استارفیت"
                    fill
                    sizes="(max-width: 768px) 70vw, 350px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-0 left-4 w-[68%] h-[80%] rounded-3xl overflow-hidden border border-amber-400/40 shadow-[0_15px_35px_rgba(234,179,8,0.2)] rotate-6 hover:rotate-0 transition-transform duration-500 z-20 bg-neutral-900">
                  <Image
                    src="/images/hero/hero-2.jpg"
                    alt="تمرینات استقامت و قدرتی استارفیت"
                    fill
                    sizes="(max-width: 768px) 70vw, 350px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
