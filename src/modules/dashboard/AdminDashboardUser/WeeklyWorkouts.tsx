import { Clock, Dumbbell } from "lucide-react";

interface WeeklyWorkoutItem {
  day: string;
  type: string;
  duration: string;
  done: boolean;
  sets: number;
}

interface WeeklyWorkoutsProps {
  recentWorkouts: WeeklyWorkoutItem[];
}

export default function WeeklyWorkouts({ recentWorkouts }: WeeklyWorkoutsProps) {
  return (
    <div
      className="lg:col-span-2 rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(234,179,8,0.15)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white">برنامه هفتگی</h3>
        <span className="text-xs text-neutral-400">هفته جاری</span>
      </div>
      {recentWorkouts.length > 0 ? (
        <div className="space-y-2">
          {recentWorkouts.map((w, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:border-amber-500/30"
              style={{
                background: "rgba(234,179,8,0.05)",
                border: "1px solid rgba(234,179,8,0.18)",
              }}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-500/10 border border-amber-500/20">
                <Clock size={14} className="text-amber-400" />
              </div>
              <span className="text-neutral-400 text-xs w-16 flex-shrink-0">
                {w.day}
              </span>
              <span className="flex-1 text-sm text-white font-medium">
                {w.type}
              </span>
              {w.duration !== "—" && (
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock size={11} /> {w.duration}
                </span>
              )}
              {w.sets > 0 && (
                <span className="text-xs text-amber-400 font-semibold">
                  {w.sets} ست
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-white/40 text-xs">
          <Dumbbell className="w-8 h-8 mx-auto mb-2 text-white/20" />
          <p>برنامه تمرینی برای این هفته تعریف نشده است</p>
        </div>
      )}
    </div>
  );
}
