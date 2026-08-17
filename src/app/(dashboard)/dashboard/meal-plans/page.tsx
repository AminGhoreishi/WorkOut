import { Suspense } from "react";
import type { Metadata } from "next";
import UserMealPlansManagement from "@/features/dashboard/meal-plans/UserMealPlansManagement";

export const metadata: Metadata = {
  title: "استار فیت | برنامه غذایی اختصاصی شما",
  description: "مشاهده برنامه غذایی اختصاصی، وعده‌های غذایی و ریزمغذی‌های دریافتی روزانه در استار فیت",
};

export default function UserMealPlansPage() {
  return (
    <Suspense fallback={null}>
      <UserMealPlansManagement />
    </Suspense>
  );
}
