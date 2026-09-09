import HeroSection from "@/features/home/hero/HeroSection";
import FAQ from "@/features/home/faq/FAQ";
import WhyChooseUs from "@/features/home/why-choose-us/WhyChooseUs";
import WorkoutPlans from "@/features/home/workout-plans/WorkoutPlans";
import LatestArticles from "@/features/home/latest-articles/LatestArticles";
import Testimonials from "@/features/home/testimonials/Testimonials";

export default function HomeTemplate() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhyChooseUs />
      <WorkoutPlans />
      <LatestArticles />
      <Testimonials />
      <FAQ />
    </div>
  );
}
