import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order";
import AdminPayments from "@/modules/admin/payments/AdminPayments";
import type { AdminPaymentStats } from "@/types/admin-payments";

export const metadata: Metadata = {
  title: "استار فیت | مدیریت و تایید پرداخت‌ها",
  description: "بررسی، تایید یا رد فیش‌های کارت به کارت کاربران در سیستم استار فیت",
};

export default async function AdminPaymentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "admin") {
    redirect("/login");
  }

  await dbConnect();

  const [pendingCount, paidCount, failedCount, totalPaidAgg] =
    await Promise.all([
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "paid" }),
      Order.countDocuments({ status: "failed" }),
      Order.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]),
    ]);

  const totalAmount = totalPaidAgg[0]?.total || 0;

  const initialStats: AdminPaymentStats = {
    pendingCount,
    paidCount,
    failedCount,
    totalAmount,
  };

  return <AdminPayments initialStats={initialStats} />;
}
