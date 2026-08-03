import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import SubscriptionModel from "@/model/Subscription";
import OrderModel from "@/model/Order";
import WorkoutPlanModel from "@/model/WorkoutPlan";
import WorkoutDayModel from "@/model/WorkoutDay";
import WorkoutExerciseModel from "@/model/WorkoutExercise";
import SubscriptionView from "@/modules/subscription/SubscriptionView";

export const metadata: Metadata = {
  title: "اشتراک من | فیت‌کوچ",
  description: "مدیریت اشتراک فعال، دسترسی به برنامه‌های ورزشی و سوابق تراکنش‌ها",
};

export default async function SubscriptionPage() {
  registerModels();
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const [subscriptionDoc, ordersDocs] = await Promise.all([
    SubscriptionModel.findOne({
      userId: session.user.id,
      status: { $in: ["active", "trial"] },
      endsAt: { $gt: new Date() },
    })
      .populate("packageId")
      .populate("coachId")
      .populate("orderId")
      .lean(),
    OrderModel.find({
      userId: session.user.id,
    })
      .populate("packageId")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  let workoutPlan = null;
  let workoutDays: any[] = [];

  if (subscriptionDoc) {
    const rawPlan = await WorkoutPlanModel.findOne({
      packageId: (subscriptionDoc.packageId as any)?._id,
      isActive: true,
    }).lean();

    if (rawPlan) {
      workoutPlan = JSON.parse(JSON.stringify(rawPlan));

      const days = await WorkoutDayModel.find({ planId: rawPlan._id })
        .sort({ sortOrder: 1 })
        .lean();

      const dayIds = days.map((d) => d._id);
      const exercises = await WorkoutExerciseModel.find({
        dayId: { $in: dayIds },
      })
        .populate("videoId")
        .populate("videoId2")
        .sort({ sortOrder: 1 })
        .lean();

      const mappedDays = days.map((day) => ({
        ...day,
        exercises: exercises.filter(
          (e) => e.dayId.toString() === day._id.toString(),
        ),
      }));

      workoutDays = JSON.parse(JSON.stringify(mappedDays));
    }
  }

  return (
    <SubscriptionView
      subscription={
        subscriptionDoc ? JSON.parse(JSON.stringify(subscriptionDoc)) : null
      }
      workoutPlan={workoutPlan}
      workoutDays={workoutDays}
      orders={ordersDocs ? JSON.parse(JSON.stringify(ordersDocs)) : []}
    />
  );
}
