"use client";

import { useState, useEffect } from "react";
import type { WorkoutExerciseFormProps } from "@/types/workout";
import { showAlert } from "@/utils/alert";

export default function WorkoutExerciseForm({
  editingExercise,
  selectedDayId,
  videos,
  onSuccess,
  onCancel,
  defaultSortOrder,
}: WorkoutExerciseFormProps) {
  const [exerciseForm, setExerciseForm] = useState({
    name: "",
    sets: 3,
    reps: "12-10-8",
    restSec: 60,
    videoId: "",
    videoId2: "",
    sortOrder: defaultSortOrder,
  });

  useEffect(() => {
    if (editingExercise) {
      setExerciseForm({
        name: editingExercise.name,
        sets: editingExercise.sets,
        reps: editingExercise.reps,
        restSec: editingExercise.restSec,
        videoId: editingExercise.videoId?._id || "",
        videoId2: editingExercise.videoId2?._id || "",
        sortOrder: editingExercise.sortOrder,
      });
    } else {
      setExerciseForm({
        name: "",
        sets: 3,
        reps: "12-10-8",
        restSec: 60,
        videoId: "",
        videoId2: "",
        sortOrder: defaultSortOrder,
      });
    }
  }, [editingExercise, defaultSortOrder]);

  const getVideoLevelLabel = (level?: string) => {
    if (!level) return "مبتدی";
    const labels: Record<string, string> = {
      beginner: "مبتدی",
      intermediate: "متوسط",
      advanced: "حرفه‌ای",
    };
    return labels[level] || level;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDayId) return;
    try {
      if (editingExercise) {
        const res = await fetch("/api/admin/subscription/workout-exercises", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingExercise._id,
            name: exerciseForm.name,
            sets: Number(exerciseForm.sets),
            reps: exerciseForm.reps,
            restSec: Number(exerciseForm.restSec),
            videoId: exerciseForm.videoId || null,
            videoId2: exerciseForm.videoId2 || null,
            sortOrder: Number(exerciseForm.sortOrder),
          }),
        });
        if (res.ok) {
          onSuccess();
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در ویرایش حرکت ورزشی",
            icon: "error",
          });
        }
      } else {
        const res = await fetch("/api/admin/subscription/workout-exercises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayId: selectedDayId,
            name: exerciseForm.name,
            sets: Number(exerciseForm.sets),
            reps: exerciseForm.reps,
            restSec: Number(exerciseForm.restSec),
            videoId: exerciseForm.videoId || undefined,
            videoId2: exerciseForm.videoId2 || undefined,
            sortOrder: Number(exerciseForm.sortOrder),
          }),
        });
        if (res.ok) {
          onSuccess();
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در ثبت حرکت ورزشی جدید",
            icon: "error",
          });
        }
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ثبت اطلاعات حرکت ورزشی",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 text-right font-danaMed animate-in fade-in slide-in-from-top-4 duration-200"
      dir="rtl"
    >
      <div className="text-white font-bold text-xs">
        {editingExercise ? "ویرایش حرکت ورزشی" : "ثبت حرکت ورزشی جدید"}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            نام حرکت
          </label>
          <input
            type="text"
            placeholder="مثلا: جلو بازو دمبل تناوبی"
            value={exerciseForm.name}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                name: e.target.value,
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            ویدیو آموزشی ۱
          </label>
          <select
            value={exerciseForm.videoId}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                videoId: e.target.value,
              })
            }
            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="">بدون ویدیو اول</option>
            {videos.map((vid) => (
              <option key={vid._id} value={vid._id}>
                {vid.title} ({getVideoLevelLabel(vid.level)})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            ویدیو آموزشی ۲ (اختیاری)
          </label>
          <select
            value={exerciseForm.videoId2}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                videoId2: e.target.value,
              })
            }
            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="">بدون ویدیو دوم</option>
            {videos.map((vid) => (
              <option key={vid._id} value={vid._id}>
                {vid.title} ({getVideoLevelLabel(vid.level)})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            تعداد ست
          </label>
          <input
            type="number"
            placeholder="۳"
            value={exerciseForm.sets}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                sets: Number(e.target.value),
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            تعداد تکرار
          </label>
          <input
            type="text"
            placeholder="12-10-8 یا ۱۲"
            value={exerciseForm.reps}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                reps: e.target.value,
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            استراحت (ثانیه)
          </label>
          <input
            type="number"
            placeholder="۶۰"
            value={exerciseForm.restSec}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                restSec: Number(e.target.value),
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-[10px] mb-1">
            ترتیب نمایش
          </label>
          <input
            type="number"
            placeholder="۱"
            value={exerciseForm.sortOrder}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                sortOrder: Number(e.target.value),
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
            required
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
        >
          {editingExercise ? "ذخیره تغییرات" : "ثبت حرکت"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-lg text-xs cursor-pointer"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
