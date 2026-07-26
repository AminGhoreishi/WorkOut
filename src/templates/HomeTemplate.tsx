import HeroSection from "@/modules/home/HeroSection";
import FAQ from "@/modules/home/FAQ";
import WhyChooseUs from "@/modules/home/WhyChooseUs";
import WorkoutPlans from "@/modules/home/WorkoutPlans";
import Testimonials from "@/modules/home/Testimonials";
import LiveStats from "@/modules/home/LiveStats";
import LatestArticles from "@/modules/home/LatestArticles";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { HomeTemplateProps } from "@/types/components";

export default function HomeTemplate({ articles, stats }: HomeTemplateProps) {
  return (
    <>
      <ScrollReveal direction="up" duration={0.6}>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <WhyChooseUs />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <WorkoutPlans />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <LatestArticles articles={articles} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <LiveStats stats={stats} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <FAQ />
      </ScrollReveal>
    </>
  );
}
