import { memo } from "react";
import { Zap } from "lucide-react";
import type { WeeklyAdviceProps } from "@/types/workout";

function WeeklyAdvice({ advice }: WeeklyAdviceProps) {
  const title = advice?.title || "توصیه عمومی هفته";
  const description =
    advice?.description ||
    "تلاش کنید تا به اصل اضافه بار تدریجی پایبند باشید. در صورتی که در ست اول حرکت توانستید به راحتی تکرارهای مشخص شده را بزنید، در ست‌های بعدی ۵ درصد به وزنه‌ها اضافه کنید.";
  const tips =
    advice?.tips && advice.tips.length > 0
      ? advice.tips
      : [
          "آب مصرفی حین تمرین: حداقل ۱ لیتر",
          "تایم استراحت بین ست‌ها رعایت شود",
          "تغذیه و پروتئین کافی بلافاصله بعد از تمرین",
        ];

  return (
    <div
      className="rounded-2xl border border-amber-500/15 bg-white/[0.03] p-5 space-y-4 relative overflow-hidden font-danaMed"
      dir="rtl"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl" />

      <h3 className="font-bold font-morabbaReg text-white text-base flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-400" />
        <span>{title}</span>
      </h3>

      <p className="text-sm sm:text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
        {description}
      </p>

      {tips.length > 0 && (
        <div className="border-t border-white/10 pt-3 space-y-2 text-sm sm:text-xs">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-2 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(WeeklyAdvice);
