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
import { extractDashboardStats } from "@/features/admin/dashboard/adminDashboardHelpers";

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

  const stats = extractDashboardStats(
    await Promise.allSettled([
      User.countDocuments({}),
      Blog.countDocuments({ status: "published" }),
      Ticket.countDocuments({ status: { $ne: "closed" } }),
      Order.aggregate([
        { $match: { status: "paid", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]),
    ]),
  );

  return <AdminDashboardAdmin {...stats} />;
}
