import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Subscription from "@/model/Subscription";
import SubscriptionsManagement from "@/modules/admin/subscription/SubscriptionsManagement";
import type { SubscriptionStats } from "@/types/subscription";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "مدیریت اشتراک‌ها و سرفصل‌ها | استار فیت",
  description: "تخصیص برنامه‌های ورزشی به کاربران و مدیریت بانک فیلم‌های آموزشی استار فیت",
};

export default async function AdminSubscriptionsPage() {
  await connection();
  registerModels();
  await dbConnect();

  const [total, active, trial, expired] = await Promise.all([
    Subscription.countDocuments({}),
    Subscription.countDocuments({ status: "active" }),
    Subscription.countDocuments({ status: "trial" }),
    Subscription.countDocuments({ status: "expired" }),
  ]);

  const stats: SubscriptionStats = {
    total,
    active,
    trial,
    expired,
  };

  return <SubscriptionsManagement stats={stats} />;
}
