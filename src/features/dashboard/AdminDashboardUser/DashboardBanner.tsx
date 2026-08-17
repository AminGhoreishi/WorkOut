import Link from "next/link";
import { Play } from "lucide-react";
import type { DashboardBannerProps } from "@/types/user-dashboard";

export default function DashboardBanner({
  userName,
  todayWorkout,
}: DashboardBannerProps) {
  return (
    <div className="relative rounded-2xl p-6 overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/25 shadow-2xl">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-amber-500 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-yellow-500 blur-2xl" />
      </div>
      <div className="relative flex items-center justify-between flex-wrap gap-4 z-10">
        <div>
          <p className="text-amber-400 text-sm mb-1 font-medium">
            سلام، {userName || "ورزشکار عزیز"} 👋
          </p>
          <h2 className="text-2xl font-bold text-white mb-2 font-morabbaReg">
            بریم تمرین کنیم!
          </h2>
          <p className="text-neutral-400 text-sm">
            تمرین امروز:{" "}
            <span className="text-amber-300 font-semibold">
              {todayWorkout
                ? `${todayWorkout.type} (${todayWorkout.duration})`
                : "روز استراحت و ریکاوری"}
            </span>
          </p>
        </div>
        <Link
          href="/dashboard/subscription"
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-neutral-950 transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(234,179,8,0.2)] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500"
        >
          <Play size={16} className="fill-neutral-950" />
          شروع تمرین
        </Link>
      </div>
    </div>
  );
}
