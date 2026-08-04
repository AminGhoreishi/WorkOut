"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Calendar, Play, ChevronDown, ChevronUp, Film, X } from "lucide-react";
import type { VideoInfo, WorkoutPlanProps } from "@/types/workout";

export default function DashboardWorkoutPlan({ plan, days = [] }: WorkoutPlanProps) {
  const safeDays = Array.isArray(days) ? days : [];
  
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(() => {
    if (safeDays.length > 0 && safeDays[0]?._id) {
      return { [safeDays[0]._id]: true };
    }
    return {};
  });
  
  const [activeVideo, setActiveVideo] = useState<VideoInfo | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  const toggleDay = (dayId: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  if (!plan) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-neutral-400 font-danaMed">
        <Dumbbell className="w-10 h-10 mx-auto mb-3 text-amber-400/40" />
        <p className="text-sm">برنامه تمرینی برای این اشتراک ثبت نشده است</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-danaMed">
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -z-10" />
        <div className="flex items-center gap-3 mb-2">
          <Dumbbell className="w-6 h-6 text-amber-400 animate-pulse" />
          <h3 className="text-lg font-bold text-white font-morabbaReg">{plan.title}</h3>
        </div>
        <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">{plan.description || "بدون توضیحات"}</p>
      </div>

      <div className="space-y-4">
        {safeDays.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-amber-500/20 rounded-2xl text-neutral-400">
            روزی برای این برنامه تعریف نشده است
          </div>
        ) : (
          safeDays.map((day) => {
            const isExpanded = !!expandedDays[day._id];
            const exercises = Array.isArray(day.exercises) ? day.exercises : [];
            return (
              <div
                key={day._id}
                className="bg-white/[0.03] border border-amber-500/15 rounded-2xl overflow-hidden transition-all duration-350"
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day._id)}
                  className="w-full text-right p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm font-morabbaReg">{day.dayName}</h4>
                      <p className="text-neutral-400 text-[10px] md:text-xs">عضله هدف: <strong className="text-white">{day.muscleGroup}</strong></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded ss02">
                      {exercises.length} حرکت
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-white/5 bg-black/20">
                    {exercises.length === 0 ? (
                      <div className="text-center py-6 text-neutral-400 text-xs">
                        امروز روز استراحت است.
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4">
                        {exercises.map((ex) => (
                          <div
                            key={ex._id}
                            className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/10 transition-all"
                          >
                            <div>
                              <h5 className="text-white font-bold text-xs md:text-sm">{ex.name}</h5>
                              <div className="flex flex-wrap gap-x-3 gap-y-1 text-neutral-400 text-[10px] md:text-xs mt-1 ss02">
                                <span>ست‌ها: <strong className="text-white">{ex.sets}</strong></span>
                                <span>|</span>
                                <span>تکرارها: <strong className="text-white">{ex.reps}</strong></span>
                                <span>|</span>
                                <span>استراحت: <strong className="text-white">{ex.restSec} ثانیه</strong></span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                              {ex.videoId && ex.videoId2 ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setActiveVideo(ex.videoId!)}
                                    className="w-full sm:w-auto bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                                    ویدیو آموزشی ۱
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveVideo(ex.videoId2!)}
                                    className="w-full sm:w-auto bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
                                    ویدیو آموزشی ۲
                                  </button>
                                </>
                              ) : ex.videoId ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveVideo(ex.videoId!)}
                                  className="w-full sm:w-auto bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                                  تماشای ویدیو آموزشی
                                </button>
                              ) : ex.videoId2 ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveVideo(ex.videoId2!)}
                                  className="w-full sm:w-auto bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                                  تماشای ویدیو آموزشی
                                </button>
                              ) : (
                                <span className="text-[10px] text-neutral-500 italic">بدون ویدیو</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-danaMed"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 border border-amber-500/20 rounded-2xl overflow-hidden w-full max-w-3xl relative shadow-2xl"
          >
            <div className="p-4 bg-black/40 flex justify-between items-center text-white border-b border-white/10">
              <h3 className="font-bold text-sm flex items-center gap-2 font-morabbaReg">
                <Film className="w-4 h-4 text-amber-400" />
                {activeVideo.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="bg-white/10 text-white p-1.5 rounded-full hover:bg-white/20 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
            {activeVideo.description && (
              <div className="p-4 bg-white/5 text-white text-xs leading-relaxed max-h-24 overflow-y-auto">
                <p>{activeVideo.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
