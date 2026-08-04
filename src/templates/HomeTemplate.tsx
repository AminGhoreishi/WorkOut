import HeroSection from "@/modules/home/HeroSection";
import FAQ from "@/modules/home/FAQ";
import WhyChooseUs from "@/modules/home/WhyChooseUs";
import WorkoutPlans from "@/modules/home/WorkoutPlans";
import Testimonials from "@/modules/home/Testimonials";
import LiveStats from "@/modules/home/LiveStats";
import LatestArticles from "@/modules/home/LatestArticles";
import type { HomeTemplateProps } from "@/types/components";

export default function HomeTemplate({ articles, stats, plans }: HomeTemplateProps) {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <WorkoutPlans plans={plans} />
      <Testimonials />
      <LatestArticles articles={articles} />
      <LiveStats stats={stats} />
      <FAQ />
    </>
  );
}
