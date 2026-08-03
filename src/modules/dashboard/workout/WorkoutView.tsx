"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  Calendar,
  Flame,
  ChevronDown,
} from "lucide-react";
import WorkoutHeader from "./WorkoutHeader";
import ExercisesList from "./ExercisesList";
import WeeklyAdvice from "./WeeklyAdvice";
import WorkoutSummary from "./WorkoutSummary";
import WorkoutAchievements from "./WorkoutAchievements";
import RestDayView from "./RestDayView";
import WorkoutExercisesSkeleton from "./WorkoutExercisesSkeleton";
import WorkoutErrorState from "./WorkoutErrorState";
import NoWorkoutPlan from "./NoWorkoutPlan";
import type {
  DayItem,
  ExerciseItem,
  WorkoutViewProps,
  SimpleWeek,
} from "@/types/workout";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }
  return res.json();
};

export default function WorkoutView({
  subscription,
  userId,
}: WorkoutViewProps) {
  const [selectedWeekId, setSelectedWeekId] = useState<string>("");
  const [selectedDayId, setSelectedDayId] = useState<string>("");

  const packageId = subscription?.packageId?._id || "";

  const {
    data: weeksData,
    error: weeksError,
    isLoading: isLoadingWeeks,
    mutate: mutateWeeks,
  } = useSWR<{ weeks: SimpleWeek[] }>(
    packageId
      ? `/api/admin/subscription/workout-week?packageId=${packageId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  const workoutWeek = weeksData?.weeks || [];
  const activeWeekId = selectedWeekId || workoutWeek[0]?._id || "";

  const {
    data: daysData,
    error: daysError,
    isLoading: isLoadingDays,
    mutate: mutateDays,
  } = useSWR<{ days: DayItem[] }>(
    activeWeekId
      ? `/api/admin/subscription/workout-days?planId=${activeWeekId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  const workoutDays = daysData?.days || [];
  const activeDayId = selectedDayId || workoutDays[0]?._id || "";

  const {
    data: exercisesData,
    error: exercisesError,
    isLoading: isLoadingExercises,
    mutate: mutateExercises,
  } = useSWR<{ exercises: ExerciseItem[] }>(
    activeDayId
      ? `/api/admin/subscription/workout-exercises?dayId=${activeDayId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  const workoutExercises = exercisesData?.exercises || [];

  if (isLoadingWeeks) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-danaMed" dir="rtl">
        <div className="text-center space-y-4">
          <Flame className="w-12 h-12 text-amber-400 animate-pulse mx-auto" />
          <p className="text-sm text-neutral-400">
            در حال بارگذاری برنامه تمرینی...
          </p>
        </div>
      </div>
    );
  }

  if (weeksError || daysError) {
    return (
      <WorkoutErrorState
        message={weeksError?.message || daysError?.message}
        onRetry={() => {
          mutateWeeks();
          mutateDays();
        }}
      />
    );
  }

  if (workoutWeek.length === 0) {
    return <NoWorkoutPlan />;
  }

  const activeWeek =
    workoutWeek.find((w) => w._id === activeWeekId) || workoutWeek[0];
  const activeDay =
    workoutDays.find((d) => d._id === activeDayId) || workoutDays[0];

  const workoutPlan = {
    _id: "plan",
    packageId: subscription?.packageId?._id || "",
    title: subscription?.packageId?.name || "برنامه تمرینی من",
    description: activeWeek?.title || "",
    isActive: true,
  };

  const totalExercises = workoutExercises.length;
  const overallProgressPercent = 0;

  return (
    <div className="min-h-screen text-white font-danaMed pb-12 bg-neutral-950" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 space-y-8">
        <WorkoutHeader
          workoutPlan={workoutPlan}
          workoutDays={workoutDays}
          overallProgressPercent={overallProgressPercent}
        />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-lg font-bold font-morabbaReg text-neutral-300 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>روزهای تمرینی هفته</span>
            </h2>
            <div className="relative w-full sm:w-48">
              <select
                value={activeWeekId}
                onChange={(e) => {
                  setSelectedWeekId(e.target.value);
                  setSelectedDayId("");
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm sm:text-xs font-semibold text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer text-right"
              >
                {workoutWeek.map((week, idx) => (
                  <option
                    key={week._id || idx}
                    value={week._id}
                    className="bg-neutral-900 text-white text-sm sm:text-xs"
                  >
                    هفته {week.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {isLoadingDays ? (
              <div className="col-span-3 text-center py-4 text-sm sm:text-xs text-neutral-400">
                در حال بارگذاری روزها...
              </div>
            ) : (
              workoutDays.map((day) => {
                const isActive = day._id === activeDayId;
                const isRest = !day.exercises || day.exercises.length === 0;
                return (
                  <button
                    key={day._id}
                    type="button"
                    onClick={() => {
                      setSelectedDayId(day._id);
                    }}
                    className={`
                      flex flex-col items-center justify-center py-3.5 px-2 rounded-xl transition-all duration-200 border text-center cursor-pointer
                      ${
                        isActive
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-lg"
                          : "bg-white/5 hover:bg-white/10 border-white/5 text-neutral-400 hover:text-white"
                      }
                    `}
                  >
                    <span className="text-sm font-bold">{day.dayName}</span>
                    <span className="text-sm sm:text-[10px] mt-1 opacity-70 truncate max-w-full">
                      {isRest ? "ریکاوری" : day.muscleGroup}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {activeDay && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.03] border border-amber-500/15 p-5 rounded-2xl">
                <div>
                  <span className="text-sm sm:text-xs text-amber-400 font-semibold">
                    {activeDay.dayName} - تمرین امروز
                  </span>
                  <h3 className="text-xl font-bold font-morabbaReg text-white mt-1">
                    {activeDay.muscleGroup}
                  </h3>
                </div>

                {totalExercises > 0 && (
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none text-right">
                      <div className="text-sm sm:text-[10px] text-neutral-400">
                        تعداد حرکات
                      </div>
                      <div className="text-sm font-bold text-white ss02 font-sans">
                        {totalExercises} حرکت
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isLoadingDays || isLoadingExercises || !activeDay ? (
              <WorkoutExercisesSkeleton />
            ) : exercisesError ? (
              <div className="p-6 bg-white/[0.03] border border-amber-500/15 rounded-2xl text-center space-y-3">
                <p className="text-sm sm:text-xs text-amber-400">
                  خطا در بارگذاری حرکات این روز تمرینی.
                </p>
                <button
                  type="button"
                  onClick={() => mutateExercises()}
                  className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-sm sm:text-xs font-semibold rounded-xl border border-amber-500/20 cursor-pointer"
                >
                  تلاش مجدد
                </button>
              </div>
            ) : totalExercises > 0 ? (
              <ExercisesList
                exercises={workoutExercises}
                muscleGroup={activeDay.muscleGroup}
                userId={userId}
                dayId={activeDay._id}
              />
            ) : (
              <RestDayView />
            )}
          </div>

          <div className="space-y-6">
            <WorkoutSummary totalExercises={totalExercises} />
            <WeeklyAdvice />
            <WorkoutAchievements />
          </div>
        </div>
      </div>
    </div>
  );
}
