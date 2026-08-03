import type { Metadata } from "next";
import FoodsContainer from "@/modules/admin/foods/FoodsContainer";

export const metadata: Metadata = {
  title: "بانک غذاها | استار فیت",
  description: "مدیریت، افزودن و ارزش‌گذاری اقلام غذایی در بانک داده‌های استار فیت",
};

export default function AdminFoodsPage() {
  return <FoodsContainer />;
}
