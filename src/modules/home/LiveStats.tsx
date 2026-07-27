import { BiTrendingUp, BiUser } from "react-icons/bi";

interface LiveStatsProps {
  stats: {
    todayUsersCount: string;
    trendText: string;
  };
}

export default function LiveStats({ stats }: LiveStatsProps) {
  return (
    <section className="py-20 font-danaMed">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-600/10 border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-morabbaReg">
              استارفیت در یک نگاه
            </h2>
            <p className="text-neutral-400">آمار زنده از عملکرد پلتفرم</p>
          </div>
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
        </div>
      </div>
    </section>
  );
}
