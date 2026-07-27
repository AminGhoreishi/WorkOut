import { BiCheckCircle, BiTrendingUp } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

export default function WorkoutPlans() {
  const workoutPlans = [
    {
      title: "برنامه افزایش حجم",
      description: "برای کسانی که به دنبال رشد عضلانی هستند",
      duration: "۱۲ هفته",
      level: "متوسط تا پیشرفته",
      icon: "💪",
      features: [
        "۵ روز تمرین در هفته",
        "تمرکز روی وزنه‌های آزاد",
        "برنامه غذایی پرکالری",
      ],
    },
    {
      title: "برنامه کاهش وزن",
      description: "چربی‌سوزی و لاغری با حفظ عضلات",
      duration: "۸ هفته",
      level: "همه سطوح",
      icon: "🔥",
      features: [
        "ترکیب کاردیو و قدرتی",
        "برنامه غذایی کم‌کالری",
        "تمرینات HIIT",
      ],
    },
    {
      title: "برنامه تناسب اندام",
      description: "برای تقویت عمومی بدن و سلامتی",
      duration: "۱۰ هفته",
      level: "مبتدی تا متوسط",
      icon: "⚡",
      features: [
        "۴ روز تمرین در هفته",
        "تمرینات کاربردی",
        "انعطاف‌پذیری و توازن",
      ],
    },
  ];

  return (
    <section className="py-20 font-danaMed relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            برنامه‌های تمرینی{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              ویژه و طلایی
            </span>
          </h2>
          <p className="text-neutral-400 text-lg">
            برنامه خود را بر اساس هدف و سطح انتخاب کنید
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {workoutPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:scale-105 hover:border-amber-400/50 shadow-[0_0_20px_rgba(234,179,8,0.05)] flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl mb-6">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3 hover:text-amber-300 transition-colors">
                  {plan.title}
                </h3>
                <p className="text-neutral-400 mb-6">{plan.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-neutral-300 text-sm">
                    <BsClock className="w-4 h-4 text-amber-400" />
                    <span>مدت: {plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300 text-sm">
                    <BiTrendingUp className="w-4 h-4 text-amber-400" />
                    <span>سطح: {plan.level}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-neutral-300 text-sm"
                    >
                      <BiCheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 hover:from-amber-500 hover:to-yellow-500 text-amber-300 hover:text-neutral-950 font-bold border border-amber-500/40 py-3 rounded-xl transition-all shadow-sm hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                مشاهده جزئیات
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
