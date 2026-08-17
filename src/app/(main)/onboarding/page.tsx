import { Suspense } from "react";
import type { Metadata } from "next";
import OnboardingPageContent from "@/features/onboarding/OnboardingContent";
import OnboardingSkeleton from "@/features/onboarding/OnboardingSkeleton";

export const metadata: Metadata = {
  title: "استار فیت | تکمیل مشخصات ورزشی",
  description:
    "برای شخصی‌سازی برنامه‌های ورزشی و تغذیه، لطفاً مشخصات فیزیکی و ورزشی خود را در این بخش تکمیل کنید.",
};

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingSkeleton />}>
      <OnboardingPageContent />
    </Suspense>
  );
}
