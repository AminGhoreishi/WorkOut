import type { Metadata } from "next";
import UserTickets from "@/features/dashboard/tickets/UserTickets";

export const metadata: Metadata = {
  title: "تیکت‌های پشتیبانی | استار فیت",
  description: "مدیریت تیکت‌ها، مشاوره ورزشی و بررسی فرم حرکات در استار فیت",
};

export default function TicketsPage() {
  return <UserTickets />;
}
