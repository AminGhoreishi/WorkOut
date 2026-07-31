import { Zap } from "lucide-react";

export default function WeeklyAdvice() {
  return (
    <div className="rounded-2xl border border-amber-500/15 bg-white/[0.03] p-5 space-y-4 relative overflow-hidden font-danaMed">
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl" />

      <h3 className="font-bold font-morabbaReg text-white text-base flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-400" />
        <span>توصیه عمومی هفته</span>
      </h3>

      <p className="text-sm sm:text-xs text-neutral-400 leading-relaxed">
        تلاش کنید تا به اصل اضافه بار تدریجی پایبند باشید. در صورتی که در ست اول
        حرکت توانستید به راحتی تکرارهای مشخص شده را بزنید، در ست‌های بعدی ۵ درصد
        به وزنه‌ها اضافه کنید.
      </p>

      <div className="border-t border-white/10 pt-3 space-y-2 text-sm sm:text-xs">
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>آب مصرفی حین تمرین: حداقل ۱ لیتر</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>تایم استراحت بین ست‌ها رعایت شود</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>تغذیه و پروتئین کافی بلافاصله بعد از تمرین</span>
        </div>
      </div>
    </div>
  );
}
