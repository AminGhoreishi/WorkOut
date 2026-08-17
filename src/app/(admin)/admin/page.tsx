import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import Order from "@/models/Order";
import AdminDashboardAdmin from "@/features/admin/dashboard/AdminDashboardAdmin";
import { connection } from "next/server";

export default async function page() {
  await connection();
  await dbConnect();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    usersCount,
    publishedBlogsCount,
    openTicketsCount,
    monthlyRevenueResult,
    totalRevenueResult,
  ] = await Promise.all([
    User.countDocuments({}),
    Blog.countDocuments({ status: "published" }),
    Ticket.countDocuments({ status: { $ne: "closed" } }),
    Order.aggregate([
      { $match: { status: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]),
    Order.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]),
  ]);

  const monthlyIncome = monthlyRevenueResult[0]?.total ?? totalRevenueResult[0]?.total ?? 0;

  return (
    <AdminDashboardAdmin
      usersCount={usersCount}
      publishedBlogsCount={publishedBlogsCount}
      openTicketsCount={openTicketsCount}
      monthlyIncome={monthlyIncome}
    />
  );
}

