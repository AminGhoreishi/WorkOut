"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Activity, Scale, Loader2, Save, Sparkles } from "lucide-react";
import { showAlert } from "@/utils/alert";
import { toEnglishDigits } from "@/utils/numbers";
import {
  GOAL_OPTIONS,
  EXPERIENCE_OPTIONS,
  EQUIPMENT_OPTIONS,
} from "@/constants/onboarding";
import PhysicalTab from "./PhysicalTab";
import TrainingTab from "./TrainingTab";
import PhotosTab from "./PhotosTab";
import type {
  FitnessFormInputs,
  FitnessProfileTab,
  FitnessProfileApiResponse,
} from "@/types/fitness-profile";

const fetcher = async (url: string): Promise<FitnessProfileApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || "خطا در دریافت اطلاعات پروفایل ورزشی",
    );
  }
  return res.json();
};

export default function FitnessProfileManagement() {
  const {
    data: profileResponse,
    isLoading,
    mutate,
  } = useSWR<FitnessProfileApiResponse>(
    "/api/user/fitness-profile",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 15000,
    },
  );

  const [saving, setSaving] = useState<boolean>(false);
  const [bodyPhotos, setBodyPhotos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<FitnessProfileTab>("physical");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FitnessFormInputs>({
    mode: "onBlur",
    defaultValues: {
      goal: "general_fitness",
      sessionsPerWeek: 3,
      equipment: "none",
      trainingExperience: "beginner",
      ageYears: "25",
      heightCm: "175",
      weightKg: "70",
      notes: "",
    },
  });

  const profile = profileResponse?.profile || null;

  useEffect(() => {
    if (profile) {
      reset({
        goal: profile.goal || "general_fitness",
        sessionsPerWeek: profile.sessionsPerWeek || 3,
        equipment: profile.equipment || "none",
        trainingExperience: profile.trainingExperience || "beginner",
        ageYears: String(profile.ageYears || 25),
        heightCm: String(profile.heightCm || 175),
        weightKg: String(profile.weightKg || 70),
        notes: profile.notes || "",
      });
      setBodyPhotos(profile.bodyPhotos || []);
    }
  }, [profile, reset]);

  const watchedGoal = watch("goal");
  const watchedSessions = watch("sessionsPerWeek");
  const watchedEquipment = watch("equipment");
  const watchedExperience = watch("trainingExperience");
  const watchedHeight = watch("heightCm") || "175";
  const watchedWeight = watch("weightKg") || "70";
  const watchedAge = watch("ageYears") || "25";

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (bodyPhotos.length + fileArray.length > 4) {
        showAlert({
          title: "محدودیت تصویر",
          text: "حداکثر ۴ تصویر می‌توانید بارگذاری کنید.",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const base64String = event.target.result as string;
            setBodyPhotos((prev) => [...prev, base64String]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setBodyPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FitnessFormInputs> = async (data) => {
    setSaving(true);
    try {
      const cleanAge = parseInt(toEnglishDigits(data.ageYears)) || 25;
      const cleanHeight = parseInt(toEnglishDigits(data.heightCm)) || 175;
      const cleanWeight = parseInt(toEnglishDigits(data.weightKg)) || 70;

      const res = await fetch("/api/user/fitness-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: data.goal,
          sessionsPerWeek: data.sessionsPerWeek,
          equipment: data.equipment,
          trainingExperience: data.trainingExperience,
          ageYears: cleanAge,
          heightCm: cleanHeight,
          weightKg: cleanWeight,
          bodyPhotos,
          notes: data.notes,
        }),
      });

      const resData: FitnessProfileApiResponse = await res
        .json()
        .catch(() => ({}));

      if (res.ok) {
        await mutate(resData, { revalidate: true });
        showAlert({
          title: "موفقیت‌آمیز",
          text: "پروفایل ورزشی شما با موفقیت بروزرسانی شد.",
          icon: "success",
          confirmButtonColor: "#f59e0b",
        });
      } else {
        throw new Error(resData.message || "بروزرسانی پروفایل ناموفق بود");
      }
    } catch (err: any) {
      showAlert({
        title: "خطا",
        text: err.message || "خطا در ارتباط با سرور رخ داده است.",
        icon: "error",
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setSaving(false);
    }
  };

  const onError: SubmitErrorHandler<FitnessFormInputs> = (formErrors) => {
    if (formErrors.ageYears || formErrors.heightCm || formErrors.weightKg) {
      setActiveTab("physical");
      showAlert({
        title: "خطای اعتبارسنجی",
        text: "لطفاً خطاهای مربوط به فیلدهای مشخصات بدنی را تصحیح کنید.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  const parsedHeight = parseInt(toEnglishDigits(watchedHeight)) || 0;
  const parsedWeight = parseInt(toEnglishDigits(watchedWeight)) || 0;
  const bmi =
    parsedHeight >= 100 && parsedWeight >= 30
      ? parseFloat(
          (
            parsedWeight /
            ((parsedHeight / 100) * (parsedHeight / 100))
          ).toFixed(1),
        )
      : 0;

  const getBMICategory = (bmiVal: number) => {
    if (bmiVal < 18.5)
      return {
        label: "کم‌وزنی",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
      };
    if (bmiVal < 25)
      return {
        label: "نرمال",
        color: "text-amber-300",
        bg: "bg-amber-500/20",
        border: "border-amber-500/30",
      };
    if (bmiVal < 30)
      return {
        label: "اضافه‌وزن",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
      };
    return {
      label: "چاقی",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    };
  };

  const bmiCategory = getBMICategory(bmi);

  const selectedGoalLabel =
    GOAL_OPTIONS.find((g) => g.val === watchedGoal)?.label || "تعیین نشده";
  const selectedExpLabel =
    EXPERIENCE_OPTIONS.find((e) => e.val === watchedExperience)?.label ||
    "تعیین نشده";
  const selectedEqLabel =
    EQUIPMENT_OPTIONS.find((eq) => eq.val === watchedEquipment)?.label ||
    "تعیین نشده";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-400 gap-3 font-danaMed">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <span>در حال بارگذاری اطلاعات پروفایل ورزشی...</span>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-6 text-white font-danaMed"
      dir="rtl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 flex flex-col items-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -z-10" />

            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-neutral-950">
              <Activity className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold font-morabbaReg text-white">
              پروفایل ورزشی شما
            </h2>
            <p className="text-neutral-400 text-xs mt-1 text-center">
              مشخصات بدنی و ورزشی جهت تنظیم برنامه تمرین
            </p>

            <hr className="border-white/10 w-full my-6" />

            <div className="w-full space-y-4">
              <div className="bg-white/5 border border-amber-500/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-neutral-300">شاخص BMI:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-sans">
                    {bmi > 0 ? bmi : "—"}
                  </span>
                  {bmi > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${bmiCategory.color} ${bmiCategory.bg} ${bmiCategory.border}`}
                    >
                      {bmiCategory.label}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 border border-amber-500/10 rounded-xl p-3 text-center">
                  <span className="block text-[10px] text-neutral-400">
                    قد (CM)
                  </span>
                  <span className="text-base font-bold font-sans mt-1 block">
                    {errors.heightCm ? "—" : watchedHeight}
                  </span>
                </div>
                <div className="bg-white/5 border border-amber-500/10 rounded-xl p-3 text-center">
                  <span className="block text-[10px] text-neutral-400">
                    وزن (KG)
                  </span>
                  <span className="text-base font-bold font-sans mt-1 block">
                    {errors.weightKg ? "—" : watchedWeight}
                  </span>
                </div>
                <div className="bg-white/5 border border-amber-500/10 rounded-xl p-3 text-center">
                  <span className="block text-[10px] text-neutral-400">
                    سن (سال)
                  </span>
                  <span className="text-base font-bold font-sans mt-1 block">
                    {errors.ageYears ? "—" : watchedAge}
                  </span>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">هدف ورزشی:</span>
                  <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                    {selectedGoalLabel}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">سابقه ورزشی:</span>
                  <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                    {selectedExpLabel}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">تجهیزات در دسترس:</span>
                  <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                    {selectedEqLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold font-morabbaReg text-white">
              ویرایش مشخصات ورزشی
            </h3>
          </div>

          <div className="flex border-b border-white/10 mb-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("physical")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative cursor-pointer flex-shrink-0 ${
                activeTab === "physical"
                  ? "text-amber-400 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              مشخصات بدنی
              {activeTab === "physical" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("training")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative cursor-pointer flex-shrink-0 ${
                activeTab === "training"
                  ? "text-amber-400 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              برنامه و سابقه تمرینی
              {activeTab === "training" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative cursor-pointer flex-shrink-0 ${
                activeTab === "photos"
                  ? "text-amber-400 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              تصاویر بدنی و یادداشت‌ها
              {activeTab === "photos" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            {activeTab === "physical" && (
              <PhysicalTab
                register={register}
                errors={errors}
                watchedHeight={watchedHeight}
                watchedWeight={watchedWeight}
                bmi={bmi}
                bmiCategory={bmiCategory}
              />
            )}

            {activeTab === "training" && (
              <TrainingTab
                watchedGoal={watchedGoal}
                watchedSessions={watchedSessions}
                watchedExperience={watchedExperience}
                watchedEquipment={watchedEquipment}
                setValue={setValue}
              />
            )}

            {activeTab === "photos" && (
              <PhotosTab
                register={register}
                bodyPhotos={bodyPhotos}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
              />
            )}

            <div className="pt-4 flex justify-end border-t border-white/5">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                    <span>در حال ذخیره...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-neutral-950" />
                    <span>ذخیره تغییرات</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
