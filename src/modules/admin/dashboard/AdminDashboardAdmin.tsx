import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import type { AdminDashboardAdminProps } from "@/types/admin";
import RecentComments from "./RecentComments";
import RecentUsers from "./RecentUsers";
import AdminQuickActions from "./AdminQuickActions";
import AdminStatsOverview from "./AdminStatsOverview";

export default async function AdminDashboardAdmin({
  usersCount = 0,
  publishedBlogsCount = 0,
  openTicketsCount = 0,
  monthlyIncome = 0,
}: AdminDashboardAdminProps) {
  await dbConnect();

  const users = await User.find({}, "username email fullName role status createdAt")
    .sort({ createdAt: -1 })
    .limit(5);

  const formattedUsers = users.map((u) => ({
    _id: u._id.toString(),
    username: u.username || "",
    email: u.email || "",
    fullName: u.fullName || "",
    role: u.role || "user",
    status: u.status || "active",
    createdAt: u.createdAt ? u.createdAt.toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden font-danaMed">
      <AdminStatsOverview
        usersCount={usersCount}
        publishedBlogsCount={publishedBlogsCount}
        openTicketsCount={openTicketsCount}
        monthlyIncome={monthlyIncome}
      />

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <RecentUsers users={formattedUsers} />
        <RecentComments />
      </div>

      <AdminQuickActions />
    </div>
  );
}
