import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Subscription from "@/models/Subscription";
import Fitnessprofile from "@/models/Fitnessprofile";
import WorkoutView from "@/features/dashboard/workout/WorkoutView";
import { connection } from "next/server";
import { getUserWorkoutData } from "@/lib/workoutData";

export const metadata: Metadata = {
  title: "برنامه تمرینی من",
  description: "مشاهده برنامه تمرینی اختصاصی، آموزش حرکات و ثبت رکوردهای ورزشی در استار فیت",
};

export default async function UserWorkoutPage() {
  await connection();
  registerModels();
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const subscription = await Subscription.findOne(
    { userId: session.user.id },
    "packageId"
  )
    .populate("packageId", "tagline isActive name")
    .lean();

  const packageId = subscription?.packageId?._id
    ? String(subscription.packageId._id)
    : undefined;

  const [hasFitnessProfileDoc, workoutData] = await Promise.all([
    Fitnessprofile.exists({ userId: session.user.id }),
    getUserWorkoutData(session.user.id, packageId),
  ]);

  console.log(workoutData);
  

  const hasFitnessProfile = Boolean(hasFitnessProfileDoc);

  const plainSubscription = subscription
    ? JSON.parse(JSON.stringify(subscription))
    : null;

  return (
    <WorkoutView
      subscription={plainSubscription}
      userId={session.user.id}
      hasFitnessProfile={hasFitnessProfile}
      initialPlan={workoutData.plan}
      initialWorkoutDays={workoutData.workoutDays}
    />
  );
}
