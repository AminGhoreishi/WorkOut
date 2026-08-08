import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import AdminAdminsContainer from "@/modules/admin/admins/AdminAdminsContainer";

export const metadata: Metadata = {
  title: "مدیریت مدیران | استار فیت",
  description: "پنل مدیریت مدیران و حساب‌های کاربری ارشد سیستم استار فیت",
};

export default async function AdminAdminsPage() {
  await dbConnect();

  const admins = await User.find({ role: "admin" }, "-password")
    .sort({ createdAt: -1 })
    .lean();

  const formattedAdmins = admins.map((u) => ({
    _id: u._id.toString(),
    username: u.username || "",
    email: u.email || "",
    phone: u.phone || "",
    fullName: u.fullName || "",
    avatar: u.avatar || "",
    role: (u.role || "admin") as "user" | "admin" | "coach",
    status: u.status || "active",
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
  }));

  return <AdminAdminsContainer initialAdmins={formattedAdmins} />;
}
