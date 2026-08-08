import dbConnect from "@/lib/dbConnect";
import Pr from "@/model/Pr";
import Subscription from "@/model/Subscription";
import Order from "@/model/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما وارد سیستم نشده‌اید." },
        { status: 401 }
      );
    }

    const records = await Pr.find({ userId: session.user.id })
      .sort({ date: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ success: true, records });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "خطا در دریافت اطلاعات رکوردهای شخصی";
    return NextResponse.json({ message: errMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما وارد سیستم نشده‌اید." },
        { status: 401 }
      );
    }

    const [activeSub, paidOrd] = await Promise.all([
      Subscription.findOne({
        userId: session.user.id,
        status: { $in: ["active", "trial"] },
      }).lean(),
      Order.findOne({
        userId: session.user.id,
        status: "paid",
      }).lean(),
    ]);

    if (!activeSub && !paidOrd) {
      return NextResponse.json(
        { message: "برای ثبت رکورد ورزشی نیازمند خرید پکیج فعال هستید." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { category, testName, value, unit, date, notes } = body;

    if (!testName || value === undefined || value === null || isNaN(Number(value)) || !unit) {
      return NextResponse.json(
        { message: "اطلاعات ارسالی (نام حرکت، مقدار و واحد) کامل نیستند." },
        { status: 400 }
      );
    }

    const parsedDate = date ? new Date(date) : new Date();

    const record = await Pr.create({
      userId: session.user.id,
      category: category || "قدرتی",
      testName,
      value: Number(value),
      unit,
      date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
      notes: notes || "",
    });

    return NextResponse.json({ success: true, record }, { status: 201 });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "خطا در ثبت رکورد جدید";
    return NextResponse.json({ message: errMessage }, { status: 500 });
  }
}
