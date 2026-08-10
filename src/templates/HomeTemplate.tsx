import HeroSection from "@/modules/home/HeroSection";
import FAQ from "@/modules/home/FAQ";
import WhyChooseUs from "@/modules/home/WhyChooseUs";
import Testimonials from "@/modules/home/Testimonials";
import WorkoutPlans from "@/modules/home/WorkoutPlans";
import LatestArticles from "@/modules/home/LatestArticles";
import LiveStats from "@/modules/home/LiveStats";

export default function HomeTemplate() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <WorkoutPlans />
      <Testimonials />
      <LatestArticles />
      <LiveStats />
      <FAQ />
    </>
  );
}
