import { Users, Check, Clock, X } from "lucide-react";
import type { SubscriptionStatsProps } from "@/types/subscription";

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("fa-IR").format(num || 0);
};

export default function SubscriptionStats({ stats }: SubscriptionStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-danaMed">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">کل اشتراک‌ها</span>
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
          {formatNumber(stats.total)}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">فعال</span>
          <Check className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
          {formatNumber(stats.active)}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">آزمایشی (Trial)</span>
          <Clock className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
          {formatNumber(stats.trial)}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">منقضی شده</span>
          <X className="w-5 h-5 text-red-400" />
        </div>
        <div className="text-sm sm:text-3xl text-white font-bold font-morabbaReg ss02">
          {formatNumber(stats.expired)}
        </div>
      </div>
    </div>
  );
}
