import type { UpcomingSessionItem } from "@/types/user-dashboard";

const upcomingSessions: UpcomingSessionItem[] = [
  {
    title: "جلسه مشاوره آنلاین",
    time: "امروز، ساعت ۱۸:۰۰",
    type: "مشاوره",
    icon: "💬",
  },
  {
    title: "ارزیابی پیشرفت ماهانه",
    time: "پنج‌شنبه، ۱۵ خرداد",
    type: "ارزیابی",
    icon: "📊",
  },
  {
    title: "تجدید اشتراک",
    time: "۱ تیر ۱۴۰۳",
    type: "مالی",
    icon: "💳",
  },
];

export default function UpcomingSessions() {
  return (
    <div className="rounded-2xl p-5 bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 shadow-xl">
      <h3 className="font-bold text-white mb-4 font-morabbaReg">
        رویدادهای پیش رو
      </h3>
      <div className="space-y-3">
        {upcomingSessions.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl transition-all hover:border-amber-500/30 bg-white/[0.02] border border-amber-500/10"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-amber-500/10 border border-amber-500/20">
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{s.title}</p>
              <p className="text-neutral-400 text-xs mt-0.5">{s.time}</p>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full flex-shrink-0 bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
              {s.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
