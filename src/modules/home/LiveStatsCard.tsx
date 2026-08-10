import { BiTrendingUp, BiUser } from "react-icons/bi";

interface LiveStatsCardProps {
  stats: {
    todayUsersCount: string;
    trendText: string;
  };
}

export default function LiveStatsCard({ stats }: LiveStatsCardProps) {
  return (
    <div className="flex justify-center">
      <div className="max-w-xs w-full bg-neutral-900/90 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.08)]">
        <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <BiUser className="w-8 h-8 text-amber-400" />
        </div>
        <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 font-morabbaReg">
          {stats.todayUsersCount}
        </div>
        <div className="text-neutral-300 text-sm">کاربر امروز</div>
        <div className="text-amber-300 text-xs mt-2 flex items-center justify-center gap-1 font-semibold">
          <BiTrendingUp className="w-3.5 h-3.5 text-amber-400" />
          {stats.trendText}
        </div>
      </div>
    </div>
  );
}
