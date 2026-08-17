import type { Metadata } from "next";
import AdminComments from "@/features/admin/comments/AdminComments";

export const metadata: Metadata = {
  title: "مدیریت دیدگاه‌ها | استار فیت",
  description: "مدیریت، بررسی و تایید نظرات و دیدگاه‌های کاربران سامانه استار فیت",
};

export default function AdminCommentsPage() {
  return <AdminComments />;
}
