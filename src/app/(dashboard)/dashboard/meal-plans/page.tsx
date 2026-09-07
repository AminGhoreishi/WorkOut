import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import UserMealPlansManagement from "@/features/dashboard/meal-plans/UserMealPlansManagement";

export const metadata: Metadata = {
  title: "برنامه غذایی اختصاصی شما | استار فیت",
  description: "مشاهده برنامه غذایی اختصاصی، وعده‌های غذایی و ریزمغذی‌های دریافتی روزانه در استار فیت",
};

export default async function UserMealPlansPage() {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard/meal-plans");
  }

  return (
    <Suspense fallback={null}>
      <UserMealPlansManagement />
    </Suspense>
  );
}
