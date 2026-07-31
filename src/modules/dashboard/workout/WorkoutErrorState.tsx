import { AlertCircle, RefreshCw } from "lucide-react";
import type { WorkoutErrorStateProps } from "@/types/workout";

export default function WorkoutErrorState({
  message,
  onRetry,
}: WorkoutErrorStateProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center font-danaMed p-4">
      <div className="bg-white/[0.03] border border-amber-500/20 rounded-2xl p-8 max-w-md text-center space-y-4 shadow-xl">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold font-morabbaReg text-white">
          خطا در دریافت برنامه تمرینی
        </h3>
        <p className="text-sm sm:text-xs text-neutral-400">
          {message || "دریافت اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید."}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold text-sm sm:text-xs rounded-xl hover:opacity-95 transition-all cursor-pointer shadow-md"
        >
          <RefreshCw className="w-4 h-4 text-neutral-950" />
          <span>تلاش مجدد</span>
        </button>
      </div>
    </div>
  );
}
