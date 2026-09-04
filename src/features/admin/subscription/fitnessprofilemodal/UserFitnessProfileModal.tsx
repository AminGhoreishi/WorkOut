"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import {
  X,
  Activity,
  User,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import type { UserFitnessProfileModalProps } from "@/types/workout";
import type { FitnessProfileApiResponse } from "@/types/fitness-profile";
import { calculateNutritionTargets } from "@/utils/fitnessProfile";
import FitnessNutritionTargets from "./FitnessNutritionTargets";
import FitnessProfileStats from "./FitnessProfileStats";

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

  const nutrition =
    data?.profile &&
    data.profile.weightKg > 0 &&
    data.profile.heightCm > 0 &&
    data.profile.ageYears > 0
      ? calculateNutritionTargets(
          data.profile.weightKg,
          data.profile.heightCm,
          data.profile.ageYears,
          data.profile.sessionsPerWeek,
          data.profile.goal
        )
      : null;

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
          ) : !data?.profile ? (
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
              <FitnessProfileStats profile={data.profile} />

              {nutrition && <FitnessNutritionTargets nutrition={nutrition} />}

              {data.profile.notes && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>توضیحات و آسیب‌دیدگی‌های کاربر</span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                    {data.profile.notes}
                  </p>
                </div>
              )}

              {data.profile.bodyPhotos && data.profile.bodyPhotos.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>تصاویر وضعیت بدنی ({data.profile.bodyPhotos.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {data.profile.bodyPhotos.map((photoUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(photoUrl)}
                        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer group hover:border-emerald-500/50 transition-all"
                      >
                        <Image
                          src={photoUrl}
                          alt={`عکس بدنی ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
            <Image
              src={selectedImage}
              alt="عکس بزرگ‌نمایی شده"
              width={800}
              height={1000}
              className="max-h-[85vh] max-w-full rounded-xl object-contain border border-white/20 w-auto h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
