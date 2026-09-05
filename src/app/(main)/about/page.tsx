import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Dumbbell,
  Trophy,
  Activity,
  Zap,
  CheckCircle2,
  ArrowLeft,
  UserCheck,
  Sparkles,
  Target,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "استار فیت | درباره امیرحسین میرآفتابی - مربی رسمی فدراسیون آمادگی جسمانی",
  description:
    "معرفی امیرحسین میرآفتابی مربی رسمی فدراسیون آمادگی جسمانی، سابقه پرسونال ترینینگ، بدنسازی تناسب اندام و بدنسازی تخصصی فوتبال در رده‌های نونهالان، جوانان و امید.",
};

export default function IntroducePage() {
  return (
    <div className="min-h-screen select-none bg-neutral-950 text-white font-danaMed relative overflow-hidden pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto pt-16 relative z-10 space-y-20">
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-semibold shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>مربی رسمی فدراسیون آمادگی جسمانی</span>
          </div>

          <h1 className="text-3xl md:text-6xl font-extrabold font-morabbaBold leading-tight text-white">
            امیرحسین{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              میرآفتابی
            </span>
          </h1>

          <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-danaMed">
            متخصص آمادگی جسمانی، پرسونال ترینر حرفه‌ای و مربی بدنسازی تخصصی فوتبال
            در رده‌های نونهالان، جوانان و امید. همراه شما در آکادمی آنلاین{" "}
            <span className="text-amber-400 font-bold">استار فیت</span> برای دست‌یابی
            به اوج عملکرد بدنی.
          </p>
        </header>

        <section className="grid  grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 p-6 rounded-2xl text-center space-y-2 shadow-[0_0_20px_rgba(234,179,8,0.05)] hover:border-amber-500/40 transition-colors">
            <Award className="w-8 h-8 mx-auto text-amber-400" />
            <span className="text-2xl max-sm:text-lg font-extrabold text-white font-morabbaBold block">
              مربی رسمی
            </span>
            <span className="text-neutral-400 text-xs block">
              فدراسیون آمادگی جسمانی
            </span>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 p-6 rounded-2xl text-center space-y-2 shadow-[0_0_20px_rgba(234,179,8,0.05)] hover:border-amber-500/40 transition-colors">
            <UserCheck className="w-8 h-8 mx-auto text-amber-400" />
            <span className="text-2xl max-sm:text-lg font-extrabold text-white font-morabbaBold block">
              پرسونال ترینینگ
            </span>
            <span className="text-neutral-400 text-xs block">
              طراحی برنامه اختصاصی
            </span>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 p-6 rounded-2xl text-center space-y-2 shadow-[0_0_20px_rgba(234,179,8,0.05)] hover:border-amber-500/40 transition-colors">
            <Trophy className="w-8 h-8 mx-auto text-amber-400" />
            <span className="text-2xl max-sm:text-lg font-extrabold text-white font-morabbaBold block">
              بدنسازی فوتبال
            </span>
            <span className="text-neutral-400 text-xs block">
              نونهالان، جوانان و امید
            </span>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 p-6 rounded-2xl text-center space-y-2 shadow-[0_0_20px_rgba(234,179,8,0.05)] hover:border-amber-500/40 transition-colors">
            <Dumbbell className="w-8 h-8 mx-auto text-amber-400" />
            <span className="text-2xl max-sm:text-lg font-extrabold text-white font-morabbaBold block">
              تناسب اندام
            </span>
            <span className="text-neutral-400 text-xs block">
              افزایش حجم و چربی‌سوزی
            </span>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-neutral-900/90 via-neutral-900/60 to-neutral-950 p-6 sm:p-10 shadow-[0_0_40px_rgba(234,179,8,0.08)]">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>گواهینامه رسمی و ثبت‌شده در فدراسیون</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-morabbaBold text-white leading-tight">
                مدرک رسمی مربیگری از{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                  فدراسیون آمادگی جسمانی
                </span>
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                امیرحسین میرآفتابی دارای گواهینامه رسمی مربیگری درجه ۳ فیزیکال فیتنس
                (آمادگی جسمانی عمومی) تحت نظارت فدراسیون آمادگی جسمانی و تندرستی و
                وزارت ورزش و جوانان کشور است. تمام متدهای تمرینی ارائه شده در استار فیت،
                مبتنی بر اصول علمی، فیزیولوژی و ارتقای استاندارد فاکتورهای آمادگی جسمانی می‌باشد.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-950/70 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-white font-bold block">کد ثبت وزارت ورزش</span>
                    <span className="text-neutral-400 text-[11px] ss02">۶۱۰۱۰۰۱۰۰۱۴۰۵۰۵۰۲۲۰۸۲۱</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-950/70 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="text-xs">
                    <span className="text-white font-bold block">دوره تخصصی</span>
                    <span className="text-neutral-400 text-[11px]">۶۰ ساعت آموزش تئوری و عملی</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <a
                href="/images/coach-certificate.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-2xl overflow-hidden border-2 border-amber-500/30 hover:border-amber-400/70 transition-all duration-500 shadow-2xl shadow-amber-500/10 group cursor-zoom-in max-w-lg w-full"
                title="مشاهده با کیفیت کامل"
              >
                <Image
                  src="/images/coach-certificate.jpg"
                  alt="گواهینامه رسمی مربیگری فدراسیون آمادگی جسمانی - امیرحسین میرآفتابی"
                  width={1024}
                  height={713}
                  className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <span className="bg-amber-400 text-neutral-950 text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                    <ExternalLink className="w-3.5 h-3.5" />
                    مشاهده تصویر با کیفیت اصلی
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold font-morabbaBold text-white">
              حوزه‌های تخصصی فعالیت
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm max-w-xl mx-auto">
              خدمات حرفه‌ای مربیگری علمی، ارتقای فاکتورهای آمادگی جسمانی و بدنسازی
              تخصصی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl border border-amber-500/20 bg-neutral-900/60 backdrop-blur-xl hover:bg-neutral-900/90 transition-all duration-300 space-y-4 group hover:border-amber-500/50 shadow-[0_0_25px_rgba(234,179,8,0.05)]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-morabbaBold text-white">
                مربیگری رسمی و علمی
              </h3>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">
                دارای مدرک رسمی از فدراسیون آمادگی جسمانی جمهوری اسلامی ایران با
                تکیه بر متدهای روز دنیا در آناتومی، فیزیولوژی ورزشی و طراحی تمرین.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-amber-500/20 bg-neutral-900/60 backdrop-blur-xl hover:bg-neutral-900/90 transition-all duration-300 space-y-4 group hover:border-amber-500/50 shadow-[0_0_25px_rgba(234,179,8,0.05)]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Dumbbell className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-morabbaBold text-white">
                پرسونال ترینینگ و تناسب اندام
              </h3>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">
                طراحی برنامه‌های تمرینی انفرادی متناسب با هدف (چربی‌سوزی، هایپرتروفی
                عضلانی، اصلاح قامت و افزایش قدرت) به همراه نظارت بر تغذیه علمی.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-amber-500/20 bg-neutral-900/60 backdrop-blur-xl hover:bg-neutral-900/90 transition-all duration-300 space-y-4 group hover:border-amber-500/50 shadow-[0_0_25px_rgba(234,179,8,0.05)]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-morabbaBold text-white">
                بدنسازی تخصصی فوتبال
              </h3>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">
                برنامه‌ریزی فصلی و مسابقاتی جهت ارتقای توان انفجاری، چابکی، سرعت و
                پیشگیری از آسیب‌های رایج ورزشی برای بازیکنان فوتبال در تمام رده‌ها.
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-8 md:p-12 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-8 relative z-10">
            <div className="text-right space-y-3">
              <span className="text-amber-400 font-bold text-xs md:text-sm tracking-wider uppercase">
                تخصص ویژه در ورزش‌های تیمی
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-morabbaBold text-white">
                بدنسازی فوتبال در رده‌های سنی پایه تا امید
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-3xl">
                آماده‌سازی بدنی بازیکنان فوتبال نیازمند شناخت دقیق مراحل رشد و
                نیازهای بیومکانیکی هر رده سنی است. تمرینات امیرحسین میرآفتابی بر
                اساس استانداردهای فدراسیون و متدهای نوین ورزشی تنظیم می‌شوند:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/20 space-y-3 hover:border-amber-400/50 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>رده نونهالان</span>
                </div>
                <h4 className="text-lg font-bold text-white font-morabbaBold">
                  توسعه بنیادین و هماهنگی
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  تمرکز بر هماهنگی عصب و عضله، چابکی، تعادل، آموزش الگوی صحیح حرکتی
                  و جلوگیری از فشار نامناسب روی صفحات رشدی استخوان‌ها.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/20 space-y-3 hover:border-amber-400/50 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>رده جوانان</span>
                </div>
                <h4 className="text-lg font-bold text-white font-morabbaBold">
                  قدرت و توان انفجاری
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  افزایش قدرتمندی عضله، شتاب‌گیری و استقامت قلبی عروقی، متناسب با
                  شدت بالای مسابقات رده جوانان و رقابت‌های باشگاهی.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/20 space-y-3 hover:border-amber-400/50 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>رده سنی امید</span>
                </div>
                <h4 className="text-lg font-bold text-white font-morabbaBold">
                  آمادگی حرفه‌ای و مسابقاتی
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  بدنسازی سنگین و تخصصی فوتبال، حداکثر‌سازی توان خروجی، ریکاوری
                  سریع و آمادگی کامل جهت ورود به مسابقات لیگ‌های بزرگسالان.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-900/70 border border-amber-500/20 rounded-3xl p-8 md:p-12 space-y-8 backdrop-blur-xl">
          <div className="space-y-3 text-center md:text-right">
            <h2 className="text-2xl max-sm:text-lg md:text-3xl font-bold font-morabbaBold text-white">
              چرا سیستم مربیگری استار فیت با امیرحسین میرآفتابی؟
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm">
              تجربه تمرینی متفاوت، آنلاین اما کاملاً زیر ذره‌بین مربی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-950/60 border border-amber-500/10">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-white">برنامه ۱۰۰٪ شخصی‌سازی‌شده</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  تنظیم دقیق تمرین بر اساس هدف فردی، امکانات، آسیب‌های گذشته و آنالیز بدنی.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-950/60 border border-amber-500/10">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-white">ویدیوهای کامل آموزشی</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  آموزش دقیق تکنیک اجرای حرکات جهت جلوگیری از آسیب و حداکثر بهره‌وری.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-950/60 border border-amber-500/10">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-white">پایش و بازخورد جلسات</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  ارزیابی میزان سختی، فشار و احساس خستگی پس از هر جلسه تمرین توسط مربی.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-950/60 border border-amber-500/10">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-white">پشتیبانی مداوم</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  پاسخگویی به سوالات، اصلاح تکنیک حرکات و بهینه‌سازی مستمر برنامه‌ها.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_25px_rgba(234,179,8,0.2)]">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold font-morabbaBold text-white">
            آماده‌اید تمرین حرفه‌ای را شروع کنید؟
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            همین امروز پکیج مناسب خود را انتخاب کنید و تحت نظارت مستقیم امیرحسین
            میرآفتابی مسیر آمادگی جسمانی خود را آغاز نمایید.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4 font-danaMed">
            <Link
              id="cta-packages-link"
              href="/packages"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 px-9 py-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_0_25px_rgba(234,179,8,0.35)] hover:shadow-[0_0_35px_rgba(234,179,8,0.5)]"
            >
              <span>مشاهده و دریافت پکیج‌های تمرینی</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
