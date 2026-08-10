import { Suspense } from "react";
import type { Metadata } from "next";
import NutritionPageContent from "@/modules/dashboard/nutrition/NutritionContent";

export const metadata: Metadata = {
  title: "استار فیت | مدیریت تغذیه و کالری‌شمار روزانه",
  description:
    "ثبت روزانه وعده‌های غذایی، کنترل کالری دریافتی، پروتئین و هیدراتاسیون بدن در استار فیت",
};

export default function NutritionPage() {
  return (
    <Suspense fallback={null}>
      <NutritionPageContent />
    </Suspense>
  );
}
