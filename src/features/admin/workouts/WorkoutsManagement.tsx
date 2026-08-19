"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import { showAlert, showConfirm } from "@/utils/alert";
import {
  Plus,
  Edit,
  Trash2,
  Dumbbell,
  Package,
  ChevronDown,
  Users,
  Search,
  X,
} from "lucide-react";
import type {
  PackageInfo,
  UserInfo,
  WorkoutPlan,
  WorkoutWeekInfo,
  WorkoutDay,
  VideoInfo,
  WorkoutExercise,
  SubscriptionItem,
} from "@/types/workout";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import WorkoutDayForm from "./WorkoutDayForm";
import WorkoutExercisesSection from "./WorkoutExercisesSection";
import EditPlanInfoForm from "./EditPlanInfoForm";
import WorkoutWeeksList from "./WorkoutWeeksList";
import WorkoutDaysList from "./WorkoutDaysList";
import CreatePlanForm from "./CreatePlanForm";
import UserSearchInput from "./UserSearchInput";
import AddWorkoutDropdown from "./AddWorkoutDropdown";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EMPTY_ARRAY: any[] = [];

export default function WorkoutsManagement() {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<WorkoutWeekInfo | null>(null);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);

  const [isEditingPlanInfo, setIsEditingPlanInfo] = useState(false);
  const [showDayForm, setShowDayForm] = useState(false);
  const [editingDay, setEditingDay] = useState<WorkoutDay | null>(null);
  const [watchingVideo, setWatchingVideo] = useState<VideoInfo | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  const { data: pkgData, isLoading: loadingPackages } = useSWR(
    "/api/admin/package",
    fetcher
  );
  const packages: PackageInfo[] = pkgData?.packages ?? EMPTY_ARRAY;

  const { data: vidData } = useSWR("/api/admin/video", fetcher);
  const videos: VideoInfo[] = vidData?.videos ?? EMPTY_ARRAY;

  const { data: subsData, isLoading: loadingSubs } = useSWR(
    selectedPackage
      ? `/api/admin/subscription?packageId=${selectedPackage._id}&limit=100`
      : null,
    fetcher
  );
  const packageSubscriptions: SubscriptionItem[] = subsData?.subscriptions ?? EMPTY_ARRAY;

  const { data: monthData, mutate: mutatePlan, isLoading: loadingPlan } = useSWR(
    selectedPackage
      ? selectedUser
        ? `/api/admin/subscription/workout-plans?packageId=${selectedPackage._id}&userId=${selectedUser._id}`
        : `/api/admin/subscription/workout-plans?packageId=${selectedPackage._id}`
      : null,
    fetcher
  );
  const workoutPlan: WorkoutPlan | null =
    monthData?.plans && monthData.plans.length > 0 ? monthData.plans[0] : null;

  const { data: weeksData, mutate: mutateWeeks } = useSWR(
    selectedPackage && workoutPlan
      ? `/api/admin/subscription/workout-week?planId=${workoutPlan._id}`
      : null,
    fetcher
  );
  const workoutWeeks: WorkoutWeekInfo[] = weeksData?.weeks ?? EMPTY_ARRAY;

  const activeWeek = selectedWeek || (workoutWeeks.length > 0 ? workoutWeeks[0] : null);

  const { data: daysData, mutate: mutateDays } = useSWR(
    activeWeek
      ? `/api/admin/subscription/workout-days?planId=${activeWeek._id}`
      : null,
    fetcher
  );
  const workoutDays: WorkoutDay[] = daysData?.days ?? EMPTY_ARRAY;

  const { data: exercisesData, mutate: mutateExercises } = useSWR(
    selectedDay
      ? `/api/admin/subscription/workout-exercises?dayId=${selectedDay._id}`
      : null,
    fetcher
  );
  const exercises: WorkoutExercise[] = exercisesData?.exercises ?? EMPTY_ARRAY;

  const handleDeleteWeek = useCallback(async (id: string) => {
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
  }, [selectedWeek, mutateWeeks]);

  const handleSelectPackage = useCallback((pkg: PackageInfo) => {
    setSelectedPackage(pkg);
    setSelectedWeek(null);
    setSelectedDay(null);
    setShowDayForm(false);
  }, []);

  const handleDeletePlan = useCallback(async () => {
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
        `/api/admin/subscription/workout-plans?id=${workoutPlan._id}`,
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
  }, [workoutPlan, mutatePlan, mutateWeeks, mutateDays]);

  const handleDaySuccess = useCallback(() => {
    mutateDays();
    setShowDayForm(false);
    setEditingDay(null);
  }, [mutateDays]);

  const handleWeekSelect = useCallback((week: WorkoutWeekInfo) => {
    setSelectedWeek(week);
    setSelectedDay(null);
    setShowDayForm(false);
  }, []);

  const handleAddNewDay = useCallback(() => {
    setEditingDay(null);
    setShowDayForm(true);
  }, []);

  const handleWeekCreated = useCallback(() => {
    mutateWeeks();
  }, [mutateWeeks]);

  const handleSelectDay = useCallback((day: WorkoutDay | null) => {
    setSelectedDay(day);
  }, []);

  const handleEditDay = useCallback((day: WorkoutDay) => {
    setEditingDay(day);
    setShowDayForm(true);
  }, []);

  const handleDayDeleted = useCallback(() => {
    mutateDays();
  }, [mutateDays]);

  const handleFetchExercises = useCallback(() => {
    mutateExercises();
  }, [mutateExercises]);

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
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${isSelected ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-400 text-white shadow-lg" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`}
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
                      <div className="text-xs text-amber-400 font-bold mb-1 flex items-center gap-2">
                        <span>پکیج انتخاب شده</span>
                        <span className="bg-amber-500/20 text-amber-300 text-[11px] px-2 py-0.5 rounded-full font-semibold ss02">
                          {packageSubscriptions.length} کاربر دارای اشتراک
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white font-morabbaReg">
                        {selectedPackage.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      <UserSearchInput setSelectedUser={setSelectedUser} />
                      {workoutPlan && (
                        <button
                          type="button"
                          onClick={handleDeletePlan}
                          className="bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-bold shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>حذف کل برنامه تمرینی</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!workoutPlan ? (
                    <CreatePlanForm
                      selectedPackage={selectedPackage}
                      selectedUser={selectedUser}
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
                          <AddWorkoutDropdown
                            packageId={selectedPackage._id}
                            workoutPlanId={workoutPlan._id}
                            userId={selectedUser?._id}
                            hasActiveWeek={Boolean(activeWeek)}
                            onWeekCreated={handleWeekCreated}
                            onAddNewDay={handleAddNewDay}
                          />
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
                            userId={selectedUser?._id}
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
                          onSelectDay={handleSelectDay}
                          onEditDay={handleEditDay}
                          onDayDeleted={handleDayDeleted}
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
                            onFetchExercises={handleFetchExercises}
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
