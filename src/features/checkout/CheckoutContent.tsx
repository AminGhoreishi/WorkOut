import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Order from "@/models/Order";
import CheckoutPage from "@/features/checkout/CheckoutPage";
import CheckoutErrorView from "@/features/checkout/CheckoutErrorView";
import type { CheckoutOrderInfo, CheckoutPageProps } from "@/types/checkout";

const ORDER_TTL_MS = 24 * 60 * 60 * 1000;

export default async function CheckoutContent({ searchParams }: CheckoutPageProps) {
  await connection();
  const { orderId } = await searchParams;

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    return (
      <CheckoutErrorView
        iconType="not-found"
        title="شناسه سفارش نامعتبر است"
        description="شناسه ارسالی برای سفارش معتبر نمی‌باشد یا لینک ناقص است. لطفاً پکیج مورد نظر خود را مجدداً انتخاب کنید."
        actionText="مشاهده پکیج‌ها"
        actionHref="/packages"
      />
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/checkout?orderId=${orderId}`);
  }

  let order = null;

  try {
    await dbConnect();
    registerModels();

    order = await Order.findOne({
      _id: orderId,
      userId: session.user.id,
    })
      .populate("packageId", "name tagline")
      .lean();
  } catch {
    return (
      <CheckoutErrorView
        iconType="server"
        title="خطا در ارتباط با سرور"
        description="متاسفانه ارتباط با پایگاه داده برقرار نشد یا با تاخیر مواجه گردید. لطفاً چند لحظه بعد مجدداً تلاش نمایید."
        actionText="تلاش دوباره"
        actionHref={`/checkout?orderId=${orderId}`}
      />
    );
  }

  if (!order) {
    return (
      <CheckoutErrorView
        iconType="not-found"
        title="سفارش پیدا نشد"
        description="سفارشی با این شناسه در حساب کاربری شما یافت نشد یا ممکن است منقضی یا حذف شده باشد."
        actionText="مشاهده پکیج‌ها"
        actionHref="/packages"
      />
    );
  }

  if (order.status === "paid") {
    redirect("/dashboard/subscription");
  }

  if (order.status === "failed" || order.status === "refunded") {
    return (
      <CheckoutErrorView
        iconType="error"
        title="سفارش غیرقابل پرداخت است"
        description="وضعیت این سفارش لغو شده یا ناموفق ثبت گردیده است و امکان ثبت پرداخت ندارد. لطفاً پکیج جدیدی انتخاب کنید."
        actionText="انتخاب پکیج جدید"
        actionHref="/packages"
      />
    );
  }

  const orderTime = order.createdAt ? new Date(order.createdAt).getTime() : null;
  if (orderTime && Date.now() - orderTime > ORDER_TTL_MS) {
    return (
      <CheckoutErrorView
        iconType="expired"
        title="مهلت پرداخت سفارش به پایان رسیده است"
        description="با توجه به گذشت بیش از ۲۴ ساعت از ثبت سفارش و احتمال به‌روزرسانی تخفیف‌ها یا پکیج‌ها، این پیش‌فاکتور منقضی شده است. لطفاً سفارش جدیدی ثبت کنید."
        actionText="مشاهده پکیج‌ها"
        actionHref="/packages"
      />
    );
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
