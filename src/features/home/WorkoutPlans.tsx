import { Suspense } from "react";
import WorkoutPlansCardsSection from "./WorkoutPlansCardsSection";
import WorkoutPlansCardsSkeleton from "./WorkoutPlansCardsSkeleton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function WorkoutPlans() {
  return (
    <section className="relative py-10 sm:py-12 md:py-14 lg:py-16 font-danaMed" dir="rtl">
      <div className="container mx-auto">
        <ScrollReveal direction="down" duration={0.6}>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-morabbaReg">
              برنامه‌های تمرینی{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                ویژه و طلایی
              </span>
            </h2>
            <p className="text-neutral-400 text-lg max-sm:text-xs">
              برنامه خود را بر اساس هدف و سطح انتخاب کنید
            </p>
          </div>
        </ScrollReveal>
        <Suspense fallback={<WorkoutPlansCardsSkeleton />}>
          <WorkoutPlansCardsSection />
        </Suspense>
      </div>
    </section>
  );
}
