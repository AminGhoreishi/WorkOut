"use client";

import { useState } from "react";
import useSWR from "swr";
import { showAlert, showConfirm } from "@/utils/alert";
import {
  Plus,
  Edit,
  Trash2,
  Dumbbell,
  Package,
  ChevronDown,
} from "lucide-react";
import type {
  PackageInfo,
  WorkoutPlan,
  WorkoutWeekInfo,
  WorkoutDay,
  VideoInfo,
  WorkoutExercise,
} from "@/types/workout";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import WorkoutDayForm from "./WorkoutDayForm";
import WorkoutExercisesSection from "./WorkoutExercisesSection";
import EditPlanInfoForm from "./EditPlanInfoForm";
import WorkoutWeeksList from "./WorkoutWeeksList";
import WorkoutDaysList from "./WorkoutDaysList";
import CreatePlanForm from "./CreatePlanForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WorkoutsManagement() {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<WorkoutWeekInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);

  const [isEditingPlanInfo, setIsEditingPlanInfo] = useState(false);
  const [showDayForm, setShowDayForm] = useState(false);
  const [editingDay, setEditingDay] = useState<WorkoutDay | null>(null);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [watchingVideo, setWatchingVideo] = useState<VideoInfo | null>(null);

  const { data: pkgData, isLoading: loadingPackages } = useSWR(
    "/api/admin/package",
    fetcher
  );
  const packages: PackageInfo[] = pkgData?.packages || [];

  const { data: vidData } = useSWR("/api/admin/video", fetcher);
  const videos: VideoInfo[] = vidData?.videos || [];

  const { data: monthData, mutate: mutatePlan, isLoading: loadingPlan } = useSWR(
    selectedPackage
      ? `/api/admin/subscription/workout-month?packageId=${selectedPackage._id}`
      : null,
    fetcher
  );
  const workoutPlan: WorkoutPlan | null =
    monthData?.plans && monthData.plans.length > 0 ? monthData.plans[0] : null;

  const { data: weeksData, mutate: mutateWeeks } = useSWR(
    selectedPackage && workoutPlan
      ? `/api/admin/subscription/workout-week?packageId=${selectedPackage._id}`
      : null,
    fetcher
  );
  const workoutWeeks: WorkoutWeekInfo[] = weeksData?.weeks || [];

  const activeWeek = selectedWeek || (workoutWeeks.length > 0 ? workoutWeeks[0] : null);

  const { data: daysData, mutate: mutateDays } = useSWR(
    activeWeek
      ? `/api/admin/subscription/workout-days?planId=${activeWeek._id}`
      : null,
    fetcher
  );
  const workoutDays: WorkoutDay[] = daysData?.days || [];

  const { data: exercisesData, mutate: mutateExercises } = useSWR(
    selectedDay
      ? `/api/admin/subscription/workout-exercises?dayId=${selectedDay._id}`
      : null,
    fetcher
  );
  const exercises: WorkoutExercise[] = exercisesData?.exercises || [];

  const handleCreateWeek = async () => {
    if (!selectedPackage) return;
    try {
      const res = await fetch("/api/admin/subscription/workout-week", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selectedPackage._id }),
      });
      if (res.ok) {
        showAlert({
          title: "موفقیت",
          text: "هفته جدید با موفقیت ایجاد شد",
          icon: "success",
        });
        mutateWeeks();
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ایجاد هفته جدید",
        icon: "error",
      });
    }
  };

  const handleDeleteWeek = async (id: string) => {
    const confirmed = await showConfirm({
      title: "حذف هفته",
      text: "آیا از حذف این هفته اطمینان دارید؟",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/subscription/workout-week?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showAlert({
          title: "موفقیت",
          text: "هفته با موفقیت حذف شد",
          icon: "success",
        });
        if (selectedWeek?._id === id) {
          setSelectedWeek(null);
          setSelectedDay(null);
        }
        mutateWeeks();
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در حذف هفته",
        icon: "error",
      });
    }
  };

  const handleSelectPackage = (pkg: PackageInfo) => {
    setSelectedPackage(pkg);
    setSelectedWeek(null);
    setSelectedDay(null);
    setShowDayForm(false);
  };

  const handleDeletePlan = async () => {
    if (!workoutPlan) return;
    const confirmed = await showConfirm({
      title: "حذف برنامه تمرینی",
      text: "آیا از حذف کامل این برنامه تمرینی به همراه تمام روزها و حرکات آن اطمینان دارید؟",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/admin/subscription/workout-month?id=${workoutPlan._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setSelectedWeek(null);
        setSelectedDay(null);
        mutatePlan();
        mutateWeeks();
        mutateDays();
        showAlert({
          title: "موفقیت",
          text: "برنامه تمرینی با موفقیت حذف شد",
          icon: "success",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در حذف برنامه",
        icon: "error",
      });
    }
  };

  const handleDaySuccess = () => {
    mutateDays();
    setShowDayForm(false);
    setEditingDay(null);
  };

  const handleDeleteDay = async (id: string) => {
    const confirmed = await showConfirm({
      title: "حذف روز تمرینی",
      text: "آیا از حذف این روز و تمامی حرکات ورزشی آن اطمینان دارید؟",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/subscription/workout-days?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedDay?._id === id) {
          setSelectedDay(null);
        }
        mutateDays();
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در حذف روز",
        icon: "error",
      });
    }
  };

  const handleDeleteExercise = async (id: string) => {
    const confirmed = await showConfirm({
      title: "حذف حرکت تمرینی",
      text: "آیا از حذف این حرکت تمرینی اطمینان دارید؟",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/admin/subscription/workout-exercises?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        mutateExercises();
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در حذف حرکت تمرینی",
        icon: "error",
      });
    }
  };

  const handleWeekSelect = (week: WorkoutWeekInfo) => {
    setSelectedWeek(week);
    setSelectedDay(null);
    setShowDayForm(false);
  };

  return (
    <div className="overflow-hidden font-danaMed" dir="rtl">
      <div className="container mx-auto pt-8">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
            مدیریت برنامه‌های تمرینی
          </h1>
          <p className="text-white/60 text-sm">
            برنامه‌های ورزشی و حرکات هر پکیج اشتراک را طراحی، روزبندی و سازماندهی کنید.
          </p>
        </div>

        {loadingPackages ? (
          <div className="p-12 text-center text-white/50 bg-white/5 border border-white/10 rounded-xl">
            در حال بارگذاری اطلاعات اولیه...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-white font-bold text-lg flex items-center gap-2 font-morabbaReg">
                <Package className="w-5 h-5 text-amber-400" />
                انتخاب پکیج
              </h2>
              <div className="space-y-3">
                {packages.map((pkg) => {
                  const isSelected = selectedPackage?._id === pkg._id;
                  return (
                    <div
                      key={pkg._id}
                      onClick={() => handleSelectPackage(pkg)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${ isSelected ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-400 text-white shadow-lg" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10" }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">{pkg.name}</span>
                        <span className="text-[10px] text-white/50 opacity-80 ss02">
                          {pkg.slug}
                        </span>
                      </div>
                      <div className="text-xs text-white/60 line-clamp-1">
                        برای ویرایش برنامه‌های تمرینی کلیک کنید.
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-3">
              {!selectedPackage ? (
                <div className="h-64 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/40 text-center p-8 bg-white/5">
                  <Dumbbell className="w-16 h-16 mb-4 opacity-20 text-amber-400" />
                  <p className="font-semibold text-lg">
                    برای شروع، یک پکیج را از ستون سمت راست انتخاب کنید
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    شما می‌توانید برنامه‌های ورزشی هر پکیج را به صورت مجزا مدیریت کنید.
                  </p>
                </div>
              ) : loadingPlan ? (
                <div className="h-64 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 bg-white/5">
                  در حال بارگذاری برنامه تمرینی پکیج...
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-amber-500/10 to-yellow-600/5">
                    <div>
                      <div className="text-xs text-amber-400 font-bold mb-1">
                        پکیج انتخاب شده
                      </div>
                      <h3 className="text-xl font-bold text-white font-morabbaReg">
                        {selectedPackage.name}
                      </h3>
                    </div>
                    {workoutPlan && (
                      <button
                        type="button"
                        onClick={handleDeletePlan}
                        className="bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-bold"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف کل برنامه تمرینی
                      </button>
                    )}
                  </div>

                  {!workoutPlan ? (
                    <CreatePlanForm
                      selectedPackage={selectedPackage}
                      onSuccess={() => mutatePlan()}
                    />
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                      {isEditingPlanInfo ? (
                        <EditPlanInfoForm
                          workoutPlan={workoutPlan}
                          onSuccess={() => {
                            mutatePlan();
                            setIsEditingPlanInfo(false);
                          }}
                          onCancel={() => setIsEditingPlanInfo(false)}
                        />
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 font-morabbaReg">
                              {workoutPlan.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
                              {workoutPlan.description || "بدون توضیحات اضافی"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsEditingPlanInfo(true)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 p-2 rounded-lg transition-all cursor-pointer"
                            title="ویرایش مشخصات برنامه"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {workoutPlan && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            روزهای تمرینی
                          </span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setShowAddDropdown(!showAddDropdown)
                              }
                              className="bg-amber-500/10 hover:bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>افزودن جدید</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${showAddDropdown ? "rotate-180" : ""}`}
                              />
                            </button>

                            {showAddDropdown && (
                              <div className="absolute left-0 mt-2 w-36 bg-neutral-900 border border-white/10 rounded-lg shadow-xl py-1.5 z-20">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleCreateWeek();
                                    setShowAddDropdown(false);
                                  }}
                                  className="w-full text-right px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5 text-purple-400" />
                                  <span>هفته ی جدید</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={!activeWeek}
                                  onClick={() => {
                                    setEditingDay(null);
                                    setShowDayForm(true);
                                    setShowAddDropdown(false);
                                  }}
                                  className="w-full text-right px-4 py-2 text-xs text-white/80 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                                  <span>روز جدید</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-white font-bold text-sm">
                            هفته‌های تمرینی
                          </h4>
                          <WorkoutWeeksList
                            workoutWeeks={workoutWeeks}
                            selectedWeek={activeWeek}
                            onSelectWeek={handleWeekSelect}
                            onDeleteWeek={handleDeleteWeek}
                          />
                        </div>

                        {showDayForm && activeWeek && (
                          <WorkoutDayForm
                            editingDay={editingDay}
                            workoutPlanId={activeWeek._id}
                            onSuccess={handleDaySuccess}
                            onCancel={() => {
                              setShowDayForm(false);
                              setEditingDay(null);
                            }}
                            defaultSortOrder={workoutDays.length + 1}
                          />
                        )}

                        <WorkoutDaysList
                          workoutDays={workoutDays}
                          selectedDay={selectedDay}
                          onSelectDay={(day) => setSelectedDay(day)}
                          onEditDay={(day) => {
                            setEditingDay(day);
                            setShowDayForm(true);
                          }}
                          onDeleteDay={handleDeleteDay}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-4">
                        {!selectedDay ? (
                          <div className="h-[300px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/40 p-8 text-center bg-white/5">
                            <Dumbbell className="w-10 h-10 mb-3 text-white/20" />
                            <p className="text-sm">
                              جهت مشاهده تمرینات، یک روز را انتخاب کنید
                            </p>
                          </div>
                        ) : (
                          <WorkoutExercisesSection
                            selectedDay={selectedDay}
                            exercises={exercises}
                            videos={videos}
                            onFetchExercises={() => mutateExercises()}
                            onDeleteExercise={handleDeleteExercise}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {watchingVideo && (
          <VideoPlayerModal
            video={watchingVideo}
            onClose={() => setWatchingVideo(null)}
          />
        )}
      </div>
    </div>
  );
}
