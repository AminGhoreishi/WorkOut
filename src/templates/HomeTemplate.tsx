import HeroSection from "@/modules/home/HeroSection";
import FAQ from "@/modules/home/FAQ";
import WhyChooseUs from "@/modules/home/WhyChooseUs";
import WorkoutPlans from "@/modules/home/WorkoutPlans";
import LatestArticles from "@/modules/home/LatestArticles";
import Testimonials from "@/modules/home/Testimonials";

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
