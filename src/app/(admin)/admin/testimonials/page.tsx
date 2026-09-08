import type { Metadata } from "next";
import AdminTestimonials from "@/features/admin/testimonials/AdminTestimonials";

export const metadata: Metadata = {
  title: "استار فیت | مدیریت نظرات شاگردان",
  description: "مدیریت، بررسی و حذف نظرات و تجربیات شاگردان در سامانه استار فیت",
};

export default function AdminTestimonialsPage() {
  return <AdminTestimonials />;
}
