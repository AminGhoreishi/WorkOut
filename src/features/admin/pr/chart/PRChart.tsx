"use client";

import { useEffect, useMemo, useCallback } from "react";
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
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp, Award } from "lucide-react";
import type {
  PRChartProps,
  PRRecordItem,
  PRUserApiResponse,
} from "@/types/pr";
import { PRNoUserSelected, PRLoadingState, PRErrorState } from "./PRStateViews";
import PRHistoryTable from "./PRHistoryTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

const CHART_OPTIONS: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "rgba(255, 255, 255, 0.7)",
        font: {
          family: "Vazirmatn, Tahoma, sans-serif",
          size: 13,
        },
      },
    },
    tooltip: {
      rtl: true,
      titleFont: { family: "Vazirmatn, Tahoma" },
      bodyFont: { family: "Vazirmatn, Tahoma" },
    },
  },
  scales: {
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
        font: { family: "Vazirmatn, Tahoma" },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
        font: { family: "Vazirmatn, Tahoma" },
      },
    },
  },
};

export default function PRChart({
  userId,
  refreshKey = 0,
  selectedTest = "",
  setSelectedTest,
}: PRChartProps) {
  const {
    data: prData,
    isLoading: isLoadingPR,
    error: errorPR,
    mutate: mutatePR,
  } = useSWR(userId ? `/api/admin/user/pr?userId=${userId}` : null, fetcher);

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useSWR<PRUserApiResponse>(
    userId ? `/api/admin/user/${userId}/info` : null,
    fetcher
  );

  useEffect(() => {
    if (userId && refreshKey > 0) {
      mutatePR();
    }
  }, [refreshKey, userId, mutatePR]);

  const records: PRRecordItem[] = prData?.records || [];

  const availableTests = useMemo(
    () => Array.from(new Set(records.map((r) => r.testName).filter(Boolean))),
    [records]
  );

  const activeTest =
    selectedTest && availableTests.includes(selectedTest)
      ? selectedTest
      : availableTests[0] || "";

  useEffect(() => {
    if (availableTests.length > 0 && (!selectedTest || !availableTests.includes(selectedTest))) {
      setSelectedTest?.(availableTests[0]);
    }
  }, [availableTests, selectedTest, setSelectedTest]);

  const sortedRecords = useMemo(() => {
    return records
      .filter((r) => r.testName === activeTest)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [records, activeTest]);

  const { labels, chartValues, currentUnit } = useMemo(() => {
    const lbls = sortedRecords.map((r) => {
      try {
        return new Date(r.date).toLocaleDateString("fa-IR");
      } catch {
        return r.date;
      }
    });
    const vals = sortedRecords.map((r) => r.value);
    const unit = sortedRecords[0]?.unit || "";
    return { labels: lbls, chartValues: vals, currentUnit: unit };
  }, [sortedRecords]);

  const chartDataConfig: ChartData<"line"> = useMemo(
    () => ({
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
    }),
    [labels, chartValues, currentUnit]
  );

  const handleDeleteSuccess = useCallback(() => {
    mutatePR();
  }, [mutatePR]);

  if (!userId) {
    return <PRNoUserSelected />;
  }

  if (isLoadingPR || isLoadingUser) {
    return <PRLoadingState />;
  }

  if (errorPR || errorUser) {
    return <PRErrorState />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl text-white font-semibold flex items-center gap-2 font-morabbaReg">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              روند پیشرفت {userData?.user?.fullName || userData?.user?.username || "کاربر"}
            </h2>
            {userData?.user && (
              <p className="text-xs text-white/50 mt-1">
                @{userData.user.username} | {userData.user.phone || userData.user.email}
              </p>
            )}
          </div>

          {availableTests.length > 0 && (
            <div className="w-full sm:w-auto">
              <select
                value={activeTest}
                onChange={(e) => setSelectedTest?.(e.target.value)}
                className="w-full sm:w-auto bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
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
            <p className="text-sm">هیچ رکوردی برای این کاربر ثبت نشده است.</p>
          </div>
        ) : (
          <div className="h-80 w-full relative">
            <Line options={CHART_OPTIONS} data={chartDataConfig} />
          </div>
        )}
      </div>

      <PRHistoryTable
        sortedRecords={sortedRecords}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
