import { Suspense } from "react";
import type { Metadata } from "next";
import SubscriptionPackages from "@/features/packages/SubscriptionPackages";
import PackagesContent from "@/features/packages/PackagesContent";
import { PackagesSkeleton } from "@/features/packages/PackagesSkeleton";

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
