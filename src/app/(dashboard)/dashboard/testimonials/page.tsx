import type { Metadata } from "next";
import UserTestimonialsManagement from "@/modules/dashboard/testimonials/UserTestimonialsManagement";

export const metadata: Metadata = {
  title: "نظرات و تجربیات | استار فیت",
  description: "مدیریت و ثبت نظرات و تجربیات شاگردان استارفیت",
};

export default function TestimonialsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-neutral-950">
      <UserTestimonialsManagement />
    </div>
  );
}
