import { BiCheckCircle, BiTrendingUp } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import type { WorkoutPlansProps } from "@/types/components";
import { renderPlanIcon } from "@/utils/planIcon";

export default function WorkoutPlansList({ plans }: WorkoutPlansProps) {
  const displayPlans = plans || [];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {displayPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-8 hover:bg-neutral-900 transition-all hover:border-amber-400/50 shadow-[0_0_20px_rgba(234,179,8,0.05)] flex flex-col justify-between"
        >
          <div>
            <div className="mb-6 flex items-center justify-start h-14">
              {renderPlanIcon(plan.icon)}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 hover:text-amber-300 transition-colors font-morabbaReg max-sm:text-lg">
              {plan.title}
            </h3>
            <p className="text-neutral-400 mb-6 text-sm max-sm:text-xs">
              {plan.description}
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-neutral-300 text-sm max-sm:text-xs">
                <BsClock className="w-4 h-4 text-amber-400" />
                <span>مدت: {plan.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-sm max-sm:text-xs">
                <BiTrendingUp className="w-4 h-4 text-amber-400" />
                <span>سطح: {plan.level}</span>
              </div>
            </div>
            <ul className="space-y-2 mb-8">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-neutral-300 text-sm max-sm:text-xs"
                >
                  <BiCheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="w-full bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10 hover:from-amber-500 hover:via-amber-400 hover:to-yellow-500 text-amber-400 hover:text-neutral-950 font-bold border border-amber-500/30 hover:border-amber-400 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] cursor-pointer text-xs"
          >
            مشاهده جزئیات
          </button>
        </div>
      ))}
    </div>
  );
}
