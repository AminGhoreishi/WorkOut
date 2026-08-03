import { Award, Flame, TrendingUp } from "lucide-react";

export default function WorkoutAchievements() {
  return (
    <div className="rounded-2xl border border-amber-500/15 bg-white/[0.03] p-5 space-y-4 font-danaMed" dir="rtl">
      <h3 className="font-bold font-morabbaReg text-white text-base flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" />
        <span>افتخارات ورزشی شما</span>
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-xs font-bold text-white">تمرین مداوم هفتگی</h4>
            <p className="text-sm sm:text-[10px] text-neutral-400">
              ادامه دهید! ریتم فوق‌العاده‌ای دارید
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-300 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-xs font-bold text-white">تعهد و انضباط</h4>
            <p className="text-sm sm:text-[10px] text-neutral-400">
              پیشرفت چشمگیر در ثبت تمرینات روزانه
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
