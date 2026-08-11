import { Suspense } from "react";
import type { Metadata } from "next";
import CheckoutContent from "@/modules/checkout/CheckoutContent";
import CheckoutSkeleton from "@/modules/checkout/CheckoutSkeleton";
import type { CheckoutPageProps } from "@/types/checkout";

export const metadata: Metadata = {
  title: "استار فیت | پرداخت و کارت به کارت",
  description: "انتقال وجه کارت به کارت و نهایی‌سازی سفارش در سیستم استار فیت",
};

export default function Page(props: CheckoutPageProps) {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutContent {...props} />
    </Suspense>
  );
}
