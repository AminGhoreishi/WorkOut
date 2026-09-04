import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import type { TicketStatsProps } from "@/types/ticket";

export default function TicketStatsCards({
  stats,
  formatNumber,
}: TicketStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-danaMed">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all">
        <div className="w-12 h-12 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <div className="text-2xl max-sm:text-lg font-bold text-white ss02">
            {formatNumber(stats.totalCount)}
          </div>
          <div className="text-white/60 text-xs">کل تیکت‌ها</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all">
        <div className="w-12 h-12 bg-amber-500/15 border border-amber-500/25 rounded-xl flex items-center justify-center">
          <Clock className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <div className="text-2xl max-sm:text-lg font-bold text-white ss02">
            {formatNumber(stats.pendingCount)}
          </div>
          <div className="text-white/60 text-xs">در انتظار پاسخ</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all">
        <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/25 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <div className="text-2xl max-sm:text-lg font-bold text-white ss02">
            {formatNumber(stats.answeredCount)}
          </div>
          <div className="text-white/60 text-xs">پاسخ داده شده</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all">
        <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center">
          <XCircle className="w-6 h-6 text-white/40" />
        </div>
        <div>
          <div className="text-2xl max-sm:text-lg font-bold text-white ss02">
            {formatNumber(stats.closedCount)}
          </div>
          <div className="text-white/60 text-xs">بسته شده</div>
        </div>
      </div>
    </div>
  );
}
