"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp, Award, Scale, Dumbbell } from "lucide-react";
import type { UserPRRecord, UserFitnessProfile } from "@/types/progress";
import ProgressHistoryTable from "./ProgressHistoryTable";
import { ProgressLoadingState, ProgressErrorState } from "./ProgressStateViews";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }
  return res.json();
};

export default function ProgressChartManagement() {
  const [selectedTest, setSelectedTest] = useState<string>("all");

  const {
    data: prData,
    isLoading: isLoadingPR,
    error: errorPR,
  } = useSWR("/api/user/pr", fetcher);

  const {
    data: profileData,
    isLoading: isLoadingProfile,
  } = useSWR("/api/user/fitness-profile", fetcher);

  const {
    data: workoutProgressData,
  } = useSWR("/api/user/workout-progress", fetcher);

  const records: UserPRRecord[] = prData?.records || [];
  const profile: UserFitnessProfile | null = profileData?.profile || null;
  const completedWorkoutsCount = workoutProgressData?.progress
    ? workoutProgressData.progress.filter((p: { completed: boolean }) => p.completed).length
    : 0;

  const availableTests = Array.from(
    new Set(records.map((r) => r.testName).filter((t): t is string => Boolean(t)))
  );

  const filteredRecords = records.filter((r) =>
    selectedTest === "all" ? true : r.testName === selectedTest
  );

  const sortedRecords = [...filteredRecords].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const labels = sortedRecords.map((r) => {
    try {
      return new Date(r.date).toLocaleDateString("fa-IR");
    } catch {
      return r.date;
    }
  });

  const chartValues = sortedRecords.map((r) => r.value);
  const currentUnit = sortedRecords[0]?.unit || "";

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { family: "Dana, sans-serif", size: 13 },
        },
      },
      tooltip: {
        rtl: true,
        titleFont: { family: "Dana, sans-serif" },
        bodyFont: { family: "Dana, sans-serif" },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
          font: { family: "Dana, sans-serif" },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
          font: { family: "Dana, sans-serif" },
        },
      },
    },
  };

  const chartDataConfig: ChartData<"line"> = {
    labels,
    datasets: [
      {
        fill: true,
        label: `مقدار رکورد (${currentUnit})`,
        data: chartValues,
        borderColor: "rgb(251, 191, 36)",
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        tension: 0.35,
        pointBackgroundColor: "rgb(234, 179, 8)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointRadius: 5,
      },
    ],
  };

  if (isLoadingPR || isLoadingProfile) {
    return <ProgressLoadingState />;
  }

  if (errorPR) {
    return <ProgressErrorState />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs font-medium">کل رکوردهای ثبت شده</span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-morabbaReg mt-2 ss02">
              {records.length} <span className="text-xs text-white/50">مورد</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs font-medium">وزن ثبت‌شده</span>
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-morabbaReg mt-2 ss02">
              {profile?.weightKg ? `${profile.weightKg} کیلوگرم` : "ثبت نشده"}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs font-medium">تمرینات کامل‌شده</span>
              <Dumbbell className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-morabbaReg mt-2 ss02">
              {completedWorkoutsCount} <span className="text-xs text-white/50">حرکت</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl text-white font-semibold flex items-center gap-2 font-morabbaReg">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                روند پیشرفت رکوردهای شخصی شما
              </h2>
              <p className="text-xs text-white/50 mt-1">
                نمایش رکوردهای ورزشی بر اساس تاریخ ثبت
              </p>
            </div>

            {availableTests.length > 0 && (
              <div className="w-full sm:w-auto">
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full sm:w-auto bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="all">همه حرکت‌ها و تست‌ها</option>
                  {availableTests.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {records.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-white/10 rounded-xl text-white/40 flex flex-col items-center justify-center">
              <Award className="w-10 h-10 text-white/20 mb-2" />
              <p className="text-sm">هیچ رکوردی برای شما ثبت نشده است.</p>
            </div>
          ) : (
            <div className="h-80 w-full relative">
              <Line options={options} data={chartDataConfig} />
            </div>
          )}
        </div>

        {records.length > 0 && <ProgressHistoryTable sortedRecords={sortedRecords} />}
      </div>
    </div>
  );
}
