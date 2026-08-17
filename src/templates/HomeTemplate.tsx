import HeroSection from "@/features/home/HeroSection";
import FAQ from "@/features/home/FAQ";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import WorkoutPlans from "@/features/home/WorkoutPlans";
import LatestArticles from "@/features/home/LatestArticles";
import Testimonials from "@/features/home/Testimonials";

export default function HomeTemplate() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <WorkoutPlans />
      <LatestArticles />
      <Testimonials />
      <FAQ />
    </>
  );
}
