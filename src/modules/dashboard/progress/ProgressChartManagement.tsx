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
import { TrendingUp, Award, Scale, Dumbbell, Plus } from "lucide-react";
import type { UserPRRecord, UserFitnessProfile } from "@/types/progress";
import ProgressHistoryTable from "./ProgressHistoryTable";
import { ProgressLoadingState, ProgressErrorState } from "./ProgressStateViews";
import AddProgressRecordModal from "./AddProgressRecordModal";
import ProgressStatsOverview from "./ProgressStatsOverview";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: prData,
    isLoading: isLoadingPR,
    error: errorPR,
    mutate: mutatePRData,
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
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 font-danaMed text-xs sm:text-base" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProgressStatsOverview
          totalRecordsCount={records.length}
          weightKg={profile?.weightKg}
          completedWorkoutsCount={completedWorkoutsCount}
        />

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xs sm:text-xl text-white font-semibold flex items-center gap-2 font-morabbaReg">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                روند پیشرفت رکوردهای شخصی شما
              </h2>
              <p className="text-xs text-white/50 mt-1">
                نمایش رکوردهای ورزشی بر اساس تاریخ ثبت
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {availableTests.length > 0 && (
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="all">همه حرکت‌ها و تست‌ها</option>
                  {availableTests.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت رکورد جدید</span>
              </button>
            </div>
          </div>

          {records.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-white/10 rounded-xl text-white/40 flex flex-col items-center justify-center space-y-3">
              <Award className="w-10 h-10 text-white/20" />
              <p className="text-xs sm:text-sm">هیچ رکوردی برای شما ثبت نشده است.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت اولین رکورد</span>
              </button>
            </div>
          ) : (
            <div className="h-80 w-full relative">
              <Line options={options} data={chartDataConfig} />
            </div>
          )}
        </div>

        {records.length > 0 && <ProgressHistoryTable sortedRecords={sortedRecords} />}
      </div>

      <AddProgressRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => mutatePRData()}
        availableTests={availableTests}
      />
    </div>
  );
}
