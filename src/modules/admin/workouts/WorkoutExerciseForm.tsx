"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type {
  WorkoutExerciseFormProps,
  WorkoutExerciseFormInputs,
} from "@/types/workout";
import { showAlert } from "@/utils/alert";

export default function WorkoutExerciseForm({
  editingExercise,
  selectedDayId,
  videos,
  onSuccess,
  onCancel,
  defaultSortOrder,
}: WorkoutExerciseFormProps) {
  const { register, handleSubmit, reset } =
    useForm<WorkoutExerciseFormInputs>();

  useEffect(() => {
    if (editingExercise) {
      reset({
        name: editingExercise.name,
        sets: editingExercise.sets,
        reps: editingExercise.reps,
        weight: editingExercise.weight || 0,
        restSec: editingExercise.restSec,
        videoId: editingExercise.videoId?._id || "",
        videoId2: editingExercise.videoId2?._id || "",
        sortOrder: editingExercise.sortOrder,
      });
    } else {
      reset({
        name: "",
        sets: 3,
        reps: "12-10-8",
        weight: 0,
        restSec: 60,
        videoId: "",
        videoId2: "",
        sortOrder: defaultSortOrder,
      });
    }
  }, [editingExercise, defaultSortOrder, reset]);

  const getVideoLevelLabel = (level?: string) => {
    if (!level) return "مبتدی";
    const labels: Record<string, string> = {
      beginner: "مبتدی",
      intermediate: "متوسط",
      advanced: "حرفه‌ای",
    };
    return labels[level] || level;
  };

  const submitWorkoutExercise = async (data: WorkoutExerciseFormInputs,) => {
    if (editingExercise) {
      const res = await fetch("/api/admin/subscription/workout-exercises", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingExercise._id,
          name: data.name,
          sets: Number(data.sets),
          reps: data.reps,
          weight: Number(data.weight || 0),
          restSec: Number(data.restSec),
          videoId: data.videoId || null,
          videoId2: data.videoId2 || null,
          sortOrder: Number(data.sortOrder),
        }),
      });
      return res
    }
    else {
      const res = await fetch("/api/admin/subscription/workout-exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayId: selectedDayId,
          name: data.name,
          sets: Number(data.sets),
          reps: data.reps,
          weight: Number(data.weight || 0),
          restSec: Number(data.restSec),
          videoId: data.videoId || null,
          videoId2: data.videoId2 || null,
          sortOrder: Number(data.sortOrder),
        }),
      });

      return res
    }
  }

  const onSubmit = async (data: WorkoutExerciseFormInputs) => {
    if (!selectedDayId) return;
    try {
      if (editingExercise) {
        const res = await submitWorkoutExercise(data);
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
        const res = await submitWorkoutExercise(data);
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
    } catch (err: unknown) {
      showAlert({
        title: "خطا",
        text: (err as Error).message || "خطا در ثبت اطلاعات حرکت ورزشی",
        icon: "error",
      });
    }
  };

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
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
          {...register("name", { required: true })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
          required
        />
      </div>
      <div>
        <label className="block text-white/70 text-[10px] mb-1">
          ویدیو آموزشی ۱
        </label>
        <select
          {...register("videoId")}
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
          {...register("videoId2")}
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

    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div>
        <label className="block text-white/70 text-[10px] mb-1">
          تعداد ست
        </label>
        <input
          type="number"
          placeholder="۳"
          {...register("sets", { required: true, valueAsNumber: true })}
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
          {...register("reps", { required: true })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
          required
        />
      </div>
      <div>
        <label className="block text-white/70 text-[10px] mb-1">
          وزنه (کیلوگرم)
        </label>
        <input
          type="number"
          placeholder="۱۰"
          {...register("weight", { valueAsNumber: true })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400 ss02"
        />
      </div>
      <div>
        <label className="block text-white/70 text-[10px] mb-1">
          استراحت (ثانیه)
        </label>
        <input
          type="number"
          placeholder="۶۰"
          {...register("restSec", { required: true, valueAsNumber: true })}
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
          {...register("sortOrder", { required: true, valueAsNumber: true })}
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
