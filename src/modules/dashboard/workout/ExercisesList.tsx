import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Dumbbell,
  TrendingUp,
  Timer,
  Info,
  ChevronDown,
  Play,
  HelpCircle,
  SlidersHorizontal,
} from "lucide-react";
import type { ExercisesListProps } from "@/types/workout";
import ExerciseFeedbackForm from "./ExerciseFeedbackForm";

export default function ExercisesList({
  exercises,
  muscleGroup,
  userId,
  dayId,
}: ExercisesListProps) {
  const [completedExercises, setCompletedExercises] = useState<
    Record<string, boolean>
  >({});
  const [activeTipsId, setActiveTipsId] = useState<string | null>(null);
  const [activeQuestionsId, setActiveQuestionsId] = useState<string | null>(
    null,
  );
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || exercises.length === 0) return;
      try {
        const res = await fetch(`/api/user/workout-progress?userid=${userId}`);
        if (res.ok) {
          const data = await res.json();
          const progressMap: Record<string, boolean> = {};
          data.progress.forEach(
            (item: { exerciseId: string; completed: boolean }) => {
              progressMap[item.exerciseId] = item.completed;
            },
          );
          setCompletedExercises(progressMap);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgress();
  }, [userId, exercises]);

  const toggleExercise = async (exerciseId: string) => {
    const isSelect = !completedExercises[exerciseId];

    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: isSelect,
    }));

    try {
      await fetch(`/api/user/workout-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, completed: isSelect, exerciseId }),
      });
    } catch (err) {
      console.error(err);
      setCompletedExercises((prev) => ({
        ...prev,
        [exerciseId]: !isSelect,
      }));
    }
  };

  return (
    <div className="space-y-4 font-danaMed">
      {exercises.map((exercise, idx) => {
        const isCompleted = !!completedExercises[exercise._id];
        const isExpanded = activeTipsId === exercise._id;
        const coachTips =
          exercise.videoId?.description ||
          exercise.videoId2?.description ||
          "لطفاً تمرکز روی بخش منفی و انقباض کامل عضله را در این حرکت حفظ کنید.";

        return (
          <div
            key={exercise._id}
            className={`
              relative overflow-visible rounded-2xl ss02 border transition-all duration-300 bg-white/[0.03]
              ${
                isCompleted
                  ? "border-amber-500/40 bg-amber-500/10 shadow-inner"
                  : "border-white/10 hover:border-amber-500/30 hover:bg-white/5"
              }
            `}
          >
            <div className="p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <button
                  onClick={() => toggleExercise(exercise._id)}
                  className={`
                    w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-200 mt-1 cursor-pointer
                    ${
                      isCompleted
                        ? "bg-amber-400 border-amber-400 text-neutral-950"
                        : "border-white/20 hover:border-amber-500/40 bg-white/5 text-transparent"
                    }
                  `}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-semibold">
                      {muscleGroup}
                    </span>
                    <span className="text-sm sm:text-xs bg-white/5 text-neutral-400 px-2 py-0.5 rounded-md">
                      حرکت {idx + 1}
                    </span>
                  </div>
                  <h4
                    className={`text-base font-bold transition-all ${isCompleted ? "text-neutral-400 line-through" : "text-white"}`}
                  >
                    {exercise.name}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:text-xs text-neutral-400 pt-2 font-semibold font-mono">
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exercise.sets} ست</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exercise.reps} تکرار</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-danaMed">
                        استراحت: {exercise.restSec} ثانیه
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-end border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
                <button
                  onClick={() =>
                    setActiveTipsId(
                      activeTipsId === exercise._id ? null : exercise._id,
                    )
                  }
                  className={`
                    flex items-center gap-1 px-3 py-2 text-sm sm:text-xs rounded-xl transition-all cursor-pointer
                    ${
                      isExpanded
                        ? "bg-white/10 text-white"
                        : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>نکات مربی</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {isCompleted && (
                  <button
                    onClick={() =>
                      setActiveQuestionsId(
                        activeQuestionsId === exercise._id
                          ? null
                          : exercise._id,
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-2 text-sm sm:text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>سوالات</span>
                  </button>
                )}

                {(exercise.videoId?.url || exercise.videoId2?.url) && (
                  <button
                    onClick={() =>
                      setPlayingVideo(
                        playingVideo === exercise._id ? null : exercise._id,
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-2 text-sm sm:text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>ویدیو آموزش</span>
                  </button>
                )}
              </div>

              <div className="relative sm:hidden w-full pt-3 border-t border-white/5">
                <button
                  onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === exercise._id ? null : exercise._id,
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-amber-500/20 text-amber-400 text-sm font-semibold rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                    <span>گزینه‌های حرکت</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${openDropdownId === exercise._id ? "rotate-180" : ""}`}
                  />
                </button>

                {openDropdownId === exercise._id && (
                  <div className="absolute right-0 left-0 mt-2 bg-neutral-900 border border-amber-500/20 rounded-xl p-1.5 shadow-2xl z-30 space-y-1 font-danaMed">
                    <button
                      onClick={() => {
                        setActiveTipsId(
                          activeTipsId === exercise._id ? null : exercise._id,
                        );
                        setOpenDropdownId(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                        isExpanded
                          ? "bg-amber-500/20 text-amber-300 font-bold"
                          : "text-neutral-300 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-400" />
                        <span>نکات مربی</span>
                      </div>
                      {isExpanded && (
                        <span className="text-xs text-amber-400 font-bold">
                          نمایش داده شد
                        </span>
                      )}
                    </button>

                    {isCompleted && (
                      <button
                        onClick={() => {
                          setActiveQuestionsId(
                            activeQuestionsId === exercise._id
                              ? null
                              : exercise._id,
                          );
                          setOpenDropdownId(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                          activeQuestionsId === exercise._id
                            ? "bg-amber-500/20 text-amber-300 font-bold"
                            : "text-neutral-300 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-amber-400" />
                          <span>ثبت سوالات و ارزیابی</span>
                        </div>
                        {activeQuestionsId === exercise._id && (
                          <span className="text-xs text-amber-400 font-bold">
                            نمایش داده شد
                          </span>
                        )}
                      </button>
                    )}

                    {(exercise.videoId?.url || exercise.videoId2?.url) && (
                      <button
                        onClick={() => {
                          setPlayingVideo(
                            playingVideo === exercise._id ? null : exercise._id,
                          );
                          setOpenDropdownId(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                          playingVideo === exercise._id
                            ? "bg-amber-500/20 text-amber-300 font-bold"
                            : "text-neutral-300 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4 text-amber-400 fill-current" />
                          <span>مشاهده ویدیو آموزش</span>
                        </div>
                        {playingVideo === exercise._id && (
                          <span className="text-xs text-amber-400 font-bold">
                            نمایش داده شد
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {playingVideo === exercise._id &&
              (exercise.videoId?.url || exercise.videoId2?.url) && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-amber-500/20 shadow-lg">
                    <video
                      src={
                        exercise.videoId?.url || exercise.videoId2?.url || ""
                      }
                      controls
                      poster={
                        exercise.videoId?.thumbnailUrl ||
                        exercise.videoId2?.thumbnailUrl ||
                        ""
                      }
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

            {isExpanded && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4 text-xs md:text-sm text-neutral-300 bg-white/[0.01]">
                <div className="flex gap-2.5 items-start p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-neutral-200 leading-relaxed">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-300 mb-1">
                      توصیه مربی برای اجرای صحیح:
                    </span>
                    {coachTips}
                  </div>
                </div>
              </div>
            )}

            {isCompleted && activeQuestionsId === exercise._id && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <ExerciseFeedbackForm
                  userId={userId || ""}
                  dayId={dayId || ""}
                  exerciseId={exercise._id}
                  onClose={() => setActiveQuestionsId(null)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
