import { Suspense } from "react";
import type { Metadata } from "next";
import SubscriptionPageContent from "@/modules/subscription/SubscriptionContent";

export const metadata: Metadata = {
  title: "استار فیت | برنامه‌های تمرینی",
  description: "مشاهده برنامه‌های تمرینی و ساختار گروه‌های ورزشی در سیستم استار فیت",
};

export default function page() {
  return (
    <Suspense fallback={null}>
      <SubscriptionPageContent />
    </Suspense>
  );
}
