import { Suspense } from "react";
import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import Package from "@/model/Package";
import OrderSlugPageContent, { OrderPageSkeleton } from "@/modules/order/OrderSlugContent";
import type { OrderSlugPageProps } from "@/types/order";

export async function generateMetadata({
  params,
}: OrderSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const pkg = await Package.findOne({ slug, isActive: true })
      .select("name tagline")
      .lean();

    if (!pkg) {
      return {
        title: "استار فیت | پکیج یافت نشد",
      };
    }

    return {
      title: `استار فیت | خرید ${pkg.name}`,
      description:
        pkg.tagline ||
        `تکمیل سفارش و فعال‌سازی آنلاین اشتراک ${pkg.name} در سیستم استار فیت`,
    };
  } catch {
    return {
      title: "استار فیت | تکمیل سفارش",
    };
  }
}

export default function OrderSlugPage(props: OrderSlugPageProps) {
  return (
    <Suspense fallback={<OrderPageSkeleton />}>
      <OrderSlugPageContent {...props} />
    </Suspense>
  );
}
