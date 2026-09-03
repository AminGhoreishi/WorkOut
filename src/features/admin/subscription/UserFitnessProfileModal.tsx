"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  X,
  Activity,
  User,
  Target,
  Dumbbell,
  Calendar,
  Ruler,
  Weight,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import type { UserFitnessProfileModalProps } from "@/types/workout";
import type { FitnessProfileApiResponse } from "@/types/fitness-profile";
import {
  goalLabels,
  experienceLabels,
  equipmentLabels,
} from "@/utils/fitnessProfile";

const fetcher = async (url: string): Promise<FitnessProfileApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات پروفایل ورزشی");
  }
  return res.json();
};

export default function UserFitnessProfileModal({
  userId,
  userName,
  onClose,
}: UserFitnessProfileModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selectedImage]);

  const { data, error, isLoading } = useSWR<FitnessProfileApiResponse>(
    userId ? `/api/user/fitness-profile?userId=${encodeURIComponent(userId)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const profile = data?.profile;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-danaMed"
      dir="rtl"
      onClick={() => onClose()}
    >
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="mt-2 font-bold text-white font-morabbaReg">
                پروفایل ورزشی کاربر
              </h2>
              <p className="text-xs text-white/50 ss02">
                {userName ? `اطلاعات و مشخصات بدنی ${userName}` : "مشخصات بدنی و سوابق تمرینی"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onClose()}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-white/60">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
              <span className="text-sm">در حال بارگذاری پروفایل ورزشی...</span>
            </div>
          ) : error ? (
            <div className="py-12 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <p className="text-sm font-semibold">خطا در بارگذاری پروفایل ورزشی</p>
              <p className="text-xs mt-1 text-red-400/80">{error.message}</p>
            </div>
          ) : !profile ? (
            <div className="py-16 text-center text-white/40 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-white/30 border border-white/10">
                <User className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-white/70">
                پروفایل ورزشی ثبت نشده است
              </p>
              <p className="text-xs text-white/40 max-w-sm mx-auto">
                این کاربر هنوز مراحل تکمیل پروفایل ورزشی و مشخصات فیزیکی خود را انجام نداده است.
              </p>
            </div>
          ) : (
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

              {profile.notes && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>توضیحات و آسیب‌دیدگی‌های کاربر</span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                    {profile.notes}
                  </p>
                </div>
              )}

              {profile.bodyPhotos && profile.bodyPhotos.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>تصاویر وضعیت بدنی ({profile.bodyPhotos.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {profile.bodyPhotos.map((photoUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(photoUrl)}
                        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer group hover:border-emerald-500/50 transition-all"
                      >
                        <img
                          src={photoUrl}
                          alt={`عکس بدنی ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                          مشاهده بزرگ‌تر
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
          <button
            type="button"
            onClick={() => onClose()}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh]">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 left-0 text-white hover:text-red-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="عکس بزرگ‌نمایی شده"
              className="max-h-[85vh] max-w-full rounded-xl object-contain border border-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
