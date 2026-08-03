import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Subscription from "@/model/Subscription";
import WorkoutView from "@/modules/dashboard/workout/WorkoutView";

export const metadata: Metadata = {
  title: "برنامه تمرینی من | استار فیت",
  description: "مشاهده برنامه تمرینی اختصاصی، آموزش حرکات و ثبت رکوردهای ورزشی در استار فیت",
};

export default async function UserWorkoutPage() {
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

  const plainSubscription = subscription
    ? JSON.parse(JSON.stringify(subscription))
    : null;

  return <WorkoutView subscription={plainSubscription} userId={session.user.id} />;
}
