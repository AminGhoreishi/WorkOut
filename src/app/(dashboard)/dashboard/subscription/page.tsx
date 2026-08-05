import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import SubscriptionModel from "@/model/Subscription";
import OrderModel from "@/model/Order";
import SubscriptionView from "@/modules/subscription/SubscriptionView";

export const metadata: Metadata = {
  title: "اشتراک من | استار فیت",
  description:
    "مدیریت اشتراک فعال، دسترسی به برنامه‌های ورزشی و سوابق تراکنش‌ها",
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

  return (
    <SubscriptionView
      subscription={
        subscriptionDoc ? JSON.parse(JSON.stringify(subscriptionDoc)) : null
      }
      orders={ordersDocs ? JSON.parse(JSON.stringify(ordersDocs)) : []}
    />
  );
}
