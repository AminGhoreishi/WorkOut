import type { Metadata } from "next";
import AdminUsers from "@/modules/admin/users/AdminUsers";

export const metadata: Metadata = {
  title: "مدیریت کاربران | استار فیت",
  description: "پنل مدیریت کاربران، نقش‌ها و دسترسی‌های سامانه استار فیت",
};

export default function AdminUsersPage() {
  return <AdminUsers />;
}
