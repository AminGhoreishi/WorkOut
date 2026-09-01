"use client";

import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import {
  Calendar,
  Flame,
} from "lucide-react";
import WorkoutHeader from "./WorkoutHeader";
import WorkoutDayHeader from "./WorkoutDayHeader";
import ExercisesList from "./ExercisesList";
import WeeklyAdvice from "./WeeklyAdvice";
import WorkoutSummary from "./WorkoutSummary";
import WorkoutAchievements from "./WorkoutAchievements";
import RestDayView from "./RestDayView";
import WorkoutExercisesSkeleton from "./WorkoutExercisesSkeleton";
import NoWorkoutPlan from "./NoWorkoutPlan";
import UserWorkoutDaysGrid from "./UserWorkoutDaysGrid";
import type {
  DayItem,
  ExerciseItem,
  VideoInfo,
  WorkoutPlan,
  WorkoutViewProps,
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
  hasFitnessProfile
}: WorkoutViewProps) {
  const [selectedDayId, setSelectedDayId] = useState<string>("");

  const handleSelectDayId = useCallback((dayId: string) => {
    setSelectedDayId(dayId);
  }, []);

  const packageId = subscription?.packageId?._id || "";

  const { data: userPlansData, isLoading: isLoadingUserPlan } = useSWR<{
    plans: WorkoutPlan[];
  }>(
    packageId && userId
      ? `/api/admin/subscription/workout-plans?packageId=${packageId}&userId=${userId}`
      : null,
    fetcher
  );

  const { data: pkgPlansData, isLoading: isLoadingPkgPlan } = useSWR<{
    plans: WorkoutPlan[];
  }>(
    packageId && (!userPlansData || userPlansData.plans.length === 0)
      ? `/api/admin/subscription/workout-plans?packageId=${packageId}`
      : null,
    fetcher
  );

  const currentPlan =
    userPlansData?.plans && userPlansData.plans.length > 0
      ? userPlansData.plans[0]
      : pkgPlansData?.plans && pkgPlansData.plans.length > 0
      ? pkgPlansData.plans[0]
      : null;

  const isPlanLoading = (isLoadingUserPlan || isLoadingPkgPlan) && !currentPlan;

  const programData = Array.isArray(currentPlan?.programm)
    ? currentPlan.programm[0]
    : currentPlan?.programm;

  const workoutDays: DayItem[] = useMemo(() => {
    if (!programData?.programs) return [];
    return programData.programs.map((p, idx) => ({
      _id: p._id || `day-${idx}`,
      dayName: p.day,
      muscleGroup: p.muscleGroup || "",
      exercises: (p.exercises || []).map((ex, exIdx) => ({
        _id: ex._id || `ex-${idx}-${exIdx}`,
        name: ex.name,
        sets: ex.sets ?? 3,
        reps: ex.reps ?? "",
        weight: ex.weight ?? 0,
        restSec: ex.restSec ?? 60,
        isComplete: !!ex.isComplete,
        videoId: (typeof ex.videoId === "object" ? ex.videoId : null) as VideoInfo | null,
        videoId2: (typeof ex.videoId2 === "object" ? ex.videoId2 : null) as VideoInfo | null,
      })),
    }));
  }, [programData]);

  const activeDayId = selectedDayId || workoutDays[0]?._id || "";
  const activeDay =
    workoutDays.find((d) => d._id === activeDayId) || workoutDays[0];

  const workoutExercises: ExerciseItem[] = useMemo(() => {
    return activeDay?.exercises || [];
  }, [activeDay]);

  if (isPlanLoading) {
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

  if (!currentPlan) {
    return <NoWorkoutPlan hasFitnessProfile={hasFitnessProfile} />;
  }

  const workoutPlan = {
    _id: currentPlan?._id || "plan",
    packageId: subscription?.packageId?._id || "",
    title: currentPlan?.title || subscription?.packageId?.name || "برنامه تمرینی من",
    description: "",
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
              <span>روزهای تمرینی</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <UserWorkoutDaysGrid
              workoutDays={workoutDays}
              activeDayId={activeDayId}
              onSelectDayId={handleSelectDayId}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {activeDay && (
              <WorkoutDayHeader
                dayName={activeDay.dayName}
                muscleGroup={activeDay.muscleGroup}
                totalExercises={totalExercises}
              />
            )}

            {!activeDay ? (
              <WorkoutExercisesSkeleton />
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
