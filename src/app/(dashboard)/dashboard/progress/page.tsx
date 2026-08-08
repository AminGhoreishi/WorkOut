import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import SubscriptionModel from "@/model/Subscription";
import OrderModel from "@/model/Order";
import ProgressChartManagement from "@/modules/dashboard/progress/ProgressChartManagement";
import NoPackageProgressAccess from "@/modules/dashboard/progress/NoPackageProgressAccess";

export const metadata: Metadata = {
  title: "نمودار پیشرفت | استار فیت",
  description: "مشاهده روند پیشرفت تمرینی، تغییرات وزن و آنالیز کارایی ورزشی در استار فیت",
};

export default async function ProgressPage() {
  registerModels();
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [activeSubscription, paidOrder] = await Promise.all([
    SubscriptionModel.findOne({
      userId,
      status: { $in: ["active", "trial"] },
    }).lean(),
    OrderModel.findOne({
      userId,
      status: "paid",
    }).lean(),
  ]);

  const hasPackage = Boolean(activeSubscription || paidOrder);

  if (!hasPackage) {
    return <NoPackageProgressAccess />;
  }

  return <ProgressChartManagement />;
}
