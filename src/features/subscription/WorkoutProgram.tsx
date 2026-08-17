import Link from "next/link";
import {
  Dumbbell,
  Calendar,
  CheckCircle,
  PlayCircle,
  Clock,
  Utensils,
} from "lucide-react";
import type { WorkoutPlanProps } from "@/types/workout";

export default function WorkoutProgram({
  plan,
  days = [],
}: WorkoutPlanProps) {
  if (!plan) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white font-danaMed flex items-center justify-center p-8" dir="rtl">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-md">
          <Dumbbell className="w-12 h-12 text-amber-400/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2 font-morabbaReg">برنامه تمرینی یافت نشد</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">در حال حاضر برنامه تمرینی فعال برای این حساب کاربری تعریف نشده است.</p>
        </div>
      </div>
    );
  }

  const safeDays = Array.isArray(days) ? days : [];

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white font-danaMed"
      dir="rtl"
    >
      <section className="py-12 bg-black/40 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-morabbaReg">
                {plan.title}
              </h1>
              <p className="text-neutral-400">{plan.description || "برنامه اختصاصی تناسب اندام"}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/dashboard/meal-plans"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                <Utensils className="w-5 h-5 text-neutral-950" />
                <span>برنامه غذایی</span>
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-all cursor-pointer font-bold"
              >
                <PlayCircle className="w-5 h-5 text-amber-400" />
                ویدیوها
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">هفته جاری</div>
              <div className="text-3xl font-bold text-white ss02">۴ / ۱۲</div>
            </div>
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">تمرینات انجام شده</div>
              <div className="text-3xl font-bold text-amber-400 ss02">۱۸</div>
            </div>
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">میانگین مدت تمرین</div>
              <div className="text-3xl font-bold text-white ss02">۶۵ دقیقه</div>
            </div>
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">پیشرفت کلی</div>
              <div className="text-3xl font-bold text-amber-400 ss02">۷۵٪</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-morabbaReg">
            برنامه هفتگی
          </h2>

          <div className="space-y-6">
            {safeDays.map((day, index) => {
              const exercises = Array.isArray(day.exercises) ? day.exercises : [];
              return (
                <div
                  key={day._id || index}
                  className="bg-white/[0.03] ss02 border border-amber-500/15 rounded-xl overflow-hidden"
                >
                  <div className="bg-amber-500/10 p-6 border-b border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                          <Calendar className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white font-morabbaReg">
                            {day.dayName}
                          </h3>
                          <p className="text-neutral-400 text-sm">{day.muscleGroup}</p>
                        </div>
                      </div>
                      {exercises.length > 0 && (
                        <button
                          type="button"
                          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold px-6 py-2 rounded-xl transition-all cursor-pointer shadow-md text-xs"
                        >
                          <CheckCircle className="w-4 h-4 text-neutral-950" />
                          تمرین انجام شد
                        </button>
                      )}
                    </div>
                  </div>

                  {exercises.length > 0 ? (
                    <div className="p-6">
                      <div className="space-y-4">
                        {exercises.map((exercise, exIndex) => (
                          <div
                            key={exercise._id || exIndex}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">
                                {exercise.name}
                              </h4>
                              <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                                <span className="flex items-center gap-1">
                                  <Dumbbell className="w-4 h-4 text-amber-400" />
                                  {exercise.sets} ست
                                </span>
                                <span>{exercise.reps} تکرار</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4 text-amber-400" />
                                  استراحت: {exercise.restSec} ثانیه
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm cursor-pointer"
                            >
                              <PlayCircle className="w-5 h-5" />
                              <span>تماشای ویدیو</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-neutral-400">
                      امروز روز استراحت است. می‌توانید کاردیوی سبک انجام دهید.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
