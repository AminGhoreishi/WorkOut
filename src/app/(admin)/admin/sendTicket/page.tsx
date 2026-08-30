import type { Metadata } from "next";
import AdminSendTicket from "@/features/admin/tickets/AdminSendTicket";
import type { AdminSendTicketPageProps } from "@/types/ticket";

export const metadata: Metadata = {
  title: "ارسال تیکت به کاربر | استار فیت",
  description: "ارسال تیکت، پیام و برنامه‌های اختصاصی به کاربران استار فیت",
};

export default async function AdminSendTicketPage({
  searchParams,
}: AdminSendTicketPageProps) {
  const { userId } = await searchParams;

  return <AdminSendTicket initialUserId={userId} />;
}
