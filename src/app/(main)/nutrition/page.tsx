import { Suspense } from "react";
import type { Metadata } from "next";
import NutritionPageContent from "@/features/dashboard/nutrition/NutritionContent";
import NutritionSkeleton from "@/features/dashboard/nutrition/NutritionSkeleton";

export const metadata: Metadata = {
  title: "استار فیت | مدیریت تغذیه و کالری‌شمار روزانه",
  description:
    "ثبت روزانه وعده‌های غذایی، کنترل کالری دریافتی، پروتئین و هیدراتاسیون بدن در استار فیت",
};

export default function NutritionPage() {
  return (
    <Suspense fallback={<NutritionSkeleton />}>
      <NutritionPageContent />
    </Suspense>
  );
}
