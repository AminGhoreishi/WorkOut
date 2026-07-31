import { Flame } from "lucide-react";

export default function NoWorkoutPlan() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-danaMed p-4">
      <div className="text-center space-y-4 bg-white/[0.03] border border-amber-500/15 p-8 rounded-2xl max-w-md shadow-xl">
        <Flame className="w-12 h-12 text-amber-400/40 mx-auto" />
        <h3 className="text-lg font-bold font-morabbaReg text-white">
          برنامه تمرینی ثبت نشده است
        </h3>
        <p className="text-sm sm:text-xs text-neutral-400">
          هنوز برنامه‌ای برای این دوره سرفصل‌بندی یا فعال نشده است.
        </p>
      </div>
    </div>
  );
}
