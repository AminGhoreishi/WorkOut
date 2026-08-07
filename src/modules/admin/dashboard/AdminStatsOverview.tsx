import { Users, FileText, MessageSquare, TrendingUp } from "lucide-react";
import type { AdminStatsOverviewProps } from "@/types/admin";
import MonthlyIncomeCard from "./MonthlyIncomeCard";

export default function AdminStatsOverview({
  usersCount = 0,
  publishedBlogsCount = 0,
  openTicketsCount = 0,
  monthlyIncome = 0,
}: AdminStatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
          {usersCount.toLocaleString("fa-IR")}
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm">کاربران فعال</div>
      </div>

      <MonthlyIncomeCard income={monthlyIncome} />

      <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
          {publishedBlogsCount.toLocaleString("fa-IR")}
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm">
          مقالات منتشر شده
        </div>
      </div>

      <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
          {openTicketsCount.toLocaleString("fa-IR")}
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm">تیکت‌های باز</div>
      </div>
    </div>
  );
}
