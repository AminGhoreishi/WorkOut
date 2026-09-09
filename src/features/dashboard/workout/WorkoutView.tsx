"use client";

import { useCallback, useMemo, useState } from "react";
import { Calendar } from "lucide-react";
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
  ExerciseItem,
  WorkoutViewProps,
} from "@/types/workout";

export default function WorkoutView({
  subscription,
  userId,
  hasFitnessProfile,
  initialPlan,
  initialWorkoutDays = [],
}: WorkoutViewProps) {
  const [selectedDayId, setSelectedDayId] = useState<string>("");

  const handleSelectDayId = useCallback((dayId: string) => {
    setSelectedDayId(dayId);
  }, []);

  const currentPlan = initialPlan || null;
  const workoutDays = initialWorkoutDays;

  const activeDay = useMemo(() => {
    if (!workoutDays.length) return undefined;
    return (
      workoutDays.find((d) => d._id === selectedDayId) || workoutDays[0]
    );
  }, [workoutDays, selectedDayId]);

  const activeDayId = activeDay?._id || "";

  const workoutExercises: ExerciseItem[] = useMemo(() => {
    return activeDay?.exercises || [];
  }, [activeDay]);

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

          <div className="flex sm:grid gap-2.5 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:pb-0 snap-x sm:snap-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-flow-col lg:auto-cols-fr">
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
            <WeeklyAdvice advice={currentPlan?.weeklyAdvice} />
            <WorkoutAchievements />
          </div>
        </div>
      </div>
    </div>
  );
}
