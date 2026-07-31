import { Flame, Activity, Target, Star } from "lucide-react";

const stats = [
  {
    label: "روز تمرین",
    value: "۳۲",
    icon: Flame,
    color: "from-amber-500 to-amber-600",
    change: "+۴ این هفته",
  },
  {
    label: "وزن کنونی",
    value: "۷۸",
    unit: "کیلو",
    icon: Activity,
    color: "from-amber-400 to-yellow-500",
    change: "-۲ کیلو",
  },
  {
    label: "هدف هفتگی",
    value: "۵/۷",
    unit: "جلسه",
    icon: Target,
    color: "from-yellow-500 to-amber-600",
    change: "۵ جلسه تکمیل",
  },
  {
    label: "امتیاز",
    value: "۱,۲۴۰",
    icon: Star,
    color: "from-amber-500 to-yellow-400",
    change: "+۸۰ این هفته",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="rounded-2xl p-4 transition-all hover:border-amber-500/30"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(234,179,8,0.15)",
            }}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${stat.color}`}
            >
              <Icon size={18} className="text-neutral-950" />
            </div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-white font-sans">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-neutral-400 text-sm mb-0.5">
                  {stat.unit}
                </span>
              )}
            </div>
            <p className="text-neutral-400 text-xs">{stat.label}</p>
            <p className="text-amber-400 text-xs mt-1 font-medium">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}
