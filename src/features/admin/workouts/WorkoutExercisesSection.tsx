"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import type {
  WorkoutExercise,
  WorkoutExercisesSectionProps,
} from "@/types/workout";
import WorkoutExerciseForm from "./WorkoutExerciseForm";

export default function WorkoutExercisesSection({
  selectedDay,
  exercises,
  videos,
  onFetchExercises,
  onDeleteExercise,
}: WorkoutExercisesSectionProps) {
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] =
    useState<WorkoutExercise | null>(null);

  const handleExerciseFormSuccess = () => {
    onFetchExercises(selectedDay._id);
    setShowExerciseForm(false);
    setEditingExercise(null);
  };

  return (
    <div className="space-y-4 font-danaMed" dir="rtl">
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div>
          <span className="text-white font-bold text-sm block font-morabbaReg">
            حرکات ورزشی {selectedDay.dayName}
          </span>
          <span className="text-xs text-white/50">
            گروه هدف: {selectedDay.muscleGroup}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingExercise(null);
            setShowExerciseForm(true);
          }}
          className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          حرکت جدید
        </button>
      </div>

      {showExerciseForm && (
        <WorkoutExerciseForm
          editingExercise={editingExercise}
          selectedDayId={selectedDay._id}
          videos={videos}
          onSuccess={handleExerciseFormSuccess}
          onCancel={() => {
            setShowExerciseForm(false);
            setEditingExercise(null);
          }}
          defaultSortOrder={exercises.length + 1}
        />
      )}

      <div className="space-y-3 overflow-y-auto max-h-[450px]">
        {exercises.length === 0 ? (
          <div className="text-white/40 text-center text-xs p-8 border border-dashed border-white/10 rounded-xl">
            حرکتی برای این روز ثبت نشده است
          </div>
        ) : (
          exercises.map((ex) => (
            <div
              key={ex._id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="font-bold text-sm text-white mb-1">
                  {ex.name}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 ss02">
                  <span>{ex.sets} ست</span>
                  <span>•</span>
                  <span>{ex.reps} تکرار</span>
                  {Boolean(ex.weight) && (
                    <>
                      <span>•</span>
                      <span>وزنه: {ex.weight} kg</span>
                    </>
                  )}
                  <span>•</span>
                  <span>استراحت: {ex.restSec}s</span>
                  {ex.videoId && (
                    <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-danaMed">
                      ویدیو ۱ دارد
                    </span>
                  )}
                  {ex.videoId2 && (
                    <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-danaMed">
                      ویدیو ۲ دارد
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => {
                    setEditingExercise(ex);
                    setShowExerciseForm(true);
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 p-2 rounded-lg transition-colors cursor-pointer"
                  title="ویرایش"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteExercise(ex._id)}
                  className="bg-white/5 hover:bg-red-500/20 border border-white/10 text-red-400 p-2 rounded-lg transition-colors cursor-pointer"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
