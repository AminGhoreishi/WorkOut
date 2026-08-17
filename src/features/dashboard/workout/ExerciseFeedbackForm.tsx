"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Smile, AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import type { ExerciseFeedbackFormProps, FeedbackFormInputs } from "@/types/feedback";

export default function ExerciseFeedbackForm({
  userId,
  dayId,
  onClose,
}: ExerciseFeedbackFormProps) {
  const [difficulty, setDifficulty] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [hasPain, setHasPain] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FeedbackFormInputs>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: FeedbackFormInputs) => {
    try {
      const res = await fetch("/api/user/workout-session-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          dayId,
          difficulty: Number(difficulty),
          energyLevel: Number(energyLevel),
          hasPain: Boolean(hasPain),
          comment: data.comment,
        }),
      });

      if (res.ok) {
        onClose();
      }
    } catch {
      onClose();
    }
  };

  return (
    <div className="w-full bg-white/[0.02] border border-amber-500/15 rounded-2xl p-5 mt-4 space-y-5 animate-fadeIn font-danaMed" dir="rtl">
      <div className="flex items-center gap-2 text-amber-400">
        <HelpCircle className="w-5 h-5 text-amber-400" />
        <h4 className="text-sm font-bold font-morabbaReg text-white">
          ارزیابی و بازخورد جلسه تمرین
        </h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
        <div className="space-y-2">
          <label className="block text-xs text-neutral-400 font-semibold">
            میزان سختی تمرین چطور بود؟
          </label>
          <div className="flex gap-2 justify-start direction-ltr">
            {[1, 2, 3, 4, 5].map((level) => {
              const isActive = difficulty === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer ${ isActive ? "bg-amber-500 border-amber-400 text-neutral-950 shadow-md" : "bg-white/5 border-white/5 text-neutral-400 hover:text-white" }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-neutral-400 font-semibold">
            میزان انرژی شما چطور بود؟
          </label>
          <div className="flex gap-2 justify-start direction-ltr">
            {[1, 2, 3, 4, 5].map((level) => {
              const isActive = energyLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setEnergyLevel(level)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer ${ isActive ? "bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-400 text-neutral-950 shadow-md" : "bg-white/5 border-white/5 text-neutral-400 hover:text-white" }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-neutral-400 font-semibold">
            آیا در عضله یا مفصلی احساس درد غیرطبیعی دارید؟
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setHasPain(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${ hasPain ? "bg-amber-500/25 border-amber-500 text-amber-300" : "bg-white/5 border-white/5 text-neutral-400 hover:text-white" }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>بله، درد دارم</span>
            </button>
            <button
              type="button"
              onClick={() => setHasPain(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${ !hasPain ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-white/5 border-white/5 text-neutral-400 hover:text-white" }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>خیر، عالی هستم</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-neutral-400 font-semibold">
            توضیحات یا نظر شما (اختیاری)
          </label>
          <textarea
            {...register("comment")}
            placeholder="مثلاً تمرکز روی بخش منفی سنگین بود..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 min-h-[80px] resize-y placeholder:text-neutral-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-all bg-white/5 rounded-xl border border-white/5 cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-55 flex items-center gap-1.5 cursor-pointer"
          >
            <Smile className="w-4 h-4 text-neutral-950" />
            <span>{isSubmitting ? "در حال ثبت..." : "ثبت بازخورد"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
