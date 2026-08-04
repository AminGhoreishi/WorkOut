"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Dumbbell } from "lucide-react";
import type {
  WorkoutPlan,
  WorkoutDay,
  WorkoutExercise,
  WorkoutPlanFormInputs,
  WorkoutDayFormInputs,
  WorkoutExerciseFormInputs,
  WorkoutPlanModalProps,
} from "@/types/workout";
import { showAlert, showConfirm } from "@/utils/alert";

export default function WorkoutPlanModal({
  selectedPackageForPlan,
  onClose,
  videos,
}: WorkoutPlanModalProps) {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);

  const [isEditingPlanInfo, setIsEditingPlanInfo] = useState(false);
  const [showDayForm, setShowDayForm] = useState(false);
  const [editingDay, setEditingDay] = useState<WorkoutDay | null>(null);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] =
    useState<WorkoutExercise | null>(null);

  const {
    register: registerPlan,
    handleSubmit: handleSubmitPlan,
    reset: resetPlan,
  } = useForm<WorkoutPlanFormInputs>();

  const {
    register: registerDay,
    handleSubmit: handleSubmitDay,
    reset: resetDay,
  } = useForm<WorkoutDayFormInputs>();

  const {
    register: registerExercise,
    handleSubmit: handleSubmitExercise,
    reset: resetExercise,
  } = useForm<WorkoutExerciseFormInputs>();

  const getVideoLevelBadge = (level?: string) => {
    if (!level) return null;
    const styles: Record<string, string> = {
      beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      advanced: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    const labels: Record<string, string> = {
      beginner: "مبتدی",
      intermediate: "متوسط",
      advanced: "حرفه‌ای",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded border text-[10px] ${styles[level] || styles.beginner}`}
      >
        {labels[level]}
      </span>
    );
  };

  const fetchDays = async (planId: string) => {
    try {
      const res = await fetch(
        `/api/admin/subscription/workout-days?planId=${planId}`
      );
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setWorkoutDays(data.days || []);
      }
    } catch {
      setWorkoutDays([]);
    }
  };

  useEffect(() => {
    const fetchInitialPlan = async () => {
      try {
        const res = await fetch(
          `/api/admin/subscription/workout-plans?packageId=${selectedPackageForPlan._id}`
        );
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          const plan = data.plans && data.plans.length > 0 ? data.plans[0] : null;
          if (plan) {
            setWorkoutPlan(plan);
            resetPlan({
              title: plan.title,
              description: plan.description || "",
            });
            fetchDays(plan._id);
          } else {
            setWorkoutPlan(null);
            setWorkoutDays([]);
            setSelectedDay(null);
            setExercises([]);
            resetPlan({
              title: `برنامه تمرینی ${selectedPackageForPlan.name}`,
              description: "",
            });
          }
        }
      } catch {
        setWorkoutPlan(null);
      }
    };
    fetchInitialPlan();
  }, [selectedPackageForPlan, resetPlan]);

  const handleCreatePlan = async (data: WorkoutPlanFormInputs) => {
    try {
      const res = await fetch("/api/admin/subscription/workout-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedPackageForPlan._id,
          title: data.title,
          description: data.description,
        }),
      });
      if (res.ok) {
        const resData = await res.json().catch(() => ({}));
        setWorkoutPlan(resData.plan);
        showAlert({
          title: "موفقیت",
          text: "برنامه تمرینی با موفقیت ایجاد شد",
          icon: "success",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در ایجاد برنامه",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ایجاد برنامه",
        icon: "error",
      });
    }
  };

  const handleUpdatePlan = async (data: WorkoutPlanFormInputs) => {
    if (!workoutPlan) return;
    try {
      const res = await fetch("/api/admin/subscription/workout-plans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: workoutPlan._id,
          title: data.title,
          description: data.description,
        }),
      });
      if (res.ok) {
        const resData = await res.json().catch(() => ({}));
        setWorkoutPlan(resData.plan);
        setIsEditingPlanInfo(false);
        showAlert({
          title: "موفقیت",
          text: "برنامه تمرینی با موفقیت بروزرسانی شد",
          icon: "success",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در بروزرسانی برنامه",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در بروزرسانی برنامه",
        icon: "error",
      });
    }
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
        `/api/admin/subscription/workout-plans?id=${workoutPlan._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setWorkoutPlan(null);
        setWorkoutDays([]);
        setSelectedDay(null);
        setExercises([]);
        showAlert({
          title: "موفقیت",
          text: "برنامه تمرینی با موفقیت حذف شد",
          icon: "success",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در حذف برنامه",
          icon: "error",
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

  const handleDaySubmit = async (data: WorkoutDayFormInputs) => {
    if (!workoutPlan) return;
    if (!data.dayName?.trim() || !data.muscleGroup?.trim()) {
      showAlert({
        title: "خطا",
        text: "پر کردن نام روز و گروه عضلانی الزامی است.",
        icon: "error",
      });
      return;
    }
    try {
      if (editingDay) {
        const res = await fetch("/api/admin/subscription/workout-days", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingDay._id,
            dayName: data.dayName,
            muscleGroup: data.muscleGroup,
            sortOrder: Number(data.sortOrder),
          }),
        });
        if (res.ok) {
          fetchDays(workoutPlan._id);
          setShowDayForm(false);
          setEditingDay(null);
          if (selectedDay?._id === editingDay._id) {
            setSelectedDay({
              ...selectedDay,
              dayName: data.dayName,
              muscleGroup: data.muscleGroup,
              sortOrder: Number(data.sortOrder),
            });
          }
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در ویرایش روز",
            icon: "error",
          });
        }
      } else {
        const res = await fetch("/api/admin/subscription/workout-days", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: workoutPlan._id,
            dayName: data.dayName,
            muscleGroup: data.muscleGroup,
            sortOrder: Number(data.sortOrder),
          }),
        });
        if (res.ok) {
          fetchDays(workoutPlan._id);
          setShowDayForm(false);
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در ثبت روز جدید",
            icon: "error",
          });
        }
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ثبت اطلاعات روز",
        icon: "error",
      });
    }
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
          setExercises([]);
        }
        if (workoutPlan) fetchDays(workoutPlan._id);
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در حذف روز",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در حذف روز تمرینی",
        icon: "error",
      });
    }
  };

  const fetchExercises = async (dayId: string) => {
    try {
      const res = await fetch(
        `/api/admin/subscription/workout-exercises?dayId=${dayId}`
      );
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setExercises(data.exercises || []);
      }
    } catch {
      setExercises([]);
    }
  };

  const handleExerciseSubmit = async (data: WorkoutExerciseFormInputs) => {
    if (!selectedDay) return;
    try {
      if (editingExercise) {
        const res = await fetch("/api/admin/subscription/workout-exercises", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingExercise._id,
            name: data.name,
            sets: Number(data.sets),
            reps: data.reps,
            restSec: Number(data.restSec),
            videoId: data.videoId || null,
            videoId2: data.videoId2 || null,
            sortOrder: Number(data.sortOrder),
          }),
        });
        if (res.ok) {
          fetchExercises(selectedDay._id);
          setShowExerciseForm(false);
          setEditingExercise(null);
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در ویرایش حرکت",
            icon: "error",
          });
        }
      } else {
        const res = await fetch("/api/admin/subscription/workout-exercises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayId: selectedDay._id,
            name: data.name,
            sets: Number(data.sets),
            reps: data.reps,
            restSec: Number(data.restSec),
            videoId: data.videoId || undefined,
            videoId2: data.videoId2 || undefined,
            sortOrder: Number(data.sortOrder),
          }),
        });
        if (res.ok) {
          fetchExercises(selectedDay._id);
          setShowExerciseForm(false);
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در افزودن حرکت",
            icon: "error",
          });
        }
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در ثبت اطلاعات حرکت",
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
        if (selectedDay) fetchExercises(selectedDay._id);
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در حذف حرکت",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در حذف حرکت تمرینی",
        icon: "error",
      });
    }
  };

  const handleStartEditPlan = () => {
    if (workoutPlan) {
      resetPlan({
        title: workoutPlan.title,
        description: workoutPlan.description || "",
      });
      setIsEditingPlanInfo(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-danaMed" dir="rtl">
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              پکیج: {selectedPackageForPlan.name}
            </span>
            <h2 className="text-2xl text-white font-bold mt-2 font-morabbaReg">
              مدیریت برنامه تمرینی
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 text-white/80 p-2 rounded-lg transition-colors border border-white/10 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 min-h-0">
          <div className="w-full lg:w-80 flex flex-col gap-4 border-l border-white/10 pl-0 lg:pl-6">
            {!workoutPlan ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-4">
                  برنامه تمرینی برای این پکیج ثبت نشده است.
                </p>
                <form
                  onSubmit={handleSubmitPlan(handleCreatePlan)}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    {...registerPlan("title", { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-amber-400"
                    placeholder="عنوان برنامه..."
                    required
                  />
                  <textarea
                    {...registerPlan("description")}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-amber-400 resize-none h-16"
                    placeholder="توضیحات برنامه..."
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold py-2 rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-colors text-xs cursor-pointer"
                  >
                    ایجاد برنامه تمرینی
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative">
                {isEditingPlanInfo ? (
                  <form
                    onSubmit={handleSubmitPlan(handleUpdatePlan)}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      {...registerPlan("title", { required: true })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400"
                      required
                    />
                    <textarea
                      {...registerPlan("description")}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400 resize-none h-16"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 text-white py-1 rounded text-xs hover:bg-emerald-700 cursor-pointer"
                      >
                        ذخیره
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingPlanInfo(false)}
                        className="flex-1 bg-white/5 border border-white/10 text-white py-1 rounded text-xs cursor-pointer"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-sm truncate pr-16 font-morabbaReg">
                        {workoutPlan.title}
                      </h3>
                      <div className="absolute top-4 left-4 flex gap-1">
                        <button
                          type="button"
                          onClick={handleStartEditPlan}
                          className="text-blue-400 hover:bg-blue-500/15 p-1 rounded cursor-pointer"
                          title="ویرایش توضیحات برنامه"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleDeletePlan}
                          className="text-red-400 hover:bg-red-500/15 p-1 rounded cursor-pointer"
                          title="حذف برنامه تمرینی"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed whitespace-pre-wrap">
                      {workoutPlan.description || "بدون توضیحات اضافی"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {workoutPlan && (
              <div className="flex-1 flex flex-col min-h-[300px]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-bold text-sm">
                    روزهای تمرین
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingDay(null);
                      resetDay({
                        dayName: `روز ${workoutDays.length + 1}`,
                        muscleGroup: "",
                        sortOrder: workoutDays.length + 1,
                      });
                      setShowDayForm(true);
                    }}
                    className="bg-amber-500/10 hover:bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    روز جدید
                  </button>
                </div>

                {showDayForm && (
                  <form
                    onSubmit={handleSubmitDay(handleDaySubmit)}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3 space-y-2.5"
                  >
                    <div className="text-white font-bold text-xs">
                      {editingDay ? "ویرایش روز تمرین" : "ثبت روز جدید"}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="نام روز (سینه / سرشانه / ...)"
                        {...registerDay("dayName", { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="گروه عضلانی (مثلا: سینه، سرشانه، پا)"
                        {...registerDay("muscleGroup", { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="ترتیب نمایش"
                        {...registerDay("sortOrder", { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1 rounded text-xs cursor-pointer"
                      >
                        {editingDay ? "بروزرسانی" : "افزودن"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowDayForm(false);
                          setEditingDay(null);
                        }}
                        className="flex-1 bg-white/10 hover:bg-white/15 text-white py-1 rounded text-xs cursor-pointer"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2 overflow-y-auto max-h-[350px]">
                  {workoutDays.length === 0 ? (
                    <div className="text-white/40 text-center text-xs p-6 border border-dashed border-white/10 rounded-lg">
                      روزی ثبت نشده است
                    </div>
                  ) : (
                    workoutDays.map((day) => (
                      <div
                        key={day._id}
                        onClick={() => {
                          setSelectedDay(day);
                          setExercises([]);
                          fetchExercises(day._id);
                          setShowExerciseForm(false);
                        }}
                        className={`p-3 rounded-lg border text-right cursor-pointer transition-all flex items-center justify-between ${ selectedDay?._id === day._id ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20" : "bg-white/5 border-white/10 text-white hover:bg-white/10" }`}
                      >
                        <div>
                          <div className="font-semibold text-xs">
                            {day.dayName}
                          </div>
                          <div
                            className={`text-[10px] ${selectedDay?._id === day._id ? "text-neutral-900" : "text-white/50"}`}
                          >
                            عضله هدف: {day.muscleGroup}
                          </div>
                        </div>
                        <div
                          className="flex gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setEditingDay(day);
                              resetDay({
                                dayName: day.dayName,
                                muscleGroup: day.muscleGroup,
                                sortOrder: day.sortOrder,
                              });
                              setShowDayForm(true);
                            }}
                            className={`p-1 rounded cursor-pointer ${selectedDay?._id === day._id ? "hover:bg-black/10 text-neutral-900" : "hover:bg-white/5 text-blue-400"}`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteDay(day._id)}
                            className={`p-1 rounded cursor-pointer ${selectedDay?._id === day._id ? "hover:bg-black/10 text-neutral-900" : "hover:bg-white/5 text-red-400"}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col min-h-[300px]">
            {!selectedDay ? (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/40">
                <Dumbbell className="w-12 h-12 mb-3 text-white/20" />
                <p className="text-sm">
                  برای مدیریت و مشاهده تمرینات، یک روز را از ستون کناری انتخاب کنید
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-white font-bold text-sm block">
                      تمرین‌های {selectedDay.dayName}
                    </span>
                    <span className="text-xs text-white/50">
                      گروه هدف: {selectedDay.muscleGroup}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingExercise(null);
                      resetExercise({
                        name: "",
                        sets: 3,
                        reps: "12-10-8",
                        restSec: 60,
                        videoId: "",
                        videoId2: "",
                        sortOrder: exercises.length + 1,
                      });
                      setShowExerciseForm(true);
                    }}
                    className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    حرکت تمرینی جدید
                  </button>
                </div>

                {showExerciseForm && (
                  <form
                    onSubmit={handleSubmitExercise(handleExerciseSubmit)}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 space-y-3 text-right"
                  >
                    <div className="text-white font-bold text-xs">
                      {editingExercise
                        ? "ویرایش حرکت ورزشی"
                        : "ثبت حرکت ورزشی جدید"}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-white/70 text-[10px] mb-1">
                          نام حرکت
                        </label>
                        <input
                          type="text"
                          placeholder="مثلا: نشر جانب دمبل ایستاده"
                          {...registerExercise("name", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-[10px] mb-1">
                          ویدیو آموزشی ۱
                        </label>
                        <select
                          {...registerExercise("videoId")}
                          className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="">بدون ویدیو اول</option>
                          {videos.map((vid) => (
                            <option key={vid._id} value={vid._id}>
                              {vid.title} (
                              {getVideoLevelBadge(vid.level)?.props.children ||
                                "مبتدی"}
                              )
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-[10px] mb-1">
                          ویدیو آموزشی ۲ (اختیاری)
                        </label>
                        <select
                          {...registerExercise("videoId2")}
                          className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="">بدون ویدیو دوم</option>
                          {videos.map((vid) => (
                            <option key={vid._id} value={vid._id}>
                              {vid.title} (
                              {getVideoLevelBadge(vid.level)?.props.children ||
                                "مبتدی"}
                              )
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-white/70 text-[10px] mb-1">
                          تعداد ست
                        </label>
                        <input
                          type="number"
                          placeholder="۳"
                          {...registerExercise("sets", {
                            required: true,
                            min: 1,
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400 ss02"
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
                          {...registerExercise("reps", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400 ss02"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-[10px] mb-1">
                          استراحت (ثانیه)
                        </label>
                        <input
                          type="number"
                          placeholder="۶۰"
                          {...registerExercise("restSec", {
                            required: true,
                            min: 0,
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400 ss02"
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
                          {...registerExercise("sortOrder", {
                            required: true,
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400 ss02"
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
                        onClick={() => {
                          setShowExerciseForm(false);
                          setEditingExercise(null);
                        }}
                        className="bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-lg text-xs cursor-pointer"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3 overflow-y-auto max-h-[450px]">
                  {exercises.length === 0 ? (
                    <div className="text-white/40 text-center text-xs p-8 border border-dashed border-white/10 rounded-xl">
                      حرکتی برای این روز ثبت نشده است
                    </div>
                  ) : (
                    exercises.map((ex) => (
                      <div
                        key={ex._id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <div className="font-bold text-sm text-white mb-1">
                            {ex.name}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 ss02">
                            <span>{ex.sets} ست</span>
                            <span>•</span>
                            <span>{ex.reps} تکرار</span>
                            <span>•</span>
                            <span>استراحت: {ex.restSec}s</span>
                            {ex.videoId && (
                              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-danaMed">
                                ویدیو ۱ دارد
                              </span>
                            )}
                            {ex.videoId2 && (
                              <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-danaMed">
                                ویدیو ۲ دارد
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingExercise(ex);
                              resetExercise({
                                name: ex.name,
                                sets: ex.sets,
                                reps: ex.reps,
                                restSec: ex.restSec,
                                videoId: ex.videoId?._id || "",
                                videoId2: ex.videoId2?._id || "",
                                sortOrder: ex.sortOrder,
                              });
                              setShowExerciseForm(true);
                            }}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 p-2 rounded-lg transition-colors cursor-pointer"
                            title="ویرایش"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteExercise(ex._id)}
                            className="bg-white/5 hover:bg-red-500/20 border border-white/10 text-red-400 p-2 rounded-lg transition-colors cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
