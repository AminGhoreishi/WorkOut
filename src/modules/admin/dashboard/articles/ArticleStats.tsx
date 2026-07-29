"use client";

import React, { memo } from "react";
import { Tag, Eye, Edit, TrendingUp } from "lucide-react";
import { formatNumber } from "@/utils/numbers";
import type { ArticleStatsProps } from "@/types/blog";

const ArticleStats = memo(function ArticleStats({
  stats,
  totalCount,
}: ArticleStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-neutral-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-neutral-400 text-sm">کل مقالات</div>
          <Tag className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-3xl text-white font-bold font-morabbaReg">
          {formatNumber(totalCount)}
        </div>
      </div>

      <div className="bg-neutral-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-neutral-400 text-sm">منتشر شده</div>
          <Eye className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-3xl text-white font-bold font-morabbaReg">
          {formatNumber(stats.publishedCount)}
        </div>
      </div>

      <div className="bg-neutral-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-neutral-400 text-sm">پیش‌نویس</div>
          <Edit className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="text-3xl text-white font-bold font-morabbaReg">
          {formatNumber(stats.draftCount)}
        </div>
      </div>

      <div className="bg-neutral-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-neutral-400 text-sm">کل بازدیدها</div>
          <TrendingUp className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-3xl text-white font-bold font-morabbaReg">
          {formatNumber(stats.totalViews)}
        </div>
      </div>
    </div>
  );
});

export default ArticleStats;
