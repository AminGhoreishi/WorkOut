import dbConnect from "@/lib/dbConnect";
import Pr from "@/model/Pr";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "شناسه کاربر معتبر ارائه نشده است" },
        { status: 400 }
      );
    }

    const records = await Pr.find({ userId })
      .sort({ date: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ success: true, records });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطا در دریافت اطلاعات رکوردهای شخصی";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { userId, category, testName, value, unit, date, notes } = body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "شناسه کاربر معتبر نمی‌باشد" },
        { status: 400 }
      );
    }

    if (!category || !testName || value === undefined || value === null || isNaN(Number(value)) || !unit) {
      return NextResponse.json(
        { message: "اطلاعات ارسالی ناقص یا نامعتبر است" },
        { status: 400 }
      );
    }

    const parsedDate = date ? new Date(date) : new Date();

    const newPr = await Pr.create({
      userId,
      coachId: session.user.id,
      category,
      testName,
      value: Number(value),
      unit,
      date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
      notes: notes || "",
    });

    return NextResponse.json({ success: true, pr: newPr }, { status: 201 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطا در ثبت رکورد جدید";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}
