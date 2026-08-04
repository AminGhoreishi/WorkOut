"use client";

import useSWR from "swr";
import { Flame, Activity, Target, Star } from "lucide-react";
import type { FitnessProfileApiResponse } from "@/types/fitness-profile";
import {
  goalLabels,
  experienceLabels,
  equipmentLabels,
} from "@/utils/fitnessProfile";

const fetcher = async (url: string): Promise<FitnessProfileApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت پروفایل ورزشی");
  }
  return res.json();
};

export default function DashboardStats() {
  const { data, isLoading } = useSWR<FitnessProfileApiResponse>(
    "/api/user/fitness-profile",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    },
  );

  const profile = data?.profile;

  const weightValue = profile?.weightKg
    ? new Intl.NumberFormat("fa-IR").format(profile.weightKg)
    : "—";

  const heightValue = profile?.heightCm
    ? new Intl.NumberFormat("fa-IR").format(profile.heightCm)
    : "—";

  const sessionsValue = profile?.sessionsPerWeek
    ? new Intl.NumberFormat("fa-IR").format(profile.sessionsPerWeek)
    : "—";

  const goalText = profile?.goal
    ? goalLabels[profile.goal] || "تعیین‌نشده"
    : "تعیین‌نشده";

  const experienceText = profile?.trainingExperience
    ? experienceLabels[profile.trainingExperience] || "تعیین‌نشده"
    : "تعیین‌نشده";

  const equipmentText = profile?.equipment
    ? equipmentLabels[profile.equipment] || "بدون تجهیزات"
    : "پروفایل تکمیل نشده";

  const stats = [
    {
      label: "وزن کنونی",
      value: weightValue,
      unit: profile?.weightKg ? "کیلو" : "",
      icon: Activity,
      color: "from-amber-400 to-yellow-500",
      change: profile?.heightCm ? `قد: ${heightValue} سانتی‌متر` : "ثبت در اطلاعات ورزشی",
    },
    {
      label: "هدف هفتگی",
      value: sessionsValue,
      unit: profile?.sessionsPerWeek ? "جلسه" : "",
      icon: Target,
      color: "from-yellow-500 to-amber-600",
      change: profile?.sessionsPerWeek
        ? `${sessionsValue} جلسه تمرین در هفته`
        : "تنظیم در اطلاعات ورزشی",
    },
    {
      label: "هدف اصلی تمرین",
      value: goalText,
      unit: "",
      icon: Flame,
      color: "from-amber-500 to-amber-600",
      change: equipmentText,
    },
    {
      label: "سطح سابقه تمرینی",
      value: experienceText,
      unit: "",
      icon: Star,
      color: "from-amber-500 to-yellow-400",
      change: profile?.ageYears
        ? `رده سنی: ${new Intl.NumberFormat("fa-IR").format(profile.ageYears)} سال`
        : "اطلاعات تناسب اندام",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="rounded-2xl p-4 transition-all hover:border-amber-500/30 bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 shadow-xl"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${stat.color} shadow-md`}
            >
              <Icon size={18} className="text-neutral-950" />
            </div>
            <div className="flex items-end gap-1 mb-1">
              {isLoading ? (
                <div className="w-12 sm:w-16 h-5 sm:h-7 bg-white/10 rounded animate-pulse" />
              ) : (
                <span className="text-sm sm:text-2xl font-bold text-white font-sans">
                  {stat.value}
                </span>
              )}
              {stat.unit && !isLoading && (
                <span className="text-neutral-400 text-xs sm:text-sm mb-0.5">
                  {stat.unit}
                </span>
              )}
            </div>
            <p className="text-neutral-400 text-xs">{stat.label}</p>
            <p className="text-amber-400 text-xs mt-1 font-medium">
              {isLoading ? "..." : stat.change}
            </p>
          </div>
        );
      })}
    </div>
  );
}
