import { Ruler, Weight, User, Calendar, Target, Dumbbell } from "lucide-react";
import type { FitnessProfileStatsProps } from "@/types/fitness-profile";
import {
  goalLabels,
  experienceLabels,
  equipmentLabels,
} from "@/utils/fitnessProfile";

export default function FitnessProfileStats({
  profile,
}: FitnessProfileStatsProps) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Ruler className="w-3.5 h-3.5 text-emerald-400" />
            <span>قد</span>
          </div>
          <div className="mt-2 font-bold text-white ss02">
            {profile.heightCm ? `${profile.heightCm} سانتی‌متر` : "-"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Weight className="w-3.5 h-3.5 text-amber-400" />
            <span>وزن</span>
          </div>
          <div className="mt-2 font-bold text-white ss02">
            {profile.weightKg ? `${profile.weightKg} کیلوگرم` : "-"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>سن</span>
          </div>
          <div className="mt-2 font-bold text-white ss02">
            {profile.ageYears ? `${profile.ageYears} سال` : "-"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>تمرین هفتگی</span>
          </div>
          <div className="mt-2 font-bold text-white ss02">
            {profile.sessionsPerWeek ? `${profile.sessionsPerWeek} روز` : "-"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>هدف ورزشی</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {goalLabels[profile.goal] || profile.goal || "-"}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Dumbbell className="w-4 h-4 text-amber-400" />
            <span>سابقه و سطح</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {experienceLabels[profile.trainingExperience] || profile.trainingExperience || "-"}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Dumbbell className="w-4 h-4 text-blue-400" />
            <span>تجهیزات تمرین</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {equipmentLabels[profile.equipment] || profile.equipment || "-"}
          </div>
        </div>
      </div>
    </>
  );
}
