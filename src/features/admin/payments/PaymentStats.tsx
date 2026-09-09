import { memo } from "react";
import { Clock, CheckCircle2, XCircle, Wallet } from "lucide-react";
import type { PaymentStatsProps } from "@/types/admin-payments";

function PaymentStats({ stats }: PaymentStatsProps) {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fa-IR").format(num || 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-amber-950/30 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-amber-300/80 font-medium block mb-1">
              در انتظار تایید
            </span>
            <span
              className="text-2xl sm:text-3xl font-extrabold text-amber-300"
              style={{ fontFamily: "Marbeh, sans-serif" }}
            >
              {formatNumber(stats.pendingCount)}
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-emerald-300/80 font-medium block mb-1">
              تایید شده
            </span>
            <span
              className="text-2xl sm:text-3xl font-extrabold text-emerald-400"
              style={{ fontFamily: "Marbeh, sans-serif" }}
            >
              {formatNumber(stats.paidCount)}
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-red-950/30 border border-red-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-red-300/80 font-medium block mb-1">
              رد شده
            </span>
            <span
              className="text-2xl sm:text-3xl font-extrabold text-red-400"
              style={{ fontFamily: "Marbeh, sans-serif" }}
            >
              {formatNumber(stats.failedCount)}
            </span>
          </div>
          <div className="w-12 h-12 bg-red-500/20 rounded-2xl border border-red-500/30 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-900 border border-amber-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-zinc-400 font-medium block mb-1">
              مجموع پرداختی‌های تایید شده
            </span>
            <span
              className="text-lg sm:text-xl font-extrabold text-amber-200"
              style={{ fontFamily: "Marbeh, sans-serif" }}
            >
              {formatNumber(stats.totalAmount)} تومان
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PaymentStats);

