import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order";
import CheckoutPage from "@/modules/checkout/CheckoutPage";
import type { CheckoutOrderInfo, CheckoutPageProps } from "@/types/checkout";

export default async function CheckoutContent({ searchParams }: CheckoutPageProps) {
  await connection();
  const { orderId } = await searchParams;

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    redirect("/packages");
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/checkout?orderId=${orderId}`);
  }

  await dbConnect();

  const order = await Order.findOne({
    _id: orderId,
    userId: session.user.id,
  })
    .populate("packageId", "name tagline")
    .lean();

  if (!order) {
    redirect("/packages");
  }

  if (order.status === "paid") {
    redirect("/dashboard/subscription");
  }

  const orderPackage = order.packageId as unknown as { name?: string; tagline?: string } | null;
  const packageName = orderPackage?.name || "پکیج اختصاصی استار فیت";
  const packageTagline = orderPackage?.tagline || "";

  const checkoutOrder: CheckoutOrderInfo = {
    _id: String(order._id),
    amountPaid: order.amountPaid || 0,
    originalAmount: order.originalAmount || order.amountPaid || 0,
    billingCycle: order.billingCycle || "monthly",
    status: order.status || "pending",
    paymentRef: order.paymentRef || "",
    packageName,
    packageTagline,
    createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : undefined,
  };

  return <CheckoutPage order={checkoutOrder} />;
}
