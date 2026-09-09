import type { Metadata } from "next";
import SubscriptionsManagement from "@/features/admin/subscription/SubscriptionsManagement";

export const metadata: Metadata = {
  title: "مدیریت اشتراک‌ها و سرفصل‌ها",
  description: "تخصیص برنامه‌های ورزشی به کاربران و مدیریت بانک فیلم‌های آموزشی استار فیت",
};

export default function AdminSubscriptionsPage() {
  return <SubscriptionsManagement />;
}
