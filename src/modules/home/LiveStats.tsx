import { Suspense } from "react";
import LiveStatsCardSection from "./LiveStatsCardSection";
import LiveStatsCardSkeleton from "./LiveStatsCardSkeleton";

export default function LiveStats() {
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
          <Suspense fallback={<LiveStatsCardSkeleton />}>
            <LiveStatsCardSection />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
