import type { Metadata } from "next";
import WorkoutsManagement from "@/modules/admin/workouts/WorkoutsManagement";

export const metadata: Metadata = {
  title: "مدیریت برنامه‌های تمرینی | استار فیت",
  description: "طراحی، روزبندی و سازماندهی برنامه‌های ورزشی و حرکات هر پکیج در استار فیت",
};

export default function AdminWorkoutsPage() {
  return <WorkoutsManagement />;
}
