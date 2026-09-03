import { Target, Calendar, Dumbbell } from "lucide-react";
import {
  GOAL_OPTIONS,
  EXPERIENCE_OPTIONS,
  EQUIPMENT_OPTIONS,
} from "@/constants/onboarding";
import type {
  TrainingTabProps,
  FitnessGoal,
  EquipmentOption,
  TrainingExperienceOption,
} from "@/types/fitness-profile";

export default function TrainingTab({
  watchedGoal,
  watchedSessions,
  watchedExperience,
  watchedEquipment,
  setValue,
}: TrainingTabProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
          <Target className="w-4 h-4 text-amber-400" />
          هدف ورزشی شما چیست؟
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GOAL_OPTIONS.map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() => setValue("goal", item.val as FitnessGoal)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-right transition-all duration-200 cursor-pointer ${ watchedGoal === item.val ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold" : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10" }`}
            >
              <span className="font-medium text-xs sm:text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            تعداد جلسات تمرین در هفته
          </label>
          <div className="flex justify-between gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setValue("sessionsPerWeek", num)}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer ss02 ${ watchedSessions === num ? "bg-amber-500 border-amber-500 text-neutral-950 font-bold scale-105" : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10" }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
            <Dumbbell className="w-4 h-4 text-amber-400" />
            سابقه تمرین شما
          </label>
          <select
            value={watchedExperience}
            onChange={(e) =>
              setValue(
                "trainingExperience",
                e.target.value as TrainingExperienceOption,
              )
            }
            className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer ss02"
          >
            {EXPERIENCE_OPTIONS.map((item) => (
              <option
                key={item.val}
                value={item.val}
                className="bg-neutral-900 text-white ss02"
              >
                {item.label} ({item.desc})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
          <Dumbbell className="w-4 h-4 text-amber-400" />
          تجهیزات ورزشی در دسترس
        </label>
        <div className="space-y-2">
          {EQUIPMENT_OPTIONS.map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() =>
                setValue("equipment", item.val as EquipmentOption)
              }
              className={`w-full p-4 rounded-xl border text-right transition-all duration-200 cursor-pointer flex items-center justify-between ${ watchedEquipment === item.val ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold" : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10" }`}
            >
              <span className="font-semibold text-xs sm:text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
