import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Package from "@/models/Package";
import User from "@/models/User";
import Discount from "@/models/Discount";
import { CreateOrderPayload } from "@/types/order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "لطفاً ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "شناسه کاربر نامعتبر است" }, { status: 400 });
    }

    const body: CreateOrderPayload = await req.json();
    const { fullName, email, phone, packageId, billingCycle, discountCode } = body;

    if (!fullName || !phone || !packageId || !billingCycle) {
      return NextResponse.json(
        { message: "لطفاً تمام فیلدهای الزامی را تکمیل کنید" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json({ message: "شناسه پکیج نامعتبر است" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, phone, ...(email ? { email } : {}) },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    const pkg = await Package.findById(packageId);

    if (!pkg || !pkg.isActive) {
      return NextResponse.json(
        { message: "پکیج انتخاب شده معتبر یا فعال نیست" },
        { status: 404 }
      );
    }

    if (pkg.slug === "footballers" && billingCycle !== "monthly") {
      return NextResponse.json(
        { message: "برای این پکیج فقط دوره پرداخت یک ماهه امکان‌پذیر است" },
        { status: 400 }
      );
    }

    const originalAmount = pkg.price[billingCycle];

    if (typeof originalAmount !== "number" || originalAmount <= 0) {
      return NextResponse.json(
        { message: "قیمت پکیج نامعتبر است" },
        { status: 400 }
      );
    }

    let discountPercent = 0;
    const now = new Date();

    if (discountCode && discountCode.trim()) {
      const codeDiscount = await Discount.findOne({
        code: discountCode.trim().toUpperCase(),
        isActive: true,
        startsAt: { $lte: now },
        $and: [
          {
            $or: [{ expiresAt: null }, { expiresAt: { $gte: now } }],
          },
        ],
      });

      if (codeDiscount) {
        const isPackageAllowed =
          !codeDiscount.packages ||
          codeDiscount.packages.length === 0 ||
          codeDiscount.packages.some((p: any) => String(p) === String(packageId));

        const isUsageAllowed =
          !codeDiscount.maxUsage ||
          (codeDiscount.usageCount || 0) < codeDiscount.maxUsage;

        if (isPackageAllowed && isUsageAllowed) {
          discountPercent = codeDiscount.percent || 0;
          await Discount.findByIdAndUpdate(codeDiscount._id, {
            $inc: { usageCount: 1 },
          });
        }
      }
    } else {
      const directDiscount = await Discount.findOne({
        code: null,
        isActive: true,
        startsAt: { $lte: now },
        $and: [
          {
            $or: [{ expiresAt: null }, { expiresAt: { $gte: now } }],
          },
          {
            $or: [{ packages: { $size: 0 } }, { packages: packageId }],
          },
        ],
      }).sort({ percent: -1 });

      if (directDiscount) {
        discountPercent = directDiscount.percent || 0;
        await Discount.findByIdAndUpdate(directDiscount._id, {
          $inc: { usageCount: 1 },
        });
      }
    }

    const amountPaid =
      originalAmount - (originalAmount * discountPercent) / 100;

    const order = await Order.create({
      userId,
      packageId,
      billingCycle,
      originalAmount,
      discountPercent,
      amountPaid,
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "سفارش با موفقیت ایجاد شد",
        orderId: String(order._id),
        amount: amountPaid,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "خطای سرور";

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
