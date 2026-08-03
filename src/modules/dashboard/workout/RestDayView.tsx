import { Flame } from "lucide-react";

export default function RestDayView() {
  return (
    <div className="rounded-3xl border border-amber-500/15 bg-white/[0.03] p-8 text-center space-y-6 shadow-xl py-16 font-danaMed" dir="rtl">
      <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
        <Flame className="w-10 h-10 animate-pulse" />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-xl font-bold font-morabbaReg text-white">
          امروز روز استراحت و ریکاوری است
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          رشد واقعی در دوران استراحت اتفاق می‌افتد. برای این روز تمرین
          با وزنه تجویز نشده است. سعی کنید روی تغذیه مناسب، نوشیدن آب
          کافی، و رهاسازی عضلانی (فوم رولر) تمرکز کنید.
        </p>
      </div>
      <div className="flex justify-center gap-4 pt-2">
        <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 text-center w-36">
          <span className="text-sm sm:text-[10px] text-neutral-400 block">
            مدت استراحت
          </span>
          <span className="text-sm font-bold text-white mt-1 block font-sans ss02">
            ۲۴ ساعت
          </span>
        </div>
        <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 text-center w-36">
          <span className="text-sm sm:text-[10px] text-neutral-400 block">
            هدف امروز
          </span>
          <span className="text-sm font-bold text-amber-400 mt-1 block">
            ریکاوری عضلانی
          </span>
        </div>
      </div>
    </div>
  );
}
