import type { Metadata } from "next";
import DiscountsManagement from "@/features/admin/discounts/DiscountsManagement";

export const metadata: Metadata = {
  title: "مدیریت کدهای تخفیف | استار فیت",
  description: "مدیریت و پیکربندی کدهای تخفیف سیستم استار فیت",
};

export default function AdminDiscountPage() {
  return <DiscountsManagement />;
}
