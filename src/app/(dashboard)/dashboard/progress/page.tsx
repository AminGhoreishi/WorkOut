import type { Metadata } from "next";
import ProgressChartManagement from "@/modules/dashboard/progress/ProgressChartManagement";

export const metadata: Metadata = {
  title: "نمودار پیشرفت | استار فیت",
  description: "مشاهده روند پیشرفت تمرینی، تغییرات وزن و آنالیز کارایی ورزشی در استار فیت",
};

export default function ProgressPage() {
  return <ProgressChartManagement />;
}
