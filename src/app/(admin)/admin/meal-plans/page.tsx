import { Suspense } from "react";
import type { Metadata } from "next";
import MealPlansManagement from "@/modules/admin/meal-plan/MealPlansManagement";

export const metadata: Metadata = {
  title: "مدیریت برنامه‌های غذایی | استار فیت",
  description: "مدیریت، ایجاد و تخصیص برنامه‌های غذایی به پکیج‌های استار فیت",
};

export default function AdminMealPlansPage() {
  return (
    <Suspense fallback={null}>
      <MealPlansManagement />
    </Suspense>
  );
}
