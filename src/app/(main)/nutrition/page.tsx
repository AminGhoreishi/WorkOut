import { Suspense } from "react";
import NutritionTracker from "@/modules/dashboard/nutrition/NutritionTracker";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SubscriptionModel from "@/model/Subscription";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export const metadata = {
  title: "استار فیت | مدیریت تغذیه و کالری‌شمار روزانه",
  description:
    "ثبت روزانه وعده‌های غذایی، کنترل کالری دریافتی، پروتئین و هیدراتاسیون بدن در استار فیت",
};

async function NutritionPageContent() {
  await connection();
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await SubscriptionModel.findOne({
    userId: session.user.id,
    status: { $in: ["active", "trial"] },
    endsAt: { $gt: new Date() },
  });

  return <NutritionTracker userId={session.user.id} />;
}

export default function NutritionPage() {
  return (
    <Suspense fallback={null}>
      <NutritionPageContent />
    </Suspense>
  );
}
