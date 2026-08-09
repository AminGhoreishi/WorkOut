import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order";
import Subscription from "@/model/Subscription";
import User from "@/model/User";
import Package from "@/model/Package";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. فقط مدیران امکان دسترسی دارند." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search");

    const skip = (Number(page) - 1) * Number(limit);

    let query: Record<string, unknown> = {};

    if (status !== "all") {
      query.status = status;
    }

    if (search) {
      const users = await User.find({
        $or: [
          { username: { $regex: search, $options: "i" } },
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      }).select("_id");

      const userIds = users.map((u) => u._id);

      query.$or = [
        { userId: { $in: userIds } },
        { paymentRef: { $regex: search, $options: "i" } },
      ];
    }

    const [orders, total, pendingCount, paidCount, failedCount, totalPaidAgg] =
      await Promise.all([
        Order.find(query)
          .populate("userId", "fullName username email phone")
          .populate("packageId", "name tagline")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
          .lean(),
        Order.countDocuments(query),
        Order.countDocuments({ status: "pending" }),
        Order.countDocuments({ status: "paid" }),
        Order.countDocuments({ status: "failed" }),
        Order.aggregate([
          { $match: { status: "paid" } },
          { $group: { _id: null, total: { $sum: "$amountPaid" } } },
        ]),
      ]);

    const totalAmount = totalPaidAgg[0]?.total || 0;
    const totalPages = Math.ceil(total / Number(limit));

    return NextResponse.json({
      orders,
      total,
      totalPages,
      stats: {
        pendingCount,
        paidCount,
        failedCount,
        totalAmount,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "خطای سرور";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. فقط مدیران امکان دسترسی دارند." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { orderId, action, status } = body;

    const targetStatus = status || (action === "approve" ? "paid" : action === "reject" ? "failed" : null);

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { message: "شناسه سفارش نامعتبر است" },
        { status: 400 }
      );
    }

    if (!targetStatus || !["paid", "failed"].includes(targetStatus)) {
      return NextResponse.json(
        { message: "وضعیت انتخابی نامعتبر است" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "سفارش مورد نظر پیدا نشد" },
        { status: 404 }
      );
    }

    if (targetStatus === "paid") {
      order.status = "paid";
      await order.save();

      const existingSub = await Subscription.findOne({ orderId: order._id });

      if (!existingSub) {
        const durationMap: Record<string, number> = {
          monthly: 30,
          quarterly: 90,
          biannual: 180,
        };

        const days = durationMap[order.billingCycle] || 30;
        const startsAt = new Date();
        const endsAt = new Date();
        endsAt.setDate(endsAt.getDate() + days);

        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 7);

        await Subscription.create({
          orderId: order._id,
          userId: order.userId,
          packageId: order.packageId,
          status: "trial",
          startsAt,
          endsAt,
          trialEndsAt,
        });
      }

      return NextResponse.json({
        message: "پرداخت با موفقیت تایید شد و اشتراک کاربر فعال گردید",
        order,
      });
    }

    if (targetStatus === "failed") {
      order.status = "failed";
      await order.save();

      return NextResponse.json({
        message: "پرداخت با موفقیت رد شد",
        order,
      });
    }

    return NextResponse.json(
      { message: "عملیات نامعتبر است" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "خطای سرور";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
