"use client";

import type { UserDashboardProps } from "@/types/user-dashboard";
import DashboardBanner from "./DashboardBanner";
import WeeklyWorkouts from "./WeeklyWorkouts";
import DashboardStats from "./DashboardStats";
import UpcomingSessions from "./UpcomingSessions";
import RecentTickets from "./RecentTickets";
import ActiveSubscription from "./ActiveSubscription";
import WishlistArticles from "./WishlistArticles";

export default function UserDashboard({
  initialUser,
  initialSubscription,
  initialWorkouts = [],
  initialTickets = [],
  initialWishlist = [],
}: UserDashboardProps) {
  const user = initialUser;
  const subscription = initialSubscription;
  const recentWorkouts = initialWorkouts;
  const recentTickets = initialTickets;
  const wishlist = initialWishlist;

  const weekDaysFa = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];
  const todayNameFa = weekDaysFa[new Date().getDay()];
  const todayWorkout =
    (recentWorkouts || []).find((w) => w?.day?.includes(todayNameFa)) || null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-danaMed" dir="rtl">
      <div className="transition-all duration-300">
        <main className="p-4 md:p-6 space-y-6">
          <DashboardBanner userName={user.name} todayWorkout={todayWorkout} />

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActiveSubscription
              subscription={subscription}
              coachName={user.coachName}
            />

            <WeeklyWorkouts recentWorkouts={recentWorkouts} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingSessions />

            <RecentTickets recentTickets={recentTickets} />
          </div>

          <WishlistArticles wishlist={wishlist} />

          <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white font-morabbaReg">نمودار پیشرفت تمرینی</h3>
              <div className="flex gap-2">
                {["هفته", "ماه", "۳ ماه"].map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      i === 1
                        ? "text-neutral-950 font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 shadow-sm"
                        : "text-neutral-400 hover:text-white bg-white/5"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-2 h-32 pt-2">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                >
                  <div
                    className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                      i === 5
                        ? "bg-gradient-to-t from-amber-600 to-amber-400 shadow-md shadow-amber-500/20"
                        : "bg-amber-500/20 border-t border-amber-500/30"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-neutral-400 text-xs font-sans">
                    {["ش", "ی", "د", "س", "چ", "پ", "ج"][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-neutral-400 border-t border-white/5 pt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600" />
                بهترین روز تمرین
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-amber-500/20 border border-amber-500/30" />
                روزهای دیگر
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
