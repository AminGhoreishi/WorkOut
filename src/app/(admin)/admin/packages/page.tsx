import type { Metadata } from "next";
import PackagesManagement from "@/features/admin/package/PackagesManagement";

export const metadata: Metadata = {
  title: "مدیریت پکیج‌ها | استار فیت",
  description: "مدیریت، ایجاد و بهینه‌سازی پکیج‌های اشتراک سیستم استار فیت",
};

export default function AdminPackagesPage() {
  return <PackagesManagement />;
}
