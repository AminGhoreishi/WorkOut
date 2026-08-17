import { DollarSign, TrendingUp } from "lucide-react";
import { formatNumber } from "@/utils/numbers";
import type { MonthlyIncomeCardProps } from "@/types/admin";

export default function MonthlyIncomeCard({ income = 0 }: MonthlyIncomeCardProps) {
  return (
    <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
          <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
        </div>
        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
      </div>
      <div className="text-xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
        {formatNumber(income)}{" "}
        <span className="text-base sm:text-xl font-normal">تومان</span>
      </div>
      <div className="text-neutral-400 text-xs sm:text-sm">درآمد ماهانه</div>
    </div>
  );
}
