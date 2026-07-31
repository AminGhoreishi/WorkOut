"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import {
  Activity,
  Target,
  Dumbbell,
  Scale,
  Camera,
  Loader2,
  Save,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { showAlert } from "@/utils/alert";
import { FitnessProfileData, FitnessFormInputs } from "@/types/fitness-profile";

const GOAL_LABELS = {
  weight_loss: "کاهش وزن و چربی‌سوزی",
  muscle_gain: "عضله‌سازی و افزایش حجم",
  endurance: "افزایش استقامت و کاردیو",
  general_fitness: "آمادگی جسمانی عمومی",
  rehabilitation: "توان‌بخشی و بهبود آسیب",
};

const EXPERIENCE_LABELS = {
  beginner: "مبتدی (زیر ۶ ماه)",
  intermediate: "متوسط (۶ تا ۲۴ ماه)",
  advanced: "حرفه‌ای (بیش از ۲ سال)",
};

const EQUIPMENT_LABELS = {
  none: "بدون تجهیزات (فقط وزن بدن)",
  home_basic: "تجهیزات پایه خانگی",
  gym_full: "باشگاه ورزشی مجهز",
};

export default function FitnessProfileManagement() {
  const [profile, setProfile] = useState<FitnessProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bodyPhotos, setBodyPhotos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<
    "physical" | "training" | "photos"
  >("physical");

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

  const watchedGoal = watch("goal");
  const watchedSessions = watch("sessionsPerWeek");
  const watchedEquipment = watch("equipment");
  const watchedExperience = watch("trainingExperience");
  const watchedHeight = watch("heightCm") || "175";
  const watchedWeight = watch("weightKg") || "70";
  const watchedAge = watch("ageYears") || "25";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/fitness-profile");
      if (!res.ok) throw new Error("Failed to fetch fitness profile");
      const data = await res.json();
      if (data.profile) {
        const p = data.profile;
        setProfile(p);
        reset({
          goal: p.goal,
          sessionsPerWeek: p.sessionsPerWeek || 3,
          equipment: p.equipment || "none",
          trainingExperience: p.trainingExperience || "beginner",
          ageYears: String(p.ageYears || 25),
          heightCm: String(p.heightCm || 175),
          weightKg: String(p.weightKg || 70),
          notes: p.notes || "",
        });
        setBodyPhotos(p.bodyPhotos || []);
      }
    } catch (e) {
      console.error(e);
      showAlert({
        title: "خطا",
        text: "بارگذاری اطلاعات پروفایل ورزشی با خطا مواجه شد.",
        icon: "error",
        confirmButtonText: "تلاش مجدد",
        confirmButtonColor: "#eab308",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
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
      const res = await fetch("/api/user/fitness-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: data.goal,
          sessionsPerWeek: data.sessionsPerWeek,
          equipment: data.equipment,
          trainingExperience: data.trainingExperience,
          ageYears: parseInt(data.ageYears),
          heightCm: parseInt(data.heightCm),
          weightKg: parseInt(data.weightKg),
          bodyPhotos,
          notes: data.notes,
        }),
      });

      const resData = await res.json();

      if (res.ok) {
        setProfile(resData.profile);
        showAlert({
          title: "موفقیت‌آمیز",
          text: "پروفایل ورزشی شما با موفقیت بروزرسانی شد.",
          icon: "success",
          confirmButtonColor: "#eab308",
        });
      } else {
        throw new Error(resData.message || "بروزرسانی پروفایل ناموفق بود");
      }
    } catch (err: any) {
      console.error(err);
      showAlert({
        title: "خطا",
        text: err.message || "خطا در ارتباط با سرور رخ داده است.",
        icon: "error",
        confirmButtonColor: "#eab308",
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
        confirmButtonColor: "#eab308",
      });
    }
  };

  const parsedHeight = parseInt(watchedHeight) || 0;
  const parsedWeight = parseInt(watchedWeight) || 0;
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <span>در حال بارگذاری اطلاعات پروفایل ورزشی...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white font-danaMed" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/[0.03] border border-amber-500/15 rounded-2xl p-6 flex flex-col items-center shadow-xl relative overflow-hidden">
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
                  <span className="text-amber-300 font-semibold">
                    {GOAL_LABELS[watchedGoal] || "تعیین نشده"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">سابقه ورزشی:</span>
                  <span className="text-amber-300 font-semibold">
                    {EXPERIENCE_LABELS[watchedExperience] || "تعیین نشده"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">تجهیزات در دسترس:</span>
                  <span className="text-amber-300 font-semibold">
                    {EQUIPMENT_LABELS[watchedEquipment] || "تعیین نشده"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/[0.03] border border-amber-500/15 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold font-morabbaReg text-white">
              ویرایش مشخصات ورزشی
            </h3>
          </div>

          <div className="flex border-b border-white/10 mb-6">
            <button
              onClick={() => setActiveTab("physical")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative cursor-pointer ${
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
              onClick={() => setActiveTab("training")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative cursor-pointer ${
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
              onClick={() => setActiveTab("photos")}
              className={`pb-3 px-4 text-sm font-semibold transition-colors relative cursor-pointer ${
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
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-neutral-300 text-xs mb-2 font-medium">
                      سن (سال)
                    </label>
                    <input
                      type="text"
                      {...register("ageYears", {
                        required: "وارد کردن سن الزامی است",
                        pattern: {
                          value: /^([1-9][0-9]?|100)$/,
                          message: "سن باید عدد و حداکثر ۱۰۰ سال باشد",
                        },
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors font-sans text-left"
                    />
                    {errors.ageYears && (
                      <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                        {errors.ageYears.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-neutral-300 text-xs mb-2 font-medium">
                      قد (سانتی‌متر)
                    </label>
                    <input
                      type="text"
                      {...register("heightCm", {
                        required: "وارد کردن قد الزامی است",
                        pattern: {
                          value: /^([1-9][0-9]?|[1-2][0-9]{2})$/,
                          message: "قد باید عدد و زیر ۳۰۰ سانتی‌متر باشد",
                        },
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors font-sans text-left"
                    />
                    {errors.heightCm && (
                      <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                        {errors.heightCm.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-neutral-300 text-xs mb-2 font-medium">
                      وزن (کیلوگرم)
                    </label>
                    <input
                      type="text"
                      {...register("weightKg", {
                        required: "وارد کردن وزن الزامی است",
                        pattern: {
                          value: /^([1-9][0-9]?|[1-2][0-9]{2})$/,
                          message: "وزن باید عدد و زیر ۳۰۰ کیلوگرم باشد",
                        },
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors font-sans text-left"
                    />
                    {errors.weightKg && (
                      <p className="text-amber-400 text-[10px] mt-1 font-semibold">
                        {errors.weightKg.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 items-center">
                  <Activity className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div className="text-xs leading-relaxed text-neutral-300">
                    <span className="font-bold text-amber-300 block mb-0.5">
                      محاسبه دقیق BMI
                    </span>
                    {bmi > 0 ? (
                      <>
                        شاخص توده بدنی شما بر اساس وزن {watchedWeight} کیلوگرم و
                        قد {watchedHeight} سانتی‌متر برابر با{" "}
                        <strong className="text-white font-sans">{bmi}</strong>{" "}
                        است که در محدوده{" "}
                        <strong className={bmiCategory.color}>
                          {bmiCategory.label}
                        </strong>{" "}
                        قرار دارد.
                      </>
                    ) : (
                      <>
                        لطفاً قد (بالای ۱۰۰ سانتی‌متر) و وزن (بالای ۳۰ کیلوگرم)
                        خود را به درستی وارد کنید تا شاخص BMI محاسبه شود.
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "training" && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-amber-400" />
                    هدف ورزشی شما چیست؟
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(GOAL_LABELS).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setValue("goal", val as any)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-right transition-all duration-200 cursor-pointer ${
                          watchedGoal === val
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                        }`}
                      >
                        <span className="font-medium text-sm">{label}</span>
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
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center font-semibold font-sans transition-all duration-200 cursor-pointer ${
                            watchedSessions === num
                              ? "bg-amber-500 border-amber-500 text-neutral-950 font-bold scale-105"
                              : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                          }`}
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
                        setValue("trainingExperience", e.target.value as any)
                      }
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                    >
                      {Object.entries(EXPERIENCE_LABELS).map(([val, label]) => (
                        <option
                          key={val}
                          value={val}
                          className="bg-neutral-900 text-white"
                        >
                          {label}
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
                    {Object.entries(EQUIPMENT_LABELS).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setValue("equipment", val as any)}
                        className={`w-full p-4 rounded-xl border text-right transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          watchedEquipment === val
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                        }`}
                      >
                        <span className="font-semibold text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "photos" && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-400" />
                    تصاویر وضعیت فیزیکی شما (اختیاری)
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {bodyPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square border border-amber-500/20 rounded-xl overflow-hidden group"
                      >
                        <img
                          src={photo}
                          alt="Physical state"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    {bodyPhotos.length < 4 && (
                      <label className="aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5 transition-all">
                        <Plus className="w-5 h-5 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-neutral-400">
                          افزودن تصویر
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          multiple
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                    می‌توانید تا حداکثر ۴ تصویر از وضعیت بدنی خود (جلو، پشت،
                    پهلوها) بارگذاری کنید.
                  </p>
                </div>

                <div>
                  <label className="block text-neutral-300 text-xs mb-2 font-medium">
                    یادداشت‌های اضافی برای مربی (اختیاری)
                  </label>
                  <textarea
                    rows={4}
                    {...register("notes")}
                    placeholder="بیماری خاص، آسیب‌دیدگی‌ها، حساسیت‌های غذایی یا نکته مهمی اگر هست اینجا بنویسید..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>
              </div>
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
