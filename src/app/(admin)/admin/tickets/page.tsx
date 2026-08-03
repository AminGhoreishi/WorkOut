import type { Metadata } from "next";
import AdminTickets from "@/modules/admin/tickets/AdminTickets";

export const metadata: Metadata = {
  title: "مدیریت تیکت‌های پشتیبانی | استار فیت",
  description: "مدیریت، بررسی و پاسخگویی به تیکت‌های پشتیبانی کاربران استار فیت",
};

export default function AdminTicketsPage() {
  return <AdminTickets />;
}
