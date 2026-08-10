import { Suspense } from "react";
import type { Metadata } from "next";
import SubscriptionPackages from "@/modules/packages/SubscriptionPackages";
import PackagesContent from "@/modules/packages/PackagesContent";
import { PackagesSkeleton } from "@/modules/packages/PackagesGrid";

export const metadata: Metadata = {
  title: "استار فیت | پکیج‌های اشتراک",
  description: "بهترین پکیج را برای دستیابی به اهداف تناسب اندام خود انتخاب کنید.",
};

export default function page() {
  return (
    <SubscriptionPackages>
      <Suspense fallback={<PackagesSkeleton />}>
        <PackagesContent />
      </Suspense>
    </SubscriptionPackages>
  );
}
