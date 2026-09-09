import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import Order from "@/models/Order";
import AdminDashboardAdmin from "@/features/admin/dashboard/AdminDashboardAdmin";
import { connection } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getStartOfShamsiMonth } from "@/utils/date";

export default async function Page() {
  await connection();

  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user?.role !== "admin" && session.user?.role !== "coach")
  ) {
    redirect("/login");
  }

  await dbConnect();

  const startOfMonth = getStartOfShamsiMonth();

  const [
    usersCountRes,
    publishedBlogsCountRes,
    openTicketsCountRes,
    monthlyRevenueRes,
  ] = await Promise.allSettled([
    User.countDocuments({}),
    Blog.countDocuments({ status: "published" }),
    Ticket.countDocuments({ status: { $ne: "closed" } }),
    Order.aggregate([
      { $match: { status: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]),
  ]);

  const usersCount =
    usersCountRes.status === "fulfilled" ? usersCountRes.value : 0;
  const publishedBlogsCount =
    publishedBlogsCountRes.status === "fulfilled"
      ? publishedBlogsCountRes.value
      : 0;
  const openTicketsCount =
    openTicketsCountRes.status === "fulfilled"
      ? openTicketsCountRes.value
      : 0;
  const monthlyRevenueResult =
    monthlyRevenueRes.status === "fulfilled" ? monthlyRevenueRes.value : [];

  const monthlyIncome = monthlyRevenueResult[0]?.total || 0;

  return (
    <AdminDashboardAdmin
      usersCount={usersCount}
      publishedBlogsCount={publishedBlogsCount}
      openTicketsCount={openTicketsCount}
      monthlyIncome={monthlyIncome}
    />
  );
}

