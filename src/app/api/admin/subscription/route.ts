import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import Package from "@/models/Package";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session?.user?.id ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. فقط مدیران و مربیان امکان دسترسی دارند." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const packageId = searchParams.get("packageId");

    const skip = (Number(page) - 1) * Number(limit);

    let query: any = {};
    if (status && status !== "all") {
      query.status = status;
    }

    if (packageId) {
      query.packageId = packageId;
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
      query.userId = { $in: userIds };
    }

    const [
      subscriptions,
      total,
      totalStats,
      activeStats,
      trialStats,
      expiredStats,
    ] = await Promise.all([
      Subscription.find(query)
        .populate("userId", "username fullName email phone avatar")
        .populate("packageId", "name slug colorClass price")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Subscription.countDocuments(query),
      Subscription.countDocuments({}),
      Subscription.countDocuments({ status: "active" }),
      Subscription.countDocuments({ status: "trial" }),
      Subscription.countDocuments({ status: "expired" }),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    const stats = {
      total: totalStats,
      active: activeStats,
      trial: trialStats,
      expired: expiredStats,
    };

    return NextResponse.json({ subscriptions, total, totalPages, stats });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session?.user?.id ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. فقط مدیران و مربیان امکان دسترسی دارند." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { userId, packageId, status, startsAt, endsAt } = body;

    if (
      !userId ||
      !packageId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(packageId)
    ) {
      return NextResponse.json(
        { message: "شناسه کاربر و پکیج معتبر الزامی هستند" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.create({
      userId,
      packageId,
      status: status || "active",
      startsAt: startsAt ? new Date(startsAt) : new Date(),
      endsAt: endsAt
        ? new Date(endsAt)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      orderId: new mongoose.Types.ObjectId(),
    });

    return NextResponse.json({ subscription }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session?.user?.id ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. فقط مدیران و مربیان امکان دسترسی دارند." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, status, startsAt, endsAt, coachId } = body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه اشتراک نامعتبر است" },
        { status: 400 }
      );
    }

    const updatedData: any = {};
    if (status) updatedData.status = status;
    if (startsAt) updatedData.startsAt = new Date(startsAt);
    if (endsAt) updatedData.endsAt = new Date(endsAt);
    if (coachId !== undefined) updatedData.coachId = coachId || null;

    const subscription = await Subscription.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!subscription) {
      return NextResponse.json({ message: "اشتراک پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ subscription });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session?.user?.id ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. فقط مدیران و مربیان امکان دسترسی دارند." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه اشتراک نامعتبر است" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return NextResponse.json({ message: "اشتراک پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "اشتراک با موفقیت حذف شد" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
