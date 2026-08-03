"use client";

import React, { memo } from "react";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import type { TicketStatsProps } from "@/types/ticket";

const TicketStats = memo(function TicketStats({ stats, formatNumber }: TicketStatsProps) {
  const safeStats = stats || {
    totalCount: 0,
    pendingCount: 0,
    answeredCount: 0,
    closedCount: 0,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-danaMed">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white ss02 font-sans">
            {formatNumber(safeStats.totalCount)}
          </div>
          <div className="text-white/60 text-xs">کل تیکت‌ها</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center animate-pulse">
          <Clock className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white ss02 font-sans">
            {formatNumber(safeStats.pendingCount)}
          </div>
          <div className="text-white/60 text-xs">در انتظار پاسخ</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white ss02 font-sans">
            {formatNumber(safeStats.answeredCount)}
          </div>
          <div className="text-white/60 text-xs">پاسخ داده شده</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
          <XCircle className="w-6 h-6 text-white/40" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white ss02 font-sans">
            {formatNumber(safeStats.closedCount)}
          </div>
          <div className="text-white/60 text-xs">بسته شده</div>
        </div>
      </div>
    </div>
  );
});

export default TicketStats;
