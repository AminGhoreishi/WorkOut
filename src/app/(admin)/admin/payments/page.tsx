import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Order from "@/models/Order";
import AdminPayments from "@/features/admin/payments/AdminPayments";
import type {
  AdminPaymentsApiResponse,
  AdminPaymentStats,
} from "@/types/admin-payments";

export const metadata: Metadata = {
  title: "استار فیت | مدیریت و تایید پرداخت‌ها",
  description: "بررسی، تایید یا رد فیش‌های کارت به کارت کاربران در سیستم استار فیت",
};

export default async function AdminPaymentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "admin") {
    redirect("/login");
  }

  registerModels();
  await dbConnect();

  const [orders, totalPending, pendingCount, paidCount, failedCount, totalPaidAgg] =
    await Promise.all([
      Order.find({ status: "pending" })
        .populate("userId", "fullName username email phone")
        .populate("packageId", "name tagline")
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "paid" }),
      Order.countDocuments({ status: "failed" }),
      Order.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]),
    ]);

  const totalAmount = totalPaidAgg[0]?.total || 0;
  const totalPages = Math.ceil(totalPending / 10);

  const initialStats: AdminPaymentStats = {
    pendingCount,
    paidCount,
    failedCount,
    totalAmount,
  };

  const initialData: AdminPaymentsApiResponse = {
    orders: JSON.parse(JSON.stringify(orders)),
    total: totalPending,
    totalPages,
    stats: initialStats,
  };

  return (
    <AdminPayments initialData={initialData} initialStats={initialStats} />
  );
}
