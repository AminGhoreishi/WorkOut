import {
  Dumbbell,
  Calendar,
  CheckCircle,
  PlayCircle,
  Download,
  Clock,
} from "lucide-react";

export default function WorkoutProgram({
  plan,
  days,
}: {
  plan: any;
  days: any;
}) {
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
              <p className="text-neutral-400">{plan.description} - ۳ ماهه</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md">
                <Download className="w-5 h-5 text-neutral-950" />
                دانلود PDF
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-all cursor-pointer">
                <PlayCircle className="w-5 h-5 text-amber-400" />
                ویدیوها
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">هفته جاری</div>
              <div className="text-3xl font-bold text-white ss02 font-sans">۴ / ۱۲</div>
            </div>
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">تمرینات انجام شده</div>
              <div className="text-3xl font-bold text-amber-400 ss02 font-sans">۱۸</div>
            </div>
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">میانگین مدت تمرین</div>
              <div className="text-3xl font-bold text-white ss02 font-sans">۶۵ دقیقه</div>
            </div>
            <div className="bg-white/[0.03] border border-amber-500/15 rounded-xl p-6">
              <div className="text-neutral-400 mb-2 text-xs">پیشرفت کلی</div>
              <div className="text-3xl font-bold text-amber-400 ss02 font-sans">۷۵٪</div>
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
            {days.map((day: any, index: number) => (
              <div
                key={index}
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
                    {day.exercises.length > 0 && (
                      <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold px-6 py-2 rounded-xl transition-all cursor-pointer shadow-md">
                        <CheckCircle className="w-5 h-5 text-neutral-950" />
                        تمرین انجام شد
                      </button>
                    )}
                  </div>
                </div>

                {day.exercises.length > 0 ? (
                  <div className="p-6">
                    <div className="space-y-4">
                      {day.exercises.map((exercise: any, exIndex: number) => (
                        <div
                          key={exIndex}
                          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="text-white font-medium mb-1">
                              {exercise.name}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-400 font-sans">
                              <span className="flex items-center gap-1">
                                <Dumbbell className="w-4 h-4 text-amber-400" />
                                {exercise.sets}
                              </span>
                              <span>{exercise.reps}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-amber-400" />
                                استراحت: {exercise.restSec}
                              </span>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm cursor-pointer">
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
