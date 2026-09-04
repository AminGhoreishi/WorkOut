import type { Metadata } from "next";
import { connection } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import AdminTicketsContainer from "@/features/admin/tickets/AdminTicketsContainer";
import type { ITicketStats } from "@/types/ticket";

export const metadata: Metadata = {
  title: "مدیریت تیکت‌های پشتیبانی | استار فیت",
  description: "مدیریت، بررسی و پاسخگویی به تیکت‌های پشتیبانی کاربران استار فیت",
};

export default async function AdminTicketsPage() {
  await connection();
  await dbConnect();

  const [totalCount, pendingCount, answeredCount, closedCount] =
    await Promise.all([
      Ticket.countDocuments({}),
      Ticket.countDocuments({ status: "pending" }),
      Ticket.countDocuments({ status: "answered" }),
      Ticket.countDocuments({ status: "closed" }),
    ]);

  const stats: ITicketStats = {
    totalCount,
    pendingCount,
    answeredCount,
    closedCount,
  };

  return <AdminTicketsContainer stats={stats} />;
}
