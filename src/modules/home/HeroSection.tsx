import Link from "next/link";
import { BiDumbbell } from "react-icons/bi";
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
                <span>باشگاه اختصاصی استارفیت</span>
              </div>
              <h1 className="text-4xl font-morabbaReg md:text-6xl font-bold leading-tight text-white">
                بدن رویایی خود را با{" "}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  استایل طلایی
                </span>{" "}
                بستازید
              </h1>
              <p className="text-xl text-neutral-300 font-danaMed leading-relaxed">
                با برنامه‌های تمرینی تخصصی و مربیگری حرفه‌ای، به اهداف فیتنس خود
                برسید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 font-danaMed">
                <Link
                  href="/packages"
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.35)] transition-all hover:shadow-[0_0_35px_rgba(234,179,8,0.5)] flex items-center justify-center gap-2"
                >
                  <span>مشاهده پکیج‌ها</span>
                  <BsArrowLeft className="w-5 h-5" />
                </Link>
                <button className="border-2 border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10 text-amber-200 px-8 py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.08)]">
                  مشاوره رایگان
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-yellow-400/10 rounded-3xl blur-2xl pointer-events-none" />
              <div className="aspect-square relative z-10 rounded-3xl bg-neutral-900/80 backdrop-blur-xl border border-amber-500/30 flex items-center justify-center shadow-[0_0_35px_rgba(234,179,8,0.15)]">
                <BiDumbbell className="w-36 h-36 text-amber-400/80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
