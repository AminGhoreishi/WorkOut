import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import AdminUsers from "@/modules/admin/users/AdminUsers";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "مدیریت کاربران | استار فیت",
  description: "پنل مدیریت کاربران، نقش‌ها و دسترسی‌های سامانه استار فیت",
};

export default async function AdminUsersPage() {
  await connection();
  await dbConnect();

  const [totalUsers, activeUsers, expiredUsers, blockedUsers] =
    await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ status: "active" }),
      User.countDocuments({ status: "expired" }),
      User.countDocuments({ status: "blocked" }),
    ]);

  const initialStats = {
    totalUsers,
    activeUsers,
    expiredUsers,
    blockedUsers,
  };

  return <AdminUsers initialStats={initialStats} />;
}
